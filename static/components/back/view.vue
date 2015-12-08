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
<itemsetting :itemdata="pagedata.items[focus.item_id]"></itemsetting>
<div class="view" @click="deleteItemFocus">
	<div class="page" :style="style">
		<item v-for="(item_id, itemdata) in pagedata.items" :itemdata="itemdata" :focus="focus"></item>
	</div>

</div>

<div class="flash">
	<track v-for="(item_id, trackdata) in pagedata.track" :item_id="item_id" :focus="focus" :trackdata="trackdata"></track>
</div>

</template>


<script>
require('jquery')
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')
var track = require('back/track.vue')

return {
  components : {
    item : item
		, track : track
		, itemsetting : itemsetting
  }
	, props:['pagedata']
	, data : function(){

		this.updateView(640, 1136)

		return {
			focus : {
				item_id : null
				, frame_id : null
			} 
			, size : this.size
			, style : this.style
		}

	}
	, watch : {
		size : function(val, oldVal){
			this.$broadcast('reloadItem', val, oldVal)
		}
		, 'focus.item_id' : function(){
			//console.log(arguments)
		}
		, 'focus.frame_id' : function(){
			//console.log(arguments)
		}
	}
	, methods : {
		updateView : function(width, height){
			width = width || 640
			height = height || 1136

			var scale = ($(window).height()-160)/height*.8
			if(scale >= 0.4)
				scale = 0.4

			this.size = {
				width : width * scale 
				, height : height * scale
			}
			this.style = {
				width : this.size.width + 'px'
				, height : this.size.height + 'px'
				, top : 10 + '%'
				, left : 50 + '%'
				, 'margin-left' : this.size.width * -0.5 + 'px'
			}
		}
		, deleteItemFocus : function(){
			this.focus.item_id = null 
		}
		, deleteFrameFocus : function(){
			this.focus.frame_id = null 
		}

	}
	, events : {
		updateItem : function(style){
			if(style && style['padding-top']){
				style.height = this.size.width * style['padding-top']/100
				style.width = this.size.width * style['width']/100
				style.top = this.size.height * style['top']/100
				style.left = this.size.width * style['left']/100

				delete style['padding-top']
			}
			this.$broadcast('updateItem', style)
		}
		, setItemFocus : function(item_id){
			this.focus.item_id = item_id
		}
		, setFrameFocus : function(frame_id){
			this.focus.frame_id = frame_id
		}
	}
	, ready : function(){
		var mSelf = this

		$(window).on('resize', function(){
			mSelf.updateView()
		})

	}
}
</script>

