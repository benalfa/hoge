'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var Message = require('./schema/Message');
var fileUpload = require('express-fileupload');

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

app.use('/image', express.static(path.join(__dirname, 'image')));

app.get('/', function(reqeust, response, next){
    Message.find({}, function(err, msgs){
        if(err) throw err;
        return response.render('index',{messages:msgs});
    });
});

app.get('/update', function(request, response, next){
    return response.render('update');
});

app.post('/update', fileUpload(), function(request, response, next){

    if(request.files && request.files.image){
        request.files.image.mv('./image/'+ request.files.image.name,
    function(err){
        if(err)throw err;
        var newMessage = new Message({
            username: request.body.username,
            message: request.body.message,
            image_path: '/image/' + request.files.image.name
        });
        newMessage.save((err)=>{
            if(err) throw err;
            return response.redirect('/');
        });
    });
    }else{
        var newMessage = new Message({
            username: request.body.username,
            message: request.body.message
        });
        newMessage.save((err)=>{
            if(err)
                throw err;
                return response.redirect('/');
        });
    }
});

var server = http.createServer(app);
server.listen('3000');