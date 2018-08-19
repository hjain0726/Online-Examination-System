const mongoose = require('../common/connection');

var Schema = mongoose.Schema;
var testschema = new Schema({
    quesno: Number,
    question: String,
    options: [{ answer: String }, { answer: String }, { answer: String }, { answer: String }],
    selected: Number,
    correct: Number,
    correctflag:Boolean
});
var testmodel = mongoose.model('testmodels', testschema);

module.exports = testmodel;