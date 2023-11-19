const express = require("express");
const { fetchWeeklySpend } = require("../utils/KnexFetch");
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

const router = express.Router();
require("dotenv").config();

router.route("/").get(async (req, res) => {
  const transactionArray = await fetchWeeklySpend();

  const transactionsByWeekArray = transactionArray.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        week: dayjs(transaction.created).week(),
      })
  );
  res.status(200).send(transactionsByWeekArray);
});

module.exports = router;
