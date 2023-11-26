const knex = require("knex")(require("../knexfile"));
const { default: OpenAI } = require("openai");
const openai = new OpenAI();
const userId = "57581dd2-96b8-4402-912b-c669c16f21a2";
const threadId = "thread_x5b1mR0LJOVFxD8PWlKbVWWK";
const crypto = require("crypto");
const fs = require("fs");
const { structureMessageList } = require("../utils/ArrayMethods");
const { createNewFileURL } = require("../utils/FileTransform");
const { default: axios } = require("axios");

require("dotenv").config();

const getThreads = async (req, res) => {
  try {
    const threads = await knex("threads").where(
      "user_id",
      "=",
      req.params.userId
    );
    res.send(threads);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const createAssistant = async (req, res) => {
  try {
    const yearlyTransactionFile = await openai.files.create({
      file: fs.createReadStream("./data/yearly-transactions.json"),
      purpose: "assistants",
    });
    const assistant = await openai.beta.assistants.create({
      name: "Rory's Assistant V01",
      description:
        "You are a helpful assistant for Rory and will help Rory improve their financial habits and keep track of how they are spending their money. Please refer to him as Rory in your responses. You will be clear, concise, and use data visualisations where applicable to convey your advice. The files added are in JSON format and can help you answer questions from the user. The file yearly-transactions.json will provide you with data on the users transaction information for the year.",
      model: "gpt-4-1106-preview",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      file_ids: [yearlyTransactionFile.id],
    });

    res.send(assistant);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const createThread = async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    await knex("threads").insert([
      {
        id: crypto.randomUUID(),
        thread_id: thread.id,
        user_id: userId,
        thread_name: req.body.thread_name,
      },
    ]);
    res.send(thread.id);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
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
      req.params.runId
    );
    console.log(runStatus.status);
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
    const responseArray = structureMessageList(messageList);
    const imageArray = responseArray.filter(
      (response) => response.type === "image_file"
    );

    res.send(responseArray);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const createFileLink = async (req, res) => {
  try {
    const fileBlob = await openai.files.content(req.params.file_id);

    const response = await axios.get(fileBlob.url, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      responseType: "stream",
    });
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const runSteps = async (req, res) => {
  try {
    const steps = await openai.beta.threads.runs.steps.list(
      req.params.threadId,
      req.params.runId
    );
    const message = await openai.beta.threads.messages.retrieve(
      req.params.threadId,
      "msg_5KPtHibBdJKaIQM3gRV3uUwK"
    );
    // message.content
    res.send(steps.body);
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
  createAssistant,
  getThreads,
  createFileLink,
  runSteps,
};
