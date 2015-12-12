<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	&.focus{
		.handel{
			.pa;top:-10px;left:-10px;right:-10px;bottom:-10px;
			border:10px solid #f69;
		
			.aspectRatioBtn{
				.pa;left:50%;top:0%;.ml(-10px);.w(20px);.h(20px);.bgc(red);
				.cursor;
			}
		}
		.ui-resizable{
			&-se{ bottom:-10px;right:-10px;.w(10px);.h(10px); }
			&-e{ top:-10px;bottom:-10px;right:-10px;.w(10px); }
			&-s{ left:-10px;right:-10px;bottom:-10px;.h(10px); }
		}

	}
}
</style>

<template>
<div class="item" @click.stop="setFocusItem" :class="{focus : focus_item && focus_item.itemdata.item_id == itemdata.item_id && frametype == 'keyframe'}" :style="itemstyle">
	<div class="handel">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>

return {
	props:['focus_item', 'itemdata', 'print', 'stylekey', 'backgroundkey']
	, data:function(){
		return {
			frametype : ''
			, framestyle : {}
			, itemstyle : {} 
		}
	}
	, methods : {
		setFocusItem : function(){
			this.$dispatch('setFocusItem', this)
		}
		, aspectRatio : function(){
			this.$set('framestyle["height"]', this.framestyle.width * this.itemdata.scale)
			this.updateItemStyle()
		}
		, formatItemStyle : function(){
      if(this.framestyle['padding-top']){
				var framestyle = this.framestyle 
				var size = this.print.size

				this.$set('framestyle.height', size.width * framestyle['padding-top']/100)

        framestyle.width *= size.width/100
        framestyle.top *= size.height/100
        framestyle.left *= size.width/100

        delete framestyle['padding-top']
      }
    }

		, resetItemStyle : function(style){
			var scale = this.print.scale
			for(var i in style)
				this.$set('framestyle["'+i+'"]', (style[i]|0) / scale)
		}

		, updateItemStyle : function(){
			var framestyle = this.framestyle 
			var scale = this.print.scale

			for(var i in this.stylekey){
				this.$set('itemstyle["'+i+'"]', (framestyle[i]|0) * scale + 'px')
			}

			this.$set('itemstyle["background-image"]', 'url("' + this.itemdata.background.image + '")')
		}
	}
	, events : {
		updateItemByFrame : function(item_id, framedata){
			if(item_id == this.itemdata.item_id){
				this.framestyle = framedata.style
				this.frametype = framedata.type
				this.formatItemStyle()
				this.updateItemStyle()
				
				this.setFocusItem()
			}
		}
		, updateItemStyle : function(){
			this.updateItemStyle()
		}
	}
	, ready : function(){
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
			, cursor: "crosshair"
			, containment : "document"
			, scroll : false
			, snap : '.page'
			, snapTolerance : '10'
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
}
</script>

