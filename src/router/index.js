import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Cart from '@/view/Cart'
import Address from '@/view/Address'
import OrderConF from '@/view/orderConfirm'
import OrderSuc from '@/view/orderSuccess'
import admin from '@/view/Admin'
import HouTai from '@/view/houTai'
import DaiMa from '@/view/daima'
import productShow from '@/view/productShow'
import Index from '@/view/index'
import Induction from '@/view/Induction'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }, {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }, {
        path: '/address',
        name: 'Address',
        component: Address
    }, {
        path: '/orderConfirm',
        name: 'OrderConF',
        component: OrderConF
    }, {
        path: '/ordersuccess',
        name: 'OrderSuc',
        component: OrderSuc
    }, {
        path: '/admin',
        name: 'admin',
        component: admin
    }, {
        path: '/houtai',
        name: 'HouTai',
        component: HouTai
    }, {
        path: '/daima',
        name: 'daima',
        component: DaiMa
    }, {
        path: '/productShow',
        name: 'productShow',
        component: productShow
    }, {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/Induction',
        name: 'Induction',
        component: Induction
    }]
})
