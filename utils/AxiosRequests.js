const { default: axios } = require("axios");

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6Iitvdm1sSEVlZC9UT1dMM05XcEpsIiwianRpIjoiYWNjdG9rXzAwMDBBYnZJZXNxd2toVnk5QzM4SzIiLCJ0eXAiOiJhdCIsInYiOiI2In0.mmx4VX9VMTuO5kPLNaTnHrPtSCyw74En1H-7VuKJ6_iCaRy7VjAtUrS9zjLSLeCu7ns2tqN1IZ_rrLobyrmu4Q";
const mainAccountId = "acc_0000A7opetunLsyIaJFg6j";
const fetchAccountData = async (req, res) => {
  const { data } = await axios.get("https://api.monzo.com/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const openAccountObj = data.accounts
    .filter((account) => account.closed === false)
    .map((account) => {
      return (account = {
        account: account.id,
        bank_name: "Monzo",
        created: account.created,
        type: account.type,
        currency: account.currency,
        country_code: account.country_code,
        monzo_user_id: account.owners.user_id,
        is_closed: account.closed,
      });
    });

  res.send(openAccountObj);
  return openAccountObj;
};

const fetchBalanceData = async (req, res) => {
  const { data } = await axios.get(
    `https://api.monzo.com/balance?account_id=${mainAccountId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const balanceObj = {
    balance: data.balance,
    total_balance: data.total_balance,
    currency: data.currency,
    spend_today: data.spend_today,
  };

  res.send(balanceObj);
  return balanceObj;
};

const fetchTransactionData = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.monzo.com/transactions?account_id=${mainAccountId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const transactionArray = data.transactions.map((transaction) => {
      return {
        id: transaction.id,
        account_id: transaction.account_id,
        user_id: transaction.metadata.user_id,
        category: transaction.category,
        currency: transaction.currency,
        local_amount: transaction.local_amount,
        local_currency: transaction.local_currency,
        created: transaction.created,
        settled: transaction.settled,
      };
    });

    res.send(transactionArray);
  } catch (error) {
    console.error(error);
  }
  return ["no transactions found"];
};

module.exports = { fetchAccountData, fetchBalanceData, fetchTransactionData };
