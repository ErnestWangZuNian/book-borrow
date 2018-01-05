<template>
  <yd-layout title="申请记录">
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <yd-list theme="3" slot="list">
        <yd-list-item v-for="child in bookList" :key="child.id">
          <img slot="img" :src="child.cover">
          <span slot="title">{{child.name}}</span>
          <yd-list-other slot="other">
            <div>
              <div class="book-list-isbn mt10">
                {{child.isbn}}</div>
              <div class="book-list-btn mt10" v-if="child.locked == 2" @click="returnBook(child)">
                <yd-button type="warning">我要还书</yd-button>
              </div>
               <div class="book-list-btn mt10" v-if="child.locked == 1">
                <yd-button type="primary">已经还书</yd-button>
              </div>
            </div>
            <div class="book-borrows-count">
              <yd-badge type="danger">已借阅{{child.borrows_count}}次</yd-badge>
            </div>
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
     loadList() {
      this.api.getBookList().then(res => {
        this.bookList = res.data.data
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
      })
    },
    getBook() {
      this.api.applyRecord().then(res => {
        this.bookList = res.data.data
      })
    },
  },
  mounted() {
    this.getBook();
  }
}
</script>
<style scoped>
.borrow-time {
  padding: 0.2rem;
}

.borrow-time .yd-btn-block {
  margin-top: 0;
}
</style>
