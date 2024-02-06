require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
// const TelegramBot = require('node-telegram-bot-api');
const cors = require("cors");
const rateLimit = require("./utils/rateLimit");
const errorHandler = require("./middlewares/errorHandler");
const NotFound = require("./errors/notFound");
const { askQuestion } = require("./bot");


const { PORT = 3000, NODE_ENV, MONGO_URL, TOKEN } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Your middleware and routes here
app.use(rateLimit);
app.use(require("./routes/index"));
app.use("*", (req, res, next) => {
  next(new NotFound("Страница не найдена"));
});
app.use(errors());

// Connect to MongoDB and start Express server
async function connect() {
  await mongoose.connect(
    NODE_ENV === "production" ? MONGO_URL : "mongodb://localhost:27017/tasksdb"
  );

  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
  });
}

connect();


// const bot = new TelegramBot(TOKEN, { polling: true });
// let exit = true;
// let answers = {};


// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   answers = {};
//   bot.sendMessage(chatId, 'Is it you again? So what this time?');
//   askQuestion(chatId, 0);
// });

// bot.onText(/\/reload/, (msg) => {
//   const chatId = msg.chat.id;
//   answers = {};
//   bot.sendMessage(chatId, 'Lets start all over again.');
//   askQuestion(chatId, 0);
// });

// // Add more bot commands and event handlers as needed

// // Start your Express server and Telegram bot concurrently
// async function startServerAndBot() {
//   await connect();
// }

// startServerAndBot();
