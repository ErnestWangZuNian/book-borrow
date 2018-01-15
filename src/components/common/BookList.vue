<template>
  <yd-layout>
    <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
      <yd-list theme="3">
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
              <div class="book-list-btn mt10" v-if="child.locked == 2 && child.borrows_status == 2" @click="confirmBorrow1(child)">
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
    </yd-pullrefresh>
    <yd-backtop></yd-backtop>
    <!-- 弹窗提示 -->
    <yd-popup v-model="showModal" position="center" width="90%">
      <yd-button-group>
        <div class="borrow-time">
          <yd-cell-group>
            <yd-cell-item arrow>
              <span slot="left">预计归还日期：</span>
              <yd-datetime ref="datetime2" type="date" v-model="borrowdate" slot="right" :callback="confirmBorrow2"></yd-datetime>
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
    name: 'BookList',
    data() {
      return {
        result: [],
        bookList: [],
        showModal: false,
        count: 1,
        currentPage: 1,
        lastPage: 1,
        showModal2: true,
        selectedBook: null,
        borrowdate: '',
        borrowdate1: '',
        searchValue: ''
      }
    },
    methods: {
      borrow(child) {
        this.showModal = true;
        this.selectedBook = child;
      },
      returnBook(child) {
        this.showModal2 = true;
        this.selectedBook = child;
      },
      open() {
        console.log(this.$refs);
        this.$refs.datetime2.open();
      },
      open1() {
        console.log(this.$refs);
        this.$refs.datetime1.open();
      },
      getBook(param) {
        this.api.getBookList(Object.assign({
          page: this.currentPage
        }, param)).then(res => {
          this.bookList = [...this.bookList, ...res.data.data];
          this.lastPage = res.data.last_page
        })
      },
      loadList() {
        if (this.currentPage <= this.lastPage) {
          ++this.currentPage;
          this.api.getBookList({
            page: this.currentPage
          }).then(res => {
            let list = res.data.data;
            this.bookList = [...this.bookList, ...res.data.data];
            this.$dialog.toast({
              mes: list.length > 0 ? '为您更新了' + list.length + '条书籍信息' : '已是最新书籍信息'
            });
            this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
          })
        } else {
          this.$dialog.toast({
            mes: '没有更多数据了'
          });
          this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
        }
      },
      confirmBorrow2() {
        if(Number(this.count) > 1) {
          this.api.borrow({
            book_id: this.selectedBook ? this.selectedBook.id : null,
            pre_return_at: this.borrowdate
          }).then(res => {
            this.showModal = false;
            this.count++;
            this.getBook();
          })
        }
      },
      confirmBorrow1() {
        alert('1')
        // this.api.returnBook({
        //   book_id: this.selectedBook ? this.selectedBook.id : null,
        //   pre_return_at: this.borrowdate1
        // }).then(res => {
        //   this.showModal2 = false;
        //   this.getBook();
        // })
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
            } else if (k == "S+") {
              var lens = RegExp.$1.length;
              lens = lens == 1 ? 3 : lens;
              fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            } else {
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
  .yd-backtop {
    background-color: red;
  }
</style>

