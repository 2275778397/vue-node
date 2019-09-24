<template>
    <div>
        <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-arrow-short" viewBox="0 0 25 32">
                    <title>arrow-short</title>
                    <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
                </symbol>
                <symbol id="icon-status-ok" viewBox="0 0 32 32">
                    <title>status-ok</title>
                    <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
                    <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
                </symbol>
                <symbol id="icon-cart" viewBox="0 0 38 32">
                    <title>cart</title>
                    <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
                    <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
                    <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
                    <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
                </symbol>
            </defs>
        </svg>
        <div class="header">
            <header>
                <div class="header_middle">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <div class="logo">
                                    <a href="/"><img src="../assets/login1.png" height="100%" width="100%" alt="exporso logo"></a>
                                </div>
                            </div>
                            <div class="header_main col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <input type="text" v-model="searchKey" placeholder="请输入以下关键词">
                                <router-link class="ss" v-bind:to="{path:'/HelloWorld',query:{'searchKey':searchKey}}" href="#">搜索</router-link>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <div class="mini_cart_box_wrapper text-right">
                                    <a href="javascript:void(0)" v-text="nickName" v-if="nickName" @click="jump"></a>
                                    <a href="javascript:void(0)" class="navbar-link" @click="openM" v-if="!nickName">注册</a>
                                    <a href="javascript:void(0)" class="navbar-link" @click="openModal" v-if="!nickName">登录</a>
                                    <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-else v-bind:class="{'cur':nickName==true}">退出</a>
                                    <a href="/#/cart">
                                        <!-- <img src="../assets/images/icon/cart_1.png" height="19" width="19" alt="Mini Cart Icon"> -->
                                        <i></i>
                                        <span class="cart_count" v-if="cartCount">{{cartCount}} </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <nav class="navbox">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/">首页</a>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/#/Induction">店铺介绍</a>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/#/HelloWorld">出售产品</a>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/#/cart">购物车</a>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/#/address">地址</a>
                    </div>
                    <div class="col-lg-2 col-md-2 col-xs-2">
                        <a href="/#/orderConfirm">订单</a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': loginModaFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">登录</div>
                    <button class="md-close" @click=" closeMoal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="login">登  录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': registModaFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">注册</div>
                    <button class="md-close" @click="closeMoal">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userId" class="regi_login_input regi_login_input_left" placeholder="UserId" data-type="loginname">
                            </li>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName1" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password" v-model="userPwd1" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="Regist">
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="Regist">注册</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="close" @click="closeMoal"></div>
    </div>
</template>
<script>
import './../assets/css/bootstrap.css'
import './../assets/css/haha.css'
import './../assets/imag/base.css'
import './../assets/css/jquery.js'
import './../assets/css/jquery-ui.js'

import axios from 'axios'
import {
    mapState
} from 'vuex'
export default {
    data() {
            return {
                userId: '',
                userName: '',
                userPwd: '',
                userName1: '',
                userPwd1: '',
                errorTip: false,
                loginModaFlag: false,
                registModaFlag: false,
                close: false,
                searchKey: '',
                key: '你好'
            }
        },
        computed: {
            ...mapState(['nickName', 'cartCount'])
        },
        mounted() {
            this.checkLogin();
        },
        methods: {    
            checkLogin() {
                axios.get("api/users/checkLogin").then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.$store.commit("updateUserInfo", res.result);
                        this.getCartCount();
                    }
                })
            },
            closeMoal() {
                this.close = false;
                this.loginModaFlag = false;
                this.registModaFlag = false;
            },
            openModal() {
                this.close = true;
                this.loginModaFlag = true;
            },
            openM() {
                this.close = true;
                this.registModaFlag = true;
            },
            login() { // 点击登录  
                if (!this.userName) {
                    this.errorTip = true;
                    alert('用户名不能为空')
                    return
                } 
                else if (!this.userPwd) {
                    this.errorTip = true;
                    alert('用户名不能为空')
                    return
                }               
                axios.post("api/users/login", {        
                    userName: this.userName,
                    userPwd: this.userPwd    
                }).then((response) => {            
                    let res = response.data;        
                    if (res.status == "0") {          
                        this.errorTip = false;
                        this.loginModaFlag = false; 
                        this.close = false;    
                        this.$store.commit("updateUserInfo", res.result.userName); 
                        this.getCartCount();   
                    } else {          
                        this.errorTip = true;        
                    }      
                })    
            },
            Regist() {
                if (!this.userName1 || !this.userPwd1 || !this.userId) {
                    this.errorTip = true;
                    alert("请不要留下空白！")
                    return
                } 
                axios.post("api/users/regist", { 
                    userId: this.userId,
                           
                    userName1: this.userName1,
                    userPwd1: this.userPwd1    
                }).then((response) => {           
                    let res = response.data;        
                    if (res.status == 1000) {          
                        this.close = false;
                        this.registModaFlag = false;      
                    } else {   
                        console.log("数据错误")              
                    }      
                })    

            },
            logOut() {
                axios.post('api/users/logout').then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.$store.commit("updateUserInfo", ''); 
                        this.$store.commit("initcartCount", 0);
                    }
                })
            },
            getCartCount() {
                axios.get("/api/users/getCartCount").then((response) => {
                    let res = response.data;
                    this.$store.commit("initcartCount", res.result);

                })
            },
            jump() {
                this.$router.push({
                    path: '/daima',
                    /*query: {
                        id: this.key
                    }*/
                })
            }

        }

}
</script>
<style scoped>
.header_main>input {
    width: 60%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #c0c0c0;
}

.header_main>.ss {
    display: inline-block;
    margin-left: -55px;
    margin-top: 1px;
    width: 50px;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #c0c0c0;
}

.header_main>.ss:hover {
    text-decoration: none;
}

.navbox {
    background-color: #4b4b4b;
}

.border_bottom {
    border-bottom: 2px solid red;
}
</style>
