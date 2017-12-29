<template>
    <yd-layout title="个人中心">
        <div class="user-container">
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
    }
}
</script>
<style>
</style>
