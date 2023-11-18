const express = require("express");
const router = express.Router();
require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

router.route("/user");

router.route("/user/:accountId");

router.route("/user/connections");

router.route("/user/connections/:userId");
