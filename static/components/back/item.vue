<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	&.focus{
		.handel{
			.pa;top:0px;left:0px;right:0px;bottom:0px;
			border:10px solid #f69;
		
			.aspectRatioBtn{
				.pa;left:50%;top:0%;.ml(-10px);.w(20px);.h(20px);.bgc(red);
				.cursor;
			}
		}
		.ui-resizable{
			&-se{ bottom:-0px;right:-0px;.w(10px);.h(10px); }
			&-e{ top:0px;bottom:-0px;right:-0px;.w(10px); }
			&-s{ left:0px;right:-0px;bottom:-0px;.h(10px); }
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
	props:['focus_item', 'itemdata', 'printsize', 'printscale', 'stylekey', 'backgroundkey']
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
				this.$set('framestyle.height', this.printsize.width * this.framestyle['padding-top']/100)

        this.framestyle.width *= this.printsize.width/100
        this.framestyle.top *= this.printsize.height/100
        this.framestyle.left *= this.printsize.width/100

        delete this.framestyle['padding-top']
      }
			console.log(this.framestyle)
    }

		, resetItemStyle : function(style){
			for(var i in style)
				this.$set('framestyle["'+i+'"]', (style[i]|0) / this.printscale)
		}

		, updateItemStyle : function(){
			for(var i in this.stylekey){
				this.$set('itemstyle["'+i+'"]', (this.framestyle[i]|0) * this.printscale + 'px')
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

