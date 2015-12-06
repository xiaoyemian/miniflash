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
<div class="item" :class="{focus : focus ? (focus.item_id == item.item_id) : false}" v-on:click="doFocus" :style="[style, background]">
	<div class="handle"></div>
</div>
</template>


<script>
require('jqui/draggable')

return {
	props:['item', 'focus']
	, data:function(){
		var item = this.item

		var style = {
			width : item.style['width'] + '%'
			, 'padding-top' : item.style['padding-top'] + '%' 
			, top : item.style['top'] + '%'
			, left : item.style['left'] + '%'
		}
		, background = {
			'background-image' : 'url("' + item.background.image + '")' 
		}

		return {
			background : background 
			, style : style
		}

	}
	, methods : {
		doFocus : function(){
			this.$dispatch('updateFocus', this.item)
		}
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).draggable({
			start : function(event){
				mSelf.doFocus.call(mSelf, event)
			}
			, drag : function(event, opts){
				var viewSize = mSelf.$parent.size

				mSelf.item.style.top = opts.position.top /parseInt(viewSize.height) * 100
				mSelf.item.style.left = opts.position.left / parseInt(viewSize.width) * 100

				mSelf.$dispatch('updateFocus', mSelf.item)
			}
		})
	}
}
</script>

