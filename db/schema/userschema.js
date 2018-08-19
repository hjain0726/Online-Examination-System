const mongoose = require('../common/connection');

var Schema = mongoose.Schema;
var userschema = new Schema({
    email: String,
    password: String
});
var usermodel = mongoose.model('usermodels',userschema);

module.exports= usermodel;