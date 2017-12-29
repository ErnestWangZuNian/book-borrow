<template>
  <div id="app">
    <router-view/>
    <div v-if="/\/user/.test(this.$route.path) === false ">
       <yd-tabbar :fixed="true">
        <yd-tabbar-item title="首页" link="/" :active="this.$route.path==='/' ? true : false">
            <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="图书分类" link="/category-list" :active="this.$route.path==='/category-list' ? true : false">
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="/user/mine" :active="this.$route.path==='/user/mine' ? true : false">
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
