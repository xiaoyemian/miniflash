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
				.opacity(60);
				.pa;left:50%;top:50%;.ml(-4px);.mt(-4px);.w(7px);.h(7px);.bgc(#fff);.cursor;
				border:1px solid #222;
				.border-r(8px);

				&:before, &:after{ content:'';.pa;z-index:1; }
				&:before{
					top:0px;left:0px;.w(7px);.h(3px);
					border-bottom:1px solid #222;
				}
				&:after{
					top:0px;left:0px;.w(3px);.h(7px);
					border-right:1px solid #222;
				}
			}
		}
		.ui-resizable{
			&-se{ bottom:-10px;right:-10px;.w(10px);.h(10px); }
			&-e{ top:-0px;bottom:-0px;right:-10px;.w(10px); }
			&-s{ left:-0px;right:-0px;bottom:-10px;.h(10px); }
		}

	}
}
</style>

<template>
<div class="item" @click.stop="setFocusItem" :class="{focus : focus_item && focus_item.itemdata.item_id == itemdata.item_id, keyframe : frametype == 'keyframe'}" :style="itemstyle">
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
			this.framestyle.height = this.framestyle.width * this.itemdata.scale
			this.updateItemStyle()
		}
		, formatItemStyle : function(){
      if(this.framestyle['padding-top']){

				this.framestyle.height = this.print.width * this.framestyle['padding-top']/100 
        delete this.framestyle['padding-top']

        this.framestyle.width *= this.print.width/100
        this.framestyle.top *= this.print.height/100
        this.framestyle.left *= this.print.width/100
      }

			for(var i in this.framestyle)
				this.framestyle[i] = this.framestyle[i]|0
    }

		, resetItemStyle : function(style){
			for(var i in style)
				this.framestyle[i] = ((style[i]|0) / this.print.scale)|0
		}

		, updateItemStyle : function(){
			for(var i in this.stylekey)
				this.$set('itemstyle["'+i+'"]', (this.framestyle[i]|0) * this.print.scale + 'px')

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

