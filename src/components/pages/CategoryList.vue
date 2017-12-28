<template>
    <yd-layout title="图书分类">

        <yd-scrolltab :callback="change">
            <yd-scrolltab-panel v-for="item in list" :key="item.id" :label="item.name">
                <div style="min-height: 3.5rem">

                    <yd-list theme="4">
                        <yd-list-item v-for="item in bookList" :key="item.id">
                            <img slot="img" :src="item.img">
                            <span slot="title">{{item.title}}</span>
                            <yd-list-other slot="other">
                                <div>
                                    <span class="demo-list-price">
                                        {{item.name}}</span>
                                    <span class="demo-list-del-price">{{item.name}}</span>
                                </div>
                                <div>content</div>
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
            bookList: []
        }
    },
    methods: {
        change(index) {
            this.getBookList();
        },
        getBookList() {
            this.api.getBookList().then(res => {
                this.bookList = res.data.data
            })
        }
    },
    mounted() {
        this.api.getCategoryList().then(res => {
            this.list = res.data.data
        })
    }
}
</script>
<style>
.yd-flexview {
    min-height: 12rem;
}
</style>
