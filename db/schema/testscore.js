const mongoose = require('../common/connection');

var Schema = mongoose.Schema;
var scoreschema = new Schema({
    email: String,
    name: String,
    score:Number,
    rank:Number
});
var scoremodel = mongoose.model('scoremodels',scoreschema);

module.exports= scoremodel;