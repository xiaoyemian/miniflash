<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	&.focus{
		.handle{
			.pa;top:0px;left:0px;right:0px;bottom:0px;
			border:10px solid #f69;
		
			.aspectRatioBtn{
				.pa;left:50%;top:0%;.ml(-10px);.w(20px);.h(20px);.bgc(red);
				.cursor;
			}
		}
	}
}
</style>

<template>
<div class="item" @click.stop="selectItem" :class="{focus : focus.item_id == itemdata.item_id}" :style="style">
	<div class="handle">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>
require('jqui/draggable')
require('jqui/resizable')

return {
	props:['focus', 'itemdata']
	, data:function(){

		return {
			style : {} 
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.itemdata.item_id)
		}
		, aspectRatio : function(){
			var style = this.focus.style
			Vue.set(this.focus.style, 'height', style.width*this.itemdata.scale)
			this.$emit('updateItem')

		}
		, setItemStyle : function(opts){
			if(this.itemdata.item_id == this.focus.item_id){
				var style = this.focus.style
				opts = opts || {}

				for(var i in opts){
					Vue.set(this.focus.style, i, opts[i])
				}
			}
		}
		, updateStyle : function(style){
			var styleKey = ['width', 'height', 'top', 'left']
			for(var i in styleKey){
				var key = styleKey[i]
				Vue.set(this.style, key, style[key] + 'px')
			}

			var background = this.itemdata.background
			Vue.set(this.style, 'background-image', 'url("' + background.image + '")')
		}
	}
	, events : {
		updateItem : function(opts){
			if(opts && opts.item_id){
				if(opts.item_id == this.itemdata.item_id){
					this.updateStyle(opts.style)
				}

			}else{
				if(this.itemdata.item_id == this.focus.item_id){
					this.updateStyle(this.focus.style)
				}

			}
		}
		, reloadItem : function(size, oldsize){
			var scale = size.width/oldsize.width
		}
	}
	, ready : function(){
		var mSelf = this
		var $item = $(this.$el)

		$item.draggable({
			start : function(event, opts){
				mSelf.selectItem()
			}
			, drag : function(event, opts){
				mSelf.setItemStyle(opts.position)
			}
			, stop : function(event, opts){
				mSelf.$emit('updateItem')
			}
			, containment : "document"
			, snap : '.page'
			, snapTolerance : '10'
		})
	
		$item.resizable({
			start : function(event, opts){
				mSelf.selectItem()
			}
			, resize : function(event, opts){
				mSelf.setItemStyle(opts.size)
			}
			, stop : function(event, opts){
				mSelf.$emit('updateItem')
			}
			, ghost: true
		})

	}
}
</script>

