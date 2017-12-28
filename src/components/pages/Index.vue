<template>
  <yd-layout>
    <yd-search :result="result" fullpage v-model="value" :on-submit="submitHandler"></yd-search>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <yd-list theme="3" slot="list">
        <yd-list-item v-for="item in bookList" :key="item.id">
          <img slot="img" :src="item.img">
          <span slot="title">{{item.name}}</span>
          <yd-list-other slot="other">
            <div class="book-info">
              <span class="book-list-price">
                <em>¥</em>{{item.price}}</span>
              <span class="book-list-del-price">¥{{item.w_price}}</span>
            </div>
            <div>content</div>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
    </yd-infinitescroll>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-layout>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      result: [],
      bookList: [],
      value: ''
    }
  },
  methods: {
    submitHandler() {

    },
    loadList() {
      this.api.getBookList().then(res => {
        this.bookList = res.data.data
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
      })
    }
  },
  mounted() {
    this.api.getBookList().then(res => {
      this.bookList = res.data.data
    })

  }
}
</script>
<style scoped>

</style>

