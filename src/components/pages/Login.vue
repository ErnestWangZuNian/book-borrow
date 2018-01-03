<template>
    <yd-layout title="用户登录">
        <div class="login-container">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">账号：</span>
                    <yd-input slot="right" required v-model="account" max="20" placeholder="请输入用户名或者邮箱"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码：</span>
                    <yd-input slot="right" required type="password" v-model="password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <div class="login-btn">
                    <yd-button type="primary" size="large" @click.native="login">登录</yd-button>
                </div>
            </yd-cell-group>
        </div>

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {
            account: '',
            password: ''

        }
    },
    methods: {
        login() {
            this.api.loginUser({
                account: this.account,
                password: this.password
            }).then(res => {
                this.$router.push("/");
            })
        }
    },
}
</script>
<style>
.login-container {
    min-height: 12rem;
    background: #fff;
}

.login-btn {
    padding: 0 .2rem;
}
</style>
