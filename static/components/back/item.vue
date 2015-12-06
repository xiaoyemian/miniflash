<style>
.itemBox{
	.pa;
}
.item{
	background-size:100%;
	background-repeat:no-repeat;
	.pa;top:0px;left:0px;right:0px;bottom:0px;
}
.focus{
	.handle{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		border:10px solid #f69;
	}
}
</style>

<template>
<div class="itemBox" :class="{focus : (focus_id == item.item_id)}" v-on:click="focus" :style="[position, size]">
	<div class="item" :style="[background]"></div>
	<div class="handle"></div>
</div>
</template>


<script>
require('jqui/draggable')

return {
	props:['item', 'focus_id']
	, data:function(){
		var item = this.item
			, style = item.style
			, background = item.background
			, biz = item.cr 
			, scale = item.scale

		return {
			background : {
				'background-image' : 'url("' + background.image + '")' 
			}
			, position : {
				top : style['top'] + '%'
				, left : style['left'] + '%'
			}
			, size : {
				width : style['width'] + '%'
				, 'padding-top' : style['padding-top'] + '%' 
			}
		}

	}
	, methods : {
		focus : function(){
			this.$dispatch('updateFocus', this.item.item_id)
		}
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).draggable({
			drag : function(){
			}
			, start : function(event){
				mSelf.focus.call(mSelf, event)
			}
			, stop : function(){
				var viewSize = mSelf.$parent.size
				var position = $(this).position()

				mSelf.position.top = position.top /parseInt(viewSize.height) * 100 + '%'
				mSelf.position.left = position.left / parseInt(viewSize.width) * 100 + '%'

			}
		})
	}
}
</script>

