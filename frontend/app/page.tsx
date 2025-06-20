"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, DollarSign, Clock } from "lucide-react";

type Transfer = {
  from: string;
  to: string;
  hash: string;
  timestamp: number;
  blockNumber: number;
  amount: string;
  key: string;
};

function formatTimeAgo(timestamp: number) {
  const now = new Date();
  const txTime = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - txTime.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return "Less than 1 hour ago";
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  return `${Math.floor(diffInHours / 24)} days ago`;
}

export function formatUsdt(raw: string) {
  // raw is the on-chain 6-decimals integer (string)
  const big = BigInt(raw);
  const whole = big / 1_000_000n;
  return whole.toLocaleString();
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function HomePage() {
  const [largestTransactions, setLargestTransactions] = useState<Transfer[]>([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/transfers");
        const raw = await res.json();
        console.log(raw)

        // Transform raw data to include amount field (USDT = 6 decimals)
        const transfers = raw.map((tx: any) => ({
          ...tx,
          amount: formatUsdt(tx.amount),
        }));

        setLargestTransactions(transfers);
      } catch (err) {
        console.error("Failed to fetch transfers:", err);
      }
    };

    fetchTransfers();
    const interval = setInterval(fetchTransfers, 5000); // poll every 5s

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">USDT Tracker</h1>
                <p className="text-sm text-slate-400">Largest USDT Transfers</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">

        {/* Transactions List */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Largest USDT Transfers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700/50">
              {largestTransactions.map((tx, index) => (
                <a
                  key={tx.key}
                  href={`https://etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 transition-all duration-200 hover:bg-slate-700/30 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-lg font-semibold text-white">
                            {tx.amount} USDT
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                          <span>From: {truncateAddress(tx.from)}</span>
                          <span>→</span>
                          <span>To: {truncateAddress(tx.to)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-400">{formatTimeAgo(tx.timestamp)}</p>
                        <p className="text-xs text-slate-500">
                          Block #{tx.blockNumber?.toLocaleString() || "—"}
                        </p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <p className="text-sm text-slate-400">
              © 2024 USDT Tracker. Real-time blockchain data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
