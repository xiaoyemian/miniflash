<style>
.view{
	.bgc(#fff);
	.pa;
}
</style>


<template>
<div class="view" :style="[size, position]">
<item v-for="item in page.items" :item="item" :focus_id="focus_id"></item>
</div>
</template>


<script>
var item = require('back/item.vue')

var focus_id = 'item1429603485765'

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

return {
  components : {
    item:item
  }
	, props:['page']
	, data : function(){
		return {
			focus_id : focus_id
			, size : size
			, position : position
			, scale : scale
		}
	}
	, events : {
		updateFocus : function(item_id){
			this.focus_id = item_id
		}
	}
}
</script>

