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
		.ui-resizable{
			&-se, &-e, &-s{ .pa; z-index:90; }
			&-se{ cursor: se-resize; bottom:-10px;right:-10px;.w(20px);.h(20px); }
			&-e{ cursor: e-resize; top:0px;bottom:10px;right:-10px;.w(20px); }
			&-s{ cursor: s-resize; left:0px;right:10px;bottom:-10px;.h(20px); }
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
		this.itemdata.frame_id = 0

		return {
			style : this.style
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.itemdata.item_id, this.itemdata.frame_id)
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
	}
	, events : {
		updateItem : function(item_id){
			if(this.itemdata.item_id == this.focus.item_id || this.itemdata.item_id == item_id){
				this.itemdata.frame_id = this.focus.frame_id 

				var style = this.focus.style
				var background = this.itemdata.background

				this.style = {
					width : style.width + 'px'
					, height : style.height + 'px'
					, top : style.top + 'px'
					, left : style.left + 'px'
					, 'background-image' : 'url("' + background.image + '")' 
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
			, containment: "document"
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
		})

	}
}
</script>

