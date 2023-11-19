const express = require("express");
const { fetchWeeklySpend } = require("../utils/KnexFetch");
const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

const router = express.Router();
require("dotenv").config();

router.route("/").get(async (req, res) => {
  console.log(dayjs("2021-11-18").week());
  const transactionArray = await fetchWeeklySpend();

  const transactionsByWeekArray = transactionArray.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        week: dayjs(transaction.created).week(),
      })
  );

  let newArray = [];

  transactionsByWeekArray.map((transaction) => {
    let foundIndex = newArray.findIndex(
      (obj) => obj.name === transaction.first_name
    );
    if (
      transaction.category === "transfers" ||
      transaction.category === "income" ||
      transaction.category === "savings"
    ) {
      return;
    }
    if (foundIndex === -1) {
      // If you can't find the name
      newArray = [
        ...newArray,
        {
          name: transaction.first_name,
          data: [{ week: transaction.week, amount: transaction.amount }],
        },
      ];
      return;
    }
    let weekIndex = newArray[foundIndex].data.findIndex(
      (obj) => obj.week === transaction.week
    );

    // If you can find the name and the week you are looking for is there
    if (foundIndex !== -1 && weekIndex !== undefined && weekIndex !== -1) {
      // we need to change the amount on the amount: key
      let newAmount = 0;
      newAmount =
        newArray[foundIndex].data[weekIndex].amount + transaction.amount;
      newArray[foundIndex].data[weekIndex].amount = newAmount;
      return;
    }
    // If you can find the name, but the week you are looking for is not there
    if (foundIndex !== -1 && weekIndex === -1) {
      newArray[foundIndex].data = [
        ...newArray[foundIndex].data,
        { week: transaction.week, amount: transaction.amount },
      ];
      return;
    }
  });
  const roryUnitChange = newArray[0].data.map((week) => {
    return (newObj = { ...week, amount: week.amount / 100 });
  });
  console.log(roryUnitChange);
  newArray[0].data = roryUnitChange;
  res.status(200).send(transactionsByWeekArray);
  return newArray;
});

module.exports = router;

// [
//   {
//     name: "Rory",
//     data: [
//       {
//         week: 47,
//         amount: 2344,
//       },
//       {
//         week: 48,
//         amount: 2344,
//       },
//     ],
//   },
// ];
