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
<div class="item" :class="{focus : focus ? (focus.item_id == item.item_id) : false}" v-on:click="updateFocus" :style="[style, background]">
	<div class="handle"></div>
</div>
</template>


<script>
require('jqui/draggable')

return {
	props:['item', 'focus']
	, data:function(){

		return {
		}

	}
	, methods : {
		updateFocus : function(){
			this.$dispatch('updateFocus', this.item)
		}
		, updateItem : function(opts){
			var viewSize = this.$parent.size

			this.item.style.top = opts.position.top /parseInt(viewSize.height) * 100
			this.item.style.left = opts.position.left / parseInt(viewSize.width) * 100
		}
		, resetItem : function(item){
			this.style = {
				width : item.style['width'] + '%'
				, 'padding-top' : item.style['padding-top'] + '%' 
				, top : item.style['top'] + '%'
				, left : item.style['left'] + '%'
			}
			this.background = {
				'background-image' : 'url("' + item.background.image + '")' 
			}
		}
	}
	, created : function(){
		this.resetItem(this.item)
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).draggable({
			start : function(event){
				mSelf.updateFocus()
			}
			, drag : function(event, opts){
				mSelf.updateItem(opts)
			}
		})
	}
}
</script>

