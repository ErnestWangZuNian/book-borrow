<template>
    <yd-layout title="用户登录">
        <div class="login-container">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">邮箱：</span>
                    <input slot="right" type="number" placeholder="请输入邮箱">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">名称：</span>
                    <input slot="right" type="number" placeholder="请输入名称">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">密码：</span>
                    <input slot="right" type="number" placeholder="请输入密码">
                </yd-cell-item>
                <div class="login-btn">
                    <yd-button type="primary" size="large">登录</yd-button>
                </div>
            </yd-cell-group>
        </div>

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            bookList: []
        }
    },
    methods: {
        change(index) {
            this.getBookList();
        },
        getBookList() {
            this.api.getBookList().then(res => {
                this.bookList = res.data.data
            })
        }
    },
    mounted() {
        this.api.getCategoryList().then(res => {
            this.list = res.data.data
        })
    }
}
</script>
<style>
.login-container {
    min-height: 12rem;
    background: #fff;
}
.login-btn{
    padding: 0 .2rem;
}
</style>
