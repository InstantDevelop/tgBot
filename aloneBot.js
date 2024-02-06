require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const  {TOKEN}  = process.env;
console.log("token",TOKEN);
if (!TOKEN) {
  throw new Error("Токен не найден в переменных окружения");
}

const bot = new TelegramBot(TOKEN, { polling: true });

const questions = [
  {
    question: "What city? (with a small letter in Latin)",
    type: "text",
  },
  {
    question: "How many rooms? (fork from-to, 5+ if maximum)",
    type: "text",
  },
  {
    question: "What price? (fork from-to)",
    type: "text",
  },
  {
    question: "What quadrature? (fork from-to)",
    type: "text",
  },
  {
    question: "Age of advertisements. (from date in format 10.12.2023)",
    type: "text",
  },
  {
    question: "Renting or buying?",
    options: ["Rent", "Buy"],
  },
  {
    question: "House or apartment?",
    options: ["House", "Apartment"],
  },
  {
    question: "Agency, owner or investor?",
    options: ["Agency", "Owner", "Investor"],
  },
];

const answers = {};

const optionsKeyboard = {
  reply_markup: {
    keyboard: [],
  },
};

function askQuestion(chatId, questionIndex) {
  if (questionIndex >= questions.length) {
    let response = "So, lets look...\n";
    for (const question of questions) {
      if (answers.hasOwnProperty(question.question)) {
        response += `${answers[question.question]}\n`;
      }
    }
    bot.sendMessage(chatId, response);
    console.log(response);
    exit = false;
    return;
  }

  const currentQuestion = questions[questionIndex].question;
  const currentType = questions[questionIndex].type;

  if (currentType === "text") {
    bot.sendMessage(chatId, currentQuestion);
  } else {
    const options = questions[questionIndex].options;
    optionsKeyboard.reply_markup.keyboard = options.map((option) => [{ text: option }]);
    bot.sendMessage(chatId, currentQuestion, optionsKeyboard);
  }

  bot.once("message", (msg) => {
    const userAnswer = msg.text;
    answers[currentQuestion] = userAnswer;
    askQuestion(chatId, questionIndex + 1);
  });
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  answers = {};
  bot.sendMessage(chatId, "Is it you again? So what this time?");
  askQuestion(chatId, 0);
});

bot.onText(/\/reload/, (msg) => {
  const chatId = msg.chat.id;
  answers = {};
  bot.sendMessage(chatId, "Lets start all over again.");
  askQuestion(chatId, 0);
});

bot.startPolling();

// async function waitForExit() {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   waitForExit();
// }

// waitForExit();