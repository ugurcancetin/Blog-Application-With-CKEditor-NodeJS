var mongoose = require('mongoose'),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchmea = new mongoose.Schema({
    username: String,
    password: String
});

UserSchmea.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchmea);