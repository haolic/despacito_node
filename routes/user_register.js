let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/despacito';

router.post('/', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (!err) {
            console.log('Connected successfully to despacito');
            let collection = db.collection('user_main');
            collection.find({
                userName: req.body.userNameReg
            }).toArray((err, doc) => {
                console.log("查询结果", doc);
                if (err) throw err;
                if (doc.length) {
                    res.json({ code: 0, msg: "用户名已存在" });
                    db.close();
                } else {
                    collection.insertOne(req.body, (err, result) => {
                        if (err) throw err;
                        res.json({
                            code: 1,
                            msg: '注册成功'
                        })
                        console.log("创建用户成功");
                        db.close();
                    })
                }
            })
        } else {
            throw err;
        }
    })
});

module.exports = router;