const mongoose = require('mongoose');
var Link = require('../models/link');

exports.create =function (linkObject){
  var link = new Link({});
  link.chatId = linkObject.chatId;
  link.userId = linkObject.userId;
  link.name = linkObject.name;
  link.desc = linkObject.desc;
  link.link = linkObject.link;
  return link.save();
  
};

exports.allLinks = function(res){
  
  Link.find({}, function(err, links) {
    if (err) throw err;
    res(links);
  });
};






