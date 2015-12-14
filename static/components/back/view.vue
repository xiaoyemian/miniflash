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
<itemsetting :focus_item="focus_item" :formatdata="formatdata"></itemsetting>

<div class="viewcontrol">
	<div @click="addItem">addItem</div>
</div>

<div class="view" @click="blurItem">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :printdata="printdata" :formatdata="formatdata"></item>
	</div>
</div>

</template>


<script>
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')

var formatdata = {}
formatdata.original = {
	width : {label : '宽度'}
	, height : {label : '高度'}
	, imageUrl : {label : '背景图片', type : 'text', unit : ''}
}
formatdata.resize = {
	width : {label : '宽度'}
	, height : {label : '高度'}
	, top : {}
	, left : {}
}

formatdata.transform = {
	translate : {
		label : '坐标'
		, opts : [['x', 'px'],['y', 'px']]
	}
	, scale : {
		label : '缩放'
		, opts : [['x'],['y']]
	}
	, rotate : {
		label : '旋转'
		, opts : [['angle', 'deg']]
	}
	, skew : {
		label : '倾斜'
		, opts : [['x-angle', 'deg'], ['y-angle', 'deg']]
	}
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
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, formatdata : formatdata
			, pagestyle : {}
		}
	}
	, methods : {
		blurItem : function(){
			this.setFocusItem(null)
			this.$dispatch('blurTrack')
		}
		, resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
			this.updatePage()
		}
		, updatePage : function(){
			var printdata = this.printdata

			this.$set('pagestyle.width', printdata.width * printdata.scale + 'px')
			this.$set('pagestyle.height', printdata.height * printdata.scale + 'px')
			this.$set('pagestyle["margin-left"]', printdata.width * printdata.scale/-2 + 'px')
			this.$set('pagestyle["margin-top"]', printdata.height * printdata.scale/-2 + 'px')
    }
		, addItem : function(){
			this.itemsdata.push({
				original : {
					width : 100
					, height : 100
				}
				, frames : {
					0 : { transform : {} , type : 'animateframe' }
				}
			})

			this.$nextTick(function () {
				this.$dispatch('loadTime')
			})
		}
		, setFocusItem : function(item){
			this.$set('focus_item', item)
		}
	}
	, events : {
		selectItem : function(item){
			this.setFocusItem(item)
			this.$dispatch('focusTrackById', item.itemdata.item_id)
		}
		, setFocusItem : function(item){
			this.setFocusItem(item)
		}
	}
	, created : function(){

var mSelf = this
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : 0.4
		})
	}
}
</script>

