const mongoose = require('mongoose');
const dbconfig = require('./config');

mongoose.connect(dbconfig.dburl);

module.exports= mongoose;