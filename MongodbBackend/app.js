var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');

User = require('./models/user');

const app = express();

// Connect to Mongoose
mongoose.connect('mongodb://localhost/auth');
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
    res.send('you are in a black hole, please use the api');
});

app.get('/api/user', function(req, res){
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://localhost:3000/api/login',
        json: {
            username: 'Rusherz',
            password: 'Something'
        }
    }, 
    function(err, body){
        if(err){
            throw err;
        }
        res.send(body);
    });
});

/*
**
**  Get user (login?)
**
*/
app.post('/api/login', function(req, res){
    User.loginUser(req.body)
    .then(function(resolve){
        res.send(resolve);
    })
    .catch(function(reject){
        res.send(reject);
    });
});

/*
**
**  Create user
**
*/
app.post('/api/createUser', function(req, res){
    var data = {
        username: req.body['username'],
        password: req.body['password']
    }
    User.addUser(data)
    .then(function(resolve){
        res.send(resolve);
    })
    .catch(function(err){
        console.error(err);
        res.send(err);
    });
});

/*
**
**  Start server
**
*/
app.listen(3000, function(){
    console.log('Server started on port 3000');
});