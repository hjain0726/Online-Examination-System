var express = require('express');
var jwt = require('jsonwebtoken');
var testOperations = require('../db/testoperations');
var userOperations = require('../db/useroperations');
var adminModel = require('../db/schema/adminschema');
var scoremodel = require('../db/schema/testscore');
var timermodel = require('../db/schema/timerschema');
var router = express.Router();

//for admin
router.post('/postdata', (req, res) => {
    var obj = req.body;
    testOperations.savedata(obj, res);
});

router.get('/givedata', (req, res) => {
    testOperations.showdata(res);
});

router.put('/:id', (req, res) => {
    var id = req.params.id;
    var obj = req.body;
    testOperations.updateit(id, obj, res);
});

router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    testOperations.deleteit(id, res);
});
router.post('/updatetimer', (req, res) => {
    var obj = req.body;
    timermodel.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        }
        else {
            timermodel.findByIdAndUpdate(docs[0]._id, {
                timer: obj.timer 
            }, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.send("Exam duration updated");
        }
    });
    
});
//for user
router.get('/givetime',(req,res)=>{
    timermodel.find({}, (err, docs) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(docs[0]);
        }
    });
});
router.post('/register', (req, res) => {
    var obj = req.body;
    userOperations.register(obj, res);
});
router.post('/login', (req, res) => {
    var obj = req.body;
    userOperations.login(obj, res);
})

//admin login
router.post('/adminsignin', (req, res) => {
    var obj = req.body;
    adminModel.find(obj, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                var token = jwt.sign({ email: docs[0].email }, 'secret', { expiresIn: '24h' });
                res.json({ success: true, msg: 'successfully login', token: token });
            }
            else {
                res.send('Invalid email or password');
            }
        }
    });

});
router.post('/postscore', (req, res) => {
    var obj = req.body;
    var flag = 0;
    scoremodel.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        }
        else {
            if (docs && docs.length > 0) {
                for (var i = 0; i < docs.length; i++) {
                    if (obj.score == docs[i].score) {
                        obj.rank = docs[i].rank;
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    var scoreobj = new scoremodel(obj);
                    scoreobj.save(err => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json({ rank: obj.rank, msg: "Your Rank is : " });
                        }
                    });
                }
                else if (flag == 0) {
                    var j;
                    docs.sort((a, b) => b.score - a.score);
                    for (var i = 0; i < docs.length; i++) {
                        if (obj.score > docs[i].score) {
                            obj.rank = docs[i].rank - 1;
                            if (obj.rank == 0) {
                                obj.rank = 1;
                            }
                            flag = 2;
                            j = i;
                            break;
                        } else if (obj.score < docs[i].score) {
                            obj.rank = docs[i].rank + 1;
                        }
                    }
                    if (flag == 2) {
                        docs.sort((a, b) => b.score - a.score);
                        for (j; j < docs.length; j++) {
                            scoremodel.findByIdAndUpdate(docs[j]._id, {
                                rank: docs[j].rank + 1
                            }, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    }
                    var scoreobj = new scoremodel(obj);
                    scoreobj.save(err => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json({ rank: obj.rank, msg: "Your Rank is : " });
                        }
                    });

                }
            }
        }
    });
});

router.get('/givescore', (req, res) => {
    scoremodel.find({}, (err, docs) => {
        if (err) {
            res.send(err);
        }
        if (docs && docs.length > 0) {
            res.json(docs);
        }
    });
})
module.exports = router;