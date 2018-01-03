<template>
    <yd-layout title="用户注册">
        <div class="login-container">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">邮箱：</span>
                    <yd-input slot="right" required v-model="email" :debug="true" regex="email" placeholder="请输入邮箱地址"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">用户名：</span>
                    <yd-input slot="right" required v-model="account" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码：</span>
                    <yd-input slot="right" required type="password" v-model="password" placeholder="请输入密码"></yd-input>
                </yd-cell-item>
                <div class="login-btn">
                    <yd-button type="primary" size="large" @click.native="register">注册</yd-button>
                </div>
            </yd-cell-group>
        </div>

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            account: '',
            password: ''

        }
    },
    methods: {
        register() {
            this.api.registerUser({
                email: this.email,
                account: this.account,
                password: this.password
            }).then(res => {
                this.$dialog.alert({
                    mes: '恭喜您注册成功', callback: () => {
                        this.$router.push("/user/login")
                    }
                });
            })
        }
    }
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
