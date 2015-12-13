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
			style.height = style.width * this.itemdata.original.height / this.itemdata.original.width

			this.loadItemStyle()
		}
		, resetItemStyle : function(opts){
			for(var i in opts)
				this.framedata.style[i] = (opts[i]) / this.print.scale

			this.loadItemStyle()
		}

		, loadItemStyle : function(){
			var style = this.framedata.style

			this.framestyle = {}
			
			for(var i in style){
				if(style[i]){
					this.$set('framestyle["' + i + '"]', style[i] * this.print.scale + 'px')
				}
			}

		}
		, formatItem : function(){
			var itemdata = this.itemdata

			if(!itemdata.original){
				var original = {
					width : 640 * itemdata.style['width']/100
					, height : 640 * itemdata.style['padding-top']/100
					, imageUrl : itemdata.background.image
				}

				this.$set('itemdata.original', original)
			}

			if(!itemdata.frames){
				var frames = {
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
				this.$set('itemdata.frames', frames)
			}

			delete itemdata.style
			delete itemdata.background
			delete itemdata.scale
		}
	}
	, events : {
		loadItemByTrack : function(track){
			if(track.item_id == this.itemdata.item_id){

				var frame = track.focus_frame
				this.framedata = frame.framedata

				if(this.framedata.type == 'blankframe'){
					this.framedata.style = {}

					for(var i = frame.time; i >= 0; i--){

						var framedata = track.frameslist[i]

						if(framedata.type && framedata.type != 'blankframe'){

							for(var i in framedata.style)
								this.framedata.style[i] = framedata.style[i]

							break;
						}
					}
				}

				this.loadItemStyle()

			}
		}
		, focusItemById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.setFocusItem()
			}
		}
		, loadItemStyle : function(){
			this.loadItemStyle()
		}
	}
	, ready : function(){
		console.log(this.itemdata)
		var mSelf = this
		var $item = $(this.$el)

		$item.draggable({
			start : function(event, ui){
				mSelf.selectItem()
				mSelf.framedata.type = 'keyframe'
			}
			, drag : function(event, ui){
				mSelf.resetItemStyle(ui.position)
			}
			, stop : function(event, ui){
				mSelf.loadItemStyle()
			}
			, cursor: "move"
			, containment : "document"
			, scroll : false
			, snap : '.page'
			, snapTolerance : '4'
		})
	
		$item.resizable({
			start : function(event, ui){
				mSelf.selectItem()
				mSelf.framedata.type = 'keyframe'
			}
			, resize : function(event, ui){
				mSelf.resetItemStyle(ui.size)
			}
			, stop : function(event, ui){
				mSelf.loadItemStyle()
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

