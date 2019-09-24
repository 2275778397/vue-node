<template>
    <div>
        <div class="main">
            <div class="main_header">
                <div class="main_header_left">
                    <h1>头像和姓名</h1>
                </div>
                <div class="main_header_right">
                    <button @click="mdlogout=true">退出</button>
                </div>
            </div>
            <div class="main_context">
                <ul class="context_ul">
                    <li class="active">
                        <a href="javascript:;"> <i></i>用户管理</a>
                        <div class="li_box">
                            <ul class="box_ul ul_1">
                                <li>用户ID</li>
                                <li>用户名</li>
                                <li>用户密码</li>
                                <li>操作</li>
                            </ul>
                            </br>
                            <ul class="box_ul ul_1" v-for="item in user">
                                <li>{{item.userId}}</li>
                                <li>{{item.userName}}</li>
                                <li>{{item.userPwd}}</li>
                                <li><a href="javascript:;" @click="userBd(item.userId)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="userDel(item.userId)"><i></i></a></li>
                                </br>
                            </ul>
                            <button @click="mdaddUser=true">添加用户</button>
                        </div>
                        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdUser}">
                            <div class="md-modal-inner">
                                <div class="md-top">
                                    <div class="md-title">修改数据</div>
                                    <button class="md-close" @click=" mdUser=false">Close</button>
                                </div>
                                <div class="md-content">
                                    <div class="confirm-tips">
                                        <ul class="xg">
                                            <li class="regi_form_input noMargin">
                                                <input type="type" tabindex="2" name="userId" v-model="userId" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的用户Id">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="type" tabindex="2" name="userName" v-model="userName" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的用户名称">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="password" tabindex="2" name="userPwd" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的用户密码">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="login-wrap">
                                        <a href="javascript:;" class="btn-login" @click="userXg">确认</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdaddUser}">
                            <div class="md-modal-inner">
                                <div class="md-top">
                                    <div class="md-title">添加用户</div>
                                    <button class="md-close" @click=" mdaddUser=false">Close</button>
                                </div>
                                <div class="md-content">
                                    <div class="confirm-tips">
                                        <ul class="xg">
                                            <li class="regi_form_input noMargin">
                                                <input type="type" tabindex="2" name="userId" v-model="userId1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入用户Id">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="type" tabindex="2" name="userName" v-model="userName1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入用户名称">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="password" tabindex="2" name="userPwd" v-model="userPwd1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入用户密码">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="login-wrap">
                                        <a href="javascript:;" class="btn-login" @click="addUser">确认</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <modal v-bind:mdShow="mdUserD" v-on:close="closeModal">
                            <p slot="message">
                                <svg class="icon-status-ok">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                                </svg>
                                <span>确定删除该用户数据</span>
                            </p>
                            <div slot="btnGroup">
                                <a id="cx" class="btn btn--m" href="javascript:;" @click="userDelte()">确定</a>
                                <a class="btn btn--m" href="javascript:;" @click="quxiao"> 取消
                              </a>
                            </div>
                        </modal>
                    </li>
                    <li><a href="javascript:;"><i></i>购物车管理</a>
                        <div class="li_box">
                            <input type="type" tabindex="2" name="userid" v-model="userid" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入需要查看的用户Id" @keyup.enter="getCartList">
                            <ul class="box_ul ul_3">
                                <li>商品Id</li>
                                <li>商品名称</li>
                                <li>商品价格</li>
                                <li>商品图片</li>
                                <li>商品数量</li>
                                <li>操作</li>
                            </ul>
                            </br>
                            <ul class="box_ul ul_3" v-for="item in cartList">
                                <li>{{item.productId}}</li>
                                <li>{{item.productName}}</li>
                                <li>{{item.productPrice}}</li>
                                <li><img v-bind:src="'/static/'+item.productImg" alt=""></li>
                                <li>{{item.productNum}}</li>
                                <li><a href="javascript:;" @click="biandong(item.productId)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="del(item.productId)"><i></i></a></li>
                                </br>
                            </ul>
                        </div>
                    </li>
                    <li><a href="javascript:;"><i></i>订单管理</a>
                        <div class="li_box">
                            <input type="type" tabindex="2" name="userid" v-model="userid" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入需要查看的用户Id" @keyup.enter="getCartList">
                            <ul class="box_ul ul_3">
                                <li>订单编号</li>
                                <li>订单号</li>
                                <li>订单地址</li>
                                <li>购物商品</li>
                                <li>生成时间</li>
                                <li>操作</li>
                            </ul>
                            </br>
                            <ul class="box_ul ul_3" v-for="item in orderList">
                                <li>{{item.orderId}}</li>
                                <li>{{item.orderTotal}}</li>
                                <li>{{item.addressInfo.addressId}}</li>
                                <li>{{item.goodsList}}</li>
                                <li>{{item.creatData}}</li>
                                <li><a href="javascript:;" @click="biandong(item.productId)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="userDelte"><i></i></a></li>
                                </br>
                            </ul>
                        </div>
                    </li>
                    <li><a href="javascript:;"><i></i>地址管理</a>
                        <div class="li_box">
                            <input type="type" tabindex="2" name="userid" v-model="userid" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入需要查看的用户Id" @keyup.enter="getCartList">
                            <ul class="box_ul ul_3">
                                <li>地址ID</li>
                                <li>用户名称</li>
                                <li>地址</li>
                                <li>地址门牌</li>
                                <li>电话号码</li>
                                <li>操作</li>
                            </ul>
                            </br>
                            <ul class="box_ul ul_3" v-for="item in addressList">
                                <li>{{item.addressId}}</li>
                                <li>{{item.userName}}</li>
                                <li>{{item.streetName}}</li>
                                <li>{{item.postCode}}</li>
                                <li>{{item.tel}}</li>
                                <li><a href="javascript:;" @click="biandong(item.productId)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="userDelte"><i></i></a></li>
                                </br>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="javascript:;"><i></i>商品管理</a>
                        <div class="li_box">
                            <ul class="box_ul ul_2">
                                <li>商品Id</li>
                                <li>商品名称</li>
                                <li>商品价格</li>
                                <li>商品图片</li>
                                <li>操作</li>
                            </ul>
                            </br>
                            <ul class="box_ul sp ul_2" v-for="(item,index) in goodsList">
                                <li>{{item.productId}}</li>
                                <li>{{item.productName}}</li>
                                <li>{{item.productPrice}}</li>
                                <li><img v-bind:src="'/static/'+item.productImg" alt=""></li>
                                <li><a href="javascript:;" @click="biandong(item.productId)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="del(item.productId)"><i></i></a></li>
                                </br>
                            </ul>
                            <button @click="mdaddshop=true">添加商品</button>
                            <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdaddshop}">
                                <div class="md-modal-inner">
                                    <div class="md-top">
                                        <div class="md-title">添加商品</div>
                                        <button class="md-close" @click="mdaddshop=false">Close</button>
                                    </div>
                                    <div class="md-content">
                                        <div class="confirm-tips">
                                            <ul class="xg">
                                                <li class="regi_form_input noMargin">
                                                    <input type="type" tabindex="2" name="Name" v-model="shopId" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入添加的商品Id">
                                                </li>
                                                <li class="regi_form_input noMargin">
                                                    <input type="type" tabindex="2" name="Name1" v-model="Name1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入添加的商品名称">
                                                </li>
                                                <li class="regi_form_input noMargin">
                                                    <input type="text" tabindex="2" name="Price1" v-model="Price1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入添加的商品价格">
                                                </li>
                                                <li class="regi_form_input noMargin">
                                                    <input type="text" tabindex="2" name="Img1" v-model="Img1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入添加的商品图片格式(1.jpg)">
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="login-wrap">
                                            <a href="javascript:;" class="btn-login" @click="addShop">确认</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': mdSP}">
                            <div class="md-modal-inner">
                                <div class="md-top">
                                    <div class="md-title">修改数据</div>
                                    <button class="md-close" @click=" mdSP=false">Close</button>
                                </div>
                                <div class="md-content">
                                    <div class="confirm-tips">
                                        <ul class="xg">
                                            <li class="regi_form_input noMargin">
                                                <input type="type" tabindex="2" name="Name" v-model="Name" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的商品名称">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="text" tabindex="2" name="Price" v-model="Price" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的商品价格">
                                            </li>
                                            <li class="regi_form_input noMargin">
                                                <input type="text" tabindex="2" name="Img" v-model="Img" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入修改的商品图片格式(1.jpg)">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="login-wrap">
                                        <a href="javascript:;" class="btn-login" @click="shop">确认</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <modal v-bind:mdShow="mddelte" v-on:close="closeModal">
                            <p slot="message">
                                <svg class="icon-status-ok">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                                </svg>
                                <span>确定删除该商品数据</span>
                            </p>
                            <div slot="btnGroup">
                                <a id="cx" class="btn btn--m" href="javascript:;" @click="deleteShop()">确定</a>
                                <a class="btn btn--m" href="javascript:;" @click="quxiao"> 取消
                                </a>
                            </div>
                        </modal>
                        <modal v-bind:mdShow="mdlogout" v-on:close="closeModal">
                            <p slot="message">
                                <svg class="icon-status-ok">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                                </svg>
                                <span>是否退出后台管理界面</span>
                            </p>
                            <div slot="btnGroup">
                                <a id="cx" class="btn btn--m" href="javascript:;" @click="logOut">确定</a>
                                <a class="btn btn--m" href="javascript:;" @click="quxiao"> 取消
                              </a>
                            </div>
                        </modal>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import '../assets/css/bootstrap.css'
