// index.js
const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "I really like the clean and minimal design of this message board! What's the tech stack? I'm guessing Node.js and EJS?",
    user: "DesignFan",
    added: new Date("2025-07-15T10:00:00Z"),
  },
  {
    text: "This is a great little project. It's a perfect example of how to build a simple full-stack app. The code is super readable.",
    user: "HappyDeveloper",
    added: new Date("2025-07-15T14:30:00Z"),
  },
];

indexRouter.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages: messages })
})

indexRouter.get("/new", (req, res) => {
    res.render("form")
})

indexRouter.post("/new", (req, res) => {
    const messageUser = req.body.username;
    const messageText = req.body.messageText;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/")
})

indexRouter.get("/message/:userId", (req, res) => {
    res.render("message", {message: messages[req.params.userId]})
})

module.exports = indexRouter;