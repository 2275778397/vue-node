var express = require('express');
var router = express.Router();
require('./../util/util.js');
var User = require('./../models/users.js');
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//登录功能
router.post("/login", (req, res, next) => {
    var param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    User.findOne(param, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc) {
                res.cookie('userId', doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.cookie('userName', doc.userName, {
                        path: '/',
                        maxAge: 1000 * 60 * 60
                    })
                    // req.session.user = doc;
                res.json({
                    status: '0',
                    msg: '登录成功',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    })
});
//注册功能
router.post("/regist", function(req, res, nex) {
    var userName1 = req.body.userName1,
        userId = req.body.userId,
        userPwd1 = req.body.userPwd1;
    user = userId + userPwd1;
    console.log(user)
        /*User.findOne({ userName: userName1 }, function(err, doc) {
            if (err) {
                console.log("已存在该账户")
            } else {
                var obj = {
                    userName: userName1,
                    userPwd: userPwd1
                };
                doc.push(obj);
                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: err1.message
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
        });*/
    User.find({ userName: userName1 }, (err, data) => {
        if (err) {
            res.json({ 'status': 1002, 'message': '查询失败', 'data': err });
        } else {
            console.log('查询成功' + data)
                //data为返回的数据库中的有相同name的集合
            if (data.length > 0) {
                res.json({ 'status': 1001, 'message': '该用户名已经注册！' });
            } else {
                let newName = new User({
                    userId: userId,
                    userName: userName1,
                    userPwd: userPwd1
                });
                //newName.save 往数据库中插入数据
                newName.save((err, data) => {
                    if (err) {
                        res.json({ 'status': 1002, 'message': '注册失败！', 'data': err });
                    } else {
                        res.json({
                            status: 1000,
                            message: '注册成功!',
                            result: data
                        });
                    }
                });
            }
        }
    })
});
//登出接口 req:请求 res:服务端的响应 next：什么都不做处理，继续往后面走
router.post("/logout", function(req, res, next) {
    res.cookie('userId', "", {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''
    })
});
//检查是否登录成功
router.get("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '用户成功登录',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        })
    }
});
//修改密码
router.post("/replea", function(req, res, next) {
    var userId = req.cookies.userId,
        oldPwd = req.body.oldPwd,
        newPwd = req.body.newPwd;
    User.findOne({ userId: userId }, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc.userPwd == oldPwd) {
                User.update({ "userId": userId }, {
                    "userPwd": newPwd
                }, function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err1.message,
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: "成功修改密码",
                            result: doc1.userPwd
                        })
                    }
                })
            } else {
                res.json({
                    status: '1003',
                    msg: '原密码错误，请重新输入',
                    result: ''
                })
            }
        }
    })


});

//查询当前用户的购物车数据
router.get("/cartList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                doc.cartList;
                res.json({
                    status: '0',
                    msg: '已查到',
                    result: doc.cartList
                });
            }
        }
    });
});
//删除购物车
router.post('/cartDel', (req, res, next) => {
    var userId = req.cookies.userId,
        productId = req.body.productId;
    User.update({ userId: userId }, { $pull: { 'cartList': { 'productId': productId } } },
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
                    msg: '删除成功',
                    result: 'suc'
                })
            }
        })

});

