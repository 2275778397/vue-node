<template>
    <div>
        <header-vue></header-vue>
        <nav-vue>
            <span>全部商品</span>
        </nav-vue>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">价格排序:</span>
                    <a href="javascript:void(0)" class="default cur" @click="sortGoods">默认</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">升序 <svg class="icon icon-arrow-short" :class="{'sort-up':sortFlag}">
              <use xmlns:link="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
            </svg></a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filter}">
                        <dl class="filter-price">
                            <dt>价格过滤:</dt>
                            <dd><a href="javascript:void(0)" @click="priceCheck=all" v-bind:class="{'cur':priceCheck=='all'}">All</a></dd>
                            <dd v-for="(item,index) in productPrice">
                                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceCheck==index}">{{item.start}} - {{item.end}} </a>
                            </dd>
                        </dl>
                    </div>
                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list">
                            <ul>
                                <li v-for="(item,index) in goodsList">
                                    <div class="pic">
                                        <a href="#">
                                            <img v-lazy="'/static/'+item.productImg" alt=""></a>
                                        <router-link v-bind:to="{path:'productShow',query:{'productId':item.productId}}" href="#" id="router">查
                                            <br/>看
                                            <br/>详
                                            <br/>情</router-link>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{item.productName}}</div>
                                        <div class="price">{{item.productPrice| currency('$')}}</div>
                                        <div class="btn-area" id="shop">
                                            <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                                <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closeFilterPop">
        </div>
        <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
            <p slot="message">
                请先登录，否则无法加入到购物车中
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
            </div>
        </modal>
        <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
            <p slot="message">
                <svg class="icon-status-ok">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                </svg>
                <span>加入购物车成功</span>
            </p>
            <div slot="btnGroup">
                <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
                <router-link class="btn btn--m" href="javascript:;" to="/cart">
                    查看购物车
                </router-link>
            </div>
        </modal>
        <footer-vue></footer-vue>
    </div>
</template>
<script>
import './../assets/css/base.css'
import './../assets/css/checkout.css'
import './../assets/css/login.css'
import './../assets/css/product.css'
import HeaderVue from './../view/Header.vue'
import NavVue from './../view/Nav.vue'
import FooterVue from './../view/Footer.vue'
import Modal from './../view/Modal.vue'
import axios from 'axios'
import {
    currency
} from './../util/currency'
export default {

    data() {
            return {
                goodsList: [],
                sortFlag: true,
                page: 1,
                pageSize: 8,
                busy: true, //禁用滚动加载
                loading: true,
                mdShow: false,
                mdShowCart: false,
                productPrice: [{
                    start: '0.00',
                    end: '500.00'
                }, {
                    start: '500.00',
                    end: '1000.00'
                }, {
                    start: '1000.00',
                    end: '2000.00'
                }, {
                    start: '2000.00',
                    end: '3000.00'
                }, {
                    start: '3000.00',
                    end: '4000.00'
                }],
                priceCheck: 'all',
                filter: false,
                overLayFlag: false,
                classiFication: '',
                mdSou: false
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
        mounted: function() {
            this.getGoodsList();
            this.setFenlei();
        },
        methods: {
            getGoodsList(flag) {
                var param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? 1 : -1,
                    priceLevel: this.priceCheck
                }
                this.loading = true
                axios.get("/api/goods/list", {
                    params: param
                }).then((result) => {
                    var res = result.data;
                    this.loading = false;
                    if (res.status == "0") {
                        if (flag) {
                            this.goodsList = this.goodsList.concat(res.result.list);
                            if (res.result.count == 0) {
                                this.busy = true;
                            } else {
                                this.busy = false;
                            }
                        } else {
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    } else {
                        this.goodsList = [];
                    }


                });

            },
            showFilterPop() {
                this.filter = true;
                this.overLayFlag = true;
            },
            setPriceFilter(index) {
                this.priceCheck = index;
                this.page = 1;
                this.closeFilterPop();
                this.getGoodsList();
            },
            closeFilterPop() {
                this.filter = false;
                this.overLayFlag = false;
            },
            sortGoods() {
                this.sortFlag = !this.sortFlag;
                this.page = 1;
                this.getGoodsList();
            },
            loadMore() {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                }, 1000);
            },
            addCart(productId) {
                axios.post("/api/goods/addCart", {
                    productId: productId
                }).then((res) => {
                    var res = res.data;
                    if (res.status == '0') {
                        // alert("加入购物车成功")
                        this.$store.commit("updatecartCount", 1);
                        this.mdShowCart = true;
                    } else {
                        /*alert("msg:" + res.msg);*/
                        this.mdShow = true;
                    }
                })
            },
            closeModal() {
                this.mdShow = false;
            },
            //搜索
            setFenlei() {
                var param = {
                    classiFication: this.$route.query.searchKey
                }
                axios.get("/api/goods/souS", {
                    params: param
                }).then((result) => {
                    var res = result.data;

                    if (res.status == '0') {
                        this.goodsList = res.result.list;
                        this.busy = false;
                    } else {
                        this.goodsList = "";
                        this.mdSou = true;
                        this.getGoodsList();
                    }
                })
            },
            quxiao() {
                this.classiFication = '';
                this.mdSou = false;
                this.getGoodsList();
            }
        }
}
</script>
<style scoped>
.container {
    padding: 0 10px;
}

