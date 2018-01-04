<template>
    <yd-layout title="个人中心">
        <div class="user-container">
            <div class="user-info">
                <div class="info-list"><span class="name">{{this.tool.localTest.get().account}}</span><span class="email">{{this.tool.localTest.get().email}}</span></div>
                <yd-button type="danger" @click.native="loginOut" class="logout">退出登录</yd-button>
            </div>
            <yd-cell-group>
                <yd-cell-item arrow href="/mine/borrow-record" type="link">
                    <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
                    <span slot="left">借阅记录</span>
                    <span slot="right">查看借阅记录</span>
                </yd-cell-item>
                 <yd-cell-item arrow href="/mine/buy-record" type="link">
                    <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
                    <span slot="left">申请记录</span>
                    <span slot="right">查看申请记录</span>
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
    display: flex;
}
.user-info .info-list {
    font-size: .28rem;
    color: #fff;
     align-items: center;
    flex: 3;
    display: flex;
}
.user-info .logout{
    flex: 1;
}
.user-info .info-list .email{
    margin-left: .5rem;
    color: #04be02;

}
</style>