//修改购物车商品数据
router.post("/cartEdit", function(req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId,
        productNum = req.body.productNum,
        checked = req.body.checked;
    User.update({ "userId": userId, "cartList.productId": productId }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
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
                msg: '修改数据成功',
                result: 'suc'
            })
        }
    })

});
//购物车的修改
router.post("/editCheckAll", function(req, res, next) {
    var userId = req.cookies.userId,
        checkAll = req.body.checkAll ? '1' : '0';
    User.findOne({ userId: userId }, function(err, user) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            if (user) {
                user.cartList.forEach((item) => {
                    item.checked = checkAll;
                })
                user.save(function(err1, doc) {
                    if (err1) {
                        res.json({
                            status: '1',
                            msg: err1,
                            message,
                            result: ''
                        });
                    } else {
                        res.json({
                            status: '0',
                            msg: '成功',
                            result: 'suc'
                        });
                    }
                })
            }
        }
    });
});
//查询用户地址接口
router.get("/addressList", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '接口已查到',
                result: doc.addressList

            })
        }
    })
});
//设置默认地址
router.post('/setDefault', (req, res, next) => {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if (!addressId) {
        res.json({
            status: '1003',
            msg: 'addressId is null',
            result: ''
        })
    } else {
        User.findOne({ userId: userId }, (err, doc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                var addressList = doc.addressList;
                addressList.forEach((item) => {
                    if (item.addressId == addressId) {
                        item.isDefault = true
                    } else {
                        item.isDefault = false
                    }
                })

                doc.save((err1, doc1) => {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: ''
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '默认地址设置成功',
                            result: 'suc'
                        })
                    }
                })
            }
        })
    }
});
//添加地址
router.post('/addAddress', function(req, res, next) {
    var userId = req.cookies.userId,
        addressid = req.body.addressid,
        addressName = req.body.addressName,
        address = req.body.address,
        post = req.body.addressPost,
        addressTel = req.body.addressTel;
    var Flag = true;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ''
            })
        } else {
            doc.addressList.forEach((item) => {
                if (item.addressId == addressid) {
                    res.json({
                        status: "1001",
                        msg: '该地址已经存在',
                        result: ''
                    });
                    Flag = false;
                }
            });
            if (Flag) {
                /* let newName = new doc.addressList({
                     addressId: addressid,
                     userName: addressName,
                     tel: addressTel
                 });*/
                var obj = {
                    addressId: addressid,
                    userName: addressName,
                    streetName: address,
                    postCode: post,
                    tel: addressTel
                };
                doc.addressList.push(obj);
                doc.save(function(err2, doc2) {
                    if (err2) {
                        res.json({
                            status: "1",
                            msg: '插入失败'
                        })
                    } else {
                        res.json({
                            status: '0',
                            msg: '添加地址成功',
                            result: 'suc'
                        })
                    }
                })
            }

        }

    })
});
//商品详情中的购物地址
router.get("/addressShow", function(req, res, next) {
    var userId = req.cookies.userId;
    var addressList = '';
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            doc.addressList.forEach((item) => {
                if (item.isDefault) {
                    res.json({
                        status: "0",
                        msg: '',
                        result: item
                    });
                }
            });
        }
    })
});
//删除地址的接口
router.post("/delAddress", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    if (!addressId) {
        res.json({
            status: '1003',
            msg: 'addressId is null',
            result: ''
        })
    } else {
        User.update({ userId: userId }, {
            $pull: { 'addressList': { addressId: addressId } }
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
                    msg: '删除成功',
                    result: 'delete suc'
                })
            }
        })
    }
});
//生成订单
router.post("/payMent", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var address = '',
                goodsList = []
                //获取当前用户的地址信息
            doc.addressList.forEach((item) => {
                if (addressId == item.addressId) {
                    address = item;
                }
            });
            doc.cartList.filter((item) => {
                if (item.checked == '1') {
                    goodsList.push(item);
                }
            });
            var platform = '622';
            var r1 = Math.floor(Math.random() * 10);
            var r2 = Math.floor(Math.random() * 10);
            var sysDate = new Date().Format('yyyyMMddhhmmss');
            var creatDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            var orderId = platform + r1 + sysDate + r2;
            var order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                creatData: creatDate
            };
            doc.orderList.push(order);
            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err1.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '0',
                        msg: '生成订单成功',
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                    });
                }
            })

        }
    })
});


