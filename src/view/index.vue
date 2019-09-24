<template>
    <div>
        <header-vue></header-vue>
        <section id="lbt">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src="../../static/img/slide_01_2000x410.jpg" alt="...">
                    </div>
                    <div class="item">
                        <img src="../../static/img/slide_02_2000x410.jpg" alt="...">
                    </div>
                    <div class="item">
                        <img src="../../static/img/slide_03_2000x410.jpg" alt="...">
                    </div>
                </div>
                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </section>
        <section id="context_main">
            <section id="xs">
                <div class="container">
                    <div class="xs_header">
                        <i class="glyphicon glyphicon-time"></i>
                        <h2>限时抢购</h2>
                        <h2>|</h2><span>距离本场活动结束还剩下:</span>
                        <div class="sk_time">
                            <span class="num">0</span>
                            <span class="num">0</span>
                            <span class="str">:</span>
                            <span class="num">0</span>
                            <span class="num">0</span>
                        </div>
                    </div>
                    <div class="xs_main">
                        <div class="xs_main_left">
                            <img src="../../static/img/限购1.png" style="width: 100%;height: 100%;" />
                        </div>
                        <div class="xs_main_right">
                            <ul class="xs_main_right_ul">
                                <li v-for="(item,index) in good.slice(0, 6)">
                                    <div class="tp">
                                        <img class="img" v-lazy="'/static/'+item.productImg" />
                                    </div>
                                    <div class="context">
                                        <h5>{{item.productName}}</h5>
                                        <p>
                                            {{item.productPrice| currency('$')}}
                                            <del>{{(item.productPrice*0.4+item.productPrice)| currency('$')}}</del>
                                        </p>
                                        <a href="#" class="gw" @click="productShop(item.productId)">
                                        立即抢购
                                  </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section id="kt">
                <div class="container">
                    <div class="kt_header">
                        <h2>新品推荐</h2>
                    </div>
                    <div class="kt_main">
                        <ul class="kt_main_ul">
                            <li v-for="(item,index) in goodsList1.slice(0, 9)" @click="productShop(item.productId)">
                                <div class="kt_tp">
                                    <img class="img" v-lazy="'/static/'+item.productImg" />
                                </div>
                                <div class="kt_context">
                                    <h5>{{item.productName}}</h5>
                                    <br />
                                    <p>{{item.productPrice| currency('$')}}</p>
                                </div>
                            </li>
                            <li class="end" @click="productShow('冰箱')">
                                <img class="img" src="../../static/img/产品.png" />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <div style="clear: both;"></div>
            <section id="rx">
                <div class="container">
                    <div class="rx_header">
                        <h2>热销产品</h2>
                    </div>
                    <div class="rx_main">
                        <ul class="rx_main_ul">
                            <li v-for="(item,index) in goodsList.slice(0, 7)" @click="productShop(item.productId)">
                                <div class="rx_tp">
                                    <img class="img" v-lazy="'/static/'+item.productImg" />
                                </div>
                                <div class="kt_context">
                                    <h5>{{item.productName}}</h5>
                                    <br />
                                    <p>{{item.productPrice| currency('$')}}</p>
                                </div>
                            </li>
                            <li v-for="(item,index) in goodsList2.slice(0, 7)" @click="productShop(item.productId)">
                                <div class="rx_tp">
                                    <img class="img" v-lazy="'/static/'+item.productImg" />
                                </div>
                                <div class="kt_context">
                                    <h5>{{item.productName}}</h5>
                                    <br />
                                    <p>{{item.productPrice| currency('$')}}</p>
                                </div>
                            </li>
                            <li class="end">
                                <img class="img" src="../../static/img/精品.png" @click="productShow('空调')" />
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id="th">
                <div class="container">
                    <div class="th_header">
                        <h2>海尔专卖店</h2>
                    </div>
                    <div class="th_main">
                        <ul class="th_main_ul">
                            <li>
                                <img src="../../static/img/dt.png" style="width: 100%;height: 100%;" />
                            </li>
                            <li>
                                <div class="tx_li_div">
                                    <div class="tx_li_div_tp">
                                        <img class="img" src="../../static/img/th/1.jpg" />
                                    </div>
                                    <div class="tx_li_div_context">
                                        <h4>海尔专卖店 家电数码</h4>
                                        <p>广东省广州市白云区宝树路</p>
                                    </div>
                                </div>
                                <div class="tx_li_div">
                                    <div class="tx_li_div_tp">
                                        <img class="img" src="../../static/img/th/2.jpg" />
                                    </div>
                                    <div class="tx_li_div_context">
                                        <h4>海尔专卖店 家电数码</h4>
                                        <p>广东省广州市从化区城中路106号</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="tx_li_div">
                                    <div class="tx_li_div_tp">
                                        <img class="img" src="../../static/img/th/3.jpg" />
                                    </div>
                                    <div class="tx_li_div_context">
                                        <h4>海尔专卖店 家电数码</h4>
                                        <p>广州市花都区新华街道 布心市场海尔专卖店
                                        </p>
                                    </div>
                                </div>
                                <div class="tx_li_div">
                                    <div class="tx_li_div_tp">
                                        <img class="img" src="../../static/img/th/4.jpg" />
                                    </div>
                                    <div class="tx_li_div_context">
                                        <h4>海尔专卖店 家电数码</h4>
                                        <p>南环路与石清公路交叉口北150米</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </section>
        <footer-vue></footer-vue>
    </div>