import './../assets/css/houtai.css'
import axios from 'axios'
import Modal from './../view/Modal.vue'

export default {
    data() {
            return {
                goodsList: '',
                user: '',
                cartList: '',
                orderList: '',
                addressList: '',
                mdSP: false,
                mddelte: false,
                mdUser: false,
                mdUserD: false,
                mdaddUser: false,
                mdaddshop: false,
                mdlogout: false,
                Name: '',
                Img: '',
                Price: '',
                productId: '',
                productid: '',
                productd: '',
                productName: '',
                userId: '',
                userName: '',
                userPwd: '',
                userId1: '',
                userName1: '',
                userPwd1: '',
                shopId: '',
                Name1: '',
                Img1: '',
                Price1: '',
                userid: ''

            }
        },
        components: {
            Modal
        },
        mounted: function() {
            this.getGoodsList();
            this.getUser();
        },
        methods: {
            getGoodsList() {
                axios.get("/api/goods/spxs").then((result) => {
                    var res = result.data;
                    if (res.status == '0') {
                        this.goodsList = res.result.list;
                    } else {
                        this.goodsList = "";
                        this.mdSou = true;
                    }
                })
            },
            closeModal() {
                this.mdSP = false;
            },
            del(productId) {
                this.productId = productId;
                this.mddelte = true;
            },
            quxiao() {
                this.mddelte = false;
                this.mdUserD = false;
                this.mdlogout = false;
            },
            biandong(productId) {
                this.productId = productId;
                this.mdSP = true;
            },
            shop() {
                axios.post("/api/goods/xiugai", {
                    productd: this.productId,
                    Name: this.Name,
                    Price: this.Price,
                    Img: this.Img
                }).then((result) => {
                    console.log(Name);
                    var res = result.data;
                    if (res.status == '0') {
                        console.log("chenggong");

                    } else {
                        this.goodsList = "";
                    }
                });
                this.mdSP = false;
                this.getGoodsList();
            },
            userBd(userId) {
                this.userId = userId;
                this.mdUser = true;
            },
            userDel(userId) {
                this.userId = userId;
                this.mdUserD = true;
            },
            deleteShop() {
                axios.post("/api/goods/shopDel", {
                    productId: this.productId
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {

                    } else {
                        this.goodsList = "";
                    }
                });
                this.getGoodsList();
                this.mddelte = false;
            },
            addShop() {
                axios.post("/api/goods/addShop", {
                    shopId: this.shopId,
                    Name1: this.Name1,
                    Img1: this.Img1,
                    Price1: this.Price1
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {

                    } else {
                        this.goodsList = "";
                    }
                });
                this.getGoodsList();
                this.mdaddshop = false;
            },
            //获取数据库用户数据
            getUser() {
                axios.get("/api/users/getuser").then((result) => {
                    var res = result.data;
                    if (res.status == '0') {
                        this.user = res.result.list;
                        this.cartList = res.result.cartList;
                    } else {
                        this.goodsList = "";
                    }
                })
            },
            //修改用户数据
            userXg() {
                axios.post("/api/users/userxg", {
                    userId: this.userId,
                    userName: this.userName,
                    userPwd: this.userPwd
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {
                        console.log("chenggong");
                        console.log(userPwd)
                    } else {
                        this.goodsList = "";
                    }
                });
                this.mdUser = false;
                this.getUser();
            },
            userDelte() {
                axios.post("/api/users/userDel", {
                    userId: this.userId
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {

                        this.mdUserD = false;
                        this.getUser();
                    } else {}
                });

            },
            addUser() {
                axios.post("/api/users/addUser", {
                    userId1: this.userId1,
                    userName1: this.userName1,
                    userPwd1: this.userPwd1
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {

                    } else {

                    }
                });
                this.mdaddUser = false;
                this.getUser();
            },
            logOut() {
                axios.post('api/users/logout').then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.$router.push('/admin');
                    }
                })
            },
            getCartList() {
                var param = {
                    userid: this.userid
                }
                axios.get("/api/users/userCart", {
                    params: param
                }).then((result) => {
                    var res = result.data;
                    if (res.status == '0') {
                        this.cartList = res.result.cartList;
                        this.addressList = res.result.addressList;
                        this.orderList = res.result.orderList;
                    } else {

                        this.cartList = "";
                    }
                })
            }
        }
}
</script>
<style>
#app {
    margin-top: 10px;
}
</style>
