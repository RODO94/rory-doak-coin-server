const { default: axios } = require("axios");

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYiI6IkxkdjVpdm1PYUlZTmk1MDhzbkV6IiwianRpIjoiYWNjdG9rXzAwMDBBYm50eVVzUmtJek5TdDAzN0siLCJ0eXAiOiJhdCIsInYiOiI2In0.nEdtu9ALrrvuxHnLZGJEzWRkFQ6Odm0TNb3_pvy6bhP11USVTCDR9a1AiJVrLhC25MkCXkF8lUkBDpAxEqtzrA";

const mainAccountId = "acc_00009QmjwqSXxcVFDU5k81";

const fetchAccountData = async () => {
  const { data } = await axios.get("https://api.monzo.com/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
  return data;
};

const fetchBalanceData = async () => {
  const { data } = await axios.get(
    `https://api.monzo.com/balance?account_id=${mainAccountId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(data);
  return data;
};

const fetchTransactionData = async () => {
  const { data } = await axios.get("https://api.monzo.com/accounts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(data);
};

module.exports = { fetchAccountData, fetchBalanceData };
