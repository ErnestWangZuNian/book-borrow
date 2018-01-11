<template>
  <yd-layout>
    <yd-search :result="result" fullpage v-model="searchValue" :on-submit="submitHandler"></yd-search>
    <Book-list></Book-list>
  </yd-layout>
</template>

<script>
import BookList from '../common/BookList'
export default {
  name: 'Index',
  components:{
    BookList
  },
  data(){
    return {
      result: [],
      searchValue: '',
    }
  },
  methods: {
   submitHandler(){

   }
  }
}
</script>

