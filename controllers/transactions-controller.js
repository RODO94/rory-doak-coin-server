const knex = require("knex")(require("../knexfile"));
const { weekArrayRestructure } = require("../utils/KnexFetch");

const fetchWeeklySpend = async (req, res) => {
  try {
    const usersWeeklySpend = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.user_id",
        "transactions.account_id",
        "transactions.category",
        "transactions.created",
        "users.first_name",
        "users.last_name",
        "users.known_as"
      )
      .whereBetween("transactions.created", ["2023-10-16", "2023-11-19"]);

    const weeklySpendArray = weekArrayRestructure(usersWeeklySpend);
    res.send(weeklySpendArray);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const fetchTransactions = async (req, res) => {
  try {
    const usersTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.user_id",
        "users.first_name",
        "users.known_as",
        "transactions.account_id",
        "transactions.category",
        "transactions.created"
      )
      .where("transactions.user_id", "57581dd2-96b8-4402-912b-c669c16f21a2");
    res.send(usersTransactions);
  } catch (error) {
    console.error(error);
    res.status(400).send("We can't find the transactions for that user");
  }
};

const fetchMonthlyTransactions = async (req, res) => {
  try {
    const monthlyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created"
      )
      .where("transactions.created", ">", "2023-10-31")
      .andWhere("transactions.user_id", "=", req.params.userId);

    res.send(monthlyTransactions);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const fetchYearlyTransactions = async (req, res) => {
  try {
    const yearlyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created"
      )
      .where("transactions.created", ">", "2022-12-31")
      .andWhere("transactions.user_id", "=", req.params.userId);

    res.send(yearlyTransactions);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
const fetchWeeklyTransactions = async (req, res) => {
  try {
    const weeklyTransactions = await knex("transactions")
      .join("users", "transactions.user_id", "=", "users.id")
      .select(
        "transactions.amount",
        "transactions.category",
        "transactions.created"
      )
      .where("transactions.created", ">", "2023-11-12")
      .andWhere("transactions.user_id", "=", req.params.userId);

    res.send(weeklyTransactions);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  fetchWeeklySpend,
  fetchTransactions,
  fetchMonthlyTransactions,
  fetchYearlyTransactions,
  fetchWeeklyTransactions,
};
