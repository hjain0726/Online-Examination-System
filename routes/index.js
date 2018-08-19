var express = require('express');
var path = require("path");
var router = express.Router();
var absPath = path.join(__dirname, "../public");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(absPath + '/index.html');
});

router.get('/admin', function (req, res, next) {
  res.sendFile(absPath + '/admin.html');
});

router.get('/facebook', function (req, res, next) {
  res.redirect('https://www.facebook.com/hjain0726/?modal=admin_todo_tour');
});

router.get('/linkedin', function (req, res, next) {
  res.redirect('https://www.linkedin.com/in/harsh-jain-85668b148/');
});

router.get('/github', function (req, res, next) {
  res.redirect('https://github.com/hjain0726');
});

module.exports = router;
