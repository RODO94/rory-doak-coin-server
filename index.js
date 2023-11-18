const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const accountRoutes = require("./routes/account-routes");
const userRoutes = require("./routes/user-routes");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);

app.get("/balance", (req, res) => {});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
