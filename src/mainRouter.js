import express from 'express';
import cloneDeep from 'lodash/cloneDeep';
import { chatData } from './chatData';
import { messageIdGenerator } from './messageIdGenerator';

const CHAT_URL = '/chat'
const AUTH_URL = '/auth'
const mainRouter = express.Router();
const chat = express.Router();
const auth = express.Router();

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

auth.post('/', (req, res) => {
  const { userName } = req.body

  if (userName === 'denis') {
    res.status(200).send({
      success: true,
    })
    return
  }

  res.status(200).send({
    success: false,
  })
})

mainRouter.use(CHAT_URL, chat)
mainRouter.use(AUTH_URL, auth)

export default mainRouter
