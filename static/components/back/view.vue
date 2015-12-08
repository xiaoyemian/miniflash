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
<itemsetting :itemdata="pagedata.items[focus_id]"></itemsetting>
<div class="view" @click="deleteFocus">
	<div class="page" :style="style">
		<item v-for="(item_id, itemdata) in pagedata.items" :itemdata="itemdata" :focus_id="focus_id"></item>
	</div>

</div>

<div class="flash">
	<track v-for="(item_id, trackdata) in pagedata.track" :itemdata="pagedata.items[item_id]" :focus_id="focus_id" :trackdata="trackdata"></track>
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

		var mSelf = this

		var t =setTimeout(function(){mSelf.updateView(840, 1136)}, 3000)

		return {
			focus_id : null 
			, size : this.size
			, style : this.style
		}

	}
	, watch : {
		size : function(val, oldVal){
			this.$broadcast('reloadItem', val, oldVal)
		}
	}
	, methods : {
		updateView : function(width, height){

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
		, deleteFocus : function(){
			this.focus_id = null 
		}
		, setFocus : function(item_id){
			this.focus_id = item_id
		}
	}
	, events : {
		setFocus : function(item_id){
			this.setFocus(item_id)
		}
		, updateItem : function(){
			this.$broadcast('updateItem')
		}
	}
}
</script>

