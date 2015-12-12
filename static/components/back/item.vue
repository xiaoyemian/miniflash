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
<div class="item" @click.stop="setFocusItem" :class="{focus : focus_item && focus_item.itemdata.item_id == itemdata.item_id && frametype == 'keyframe'}" :style="style">
	<div class="handel">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>

return {
	props:['focus_item', 'itemdata', 'printsize']
	, data:function(){
		this.printscale = 0.4

		return {
			framestyle : {}
			, frametype : ''
			, style : {} 
		}
	}
	, methods : {
		setFocusItem : function(){
			this.$dispatch('setFocusItem', this)
		}
		, aspectRatio : function(){
			this.resetItemStyle({
				height:this.framestyle.width * this.itemdata.scale
			})
			this.updateItemStyle()
		}
		, formatItemStyle : function(){
			var style = this.framestyle
      if(style['padding-top']){
        var printsize = this.printsize

				this.$set('framestyle.height', printsize.width * style['padding-top']/100)

        style.width = printsize.width * style['width']/100
        style.top = printsize.height * style['top']/100
        style.left = printsize.width * style['left']/100

        delete style['padding-top']
      }

			console.log(style)
    }

		, resetItemStyle : function(style){
			for(var i in style)
				this.$set('framestyle["'+i+'"]', style[i] / this.printscale)
		}

		, updateItemStyle : function(){
			var style = this.framestyle
			var styleKey = ['width', 'height', 'top', 'left']
			for(var i in styleKey){
				var key = styleKey[i]
				this.$set('style["'+key+'"]', (style[key] ? style[key] : 0) * this.printscale + 'px')
			}

			var background = this.itemdata.background
			this.$set('style["background-image"]', 'url("' + background.image + '")')
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

