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
	.resizeBtn{
		.pa;bottom:-10px;right:-10px;.w(20px);.h(20px);.bgc(red);
	}
}
</style>

<template>
<div class="item" :class="{focus : focus ? (focus.itemdata.item_id == itemdata.item_id) : false}" v-on:click="updateFocus" :style="[style, background]">
	<div class="handle">
		<span class="resizeBtn"></span>
	</div>
</div>
</template>


<script>
require('jqui/draggable')

return {
	props:['itemdata', 'focus']
	, data:function(){
		this.reloadItem()

		return {
			style:this.style
			, background:this.background
		}
	}
	, methods : {
		updateFocus : function(){
			this.$dispatch('updateFocus', this)
		}
		, updateItem : function(opts){
			var viewSize = this.$parent.size
			var itemdata = this.itemdata
			itemdata.style.top = opts.position.top /parseInt(viewSize.height) * 100
			itemdata.style.left = opts.position.left / parseInt(viewSize.width) * 100
		}
		, reloadItem : function(){
			var itemdata = this.itemdata
			this.style = {
				width : itemdata.style['width'] + '%'
				, 'padding-top' : itemdata.style['padding-top'] + '%' 
				, top : itemdata.style['top'] + '%'
				, left : itemdata.style['left'] + '%'
			}
			this.background = {
				'background-image' : 'url("' + itemdata.background.image + '")' 
			}
		}
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).draggable({
			start : function(event, opts){
				mSelf.updateFocus()
			}
			, drag : function(event, opts){
				mSelf.updateItem(opts)
			}
			, stop : function(event, opts){
				mSelf.reloadItem()
			}
		})
	}
}
</script>

