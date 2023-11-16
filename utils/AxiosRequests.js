const { default: axios } = require("axios");

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6ImR0VlFJNm9wRW5KY2x2WHhmaERvIiwianRpIjoiYWNjdG9rXzAwMDBBYnJrT0VXaXc4amoxVnpDMGgiLCJ0eXAiOiJhdCIsInYiOiI2In0.QcVbity3Y9V1azKCp-ap-uPIRpmmM4nKdjTtCZqha9bOb0wrdDdha9-XZFWK1zyflBIJzc5EDTnHfO9sswOz7w";
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
        created: account.created,
        type: account.type,
        currency: account.currency,
        country_code: account.country_code,
        monzo_user_id: account.owners.user_id,
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

    transactionArray = [];

    data.transactions.map((transaction) => {
      let newObj = {
        id: transaction.id,
        account_id: transaction.account_id,
        user_id: transaction.metadata.user_id,
        category: transaction.category,
        currency: transaction.currency,
        local_amount: transaction.local_amount,
        local_currency: transaction.local_currency,
        created: transaction.created,
      };

      transactionArray.push(newObj);
    });

    res.send(transactionArray);
  } catch (error) {
    console.error(error);
  }
  return transactionArray;
};

module.exports = { fetchAccountData, fetchBalanceData, fetchTransactionData };
