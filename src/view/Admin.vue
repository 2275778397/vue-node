<template>
    <div>
        <div id="container">
            <div class="bj">
                <div class="login">LOGIN</div>
                <div class="username-text">Username:</div>
                <div class="password-text">Password:</div>
                <div class="username-field">
                    <input type="text" name="username" placeholder="User Name" class="input" />
                </div>
                <div class="password-field">
                    <input type="password" name="password" v-model="userPwd" placeholder="User Pswd" class="input" />
                </div>
                <input type="checkbox" name="remember-me" id="remember-me" />
                <label for="remember-me">Remember me</label>
                <div class="forgot-usr-pwd">Forgot <a href="#">username</a> or <a href="#" @keyup.enter="login">password</a>?</div>
                <button class="rout" @click="login">Go</button>
                <!-- <router-link to="/houtai" class="rout" @click="login">GO</router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
import './../assets/css/style.css'
import axios from 'axios'
import Modal from './../view/Modal.vue'
export default {
    data() {
            return {
                userName: 'admin',
                userPwd: ''
            }
        },
        methods: {
            login() { // 点击登录  
                if (!this.userName || !this.userPwd) {
                    alert("账号或者密码不能为空");
                }         
                axios.post("api/users/login", {        
                    userName: this.userName,
                    userPwd: this.userPwd  
                }).then((response) => {           
                    let res = response.data;        
                    if (res.status == "0") {          
                        if (res.result.userName == 'admin') {
                            this.$router.push('/houtai');
                        } else {
                            return
                        }
                    } else {  
                        alert("账号或者密码错误，请重新输入")
                    }      
                })    
            }

        }
}
</script>
<style>
</style>
