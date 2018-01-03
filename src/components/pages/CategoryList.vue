<template>
    <yd-layout title="图书分类">

        <yd-scrolltab :callback="change">
            <yd-scrolltab-panel v-for="item in list" :key="item.id" :label="item.name">
                <div style="min-height: 3.5rem">

                    <yd-list theme="4">
                        <yd-list-item v-for="child in bookList[item.id]" :key="child.id">
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
                </div>
            </yd-scrolltab-panel>
        </yd-scrolltab>
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
        <!-- 弹窗提示 -->
        <yd-popup v-model="showModal2" position="center" width="90%">
            <yd-button-group>
                <div class="borrow-time">
                    <yd-cell-group>
                        <yd-cell-item arrow>
                            <span slot="left">预计归还日期：</span>
                            <yd-datetime ref="datetime1" type="date" v-model="borrowdate1" slot="right" :callback="confirmBorrow1"></yd-datetime>
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
    data() {
        return {
            list: [],
            bookList: [],
            showModal: false,
            showModal2: false,
            currentId:'',
            borrowdate: '',
            borrowdate1: '',
        }
    },
    methods: {
        change(index) {
            this.list.map((item, index1) => {
                if (index === index1) {
                    this.currentId = item.id;
                    this.getBookList(item.id);
                }
            })
        },
        getBookList(categoryId) {
            this.api.getBookList({ category_id: categoryId }).then(res => {
                this.bookList = [];
                this.bookList[categoryId] = res.data.data
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
        confirmBorrow() {
            this.api.borrow({
                book_id: this.selectedBook ? this.selectedBook.id : null,
                pre_return_at: this.borrowdate
            }).then(res => {
                this.showModal = false;
                this.getBookList(this.currentId);
            })
        },
        confirmBorrow1() {
            this.api.returnBook({
                book_id: this.selectedBook ? this.selectedBook.id : null,
                pre_return_at: this.borrowdate1
            }).then(res => {
                this.showModal2 = false;
                this.getBookList(this.currentId);
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
        this.api.getCategoryList().then(res => {
            this.list = res.data.data;
            this.currentId = this.list[0].id;
            this.getBookList(this.list[0].id);
        })
    }
}
</script>
<style>
.yd-flexview {
    min-height: 12rem;
}
.borrow-time {
  padding: 0.2rem;
}

.borrow-time .yd-btn-block {
  margin-top: 0;
}
</style>
