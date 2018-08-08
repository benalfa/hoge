var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect('mongodb://localhose:27017/chatapp', 
function(err){
    if(err){
        console.error(err);
        return;
    }
    console.log('sucessfully connected to MongoDB.');
});

app.get('/', function(reqeust, response, next){
    return response.render('index',{title:'Hello World'});
});

app.get('/hoge', function(reqeust, response, next){
    return response.send('Hoge');
});

var server = http.createServer(app);
server.listen('3000');