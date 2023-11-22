const knex = require("knex")(require("../knexfile"));
const { default: OpenAI } = require("openai");
const openai = new OpenAI();
const userId = "57581dd2-96b8-4402-912b-c669c16f21a2";
const threadId = "thread_x5b1mR0LJOVFxD8PWlKbVWWK";
const crypto = require("crypto");

require("dotenv").config();

const createThread = async (req, res) => {
  const thread = await openai.beta.threads.create();
  await knex("threads").insert([
    {
      id: crypto.randomUUID(),
      thread_id: thread.id,
      user_id: userId,
    },
  ]);
  res.send(thread.id);
};

const addMessage = async (req, res) => {
  try {
    const message = await openai.beta.threads.messages.create(
      req.params.threadId,
      req.body
    );
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const runThread = async (req, res) => {
  try {
    const runResponse = await openai.beta.threads.runs.create(
      req.params.threadId,
      req.body
    );
    res.send(runResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const runStatus = async (req, res) => {
  try {
    const runStatus = await openai.beta.threads.runs.retrieve(
      req.params.threadId,
      "run_wCJ4jBlMQSwxqfPaTWqXJE6w"
    );
    res.send(runStatus);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const getResponse = async (req, res) => {
  try {
    const messageList = await openai.beta.threads.messages.list(
      req.params.threadId
    );
    res.send(messageList.body.data);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
module.exports = {
  createThread,
  addMessage,
  runThread,
  runStatus,
  getResponse,
};
