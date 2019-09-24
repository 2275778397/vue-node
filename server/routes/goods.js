var express = require('express');
var router = express.Router(); //获取路由
var mongoose = require('mongoose'); //获取mongoose
var Goods = require('../models/goods'); //获取模型
mongoose.connect('mongodb://127.0.0.1:27017/dumall', { useNewUrlParser: true });
mongoose.connection.on("connected", function() {
    console.log("已经成功连接到数据库dumall");
});
mongoose.connection.on("error", function() {
    console.log("未曾连接到数据库dumall");
});
mongoose.connection.on("disconnected", function() {
    console.log("数据库dumall连接已经中断");
});

//找到所有数据输出list:为了区分拦截
router.get('/list', function(req, res, next) {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = parseInt(req.param("sort"));
    let skip = (page - 1) * pageSize;
    let params = {};
    let priceLevel = req.param("priceLevel");
    //对priceLevel进行判断
    let priceGt = '',
        priceLte = '';
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 500;
                break;
            case '1':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '2':
                priceGt = 1000;
                priceLte = 2000;
                break;
            case '3':
                priceGt = 2000;
                priceLte = 3000;
                break;
            case '4':
                priceGt = 3000;
                priceLte = 4000;
                break;
        }
        params = {
            productPrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({ 'productPrice': sort });
    goodsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});
/*Goods.find({}, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});*/
//输出所有商品数据
router.get('/input', function(req, res, next) {
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = parseInt(req.param("sort"));
    let skip = (page - 1) * pageSize;
    let params = {};

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    console.log(goodsModel)
    goodsModel.sort({ 'productPrice': sort });
    goodsModel.exec(function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
});

router.post("/addCart", function(req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId;
    var User = require('../models/users.js');
    User.findOne({ userId: userId }, function(err, userDoc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message
            })
        } else {
            // console.log("userDoc:"+userDoc);
            if (userDoc) { //判断用户是否存在
                var goodsItem = '';
                userDoc.cartList.forEach(function(item) {
                    if (item.productId == productId) {
                        goodsItem = item;
                        item.productNum++; //如果id相同，则数量+1
                    }
                });
                if (goodsItem) {
                    userDoc.save(function(err2, doc2) {
                        if (err2) {
                            res.json({
                                status: "1",
                                msg: err2.message
                            })
                        } else {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'suc'
                            })
                        }
                    })
                } else {
                    Goods.findOne({ productId: productId }, function(err1, doc) {
                        if (err1) {
                            res.json({
                                status: "1",
                                msg: err1.message
                            })
                        } else {
                            if (doc) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);

                                userDoc.save(function(err2, doc2) {
                                    if (err2) {
                                        res.json({
                                            status: "1",
                                            msg: err2.message
                                        })
                                    } else {
                                        res.json({
                                            status: '0',
                                            msg: '',
                                            result: 'suc'
                                        })
                                    }
                                })
                            }
                        }
                    });
                }
            }
        }
    })
});

//关键字搜索商品
router.get('/souS', function(req, res, next) {
    let classiFication = req.param("classiFication");
    console.log(classiFication);
    Goods.find({ fenlei: classiFication }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc.length > 0) {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: doc.length,
                        list: doc
                    }
                })
            } else {
                res.json({
                    status: '1001',
                    msg: '商品中并无此信息'
                })
            }
        }

    });
});
//商品显示
/*router.get("/show", function(req, res, next) {
    var productId = req.param("productId");;
    Goods.findOne({ productId: productId }, function(err, userInfo) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '订单查询成功',
                result: {
                    orderId: orderId,
                    orderTotal: orderTotal
                }
            })
        }

    })

});*/
router.get('/show', function(req, res, next) {
    let productId = req.param("productId");
    Goods.findOne({ productId: productId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc,
                    Image: doc.Img
                }
            })

        }

    });
});
//后台
//后台商品显示
router.get('/spxs', function(req, res, next) {

    Goods.find({}, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc.length > 0) {
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        count: doc.length,
                        list: doc
                    }
                })
            } else {
                res.json({
                    status: '1001',
                    msg: '商品中并无此信息'
                })
            }
        }

    });
});
//后台商品修改
router.post("/xiugai", function(req, res, nex) {
    var productId = req.body.productd,
        productName = req.body.Name,
        productPrice = req.body.Price,
        productImg = req.body.Img;
    Goods.update({ "productId": productId, }, {
        "productName": productName,
        "productPrice": productPrice,
        "productImg": productImg
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: 'suc'
            });
        }
    })

});
//后台商品删除
router.post('/shopDel', (req, res, next) => {
    var productId = req.body.productId;
    Goods.remove({ productId: productId },
        (err, doc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                res.json({
                    status: '0',
                    msg: '',
                    result: 'suc'
                })
            }
        })

});
//后台添加商品
router.post("/addShop", function(req, res, nex) {
    var productId = req.body.shopId,
        productName = req.body.Name1,
        productPrice = req.body.Price1,
        productImg = req.body.Img1;
    console.log(productImg)
    Goods.find({ productId: productId }, (err, data) => {
        if (err) {
            res.send({ 'status': 1002, 'message': '查询失败', 'data': err });
        } else {
            console.log('查询成功' + data)
                //data为返回的数据库中的有相同name的集合
            if (data.length > 0) {
                res.send({ 'status': 1001, 'message': '该用户名已经注册！' });
            } else {
                let newName = new Goods({
                    productId: productId,
                    productName: productName,
                    productPrice: productPrice,
                    productImg: productImg
                });
                //newName.save 往数据库中插入数据
                newName.save((err, data) => {
                    if (err) {
                        res.send({ 'status': 1002, 'message': '注册失败！', 'data': err });
                    } else {
                        res.send({ 'status': 1000, 'message': '注册成功!' });
                    }
                });
            }
        }
    })

});
module.exports = router;
