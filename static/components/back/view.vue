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
	width : {label : '原始宽度', unit : 'px'}
	, height : {label : '原始高度', unit : 'px'}
	, imageUrl : {label : '图片地址', type : 'text'}
}
formatdata.resize = {
	width : {label : '宽度', unit : 'px'}
	, height : {label : '高度', unit : 'px'}
	, top : {label : '上边距', unit : 'px'}
	, left : {label : '左边距', unit : 'px'}
	, 'border-radius' : {label : '圆角', unit : 'px'}
}

formatdata.transform = {
	translate : {
		label : '转换'
		, opts : [['x', 'px'],['y', 'px']]
	}
	, scale : {
		label : '缩放'
		, opts : [['x', '', '1', '0.1'],['y', '', '1', '0.1']]
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
			var itemdata = {
				original : {
					width : 100
					, height : 100
				}
			}
			this.formatData(itemdata)
			this.itemsdata.push(itemdata)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, upgradeItem: function(item){
			var formatdata = this.formatdata
			var itemdata = item.itemdata

			if(!itemdata.original){
				var original = {
					width : 640 * itemdata.style['width']/100
					, height : 640 * itemdata.style['padding-top']/100 
				}
				if(itemdata.background && itemdata.background.image){
					original.imageUrl = itemdata.background.image
				}

				var resize = {
					width : original.width 
					, height : original.height 
					, left : 640 * itemdata.style['left']/100
					, top : 1136 * itemdata.style['top']/100
				}

				var transform = {}
				for(var i in formatdata.transform){
					transform[i] = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						transform[i][value[0]] = value[2] || 0
					}
				}

				item.$set('itemdata.original', original)
				item.$set('itemdata.frames', {0 : { type:'keyframe', resize : resize, transform : transform }})

				delete itemdata.style
				delete itemdata.background
				delete itemdata.scale

			}

			var type = itemdata.original.imageUrl ? 'image' : 'item'
			itemdata.item_id = type + '|' + (item.index+1) + '|' 
												+ (new Date()).valueOf() 
												+ Math.floor(Math.random()*10000) 
												+ Math.floor(Math.random()*100)

		}
		, formatData : function(itemdata){
			var formatdata = this.formatdata
			var original = itemdata.original

			if(!itemdata.frames)
				itemdata.frames = {}

			if(!itemdata.frames[0])
				itemdata.frames[0] = {type:'keyframe'}

			if(!itemdata.frames[0].resize)
				itemdata.frames[0].resize = {}

			if(!itemdata.frames[0].resize.width)
				itemdata.frames[0].resize.width = original.width

			if(!itemdata.frames[0].resize.height)
				itemdata.frames[0].resize.height = original.height

			if(!itemdata.frames[0].transform){
				var transform = {}
				for(var i in formatdata.transform){
					transform[i] = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						transform[i][value[0]] = value[2] || 0
					}
				}
				itemdata.frames[0].transform = transform
			}

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
		, upgradeItem : function(itemdata){
			this.upgradeItem(itemdata)
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

