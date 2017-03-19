"use strict";
const TelegramBot = require('node-telegram-bot-api');
const linkController = require('./controllers/linkController');
const mongoose = require('mongoose');


//Ambient
const TOKEN = process.env.TELEGRAM_BOT_TOKEN; 
const URL = process.env.APP_URL;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB;

//MongoDB
var mongoOptions = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
 
mongoose.connect(MONGODB_URI, mongoOptions);
var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  console.log("connected");
});


// Controllers

// Bot
const botOptions = {
  webHook: {
    port: PORT
  }
};
const bot = new TelegramBot(TOKEN, botOptions);
bot.setWebHook(`${URL}/bot${TOKEN}`);


//Error Handlers
bot.on('polling_error', (error) => console.log(error.code));
bot.on('webhook_error', (error) => console.log(error.code));


// Functions
bot.on('message', (msg) => {
  if(msg.entities){
    msg.entities.forEach(function(entity){
      const chatId = msg.chat.id;
      console.log(msg);
      console.log(msg.chat.id);
      console.log(msg.from.id);
      console.log(msg.from.name);
      console.log(msg.text.substring(entity.offset, entity.offset + entity.length));
      if(entity.type && entity.type === 'url'){
        
        linkController.create({ 
          chatId: msg.chat.id,
          userId: msg.from.id,
          name: msg.from.first_name,
          link: (msg.text.substring(entity.offset, entity.offset + entity.length)),
          desc: ""
        },
        
        function (err) {
          if (err) 
            console.log(err);
        });
        
        bot.sendMessage(chatId, "you have a link in your message");
      }
    });
  }
});

bot.onText(/links/, function (msg) {
  var chatId = msg.chat.id;
  linkController.allLinks(function(res){
    res.forEach(function(r){
      bot.sendMessage(chatId, r.name + "\n" + r.link);
    });
  });
  
});

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



