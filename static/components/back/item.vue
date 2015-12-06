<style>
.item{
	.pa;
	background-size:100%;
}
</style>

<template>
<div class="item" v-on:click="focus" item_id="{{item_id}}" :style="[background, style]"></div>
</template>


<script>
require('jqui/draggable')

function focus(){
	console.log(this)
	console.log(event)
}



return {
	props:['item']
	, data:function(){
		var item_id = this.item.item_id
			, style = this.item.style
			, background = this.item.background
			, biz = this.item.cr 
			, scale = this.item.scale

		return {
			item_id : item_id
			, background : {
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
		focus : focus
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).draggable({
			drag : function(){
			}
			, start : function(){
				focus.apply(mSelf, arguments)
			}
			, stop : function(){
				var viewSize = mSelf.$parent.size
				var position = $(this).position()

				mSelf.style.top = position.top /parseInt(viewSize.height) * 100 + '%'
				mSelf.style.left = position.left / parseInt(viewSize.width) * 100 + '%'

				console.log(mSelf)
			}
		})
	}
}
</script>

