<template>
    <div>
        <header-vue></header-vue>
        <nav-vue>
            <span>商品详情</span>
        </nav-vue>
        <div class="container" id="product_intro">
            <div id="preview">
                <p id="medimImgContainer">
                    <img id="mediumImg" v-lazy="'/static/'+goodsList.productImg" alt="">
                    <span id="mask"></span>
                    <!--小黄块-->
                    <span id="maskTop"></span>
                    <!--悬于图片/mask上方的专用于接收鼠标移动事件的一个完全透明的层-->
                    <span id="largeImgContainer">
                      <!-- <img id="loading" src="../assets/images/loading.gif" height="31" width="31"/> -->
                      <img id="largeImg" v-lazy="'/static/'+goodsList.productImg" alt="" style="width:750px;height:750px;" />
                    </span>
                </p>
                <h1>
        <a class="backward_disabled"></a>
        <a class="forward_disabled"></a>
        <div>
          <ul id="icon_list">
             <li v-for="item in img" @click="hoverMiniImg">
                <img v-lazy="'/static/'+item.productImag" height="100" width="100"/></li> 
           <!--  <li><img src="../assets/images/products/product-s2-m.jpg" height="50" width="50"/></li>  -->
           <!--<li><img src="../assets/images/products/product-s3-m.jpg" height="50" width="50"/></li>
            <li><img src="../assets/images/products/product-s4-m.jpg" height="50" width="50"/></li>
           <li><img src="../assets/images/products/product-s1-m.jpg" height="50" width="50"/></li>
           <li><img src="../assets/images/products/product-s2-m.jpg" height="50" width="50"/></li>
           <li><img src="../assets/images/products/product-s3-m.jpg" height="50" width="50"/></li>
            <li><img src="../assets/images/products/product-s4-m.jpg" height="50" width="50"/></li> -->
          </ul>
        </div>
      </h1>
            </div>
            <div class="product_right">
                <h2>{{goodsList.productName}}</h2>
                <hr>
                <div class="productJS">
                    商品介绍：该商品为{{goodsList.productIntd}}
                    <br/>
                    <span style="font-size:18px;">价格:{{goodsList.productPrice | currency('$')}}</span>
                </div>
                <span>配送地址:
                {{addressList.streetName}}</span> <a class="btn btn--m" href="/#/address">修改</a>
                <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addCart(goodsList.productId)">加入购物车</a>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="contanier">
            <div class="productCom">评论</div>
        </div>
        <!-- <footer-vue></footer-vue> -->
    </div>
