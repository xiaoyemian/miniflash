<style>
.item{
	.pa;
	background-size:100%;
	background-repeat:no-repeat;
}
.focus{
	.handle{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		border:10px solid #f69;
	}
}
</style>

<template>
<div class="item" :class="{focus : (focus_id == item.item_id)}" v-on:click="focus" :style="[background, style]">
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
			, style : {
				top : style['top'] + '%'
				, left : style['left'] + '%'
				, width : style['width'] + '%'
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

				mSelf.style.top = position.top /parseInt(viewSize.height) * 100 + '%'
				mSelf.style.left = position.left / parseInt(viewSize.width) * 100 + '%'

			}
		})
	}
}
</script>

