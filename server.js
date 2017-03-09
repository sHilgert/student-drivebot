'use strict';

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

bot.on('message', function(msg){
    bot.sendMessage(msg.chat.id, msg.text);
});