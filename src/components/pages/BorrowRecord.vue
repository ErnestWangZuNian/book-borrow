<template>
  <yd-layout>
    <yd-search :result="result" fullpage v-model="value" :on-submit="submitHandler"></yd-search>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <yd-list theme="3" slot="list">
        <yd-list-item v-for="child in bookList" :key="child.id">
                            <img slot="img" :src="child.cover">
                            <span slot="title">{{child.name}}</span>
                            <yd-list-other slot="other">
                                <div>
                                    <div class="book-list-isbn mt10">
                                         {{child.isbn}}</div>
                                    <div class="book-list-btn mt10" v-if="child.borrows_status === 1" @click="borrow(child)"><yd-button type="primary">我要借阅</yd-button></div>
                                    <div class="book-list-btn mt10" v-if="child.borrows_status === 2"><yd-button type="primary">我要还书</yd-button></div>
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
     <!-- 弹窗提示 -->
    <yd-popup v-model="showModal" position="center" width="90%">
        <yd-button-group>
           <div class="borrow-time">
           <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">预计归还日期：</span>
                <yd-datetime ref="datetime" type="date" v-model="borrowdate" slot="right" :callback="confirmBorrow"></yd-datetime>
            </yd-cell-item>
        </yd-cell-group>
               <yd-button size="large" @click.native="open">请选择预计归还日期</yd-button>
           </div>
        </yd-button-group>
        </yd-popup>
  </yd-layout>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      result: [],
      bookList: [],
      showModal: false,
      selectedBook: null,
      borrowdate: '',
      value: ''
    }
  },
  methods: {
    submitHandler() {

    },
    borrow(child) {
      this.showModal = true;
      this.selectedBook = child;
      this.selectedFlag = true;
    },
    open() {
                this.$refs.datetime.open();
            },
    loadList() {
      this.api.borrowRecord().then(res => {
        this.bookList = res.data.data
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
      })
    },
    confirmBorrow() {
      this.api.borrow({
        book_id: this.selectedBook ? this.selectedBook.id :  null,
        pre_return_at: this.borrowdate
      }).then(res => {
        this.showModal = false;
      })
    }
  },
  mounted() {
    let curDate = new Date();
    this.borrowdate = curDate.toLocaleDateString();
    this.api.borrowRecord().then(res => {
      this.bookList = res.data.data
    })
  }
}
</script>
<style scoped>
.borrow-time{
  padding: 0.2rem;
}
.borrow-time .yd-btn-block{
  margin-top: 0;
}
</style>

