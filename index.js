const express = require("express");
const app = express();
const crypto = require("crypto-js");

require("dotenv").config();
// const {
//   fetchAccountData,
//   fetchBalanceData,
//   fetchTransactionData,
// } = require("./utils/AxiosRequests");

// const {
//   addAccounts,
//   addBalances,
//   addTransactions,
//   addUsers,
// } = require("./utils/KnexOperations");

const userRoutes = require("./routes/account-routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/balance", (req, res) => {});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

// Fetch the array on transactions - each transaction will be an obj
// loop through that array and add each one to the database
