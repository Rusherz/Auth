var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = function(callback){
    User.find(callback);
}

// Get User
module.exports.getUser = function(userInfo){
    return new Promise(function(resolve, reject){
        User.findOne({username: userInfo}, function(err, user){
            if(user){
                console.log(user);
                resolve(user);
            }else{
                console.log('User does not exist');
                reject("User does not exist");
            }
        });
    });
}

// User Login
module.exports.loginUser = function(userInfo){
    return new Promise(function(resolve, reject){
        User.findOne({username: userInfo['username']}, function(err, user){
            if(user){
                if(user['password'] == userInfo['password']){
                    resolve({response: "Login successful"});
                }else{
                    reject({response: "Login failed"});
                }
            }else{
                console.log({response: 'User does not exist'});
                reject({response: 'User does not exist'});
            }
        });
    });
}

// Insert User
module.exports.addUser = function(userInfo){
    return new Promise(function(resolve, reject){
        User.count({username: userInfo['username']}, function(err, count){
            if(count == 0){
                User.create(userInfo);
                resolve({response: "Added User"});
            }else{
                reject({response: "User already exists."});
            }
        });
    });
}