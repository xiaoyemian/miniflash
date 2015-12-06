<style>
.item{
	background-size:100%;
	background-repeat:no-repeat;
	.pa;
}
.focus{
	.handle{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		border:10px solid #f69;
	}
}
</style>

<template>
<div class="item" :class="{focus : (focus_id == item.item_id)}" v-on:click="focus" :style="[position, size, background]">
	<div class="handle"></div>
</div>
</template>


<script>
require('jqui/draggable')

return {
	props:['item', 'focus_id']
	, data:function(){
		var item = this.item

		var size = {
			width : item.style['width'] + '%'
			, 'padding-top' : item.style['padding-top'] + '%' 
		}
		, position = {
			top : item.style['top'] + '%'
			, left : item.style['left'] + '%'
		}
		, background = {
			'background-image' : 'url("' + item.background.image + '")' 
		}
		, biz = item.cr 
		, scale = item.scale

		return {
			background : background 
			, size : size 
			, position : position 
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
			, stop : function(event, opts){
				var viewSize = mSelf.$parent.size

				mSelf.position.top = opts.position.top /parseInt(viewSize.height) * 100 + '%'
				mSelf.position.left = opts.position.left / parseInt(viewSize.width) * 100 + '%'

			}
		})
	}
}
</script>

