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
<div class="item" @click.stop="selectItem" :class="[framedata && framedata.type, focus_item && focus_item.itemdata.item_id == itemdata.item_id ? 'focus' : '']" :style="itemstyle">
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
			framedata : null
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
		, aspectRatio : function(){
			var style = this.framedata.style
			style.height = style.width * this.itemdata.scale

			this.updateItemStyle()
		}
		, formatItemStyle : function(){
			var style = this.framedata.style
      if(style['padding-top']){

				this.$set('framedata.style.height', this.print.width * style['padding-top']/100)
        delete style['padding-top']

        style.width *= this.print.width/100
        style.top *= this.print.height/100
        style.left *= this.print.width/100
      }

    }
		, resetItemStyle : function(opts){
			var style = this.framedata.style
			for(var i in opts)
				style[i] = (opts[i]) / this.print.scale

			this.updateItemStyle()
		}
		, updateItemStyle : function(){
			var style = this.framedata.style

			for(var i in style)
				style[i] = style[i]|0

			for(var i in this.stylekey)
				this.$set('itemstyle["'+i+'"]', (style[i]||0) * this.print.scale + 'px')

			this.$set('itemstyle["background-image"]', 'url("' + this.itemdata.background.image + '")')
		}
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
			if(item_id == this.itemdata.item_id){
				this.framedata = framedata
				this.formatItemStyle()
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

