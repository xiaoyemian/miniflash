<style>
@flashHeight:120px;
@settingsWidth:200px;

.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

.itemsettings{
	.pa;.w(@settingsWidth);right:0px;top:0px;bottom:@flashHeight;
}
.settingBox{
	z-index:900;
	margin:4px; padding:4px;
	.bgc(#333); border:1px solid #222;

	.inputArea, .inputBox, .inputLabel{
		.f(12px);.fc(#ccc); .l(20px);
	}
	.inputArea{
		padding:4px 0px;
		border-bottom:1px solid #2E2E2E;
		&:nth-last-child(1){
			border:0 none;;
		}
	}
	.inputLabel{
		.left;
	}
	.inputBox{
		.ml(40px);
	}

	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);
			padding:2px 6px;
			border:1px solid #2E2E2E;
		}
		&[type="text"]{ .w(88px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}
}

.view{
	.pa;left:0px;right:@settingsWidth;top:0px;bottom:@flashHeight;
	padding:2px;
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
<div class="itemsettings">
	<original :focus_item="focus_item" :formatdata="formatdata.original"></original>
	<resize :focus_item="focus_item" :formatdata="formatdata.resize"></resize>
	<transform :focus_item="focus_item" :formatdata="formatdata.transform"></transform>
</div>

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
var original = require('back/settings/original.vue')
var transform = require('back/settings/transform.vue')
var resize = require('back/settings/resize.vue')

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
		label : '偏移'
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
		, original : original
		, transform : transform
		, resize : resize
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
			this.formatItemData(itemdata)
			this.itemsdata.push(itemdata)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, formatItemData : function(itemdata){
			var formatdata = this.formatdata

			if(!itemdata.frames)
				itemdata.frames = {}

			if(!itemdata.frames[0])
				itemdata.frames[0] = {type:'keyframe'}

			this.formatFrameData(itemdata.frames[0], itemdata)

		}
		, formatFrameData : function(framedata, itemdata){
			if(!framedata.resize)
				framedata.resize = {}

			if(!framedata.resize.width)
				framedata.resize.width = itemdata.original.width || 0

			if(!framedata.resize.height)
				framedata.resize.height = itemdata.original.height || 0

			if(!framedata.resize.top)
				framedata.resize.top = 0

			if(!framedata.resize.left)
				framedata.resize.left = 0

			if(!framedata.transform)
				framedata.transform = {}

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					framedata.transform[i] = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						framedata.transform[i][value[0]] = value[2] || 0
					}
				}
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
		, formatFrameData : function(framedata, itemdata){
			this.formatFrameData(framedata, itemdata)
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

