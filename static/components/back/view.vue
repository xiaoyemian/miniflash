<style scoped>
.bgc(#fff);
.w(750px/2);.h(1334px/2);
margin:10px;
</style>

<template>
<item v-ref:item v-for="item in items" :item="item"></item>
</template>


<script>
var item = require('back/item.vue')

return {
	props:['items']
  ,components: {
    item:item
  }
	,created: function(){
		console.log(this)
  }
}
</script>

