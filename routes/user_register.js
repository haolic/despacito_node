let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/despacito';

router.post('/', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        let dbo = db.db('despacito');
        // let findResult = dbo.collection('user_main').find({ userName: req.body.userNameReg });
        console.log(11, dbo.collection('user_main'));
        if (false) {
            let insertData = {
                userName: req.body.userNameReg,
                password: req.body.passwordReg,
            }
            dbo.collection('user_main').insertOne(insertData, (err, _res) => {
                if (err) throw err;
                let successData = { code: 1, msg: "注册成功" };
                res.json(successData);
                console.log('文档插入成功');
                db.close();
            });
        } else {
            let successData = { code: 0, msg: "用户名已存在" };
            res.json(successData);
        }
    });
});

module.exports = router;