.filter-nav {
    height: 55px;
    line-height: 55px;
    background-color: white;
    text-align: right;
    padding-right: 20px;
    margin: 60px 0 30px 0;
}

#sous {
    width: 160px;
    padding-left: -20px;
    text-align: center;
    border: 1px solid #bbb;
}

.an {
    width: 50px;
    line-height: 34px;
    height: 34px;
    margin-left: -5px;
    border: 1px solid #bbb;
}

.def {
    color: #ee7a23;
}

.filter-nav span {
    margin-right: 10px;
}

.filter-nav a {
    margin-left: 10px;
}

.icon-arrow-short {
    width: 11px;
    height: 11px;
}

.goods-container {
    display: flex;
}

.price-wrap {
    padding: 0 20px;
    margin-right: 50px;
    width: 230px;
}

.price-filter dt {
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.price-filter dd {
    height: 26px;
    line-height: 26px;
    margin-bottom: 20px;
}

.price-filter dd a {
    transition: all .3s ease-out;
    padding-left: 15px;
}

.cur {
    border-left: 2px solid #ee7a2c;
    color: #ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
}

.price-filter dd a:hover {
    border-left: 2px solid #ee7a2c;
    color: #ee7a2c;
    transition: all .3s ease-out;
    padding-left: 15px;
}

.list-wrap {
    flex: 1;
}

.list-wrap .item {
    width: 23.80952%;
    float: left;
    margin-right: 1.5%;
    margin-bottom: 1.5%;
    background-color: white;
    transition: all .5s ease-out;
}

.list-wrap .item:hover {
    transform: translateY(-10px);
    transition: all .5s ease-out;
    box-shadow: 0 0 3px #e9e9e9;
    border-color: #ee7a2c;
}

.list-wrap .item:nth-child(4n) {
    margin-right: 0;
}

.list-wrap .info {
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 0 10px;
}

.item img {
    width: 100%;
}

.info .info-name {
    height: 4em;
    font-weight: bold;
    font-size: 18px;
    color: #d1434a;
}

.btn {
    display: inline-block;
    width: 100%;
    padding: 0 10px;
    text-align: center;
    color: #d1434a;
    height: 40px;
    line-height: 40px;
    border: 1px solid #d1434a;
    margin-top: 10px;
}

.btn:hover {
    background-color: #ee7a2c;
    transition: all .3s ease-out;
}

.list-wrap ul::after {
    clear: both;
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
}

.load-more {
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.sort-up {
    transform: rotate(180deg);
    transition: all 0.3s ease-out;
}

.icon-arrow-short {
    transition: all .3s ease-out;
}

.btn:hover {
    background: #ffe5e6;
    transition: all .3s ease-out;
}

.pic {
    position: relative;
}

#router {
    display: inline-block;
    width: 100%;
    height: 650px;
    line-height: 50px;
    background: #c0c0c0;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    color: black;
    font-size: 20px;
    text-decoration: none;
}

.accessory-list>ul>li:hover #router {
    display: block;
}

#shop {
    width: 100px;
    position: absolute;
    margin-top: -30px;
    margin-left: 90px;
    display: none;
}

.accessory-list> ul > li:hover #shop {
    display: block;
    transition: right .5s ease-out;
}
</style>
