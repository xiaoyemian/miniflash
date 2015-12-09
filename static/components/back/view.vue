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
<itemsetting :focus="focus" :itemdata="pagedata.items[focus.item_id]"></itemsetting>
<div class="view" @click="clearFocus">
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
		this.clearFocus()

		return {
		}

	}
	, watch : {
		size : function(val, oldVal){
			this.$broadcast('reloadItem', val, oldVal)
		}
		, 'focus' : function(){
			console.log(arguments)
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
		, clearFocus : function(){
			this.focus = {}
			Vue.set(this.focus, 'item_id', null)
			Vue.set(this.focus, 'frame_id', null)
			Vue.set(this.focus, 'style', {})
		}

	}
	, events : {
		setFocus : function(item_id, frame_id, style){
			if(item_id == this.focus.item_id && frame_id == this.focus.frame_id)
				return;

			console.log(style)

			if(!style){
				this.$emit('setFocusByFrame', item_id, frame_id)

			}else{
				this.$emit('setFocusByStyle', style, item_id, frame_id)
			}
		}
		, setFocusByFrame : function(item_id, frame_id){
			this.$broadcast('selectFrame', item_id, frame_id || 0)
		}
		, setFocusByStyle : function(style, item_id, frame_id){
			Vue.set(this.focus, 'item_id', item_id)
			Vue.set(this.focus, 'frame_id', frame_id || 0)
			Vue.set(this.focus, 'style', style)

			if(style && style['padding-top']){
				var size = this.size

				Vue.set(this.focus.style, 'height', size.width * style['padding-top']/100)

				style.width = size.width * style['width']/100
				style.top = size.height * style['top']/100
				style.left = size.width * style['left']/100

				delete style['padding-top']
			}

			this.$broadcast('updateItem')
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

