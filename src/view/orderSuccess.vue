<template>
    <div>
        <header-vue></header-vue>
        <nav-vue>
            <span>顾客订单</span>
        </nav-vue>
        <div class="container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>订单</span></h2>
            </div>
            <!-- 进度条 -->
            <!-- <div class="check-step">
                <ul>
                    <li class="cur"><span>订单</span>地址</li>
                    <li class="cur"><span>查看</span> 订单</li>
                    <li class="cur"><span>生成</span> 订单</li>
                    <li><span>订单</span> 确认</li>
                    <li><span>订单</span> 确认</li>
                    <li><span>订单</span> 确认</li>
                </ul>
            </div> -->
            <div class="order-create">
                <!-- <div class="order-create-pic">
                    <img src="/static/ok-2.png" alt="">
                </div> -->
                <div class="order-create-main">
                    <h3>尊敬的{{userName}}，您好 <br>您的订单已经成功生成!</h3>
                    <p>
                        <span>订单号：{{orderId}}</span>
                        <span>订单金额：{{orderTotal| currency('$')}}</span>
                    </p>
                    <div class="order-create-btn-wrap">
                        <div class="btn-l-wrap">
                            <router-link to="/cart" class="btn btn--m">返回购物车</router-link>
                        </div>
                        <div class="btn-r-wrap">
                            <a href="#" class="btn btn--m" @click="play">结账</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer-vue></footer-vue>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show': playMode}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">请输入支付密码：</div>
                    <button class="md-close" @click="playMode=false">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <h4>海尔商品用户</h4>
                        <h5>{{orderTotal| currency('$')}}</h5>
                        <input type="password" v-model="miMa" style="width:50px;border:1px solid #c0c0c0">
                        <input type="password" v-model="miMa1" style="width:50px;border:1px solid #c0c0c0">
                        <input type="password" v-model="miMa2" style="width:50px;border:1px solid #c0c0c0">
                        <input type="password" v-model="miMa3" style="width:50px;border:1px solid #c0c0c0">
                        <input type="password" v-model="miMa4" style="width:50px;border:1px solid #c0c0c0">
                        <input type="password" v-model="miMa5" style="width:50px;border:1px solid #c0c0c0" @keyup.enter="addP">
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="addP">确认</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="playMode" @click="playMod=false"></div>
    </div>
</template>
<script>
import HeaderVue from './../view/Header.vue'
import NavVue from './../view/Nav.vue'
import FooterVue from './../view/Footer.vue'
import Modal from './../view/Modal.vue'
import axios from 'axios'
import {
    currency
} from './../util/currency'
/*
http://localhost:8080/?a=123#/ordersuccess:#后面为哈希值
 地址:location.pathname:8080之后"/"、请求参数:location.search:?a=123、哈希:location.hash:#之后*/
export default {
    data() {
            return {
                orderId: '',
                orderTotal: 0,
                userName: '',
                playMode: false,
                miMa: '',
                miMa1: '',
                miMa2: '',
                miMa3: '',
                miMa4: '',
                miMa5: '',

            }
        },
        filters: {
            currency: currency
        },
        components: {
            HeaderVue: HeaderVue,
            NavVue,
            FooterVue,
            Modal
        },
        mounted() {
            this.init();
            this.userShow();
            this.keydown();
        },
        methods: {
            init() {
                var orderId = this.$route.query.orderId;
                if (!orderId) {
                    return;
                }
                axios.get("/api/users/orderDetail", {
                    params: {
                        orderId: orderId
                    }
                }).then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.orderId = res.result.orderId;
                        this.orderTotal = res.result.orderTotal;
                    }
                })
            },
            play() {
                this.playMode = true;
                var $input = $('.confirm-tips>input');
                $input.each(function() {
                    $(this).val('')
                });
                $input[0].focus();
            },
            addP() {
                var $input = $('.confirm-tips>input');
                $input[0].focus();
                var param = {
                    miMa: this.miMa,
                    miMa1: this.miMa1,
                    miMa2: this.miMa2,
                    miMa3: this.miMa3,
                    miMa4: this.miMa4,
                    miMa5: this.miMa5
                };
                axios.get("/api/users/addPswd", {
                    params: param
                }).then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.playMode = false;
                        alert('已成功下单');
                    } else {
                        if (confirm('密码错误，请重新输入密码')) {

                            $input.each(function() {
                                $(this).val('')
                            });
                            $input[0].focus();
                        }
                        //alert('密码错误，请重新输入密码');

                    }
                })
            },
            userShow() {
                axios.get("/api/users/userShow").then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.userName = res.result.userName;
                    }
                })
            },
            keydown() {
                var $input = $('.confirm-tips>input');
                var nextIndex = '';
                $input.bind("keydown", function(event) {
                    var n = $input.length;
                    var lenght = $input.val().length;
                    if (lenght === 1) {
                        nextIndex = $input.index(this) + 1;
                        if (nextIndex < n) {
                            $input[nextIndex].focus();
                        } else {
                            $input[nextIndex - 1].blur();
                        }

                    }
                });
            }
        }

}
</script>
<style>
</style>
