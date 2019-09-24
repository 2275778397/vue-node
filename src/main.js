// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'


Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
    loading: "/static/loading-svg/loading-balls.svg"
})
Vue.use(infiniteScroll);
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        nickName: '',
        cartCount: 0
    },
    mutations: {
        updateUserInfo(state, nickName) {
            state.nickName = nickName;
        },
        updatecartCount(state, cartCount) {
            state.cartCount += cartCount;
        },
        initcartCount(state, cartCount) {
            state.cartCount = cartCount;
        }

    }
})
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
