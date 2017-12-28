<template>
   <yd-layout>
        <yd-search  :result="result" fullpage v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler"></yd-search>
    </yd-layout>
</template>

<script>

export default {
  name: 'Index'
}
</script>
