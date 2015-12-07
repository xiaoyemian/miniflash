<style>
.view{
	.pa;
	top:26px;bottom:160px;left:0px;right:0px;
	.page {
		.bgc(#fff);
		.pa;
	}
}
</style>


<template>
<menu :focus="focus"></menu>
<div class="view" @click="deleteFocus">
	<div class="page" :style="[style]">
		<item v-for="(index, itemdata) in pagedata.items" :itemdata="itemdata" :focus="focus"></item>
	</div>
</div>
</template>


<script>
require('jquery')
var item = require('back/item.vue')
var menu = require('back/menu.vue')

var width = 640
var height = 1136

var scale = ($(window).height()-220)/height*.8

return {
  components : {
    item : item
		, menu : menu
  }
	, props:['pagedata']
	, data : function(){

		var size = {
			width : width * scale 
			, height : height * scale
		}

		return {
			focus : null 
			, size : size
			, style : {
				width : size.width + 'px'
				, height : size.height + 'px'
				, top : 50 + '%'
				, left : 50 + '%'
				, 'margin-top' : size.height * -0.5 + 'px'
				, 'margin-left' : size.width * -0.5 + 'px'
			}
		}
	}
	, methods : {
		deleteFocus : function(){
			this.focus = null 
		}
		, setFocus : function(item){
			this.focus = item
		}
	}
	, events : {
		setFocus : function(item){
			this.setFocus(item)
		}
		, updateItem : function(){
			this.focus.reloadItem()
		}
	}
}
</script>

