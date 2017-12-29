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
                                    <div class="book-list-btn mt10" v-if="child.borrows_status === 1"><yd-button type="primary">我要借阅</yd-button></div>
                                    <div class="book-list-btn mt10" v-if="child.borrows_status === 2"><yd-button type="primary">我要还书</yd-button></div>
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

    </yd-layout>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            bookList: [],
        }
    },
    methods: {
        change(index) {
            this.list.map((item,index1) => {
                if(index === index1) {
                  this.getBookList(item.id);
                }
            })
        },
        getBookList(categoryId) {
            this.api.getBookList({category_id: categoryId}).then(res => {
                this.bookList = [];
                this.bookList[categoryId] = res.data.data
            })
        }
    },
    mounted() {
        this.api.getCategoryList().then(res => {
            this.list = res.data.data
            this.getBookList(this.list[0].id)
        })
    }
}
</script>
<style>
.yd-flexview {
    min-height: 12rem;
}
</style>
