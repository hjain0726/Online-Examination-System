var usermodel = require('./schema/userschema');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

const userOperations = {
    register(obj, res) {
        usermodel.find({ email: obj.email }, (err, docs) => {
            if (err) {
                res.send(err);
            }
            else {
                if (docs && docs.length > 0) {
                    res.send('User already Exist');
                }
                else {
                    obj.password = passwordHash.generate(obj.password);
                    var user = new usermodel(obj);
                    user.save((err) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            var token = jwt.sign({ email:obj.email }, 'secret', { expiresIn: '24h' });
                            res.json({ success: true, msg: 'successfully register', token: token, email:obj.email });
                        }

                    });
                }
            }
        });

    },

    login(obj, res) {
        usermodel.find({ email: obj.email }, (err, docs) => {
            if (err) {
                res.send(err);
            }
            else {
                if (docs && docs.length > 0) {
                    var result = passwordHash.verify(obj.password, docs[0].password);
                    if (result) {
                        var token = jwt.sign({ email: docs[0].email }, 'secret', { expiresIn: '24h' });
                        res.json({ success: true, msg: 'successfully login', token: token ,email:docs[0].email });
                    }
                    else {
                        res.send('Invalid username or Password');
                    }
                }
                else {
                    res.send('Invalid username or Password');
                }
            }
        });
    }
}

module.exports = userOperations