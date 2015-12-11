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
<div class="item" @click.stop="selectItem" :class="{focus : focus.item_id == itemdata.item_id}" :style="style">
	<div class="handel">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>

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
			this.$set('focus.style.height', style.width*this.itemdata.scale)
			this.$emit('updateItem')

		}
		, setItemStyle : function(opts){
			if(this.itemdata.item_id == this.focus.item_id){
				var style = this.focus.style
				opts = opts || {}

				for(var key in opts){
					this.$set('focus.style["'+key+'"]', opts[key])
				}
			}
		}
		, updateStyle : function(style){
			var styleKey = ['width', 'height', 'top', 'left']
			for(var i in styleKey){
				var key = styleKey[i]
				this.$set('style["'+key+'"]', style[key] + 'px')
			}

			var background = this.itemdata.background
			this.$set('style["background-image"]', 'url("' + background.image + '")')
		}
	}
	, events : {
		updateItem : function(opts){
			var focus = (opts && opts.item_id) ? opts : this.focus

			if(this.itemdata.item_id == focus.item_id){
				this.updateStyle(focus.style)
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
			start : function(event, ui){
				mSelf.selectItem()
			}
			, drag : function(event, ui){
				mSelf.setItemStyle(ui.position)
			}
			, stop : function(event, ui){
				mSelf.$emit('updateItem')
			}
			, containment : "document"
			, scroll : false
			, snap : '.page'
			, snapTolerance : '10'
		})
	
		$item.resizable({
			start : function(event, ui){
				mSelf.selectItem()
			}
			, resize : function(event, ui){
				mSelf.setItemStyle(ui.size)
			}
			, stop : function(event, ui){
				mSelf.$emit('updateItem')
			}
			, ghost: true
		})

	}
}
</script>

