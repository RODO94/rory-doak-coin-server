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

module.exports = {
  fetchWeeklySpend,
};
