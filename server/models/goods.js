var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var produtSchema = new Schema({
    "productId": String,
    "productName": String,
    "productIntd": String,
    "productPrice": Number,
    "productImg": String,
    "fenlei": String,
    'productNum': Number,
    "checked": String,
    "Img": [{
        "productImag": String
    }]
});
module.exports = mongoose.model('Good', produtSchema);
