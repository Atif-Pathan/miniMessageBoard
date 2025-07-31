// index.js
const { Router } = require("express");
const db = require("../db/queries");

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: messages })
})

indexRouter.get("/new", (req, res) => {
    res.render("form")
})

indexRouter.post("/new", async (req, res) => {
    const messageUser = req.body.username;
    const messageText = req.body.messageText;
    await db.insertMessage(messageText, messageUser);
    res.redirect("/")
})

indexRouter.get("/message/:id", async (req, res, next) => {
  try {
    const message = await db.getMessageById(req.params.id);
    if(!message) {
      return res.status(404).send("Message not found");
    }
    res.render("message", {message: message})
  } catch (error) {
    next(error)
  }   
})

module.exports = indexRouter;