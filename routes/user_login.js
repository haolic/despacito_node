let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = require('./dburl');

router.post('/', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (!err) {
            console.log('数据库 despacito 连接成功');
            let collection = db.collection('user_main');
            collection.find({
                userName: req.body.userName,
                password: req.body.password,
            }).toArray((err, doc) => {
                console.log("查询结果", doc);
                if (err) throw err;
                if (doc.length) {
                    res.json({ code: 1, msg: "登录成功" });
                    db.close();
                } else {
                    res.json({ code: 0, msg: "用户名或密码错误" });
                    db.close();
                }
            })
        } else {
            throw err;
        }
    })
});

module.exports = router;