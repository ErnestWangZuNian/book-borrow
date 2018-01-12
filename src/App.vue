<template>
  <div id="app">
    <router-view/>
   
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
