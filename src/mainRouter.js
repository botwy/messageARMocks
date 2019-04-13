import express from 'express';
import cloneDeep from 'lodash/cloneDeep';
import { chatData } from './chatData';
import { messageIdGenerator } from './messageIdGenerator';

const CHAT_URL = '/chat'
const mainRouter = express.Router();
const chat = express.Router();

const chatList = cloneDeep(chatData);

chat.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    body: chatList,
  });
})

chat.post('/message', (req, res) => {
  const { chatId, message: { text, createDate, author: reqAuthor = {} } = {} } = req.body
  let author;
  if (reqAuthor.id) {
    author = {
      id: reqAuthor.id,
      name: reqAuthor.name
    }
  }
  const chat = chatList.find(chat => chat.id === chatId)
  const messageId = messageIdGenerator()
  chat.messages.push({ id: String(messageId), text, author, createDate })
  res.status(200).send({
    success: true,
    body: chatList,
  });
})
mainRouter.use(CHAT_URL, chat)

export default mainRouter
