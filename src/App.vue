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
           <yd-tabbar-item title="我要购书" link="/buybook" :active="this.$route.path==='/buybookt' ? true : false">
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="/mine" :active="this.$route.path==='/mine' ? true : false">
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    getStatus() {
        const self = this;
        this.api.checkLoginStatus().then(res => {
          if(res.status === 2) {
             this.$dialog.alert({mes: '您还未登录,请先登录',callback: () => {
                 self.$router.push('/user/login')
             }});
          }else{
              this.tool.localTest.set(res)
          }
      })
    }
  },
  mounted(){
      if(!/\/user/.test(this.$route.path)){
         this.getStatus();
      }
  }
}
</script>
