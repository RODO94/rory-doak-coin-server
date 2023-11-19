const knex = require("knex")(require("../knexfile"));

const fetchUser = async (id) => {
  try {
    userObj = await knex("users").where({ id: id }).first();
    return userObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchAccounts = async (id) => {
  try {
    accountObj = await knex("accounts").where({ id: id });
  } catch (error) {}
};

const fetchConnections = async () => {
  try {
    const connectionsObj = await knex("connections");
    return connectionsObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchUsersConnections = async (id) => {
  try {
    connectionsObj = await knex("connections").where({ user_id: id });
    return connectionsObj;
  } catch (error) {
    console.error(error);
  }
};

const fetchDailySpend = async (id) => {
  try {
    const dailySpend = await knex("accounts")
      .where({ user_id: id })
      .select("spend_today");
    return dailySpend;
  } catch (error) {}
};

const fetchConnectionBalances = async (id) => {
  try {
    const connectionsBalancesObj = await knex("accounts")
      .join("connections", "accounts.user_id", "=", "connections.connect_id")
      .select(
        "accounts.account_balance",
        "accounts.savings_balance",
        "accounts.available_balance",
        "user_first_name",
        "user_last_name",
        "user_known_as",
        "connect_first_name",
        "connect_last_name",
        "connect_known_as"
      )
      .where("connections.user_id", id);
    return connectionsBalancesObj;
  } catch (error) {}
};

const fetchUsersBalance = async (id) => {
  try {
    const usersBalance = await knex("accounts")
      .where({ user_id: id })
      .select("account_balance", "savings_balance", "available_balance");
    return usersBalance;
  } catch (error) {}
};

const fetchUsersAccounts = async (id) => {
  try {
    const usersAccounts = await knex("accounts").where({ user_id: id });
    return usersAccounts;
  } catch (error) {}
};

const fetchWeeklySpend = async () => {
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
    return usersWeeklySpend;
  } catch (error) {}
};

module.exports = {
  fetchUser,
  fetchConnections,
  fetchAccounts,
  fetchUsersConnections,
  fetchDailySpend,
  fetchConnectionBalances,
  fetchUsersBalance,
  fetchUsersAccounts,
  fetchWeeklySpend,
};
