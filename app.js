'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var Message = require('./schema/Message');

var app = express();

mongoose.connect('mongodb://localhost:27017/chatapp', 
function(err){
    if(err){
        console.error(err);
    }else{
        console.log('sucessfully connected to MongoDB.');
    }
});

app.use(bodyparser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(reqeust, response, next){
    return response.render('index',{title:'Hello World'});
});

app.get('/update', function(request, response, next){
    return response.render('update');
});

app.post('/update', function(request, response, next){

    var newMessage = new Message({
        username: request.body.username,
        message: request.body.message
    });
    newMessage.save((err)=>{
        if(err)
            throw err;
            return response.redirect('/');
    });
});

var server = http.createServer(app);
server.listen('3000');