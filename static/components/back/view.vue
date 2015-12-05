<style scoped>
.bgc(#fff);
.w(7.5rem);.h(13.34rem);
.pa;
top:50%;.mt(13.34rem/-2);
left:50%;.ml(7.5rem/-2);

</style>


<template>
<item v-ref:item v-for="item in page.items" :item="item"></item>
</template>


<script>
var item = require('back/item.vue')

return {
	props:['page']
  ,components: {
    item:item
  }
	,created: function(){
		console.log(this)
  }
}
</script>

