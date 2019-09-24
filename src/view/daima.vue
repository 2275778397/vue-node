<template>
    <div>
        <div class="box">
            <div class="container">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">账号中心</a></li>
                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">重设密码</a></li>
                    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">购物车</a></li>
                    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">交易订单</a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="home">
                        <ul class="home_ul">
                            <li>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">用户账号:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputPassword3" placeholder="用户账号" v-model="userList.userName">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">用户密码:</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="inputEmail3" placeholder="密码" v-model="userList.userPwd">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-2 control-label">姓名:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputPassword3" placeholder="用户名称" v-model="userList.name">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-2 control-label">用户邮箱:</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="inputPassword3" placeholder="用户邮箱" v-model="userList.email">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">性别:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputPassword3" placeholder="性别" v-model="userList.sex">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">用户籍贯:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputEmail3" placeholder="用户籍贯" v-model="userList.province+userList.city">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-2 control-label">邮编:</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" id="inputPassword3" placeholder="邮编" v-model="userList.post">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="profile">
                        <ul class="profile_ul">
                            <li>
                                <div class="form-group">
                                    <label for="inputEmail3" class="col-sm-2 control-label">用户密码:</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="inputEmail3" placeholder="密码" v-model="oldPwd">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-2 control-label">新密码:</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="inputPassword3" placeholder="再次输入密码" v-model="newPwd">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="form-group">
                                    <label for="inputPassword3" class="col-sm-2 control-label">确认密码</label>
                                    <div class="col-sm-10">
                                        <input type="password" class="form-control" id="inputPassword3" placeholder="与新密码一致" v-model="newPwd1">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button type="button" class="btn btn-info" @click="replea">确定</button>
                            </li>
                        </ul>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="messages">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>商品图片</th>
                                    <th>商品名称</th>
                                    <th>商品价格</th>
                                    <th>商品数量</th>
                                    <th>商品总价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in cartList">
                                    <td><img v-lazy="'/static/'+item.productImg" alt="" style="width:80px;height:50px;"></td>
                                    <td>{{item.productName}}</td>
                                    <td>{{item.productPrice}}</td>
                                    <td>{{item.productNum}}</td>
                                    <td>{{item.productNum*item.productPrice}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="settings">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>订单ID</th>
                                    <th>订单生成日期</th>
                                    <th>订单商品</th>
                                    <th>商品总价</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in orderList">
                                    <td>{{item.orderId}}</td>
                                    <td>{{item.creatData}}</td>
                                    <td>{{addressList.userName}}</td>
                                    <td>{{item.orderTotal}}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger" @click="deleteOrder(item.orderId)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Modal from './../view/Modal.vue'
import axios from 'axios'
import '../assets/css/bootstrap.css'
import '../assets/js/bootstrap.js'


export default {
    data() {
            return {
                replaceModaFlag: false,
                replaceModaFlag1: false,
                oldPwd: '',
                newPwd: '',
                newPwd1: '',
                userList: [],
                addressList: [],
                cartList: [],
                orderList: [],
                orderId: ''
            }
        }, mounted: function() {
            this.getUser();
        },
        methods: {
            getUser() {
                axios.get("/api/users/people").then((result) => {
                    var res = result.data;
                    if (res.status == '0') {
                        this.userList = res.result.list;
                        res.result.list.addressList.forEach((item) => {
                            if (item.isDefault) {
                                this.addressList = item;
                            }
                        });
                        this.cartList = res.result.list.cartList;
                        this.orderList = res.result.list.orderList;

                    } else {
                        this.goodsList = "";
                    }
                })
            },
            replea() {
                if (!this.oldPwd || !this.newPwd || !this.newPwd1) {
                    alert("请将数据填充完整！");
                    return
                } 
                else if (this.newPwd != this.newPwd1) {
                    alert("两次输入的密码不相符！");
                    return
                }
                axios.post("api/users/replea", {
                    oldPwd: this.oldPwd,
                    newPwd: this.newPwd
                }).then((response) => {
                    let res = response.data;
                    if (res.status == '0') {
                        alert('恭喜您，您的密码重置成功');
                    } else if (res.status == '1003') {
                        alert('您输入的密码不正确，请重新输入正确密码');
                    } else {
                        alert('对不起，您的操作失败了，请重新进行操作');
                    }
                })
            },
            deleteOrder(orderId) {
                if (confirm("确定要删除吗?")) {
                    axios.post("api/users/deleteOrder", {
                        orderId: orderId
                    }).then((response) => {
                        let res = response.data;
                        if (res.status == '0') {
                            this.getUser()
                        }
                    });
                } else {
                    return
                }
            }
        }


}
</script>
<style scoped>
ul {
    list-style: none;
}

input {
    margin: 0;
    padding: 0;
    text-align: center;
}

.box {
    margin-top: 50px;
    width: 100%;
}

.nav {
    width: 100%;
}

.nav>li {
    width: 25%;
    text-align: center;
}

.home_ul {
    width: 600px;
    height: 200px;
}

.home_ul>li {
    width: 100%;
    height: 25%;
}

.profile_ul {
    width: 600px;
    height: 300px;
}

.profile_ul>li {
    width: 100%;
    height: 20%;
}

.tab-content>div {
    position: relative;
}

.tab-content>div>ul {
    position: absolute;
    left: 300px;
    top: 20px;
}

.table {
    margin-top: 20px;
}
</style>
