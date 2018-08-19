const mongoose = require('../common/connection');

var Schema = mongoose.Schema;
var adminschema = new Schema({
    email: String,
    password: String
});
var adminmodel = mongoose.model('adminmodels',adminschema);

module.exports= adminmodel;