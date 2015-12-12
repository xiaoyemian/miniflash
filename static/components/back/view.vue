<style>
.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

.view{
	.pa;left:0px;right:0px;top:0px;bottom:100px;
	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

.viewcontrol{
	.pa;z-index:100;top:50%;right:0px;
	.bgc(white);
}
</style>


<template>
<itemsetting :focus_item="focus_item" :stylekey="stylekey" :backgroundkey="backgroundkey"></itemsetting>

<div class="viewcontrol">
	<div @click="addItem">addItem</div>
</div>

<div class="view" @click="clearFocus">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :print="print" :stylekey="stylekey" :backgroundkey="backgroundkey"></item>
	</div>
</div>

</template>


<script>
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')

var stylekey = {
	width : '宽度'
	, height : '高度'
	, top : 'top'
	, left : 'left'
}
var backgroundkey = {
	image : '背景图片'
}

return {
  components : {
    item : item
		, itemsetting : itemsetting
  }
	, props:['itemsdata']
	, data : function(){

		return {
			focus_item : null
			, print : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
			, stylekey : stylekey 
			, backgroundkey : backgroundkey 
		}
	}
	, methods : {
		clearFocus : function(){
			this.$dispatch('clearFocus')
		}
		, resizePrint : function(print){
			for(var i in print){
				this.$set('print["'+i+'"]', print[i]||0)
			}
			this.updatePage()
		}
		, updatePage : function(){
			var print = this.print

			this.$set('pagestyle.width', print.width * print.scale + 'px')
			this.$set('pagestyle.height', print.height * print.scale + 'px')
			this.$set('pagestyle["margin-left"]', print.width * print.scale/-2 + 'px')
			this.$set('pagestyle["margin-top"]', print.height * print.scale/-2 + 'px')
    }
		, addItem : function(){
			console.log(this.itemsdata)
			this.itemsdata.push({
				item_id : new Date().valueOf()
				, background : {
				}
				, style : {
					width : 100
					, height : 100
				}
				, tracks : {
					0 : {
						style : {}
						, type : 'animateframe'
					}
				}
			})

			this.$nextTick(function () {
				this.$dispatch('loadTime')
			})
		}
	}
	, watch : {
		itemsdata : function(){
//			console.log(arguments)
		}
	}
	, events : {
		setFocusItem : function(item, doFocusFrame){
			console.log('doFocusFrame', doFocusFrame)
			this.$set('focus_item', item)

			if(doFocusFrame)
				this.$dispatch('focusTrackByItem', item)
		}
	}
	, ready : function(){
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : 0.4
		})
	}
}
</script>

