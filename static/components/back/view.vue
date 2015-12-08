<style>
.view{
	.pa;top:26px;bottom:160px;left:0px;right:0px;

	.page{
		.pa;
		.bgc(#fff);
	}
}
.flash{
	.pf;left:0px;right:0px;bottom:0px;
	overflow:auto;
	.h(160px);
	.bgc(#333);
	border:1px solid #222;
	border-bottom:0 none;
}
</style>


<template>
<itemsetting :focusitem="focusitem"></itemsetting>
<div class="view" @click="deleteFocus">
	<div class="page" :style="[style]">
		<item v-for="(item_id, itemdata) in pagedata.items" :itemdata="itemdata" :focusitem="focusitem"></item>
	</div>

</div>

<div class="flash">
	<track></track>
	<track v-for="(item_id, trackdata) in pagedata.track" :itemdata="pagedata.items[item_id]" :focusitem="focusitem" :trackdata="trackdata"></track>
</div>

</template>


<script>
require('jquery')
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')
var track = require('back/track.vue')

var width = 640
var height = 1136

var scale = ($(window).height()-160)/height*.8
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
			focusitem : null 
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
			this.focusitem = null 
		}
		, setFocus : function(item){
			this.focusitem = item
		}
	}
	, events : {
		setFocus : function(item){
			console.log(item)
			this.setFocus(item)
		}
		, updateItem : function(){
			this.$broadcast('reloadItem')
		}
	}
	, created : function(){
/*
		var size = this.size
		for(var i in this.pagedata.items){
			var itemdata = this.pagedata.items[i]
			var key = 'this.pagedata.items["' + i + '"].style'

			if(this.pagedata.items[i].style['padding-top']){
				this.$set(key + '.height', size.width * itemdata.style['padding-top']/100) 
				this.$set(key + '.width', size.width * itemdata.style['width']/100) 
				this.$set(key + '.top', size.height * itemdata.style['top']/100)
				this.$set(key + '.left', size.width * itemdata.style['left']/100)

				delete itemdata.style['padding-top']
			}
		}

		console.log('items', this.pagedata.items)
*/

	}
}
</script>

