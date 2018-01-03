<template>
    <yd-layout title="个人中心">
        <div class="user-container">
            <div class="user-info">
                <span class="info-list"><span class="name">王祖念</span></span>
                <yd-button type="danger" @click.native="loginOut">退出登录</yd-button>
            </div>
            <yd-cell-group>
                <yd-cell-item arrow href="/borrow-record" type="link">
                    <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
                    <span slot="left">借阅记录</span>
                    <span slot="right">查看借阅记录</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {


        }
    },
    methods: {
        loginOut(){
            this.api.loginOut().then(res => {

            })
        }
    }
}
</script>
<style>
.user-info {
    background: #333;
    padding: .2rem;
}
.user-info .info-list {
    margin-right: 4.5rem;
    font-size: .28rem;
    color: #fff;
}
.user-info .info-list .reset-password{
    margin-left: .5rem;
    color: #2574a9;

}
</style>
