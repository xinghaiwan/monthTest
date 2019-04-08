var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//查找接口
router.post('/api/allInfo', function(req, res, next) {
    mongodb.find('test', 'address', function(result) {
        if (result) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: 0, msg: 'error' });
        }
    });
});
//删除接口
router.post('/api/delInfo', function(req, res, next) {
    let { _id } = req.body;
    if (!_id) {
        res.send({ code: 2, msg: '参数不完整' });
    }
    mongodb.remove('test', 'address', { _id: _id }, function(result) {
        if (result) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: 0, msg: 'error' });
        }
    });
});
//添加接口
router.post('/api/addInfo', function(req, res, next) {
    let { name, phone, address } = req.body;
    if (!name || !phone || !address) {
        res.send({ code: 2, msg: '参数不完整' });
    }
    mongodb.insert('test', 'address', req.body, function(result) {
        if (result) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: 0, msg: 'error' });
        }
    });
});
//更新接口
router.post('/api/newInfo', function(req, res, next) {
    let { _id } = req.body;
    mongodb.update('test', 'address', [], function(result) {
        if (result) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: 0, msg: 'error' });
        }
    });
});
module.exports = router;