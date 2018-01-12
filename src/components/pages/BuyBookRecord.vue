<template>
  <yd-layout title="申请记录">
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-list theme="3">
        <yd-list-item v-for="child in bookList" :key="child.id">
          <img slot="img" :src="child.cover">
          <span slot="title">{{child.name}}</span>
          <yd-list-other slot="other">
            <div>
              <div class="book-list-isbn mt10">
                {{child.isbn}}</div>
              <div class="book-list-btn mt10" @click="returnBook(child)">
                <span  class="price" >{{child.price | interesRate}}</span>
              </div>
            </div>
            <div class="book-borrows-count">
              <yd-badge type="danger"@click.native="gotoDetail(child)" >查看详情</yd-badge>
            </div>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
    </yd-pullrefresh>
  </yd-layout>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      result: [],
      bookList: [],
      currentPage: 1,
      lastPage:1,
      value: ''
    }
  },
  methods: {
     loadList() {
       if(this.currentPage < this.lastPage){
          ++this.currentPage;
          this.api.applyRecord().then(res => {
          let list = res.data.data;
          this.bookList = [...this.bookList,...res.data.data];
          this.$dialog.toast({
              mes: list.length > 0 ? '为您更新了' + list.length + '条书籍信息' : '已是最新书籍信息'
          });
            /* 单次请求数据完毕 */
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
         })
       }else{
          this.$dialog.toast({
              mes: '没有更多数据了'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
       }
    },
    gotoDetail() {
      //  window.open(child)
    },
    getBook() {
      this.api.applyRecord().then(res => {
        this.bookList = [...this.bookList,...res.data.data];
        this.lastPage = res.data.last_page;
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
