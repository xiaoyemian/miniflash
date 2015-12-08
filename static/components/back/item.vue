<style>
.view{
	.item{
		.pa;
		background-size:100% 100%;
		background-repeat:no-repeat;
	}
	.focus{
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
<div class="item" :class="{focus : focusitem ? (focusitem.itemdata.item_id == itemdata.item_id) : false}" @click.stop.prevent="setFocus" :style="style">
	<div class="handle">
		<div @click.stop.prevent="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>
require('jqui/draggable')
require('jqui/resizable')

return {
	props:['focusitem', 'itemdata']
	, data:function(){
		if(this.itemdata.style['padding-top']){
			var size = this.$parent.size

			this.$set('itemdata.style.height', size.width * this.itemdata.style['padding-top']/100) 
			this.$set('itemdata.style.width', size.width * this.itemdata.style['width']/100) 
			this.$set('itemdata.style.top', size.height * this.itemdata.style['top']/100)
			this.$set('itemdata.style.left', size.width * this.itemdata.style['left']/100)

			delete this.itemdata.style['padding-top']
		}

		this.updateItem()	

		return {
			style : this.style
		}
	}
	, methods : {
		setFocus : function(){
			this.$dispatch('setFocus', this)
		}
		, aspectRatio : function(){
			this.itemdata.style.height = this.itemdata.style.width*this.itemdata.scale
			this.updateItem()	
		}
		, setItem : function(opts){
			if(opts.position){
				this.itemdata.style.top = opts.position.top
				this.itemdata.style.left = opts.position.left
			}
			if(opts.size){
				this.itemdata.style.width = opts.size.width
				this.itemdata.style.height = opts.size.height
			}
		}
		, updateItem : function(){
			this.style = {
				width : this.itemdata.style.width + 'px'
				, height : this.itemdata.style.height + 'px'
				, top : this.itemdata.style.top + 'px'
				, left : this.itemdata.style.left + 'px'
				, 'background-image' : 'url("' + this.itemdata.background.image + '")' 
			}

		}
	}
	, events : {
		updateItem : function(){
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
				mSelf.setItem(opts)
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
				mSelf.setItem(opts)
			}
			, stop : function(event, opts){
				mSelf.updateItem()
			}
		})

	}
}
</script>

