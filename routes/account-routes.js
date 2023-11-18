const express = require("express");
const router = express.Router();
require("dotenv").config();
const knex = require("knex")(require("../knexfile"));

router.route("/accounts").get();

router.route("/accounts/daily").get();

router.route("/accounts/:userId");

router.route("/accounts/daily/:userId").get();
