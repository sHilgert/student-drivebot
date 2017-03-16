"use strict";

var http = require("http");
var express = require('express');
const TelegramBot = require('node-telegram-bot-api');

var app = express();

//Ambient
const TOKEN = process.env.TELEGRAM_TOKEN; 
const URL = process.env.APP_URL;
const PORT = process.env.PORT;

// Bot
const options = {
  webHook: {
    port: PORT
  }
};
const bot = new TelegramBot(TOKEN, options);
bot.setWebHook(`${URL}/bot${TOKEN}`);
  
bot.onText(/ADS/, function (msg) {
  

  var chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'O curso de Análise e Desenvolvimento de Sistemas ...');
});

bot.onText(/BD/, function (msg) {
  

  var chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 'O curso de Banco de Dados ...');
});

bot.onText(/\/cursos/, function (msg) {
  var chatId = msg.chat.id;
  var opts = {
      reply_to_message_id: msg.message_id,
      reply_markup: JSON.stringify({
        keyboard: [
          ['ADS'],
          ['BD']]
      })
    };
    bot.sendMessage(chatId, 'Sobre qual curso você deseja receber informações?', opts);
});



