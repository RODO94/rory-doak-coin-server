const express = require("express");
const router = express.Router();
const threadController = require("../controllers/thread-controller");
const { default: OpenAI } = require("openai");
const openai = new OpenAI();

require("dotenv").config();

// Create a thread
router.route("/create").post(threadController.createThread);

//Add message to thread & Retrieve Messages from a thread
router
  .route("/:threadId/message")
  .get(threadController.getResponse)
  .post(threadController.addMessage);

// Run thread
router
  .route("/:threadId/run")
  .post(threadController.runThread)
  .get(threadController.runStatus);

// Retrieve all threads for a user
router.route("/:userId").get();

module.exports = router;
