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
	<track v-for="(item_id, trackdata) in pagedata.track" :trackdata="trackdata" :focusitem="focusitem"></track>
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
			this.setFocus(item)
		}
		, updateItem : function(){
			this.focusitem.reloadItem()
		}
	}
	, created : function(){
/*
		if(Array.isArray(this.pagedata.items)){
			var items = this.pagedata.items
			this.pagedata.items = {}
			for(var i in items){
				var item = items[i]
				this.pagedata.items[item.item_id] = item
			}
		}
*/

		this.pagedata.track = [{
			item_id : 'item1429603376791'
			, frames : {
				0 : {
					style : {
						left:0,top:0,width:100,height:200
					}
					, type : ''
				}
				, 500 : {
					style : {
						left:0,top:0,width:100,height:200
					}
					, type : ''
				}

			}
		}, {
			item_id : 'item1429603485765'
			, frames : {
				300 : {
					style : {
						left:0,top:0,width:100,height:200
					}
					, type : ''
				}
			}
		}, {
			item_id : 'item1429603376791'
			, frames : {
				500 : {
					style : {
						left:0,top:0,width:100,height:200
					}
					, type : ''
				}
			}

		}]
	}
}
</script>

