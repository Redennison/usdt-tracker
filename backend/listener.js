require('dotenv').config();
const { JsonRpcProvider, Contract } = require('ethers');
const { addTransfer } = require('./whaleCache');

const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function name() view returns (string)"
];

async function startListener() {
  const contract = new Contract(CONTRACT_ADDRESS, ABI, provider)
  const name = await contract.name()

  contract.on("Transfer", (from, to, value, event) => {
    const transfer = {
        name,
        from,
        to,
        amount: value.toString(),
        hash: event.log.transactionHash,
        blockNumber: event.log.blockNumber,
        timestamp: Date.now(),
        key: `${event.log.transactionHash}-${event.log.index}`
    }

    addTransfer(transfer)
  });
}

module.exports = startListener;
