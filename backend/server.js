const express = require('express');
const cors = require('cors');
const { getTransfers } = require('./whaleCache');
const startListener = require('./listener');

const app = express();
app.use(cors());

app.get('/api/transfers', (req, res) => {
  console.log("returning this many transfers")
  console.log(getTransfers().length)
  res.json(getTransfers());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  startListener();
});
