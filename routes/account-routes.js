const express = require("express");
const {
  fetchDailySpend,
  fetchConnectionBalances,
  fetchUsersBalance,
  fetchUsersAccounts,
} = require("../utils/KnexFetch");
const router = express.Router();

require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

// A Users Daily Spend
router.route("/daily/:userId").get(async (req, res) => {
  const dailySpend = await fetchDailySpend(req.params.userId);
  res.send(dailySpend);
});

// Balances from all a Users Connections
router.route("/connections/:userId").get(async (req, res) => {
  const connectionsBalancesObj = await fetchConnectionBalances(
    req.params.userId
  );
  res.send(connectionsBalancesObj);
});

// A Users Balance
router.route("/balance/:userId").get(async (req, res) => {
  const usersBalance = await fetchUsersBalance(req.params.userId);
  res.send(usersBalance);
});

// A Users Account
router.route("/:userId").get(async (req, res) => {
  const usersAccounts = await fetchUsersAccounts(req.params.userId);
  res.send(usersAccounts);
});

module.exports = router;
