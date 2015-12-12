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
				.opacity(80);
			}
			&-se{ 
				bottom:-6px;right:-6px;.w(9px);.h(9px);border:1px solid #222;.bgc(#fff);
				.border-r(8px);
			}
			&-e, &-s{
				&:before{
					content:'';.pa;z-index:1;
					border:1px solid #222;.bgc(#fff);
					.pa;.w(8px);.h(8px);
					.border-r(3px);
				}
			}
			&-e{ right:-6px;.w(10px);.h(100%);
				&:before{
					top:50%;.mt(-5px);
				}
			}
			&-s{ bottom:-6px;.h(10px);.w(100%);
				&:before{
					left:50%;.ml(-5px);
				}
			}
		}

	}
}
</style>

<template>
<div class="item" @click.stop="setFocusItem(true)" :class="[frame && frame.framedata.type, focus_item && focus_item.itemdata.item_id == itemdata.item_id ? 'focus' : '']" :style="itemstyle">
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
			frame : null
			, itemstyle : {} 
		}
	}
	, methods : {
		setFocusItem : function(doFocusTrack){
			this.$dispatch('setFocusItem', this, doFocusTrack)
		}
		, aspectRatio : function(){
			var style = this.frame.framedata.style
			style.height = style.width * this.itemdata.scale

			this.updateItemStyle()
		}
		, formatItemStyle : function(){
			var style = this.frame.framedata.style
      if(style['padding-top']){

				this.$set('frame.framedata.style.height', this.print.width * style['padding-top']/100)
        delete style['padding-top']

        style.width *= this.print.width/100
        style.top *= this.print.height/100
        style.left *= this.print.width/100
      }

			for(var i in style)
				style[i] = style[i]|0
    }
		, resetItemStyle : function(opts){
			var style = this.frame.framedata.style
			for(var i in opts)
				style[i] = ((opts[i]|0) / this.print.scale)|0

			this.updateItemStyle()
		}
		, updateItemStyle : function(){
			var style = this.frame.framedata.style
			for(var i in this.stylekey)
				this.$set('itemstyle["'+i+'"]', (style[i]|0) * this.print.scale + 'px')

			this.$set('itemstyle["background-image"]', 'url("' + this.itemdata.background.image + '")')
		}
	}
	, events : {
		updateItemByFrame : function(track){
			if(track.item_id == this.itemdata.item_id){
				console.log('updateItemByFrame')
				this.frame = track.focus_frame
				this.formatItemStyle()
				this.updateItemStyle()
				this.setFocusItem(false)
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
				mSelf.setFocusItem(false)
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
				mSelf.setFocusItem(false)
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

