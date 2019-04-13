import { messageIdGenerator } from './messageIdGenerator';

export const chatData = [
  {
    "id": "1",
    "title": "Helen",
    "author": {
      "id": "2",
      "name": "Helen",
      "profileIconPath":
        "princess.png",
    },
    "messages": [
      { "id": String(messageIdGenerator()), "text": "hello, Helen", "author": { "id": "1", "name": "Dima" }, "createDate": "2019-04-01 11:15" },
      { "id": String(messageIdGenerator()), "text": "hello, Dima", "author": { "id": "2", "name": "Helen" }, "createDate": "2019-04-13 17:15" },
      { "id": String(messageIdGenerator()), "text": "how are you?", "author": { "id": "1", "name": "Dima" }, "createDate": "2019-04-12 11:15" },
    ]
  },
  {
    "id": "2",
    "title": "Vika",
    "author": {
      "id": "4",
      "name": "Vika",
    },
    "messages":  [
      { "id": String(messageIdGenerator()), "text": "hello, Helen", "author": { "id": "4", "name": "Vika" }, "createDate": "2019-04-01 11:15" },
      { "id": String(messageIdGenerator()), "text": "hello, Vika", "author": { "id": "2", "name": "Dasha" }, "createDate": "2019-04-05 11:35" },
      { "id": String(messageIdGenerator()), "text": "how are you?", "author": { "id": "2", "name": "Dasha" }, "createDate": "2019-04-12 12:11" },
    ],
  },
  {
    "id": "3",
    "title": "Dan Abramov",
    "author": {
      "id": "5",
      "name": "Dan Abramov",
      "profileIconPath": "robot.png",
    },
    "messages": [
      { "id": String(messageIdGenerator()), "text": "hello, Helen", "author": { "id": "5", "name": "Dan" }, "createDate": "2019-04-03 09:11" },
      { "id": String(messageIdGenerator()), "text": "hello, Dan", "author": { "id": "1", "name": "Dima" }, "createDate": "2019-04-07 13:22" },
      { "id": String(messageIdGenerator()), "text": "how are you?", "author": { "id": "1", "name": "Dima" }, "createDate": "2019-04-13 16:45" },
    ]
  },
];