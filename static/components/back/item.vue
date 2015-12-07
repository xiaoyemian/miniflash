<style>
.item{
	background-size:100% 100%;
	background-repeat:no-repeat;
	.pa;
}
.focus{
	.handle{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		border:10px solid #f69;
	}
	.ui-resizable{
		&-se, &-e, &-s{
			.pa;
			z-index:90;
		}
		&-se{
			cursor: se-resize;
			bottom:0px;right:0px;.w(10px);.h(10px);
		}
		&-e{
			cursor: e-resize;
			top:0px;bottom:10px;right:0px;.w(10px);
		}
		&-s{
			cursor: s-resize;
			left:0px;right:10px;bottom:0px;.h(10px);
		}
	}
}
</style>

<template>
<div class="item" :class="{focus : focus ? (focus.itemdata.item_id == itemdata.item_id) : false}" v-on:click="setFocus" :style="[style, background]">
	<div class="handle"></div>
</div>
</template>


<script>
require('jqui/draggable')
require('jqui/resizable')

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
		setFocus : function(){
			this.$dispatch('setFocus', this)
		}
		, updateItem : function(opts){
			var itemdata = this.itemdata
			itemdata.style.top = opts.position.top
			itemdata.style.left = opts.position.left
		}
		, reloadItem : function(){
			var viewSize = this.$parent.size
			var itemdata = this.itemdata

			if(itemdata.style['padding-top']){
				itemdata.style = {
					top : viewSize.height * itemdata.style['top']/100
					, left : viewSize.width * itemdata.style['left']/100
					, width : viewSize.width * itemdata.style['width']/100
					, height : viewSize.width * itemdata.style['padding-top']/100 
				}
			}

			this.style = {
				top : itemdata.style['top'] + 'px'
				, left : itemdata.style['left'] + 'px'
				, width : itemdata.style['width'] + 'px'
				, height : itemdata.style['height'] + 'px' 
			}


			this.background = {
				'background-image' : 'url("' + itemdata.background.image + '")' 
			}
		}
	}
	, ready : function(){
		var mSelf = this
		var $item = $(this.$el)

		$item.resizable({
			start : function(){
				console.log(arguments)
			}
		})

		$item.draggable({
			start : function(event, opts){
				mSelf.setFocus()
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

