<style>
.view{
	.pa;
	top:26px;bottom:220px;left:0px;right:0px;

	.page{
		.pa;
		.bgc(#fff);
	}
}
</style>


<template>
<itemsetting :focus="focus"></itemsetting>

<div class="view" @click="deleteFocus">
	<div class="page" :style="[style]">
		<item v-for="(index, itemdata) in pagedata.items" :itemdata="itemdata" :focus="focus"></item>
	</div>
</div>

<div class="tracksetting">
	<track v-for="(index, trackdata) in pagedata.track" :trackdata="trackdata" :focus="focus"></track>
</div>

</template>


<script>
require('jquery')
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')
var track = require('back/track.vue')

var width = 640
var height = 1136

var scale = ($(window).height()-220)/height*.8
if(scale >= 0.4)
	scale = 0.4


return {
  components : {
    item : item
		, track : track
		, itemsetting : itemsetting
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
				, top : 10 + '%'
				, left : 50 + '%'
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

