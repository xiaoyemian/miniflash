<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	&.focus{
		.handel{
			.pa;top:-1px;left:-1px;right:-1px;bottom:-1px;
			border:1px solid #5CADD6;
		
			.aspectRatioBtn{
				.pa;left:50%;top:50%;.ml(-5px);.mt(-5px);.w(9px);.h(9px);.bgc(#fff);.cursor;
				border:1px solid #222;
				.border-r(8px);
				.opacity(80);

				&:before, &:after{ content:'';.pa;z-index:1; }
				&:before{
					top:0px;left:0px;.w(9px);.h(4px);
					border-bottom:1px solid #222;
				}
				&:after{
					top:0px;left:0px;.w(4px);.h(9px);
					border-right:1px solid #222;
				}
			}
		}
		.ui-resizable{
			&-se, &-e, &-s{
				border:1px solid #222;
				.bgc(#fff);
				.opacity(80);
				.w(10px);.h(10px);
			}
			&-se{ 
				bottom:-6px;right:-6px;
				.border-r(8px);
			}
			&-e, &-s{
				.border-r(3px);
			}
			&-e{
				top:50%;right:-6px;.mt(-5px);
			}
			&-s{ 
				left:50%;bottom:-6px;.ml(-5px);
			}
		}

	}
}
</style>

<template>
<div class="item" @click.stop="selectItem" :class="[framedata && framedata.type, focus_item && focus_item.itemdata.item_id == itemdata.item_id ? 'focus' : '']" :style="[itemstyle, framestyle]">
	<div class="handel">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>

return {
	props:['focus_item', 'itemdata', 'print']
	, data:function(){

		return {
			framedata : null
			, framestyle : {} 
			, itemstyle : {}
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('selectItem', this)
		}
		, setFocusItem : function(){
			this.$dispatch('setFocusItem', this)
		}
		, loadItemByOriginal : function(){
			var style = this.itemdata.original

			this.itemstyle = {
				width : style.width * this.print.scale + 'px'
				, height : style.height * this.print.scale + 'px'
				, 'background-image' : 'url("' + style.imageUrl + '")'
			}
		}
		, aspectRatio : function(){
			var style = this.framedata.style
			style.height = style.width * this.itemdata.original.scale

			this.updateItemStyle()
		}
		, resetItemStyle : function(opts){
			for(var i in opts)
				this.framedata.style[i] = (opts[i]) / this.print.scale

			this.updateItemStyle()
		}
		, updateItemStyle : function(){
			var style = this.framedata.style

			this.framestyle = {
				width : (style.width||0) * this.print.scale + 'px'
				, height : (style.height||0) * this.print.scale + 'px'
				, top : (style.top||0) * this.print.scale + 'px'
				, left : (style.left||0) * this.print.scale + 'px'
			}
		}
		, formatItem : function(){
			var itemdata = this.itemdata

			if(!itemdata.original){
				var original = {
					width : 640 * itemdata.style['width']/100
					, height : 640 * itemdata.style['padding-top']/100
					, scale : itemdata.scale
					, imageUrl : itemdata.background.image
				}

				this.$set('itemdata.original', original)
			}

			if(!itemdata.tracks){
				var tracks = {
					0 : {
						style : {
							width : itemdata.original.width
							, height : itemdata.original.height
							, left : 640 * itemdata.style['left']/100	
							, top : 1136 * itemdata.style['top']/100	
						}
						, type : 'keyframe'
					}
				}
				this.$set('itemdata.tracks', tracks)
			}

			delete itemdata.style
			delete itemdata.background
			delete itemdata.scale
		}
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
			if(item_id == this.itemdata.item_id){
				this.framedata = framedata
				this.updateItemStyle()
			}
		}
		, focusItemById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.setFocusItem()
			}
		}
		, updateItemStyle : function(){
			this.updateItemStyle()
		}
	}
	, ready : function(){
		console.log(this.itemdata)
		var mSelf = this
		var $item = $(this.$el)

		$item.draggable({
			start : function(event, ui){
				mSelf.setFocusItem()
			}
			, drag : function(event, ui){
				mSelf.resetItemStyle(ui.position)
			}
			, stop : function(event, ui){
				mSelf.updateItemStyle()
			}
			, cursor: "move"
			, containment : "document"
			, scroll : false
			, snap : '.page'
			, snapTolerance : '4'
		})
	
		$item.resizable({
			start : function(event, ui){
				mSelf.setFocusItem()
			}
			, resize : function(event, ui){
				mSelf.resetItemStyle(ui.size)
			}
			, stop : function(event, ui){
				mSelf.updateItemStyle()
			}
			, ghost: true
		})
	}
	, created : function(){
		this.formatItem()
		this.loadItemByOriginal()
	}
}
</script>

