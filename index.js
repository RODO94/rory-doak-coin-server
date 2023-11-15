const express = require("express");
const app = express();
require("dotenv").config();
const { fetchAccountData, fetchBalanceData } = require("./utils/AxiosRequests");

const userRoutes = require("./routes/account-routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(fetchAccountData());
});
app.get("/balance", (req, res) => {
  const balanceObj = fetchBalanceData();
  res.send(balanceObj);
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