//订单呈现
router.get("/orderDetail", function(req, res, next) {
    var userId = req.cookies.userId,
        orderId = req.param("orderId");
    User.findOne({ userId: userId }, function(err, userInfo) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var orderList = userInfo.orderList;
            if (orderList.length > 0) {
                var orderTotal = 0;
                orderList.forEach((item) => {
                    if (item.orderId == orderId) {
                        orderTotal = item.orderTotal;
                    }
                });
                res.json({
                    status: '0',
                    msg: '订单查询成功',
                    result: {
                        orderId: orderId,
                        orderTotal: orderTotal
                    }
                })
            } else {
                res.json({
                    status: '10001',
                    msg: '无此订单',
                    result: ''
                })
            }
        }
    })

});
//订单中的用户呈现
router.get("/userShow", function(req, res, next) {
    var userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, userInfo) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var addressList = userInfo.addressList;
            if (addressList.length > 0) {
                addressList.forEach((item) => {
                    if (item.isDefault) {
                        res.json({
                            status: '0',
                            msg: '用户查询成功',
                            result: item
                        })
                    }
                });

            } else {
                res.json({
                    status: '10004',
                    msg: '无此用户',
                    result: ''
                })
            }

        }
    })

});
//用户删除订单
router.post('/deleteOrder', (req, res, next) => {
    var userId = req.cookies.userId,
        orderId = req.body.orderId;
    User.update({ userId: userId }, { $pull: { 'orderList': { 'orderId': orderId } } },
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
                    msg: '订单删除成功',
                    result: 'suc'
                })
            }
        })

});

//查询购物车中的购物数量
router.get("/getCartCount", function(req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {
                var cartList = doc.cartList;
                let cartCount = 0;
                cartList.map(function(item) {
                    if (item.checked == '1') {
                        cartCount += parseInt(item.productNum);
                    }

                });
                res.json({
                    status: '0',
                    msg: '数据查询成功',
                    result: cartCount
                })
            }
        })
    }
});

//后台
/*router.post("/htlogin", (req, res, next) => {
    var params = {
        userName: req.body.userName1,
        userPwd: req.body.userPwd1
    }
    User.findOne(params, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            if (doc) {
                res.json({
                    status: '0',
                    msg: '登录成功',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    })
});*/
//后台管理获取user数据
router.get('/getuser', function(req, res, next) {

    User.find({}, function(err, doc) {
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
                        list: doc,
                    }
                });
            } else {
                res.json({
                    status: '1001',
                    msg: '并无此信息'
                })
            }
        }

    });
});
//后台用户修改
router.post("/userxg", function(req, res, nex) {
    var userId = req.body.userId,
        userName = req.body.userName,
        userPwd = req.body.userPwd;
    User.update({ userId: userId }, {
        "userName": userName,
        "userPwd": userPwd
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
//后台用户删除
router.post('/userDel', (req, res, next) => {
    var userId = req.body.userId;
    User.remove({ userId: userId },
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
//后台添加用户
router.post("/addUser", function(req, res, nex) {
    var userName1 = req.body.userName1,
        userId = req.body.userId1,
        userPwd1 = req.body.userPwd1;
    User.find({ userName: userName1 }, (err, data) => {
        if (err) {
            res.send({ 'status': 1002, 'message': '查询失败', 'data': err });
        } else {
            console.log('查询成功' + data)
                //data为返回的数据库中的有相同name的集合
            if (data.length > 0) {
                res.send({ 'status': 1001, 'message': '该用户名已经注册！' });
            } else {
                let newName = new User({
                    userId: userId,
                    userName: userName1,
                    userPwd: userPwd1
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
//后台获取用户购物车
//查询当前用户的购物车数据
router.get("/userCart", function(req, res, next) {
    var userId = req.param("userid");
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                var cartList, orderList, addressList;
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        cartList: doc.cartList,
                        orderList: doc.orderList,
                        addressList: doc.addressList
                    }
                });
            }
        }
    });
});
//获取密码
router.get("/addPswd", function(req, res, next) {
    var userId = req.cookies.userId,
        userPwd = req.param("miMa") + req.param("miMa1") + req.param("miMa2") + req.param("miMa3") + req.param("miMa4") + req.param("miMa5")
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            if (doc) {
                if (doc.userPwd == userPwd) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: ''
                    });
                } else {
                    res.json({
                        status: '1',
                        msg: '失败',
                        result: ''
                    });
                }

            }
        }
    });
});
//个人中心
router.get("/people", function(req, res, next) {
    if (req.cookies && req.cookies.userId) {
        var userId = req.cookies.userId;
        User.findOne({ userId: userId }, function(err, doc) {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: ''
                })
            } else {

                res.json({
                    status: '0',
                    msg: '数据查询成功',
                    result: {
                        count: doc.length,
                        list: doc,
                    }
                })
            }
        })
    }
});
module.exports = router;