</template>
<script>
import HeaderVue from './../view/Header.vue'
import NavVue from './../view/Nav.vue'
import FooterVue from './../view/Footer.vue'
import Modal from './../view/Modal.vue'
import '../assets/css/index.css'
import axios from 'axios'
import {
    currency
} from './../util/currency'
export default {
    data() {
            return {
                classiFication: '空调',
                goodsList: '',
                bx: '冰箱',
                goodsList1: '',
                xyj: '洗衣机',
                goodsList2: '',
                rsq: '热水器',
                good: '',
                sortFlag: true,
                page: 1,
                pageSize: 8,
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
        filters: {
            currency: currency
        },
        mounted() {
            this.setFenlei();
            this.setF();
            this.setFenlei1();
            this.getGoodsList();
        },
        methods: {
            setFenlei(classiFication) {
                var param = {
                    classiFication: this.classiFication
                }
                console.log(param);
                axios.get("/api/goods/souS", {
                    params: param
                }).then((result) => {
                    var res = result.data;

                    if (res.status == '0') {
                        this.goodsList = res.result.list;
                        this.busy = false;
                    }
                })
            },
            setF() {
                var param = {
                    classiFication: this.bx
                }
                console.log(param);
                axios.get("/api/goods/souS", {
                    params: param
                }).then((result) => {
                    var res = result.data;

                    if (res.status == '0') {
                        this.goodsList1 = res.result.list;
                        this.busy = false;
                    }
                })
            },
            setFenlei1() {
                var param = {
                    classiFication: this.xyj
                }

                axios.get("/api/goods/souS", {
                    params: param
                }).then((result) => {
                    var res = result.data;

                    if (res.status == '0') {
                        this.goodsList2 = res.result.list;
                        this.busy = false;
                    }
                })
            },
            getGoodsList() {
                var param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag ? -1 : 1,
                }
                this.loading = true
                axios.get("/api/goods/input", {
                    params: param
                }).then((result) => {
                    var res = result.data;
                    this.loading = false;
                    if (res.status == "0") {

                        this.good = res.result.list;

                    } else {
                        this.goodsList = [];
                    }


                });

            },
            productShop(productId) {
                this.$router.push({
                    path: 'productShow',
                    query: {
                        productId: productId
                    }
                })
            },
            productShow(searchKey) {
                this.$router.push({
                    path: 'HelloWorld',
                    query: {
                        searchKey: searchKey
                    }
                })
            }
        }
}
</script>
<style scoped>
a,
a:hover {
    text-decoration: none;
}
</style>
