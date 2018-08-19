const mongoose = require('../common/connection');

var Schema = mongoose.Schema;
var timerschema = new Schema({
    timer: Number
});
var timermodel = mongoose.model('timermodels', timerschema);

module.exports = timermodel;