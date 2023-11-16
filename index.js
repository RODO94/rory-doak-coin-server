const express = require("express");
const app = express();
require("dotenv").config();
const {
  fetchAccountData,
  fetchBalanceData,
  fetchTransactionData,
} = require("./utils/AxiosRequests");

const userRoutes = require("./routes/account-routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  fetchAccountData(req, res);
});
app.get("/balance", (req, res) => {
  fetchBalanceData(req, res);
});
app.get("/transactions", (req, res) => {
  fetchTransactionData(req, res);
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