</template>
<script>
import HeaderVue from './../view/Header.vue'
import NavVue from './../view/Nav.vue'
import FooterVue from './../view/Footer.vue'
import Modal from './../view/Modal.vue'
import axios from 'axios'
import './../assets/css/productShow.css'
import {
    currency
} from './../util/currency'
export default {
    data() {
            return {
                productId: '',
                goodsList: [],
                addressList: '',
                img: ''
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
            this.addressShow();
            this.bigImg();
            this.moveMiniImg();
            /*this.();*/
        },
        methods: {
            init() {
                var productId = this.$route.query.productId;
                if (!productId) {
                    return;
                }
                axios.get("/api/goods/show", {
                    params: {
                        productId: productId
                    }
                }).then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        this.goodsList = res.result.list;
                        this.img = res.result.Image;
                    }
                })

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
            addressShow() {
                axios.get("/api/users/addressShow").then((response) => {
                    let res = response.data;
                    this.addressList = res.result;
                })
            },
            /*鼠标悬浮看大图*/
            bigImg() {
                var $mediumImg = $('#mediumImg')
                var $mask = $('#mask') // 小黄块
                var $maskTop = $('#maskTop')
                var $largeImgContainer = $('#largeImgContainer')
                var $loading = $('#loading')
                var $largeImg = $('#largeImg')
                var maskWidth = $mask.width()
                var maskHeight = $mask.height()
                var maskTopWidth = $maskTop.width()
                var maskTopHeight = $maskTop.height()

                $maskTop.hover(function() { // 进入
                    $mask.show()

                    // 动态加载对应的大图
                    // images\products\product-s2-m.jpg
                    // images/products/product-s2-l.jpg
                    var src = $mediumImg.attr('src')
                    $largeImg.attr('src', src)
                    $largeImgContainer.show()
                        // 绑定加载完成的监听
                    $largeImg.on('load', function() { // 大图加载完成

                        // 得到大图的尺寸
                        var largeWidth = $largeImg.width()
                        var largeHeight = $largeImg.height()
                        console.log($largeImg.width(), $largeImg.height())

                        // 给$largeImgContainer设置尺寸
                        $largeImgContainer.css({
                                width: largeWidth / 2,
                                height: largeHeight / 2
                            })
                            // 显示大图
                        $largeImg.show()
                            // 隐藏加载进度条
                        $loading.hide()


                        //鼠标移动的监听
                        $maskTop.mousemove(function(event) {
                            /*
                            1. 移动小黄块
                            2. 移动大图
                             */
                            /*1. 移动小黄块*/
                            //计算left/top
                            var left = 0
                            var top = 0
                                // 事件的坐标
                            var eventLeft = event.offsetX
                            var eventTop = event.offsetY
                            left = eventLeft - maskWidth / 2
                            top = eventTop - maskHeight / 2
                                // left在[0, maskTopWidth-maskWidth]
                            if (left < 0) {
                                left = 0
                            } else if (left > maskTopWidth - maskWidth) {
                                left = maskTopWidth - maskWidth
                            }
                            // top在[0, maskTopHeight-maskHeight]
                            if (top < 0) {
                                top = 0
                            } else if (top > maskTopHeight - maskHeight) {
                                top = maskTopHeight - maskHeight
                            }
                            //给$mask重新定位
                            $mask.css({
                                left: left,
                                top: top
                            })

                            /*2. 移动大图*/
                            // 得到大图的坐标
                            left = -left * largeWidth / maskTopWidth
                            top = -top * largeHeight / maskTopHeight
                                // 设置大图的坐标
                            $largeImg.css({
                                left: left,
                                top: top
                            })
                        })
                    })


                }, function() {
                    $mask.hide()
                    $largeImgContainer.hide()
                    $largeImg.hide()
                })
            },
            /*左右点击换图*/
            moveMiniImg() {
                var $as = $('#preview>h1>a')
                var $backward = $as.first()
                var $forward = $as.last()
                var $Ul = $('#icon_list')
                var SHOW_COUNT = 2;
                var imgCount = $Ul.children('li').length;
                var moveCount = 0 //移动的次数(向右为正, 向左为负)
                var liWidth = $Ul.children(':first').width()

                // 初始化更新
                if (imgCount > SHOW_COUNT) {
                    // $forward[0].className = 'forward'
                    $forward.attr('class', 'forward')
                    console.log(imgCount);
                }


                // 给向右的按钮绑定点击监听
                $forward.click(function() {

                    // 判断是否需要移动, 如果不需要直接结束
                    if (moveCount === imgCount - SHOW_COUNT) {

                        return
                    }
                    moveCount++
                    //更新向左的按钮
                    $backward.attr('class', 'backward')
                        // 更新向右的按钮
                    if (moveCount === imgCount - SHOW_COUNT) {
                        $forward.attr('class', 'forward_disabled');

                    }
                    // 移动ul
                    $Ul.css({
                        left: -moveCount * liWidth
                    })
                })

                // 给向左的按钮绑定点击监听
                $backward.click(function() {
                    // 判断是否需要移动, 如果不需要直接结束
                    if (moveCount === 0) {
                        return
                    }
                    moveCount--
                    //更新向右的按钮
                    $forward.attr('class', 'forward')
                        // 更新向左的按钮
                    if (moveCount === 0) {
                        $backward.attr('class', 'backward_disabled')
                    }
                    // 移动ul
                    $Ul.css({
                        left: -moveCount * liWidth
                    })
                })

            },
            /*鼠标悬浮换图*/
            hoverMiniImg() {
                $('#icon_list li').hover(function() {
                    // this.children()[0].className = 'hoveredThumb'
                    var $img = $(this).children();
                    $img.addClass('hoveredThumb');
                    //显示对应的中图
                    var src = $img.attr('src');
                    $('#mediumImg').attr('src', src);
                }, function() {
                    $(this).children().removeClass('hoveredThumb')
                })
            }
        }

}
</script>
<style>
</style>
