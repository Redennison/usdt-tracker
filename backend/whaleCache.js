let latestTransfers = [];

function addTransfer(transfer) {
  if (latestTransfers.some((tx) => tx.hash === transfer.hash)) return

  latestTransfers = [...latestTransfers, transfer]
    .sort((a, b) =>
      BigInt(b.amount) > BigInt(a.amount) ? 1 : -1
    )
    .slice(0, 5);
}

function getTransfers() {
  return [...latestTransfers]; // return a shallow copy
}

module.exports = { addTransfer, getTransfers };
