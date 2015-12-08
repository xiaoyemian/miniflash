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
<div class="item" :class="{focus : focus_id ? (focus_id == itemdata.item_id) : false}" @click.stop.prevent="setFocus" :style="style">
	<div class="handle">
		<div @click.stop.prevent="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>
require('jqui/draggable')
require('jqui/resizable')

return {
	props:['focus_id', 'itemdata']
	, data:function(){
		if(this.itemdata.style['padding-top']){
			var size = this.$parent.size
			var style = this.itemdata.style

			this.$set('itemdata.style.height', size.width * style['padding-top']/100) 

			style.width = size.width * style['width']/100
			style.top = size.height * style['top']/100
			style.left = size.width * style['left']/100

			delete style['padding-top']
		}

		this.updateItem()	

		return {
			style : this.style
		}
	}
	, methods : {
		setFocus : function(){
			this.$dispatch('setFocus', this.itemdata.item_id)
		}
		, aspectRatio : function(){
			var style = this.itemdata.style
			style.height = style.width*this.itemdata.scale
			this.updateItem()	
		}
		, setItem : function(opts){
			var style = this.itemdata.style
			opts = opts || {}

			for(var i in opts){
				style[i] = opts[i]
			}

		}
		, updateItem : function(){
			var style = this.itemdata.style
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
			this.updateItem()
		}
		, reloadItem : function(size, oldsize){
			var style = this.itemdata.style
			var scale = size.width/oldsize.width

			for(var i in style){
				style[i] *= scale
			}

			this.updateItem()
		}
	}
	, ready : function(){
		var mSelf = this
		var $item = $(this.$el)

		$item.draggable({
			start : function(event, opts){
				mSelf.setFocus()
			}
			, drag : function(event, opts){
				mSelf.setItem(opts.position)
			}
			, stop : function(event, opts){
				mSelf.updateItem()
			}
			, containment: "document"
		})
	
		$item.resizable({
			start : function(event, opts){
				mSelf.setFocus()
			}
			, resize : function(event, opts){
				mSelf.setItem(opts.size)
			}
			, stop : function(event, opts){
				mSelf.updateItem()
			}
		})

	}
}
</script>

