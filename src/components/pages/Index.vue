<template>
  <yd-layout>
    <yd-search :result="result" fullpage v-model="searchValue" :on-submit="submitHandler"></yd-search>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <yd-list theme="3" slot="list">
        <yd-list-item v-for="child in bookList" :key="child.id">
          <img slot="img" :src="child.cover">
          <span slot="title">{{child.name}}</span>
          <yd-list-other slot="other">
            <div>
              <div class="book-list-isbn mt10">
                {{child.isbn}}</div>
              <div class="book-list-btn mt10" v-if=" child.locked == 1" @click="borrow(child)">
                <yd-button type="primary">我要借阅</yd-button>
              </div>
              <div class="book-list-btn mt10" v-if="child.locked == 2 && child.borrows_status == 2" @click="returnBook(child)">
                <yd-button type="warning">我要还书</yd-button>
              </div>
              <div class="book-list-btn mt10" v-if="child.locked == 2 && child.borrows_status == 1">
                <yd-button type="disabled">暂不能借阅</yd-button>
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
    <!-- 弹窗提示 -->
    <yd-popup v-model="showModal" position="center" width="90%">
      <yd-button-group>
        <div class="borrow-time">
          <yd-cell-group>
            <yd-cell-item arrow>
              <span slot="left">预计归还日期：</span>
              <yd-datetime  ref="datetime" type="date" v-model="borrowdate" slot="right" :callback="confirmBorrow"></yd-datetime>
            </yd-cell-item>
          </yd-cell-group>
          <yd-button size="large" @click.native="open">请选择预计归还日期</yd-button>
        </div>
      </yd-button-group>
    </yd-popup>
    <!-- 弹窗提示 -->
     <yd-popup v-model="showModal2" position="center" width="90%">
      <yd-button-group>
        <div class="borrow-time">
          <yd-cell-group>
            <yd-cell-item arrow>
              <span slot="left">预计归还日期：</span>
              <yd-datetime v-if="selectedBook" ref="datetime1" type="date" v-model="borrowdate1" slot="right" :callback="confirmBorrow1"></yd-datetime>
            </yd-cell-item>
          </yd-cell-group>
          <yd-button size="large" @click.native="open1">请选择预计归还日期</yd-button>
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
      showModal2: false,
      selectedBook: null,
      borrowdate: '',
      borrowdate1: '',
      searchValue: ''
    }
  },
  methods: {
    submitHandler() {
     this.getBook({
       search: this.searchValue
     })
    },
    borrow(child) {
      this.showModal = true;
      this.selectedBook = child;
    },
    returnBook(child) {
      this.showModal2 = true;
      this.selectedBook = child;
    },
    open() {
      this.$refs.datetime.open();
    },
    open1() {
      this.$refs.datetime1.open();
    },
    getBook(item=null) {
      this.api.getBookList(item).then(res => {
        this.bookList = res.data.data
      })
    },
    loadList() {
      alert('qaangzunian');
      this.api.getBookList().then(res => {
        this.bookList = res.data.data
        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
      })
    },
    confirmBorrow() {
      this.api.borrow({
        book_id: this.selectedBook ? this.selectedBook.id : null,
        pre_return_at: this.borrowdate
      }).then(res => {
        this.showModal = false;
        this.getBook();
      })
    },
    confirmBorrow1() {
      this.api.returnBook({
        book_id: this.selectedBook ? this.selectedBook.id : null,
        pre_return_at: this.borrowdate1
      }).then(res => {
        this.showModal2 = false;
        this.getBook();
      })
    }
  },
  mounted() {
    //格式化日期
    Date.prototype.format = function(fmt) {
      var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          if (k == "y+") {
            fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
          }
          else if (k == "S+") {
            var lens = RegExp.$1.length;
            lens = lens == 1 ? 3 : lens;
            fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
          }
          else {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
      }
      return fmt;
    }
    this.borrowdate = new Date().format('yyyy-MM-dd');
    this.borrowdate1 = new Date().format('yyyy-MM-dd');
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

