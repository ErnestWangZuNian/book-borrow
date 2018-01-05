<template>
    <yd-layout title="我要购书">
        <div class="login-container">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">图书名称：</span>
                    <yd-input slot="right" required v-model="name" max="20" placeholder="请输入图书名称"></yd-input>
                </yd-cell-item>
                 <yd-cell-item>
                    <span slot="left">图书isbn：</span>
                    <yd-input slot="right" required v-model="isbn" max="20" placeholder="请输入图书isbn"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">图书价格：</span>
                    <yd-input slot="right" required v-model="price" max="20" placeholder="请输入图书价格"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">图书链接：</span>
                    <yd-input slot="right" required v-model="buylink" max="20" placeholder="请输入图书链接"></yd-input>
                </yd-cell-item>
                <div class="login-btn">
                    <yd-button type="primary" size="large" @click.native="apply">申请</yd-button>
                </div>
            </yd-cell-group>
        </div>

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            isbn: '',
            price: '',
            buylink: ''
        }
    },
    methods: {
        apply() {
            this.api.applyBuyBook({
                name: this.name,
                isbn: this.isbn,
                price: this.price,
                buy_link: this.buylink
            }).then(res => {
                 this.$router.push("/mine/buy-record");
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
