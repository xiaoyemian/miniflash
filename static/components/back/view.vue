<style>
.view{
	.bgc(#fff);
	.pa;
}
</style>


<template>
<div class="view" :style="[size, position]">
<item v-ref:item v-for="item in page.items" :item="item"></item>
</div>
</template>


<script>
var item = require('back/item.vue')

var scale = 0.5
var size = {
	width : 640 * scale + 'px'
	, height : 1136 * scale + 'px'
}
var position = {
	top : 50 + '%'
	, left : 50 + '%'
	, 'margin-top' : parseInt(size.height) * -0.5 + 'px'
	, 'margin-left' : parseInt(size.width) * -0.5 + 'px'
}
console.log(position)

return {
	props:['page']
	, data : function(){
		return {
			size : size
			, position : position
			, scale : scale
		}
	}
  , components : {
    item:item
  }
}
</script>

