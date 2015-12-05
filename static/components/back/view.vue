<style scoped>
.bgc(#fff);
.w(6.4rem);.h(11.36rem);
.pa;
top:50%;.mt(11.36rem/-2);
left:50%;.ml(6.4rem/-2);

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

