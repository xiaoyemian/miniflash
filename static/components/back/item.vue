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
			&-se, &-e, &-s{
				.pa;
				z-index:90;
			}
			&-se{
				cursor: se-resize;
				bottom:-10px;right:-10px;.w(20px);.h(20px);
			}
			&-e{
				cursor: e-resize;
				top:0px;bottom:10px;right:-10px;.w(20px);
			}
			&-s{
				cursor: s-resize;
				left:0px;right:10px;bottom:-10px;.h(20px);
			}
		}
	}
}
</style>

<template>
<div class="item" :class="{focus : focus.item_id == itemdata.item_id}" :style="style">
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
		return {
			style : this.style
		}
	}
	, methods : {
		aspectRatio : function(){
			var style = this.focus.style
			style.height = style.width*this.itemdata.scale
		}
		, setItemStyle : function(opts){
			if(this.focus.item_id != this.itemdata.item_id)
				return;

			var style = this.focus.style
			opts = opts || {}

			for(var i in opts){
				style[i] = opts[i]
			}
		}
		, updateItem : function(){
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
	, events : {
		updateItem : function(){
			if(this.focus.item_id != this.itemdata.item_id)
				return;

			this.updateItem()
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
			}
			, drag : function(event, opts){
				mSelf.setItemStyle(opts.position)
			}
			, stop : function(event, opts){
			}
			, containment: "document"
		})
	
		$item.resizable({
			start : function(event, opts){
			}
			, resize : function(event, opts){
				mSelf.setItemStyle(opts.size)
			}
			, stop : function(event, opts){
			}
		})

	}
}
</script>

