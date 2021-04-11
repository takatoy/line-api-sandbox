require('dotenv').config();

const express = require('express');
const line = require('@line/bot-sdk');

const app = express();
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const suffix = [
    "っていまいち。",
    "はあまり好きじゃないな。",
    "は嫌いだなぁ。",
    "だけはやめて欲しい",
    "はいいよね。",
    "って好き。",
    "はとても好き。",
    "は大好き。",
    "は好きすぎる。",
  ];

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text + suffix[Math.floor(Math.random() * suffix.length)]
  });
}

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
})

module.exports = app;
