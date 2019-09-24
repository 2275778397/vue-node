//用户模型
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "name": String,
    "sex": String,
    "email": String,
    "province": String,
    "city": String,
    "tel": String,
    "post": String,
    "attrib": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "productPrice": String,
        "productImg": String,
        "checked": String,
        "productNum": Number
    }],
    "addressList": [{
        "addressId": String,
        "addressName": String,
        "addressTel": Number,
        "streetName": String,
        "postCode": Number,
        "isDefault": Boolean
    }]
}); //参数

module.exports = mongoose.model("User", userSchema); //第三个参数可以为数据库的名字
