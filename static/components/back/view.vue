<style scoped>
.bgc(#fff);
.w(750px/2);.h(1334px/2);
margin:10px;
</style>

<template>
<item v-for="item in items" :itemdata="item|json"></item>
</template>


<script>
var item = require('back/item.vue')

return {
  data:function(){ 
		return {
			items: [
				{ message: 'Foo' },
				{ message: 'Bar' }
			]	
		} 
	}
	, props:['itemdata']
  ,components: {
    item:item
  }
}
</script>

