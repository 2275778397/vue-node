var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "productPrice": String,
        "productImage": String,
        "checked": String,
        "productNum": Number
    }],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
    }]
}); //参数

module.exports = mongoose.model("User", userSchema); //第三个参数可以为数据库的名字
