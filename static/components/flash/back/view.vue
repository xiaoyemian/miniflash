<style>

.view{
	.pa;left:0px;right:50%;top:0px;bottom:0px;
	box-sizing:border-box;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

.viewcontrol{
	.pa;z-index:100;top:60%;right:0px;
	.bgc(white);
}

.settings{
	.h(100%);
	overflow:auto;
	.pa;right:0px;top:0px;.w(50%);
	z-index:10;
	box-sizing:border-box;

	.bgc(#333);
	border:1px solid #222;

}
.settingFrame, .settingOriginal, .settingFlash{
	.hidden;
	border-bottom:1px solid #222;

	.inputArea, .inputBox, .inputLabel{
		.f(12px);.fc(#ccc); .l(20px);
	}
	.inputArea{
		padding:4px;
		//border-bottom:1px solid #2E2E2E;
		.left;

		&:nth-last-child(1){
			border:0 none;
		}
	}
	.inputLabel{
		.left;
	}
	.inputBox{
		.ml(34px);
	}

	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);
			padding:2px 0px 2px 6px;
			border:1px solid #2E2E2E;
		}
		&[type="text"]{ .w(88px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}
}


.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

</style>


<template>
<div class="view" @click="blurItem">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :printdata="printdata" :formatdata="formatdata" :keybroad="keybroad"></item>
	</div>
</div>

<div class="settings">
	<flash v-ref:flash :itemsdata="itemsdata" :formatdata="formatdata" :keybroad="keybroad"></flash>

	<flashsetting :focus_frame="focus_frame" :formatdata="formatdata.flash"></flashsetting>

	<original :focus_item="focus_item" :formatdata="formatdata.original"></original>
	<framesetting :focus_item="focus_item" :formatdata="formatdata"></framesetting>


	<div class="viewcontrol">
		<div @click="addItem">addItem</div>
	</div>
</div>

</template>


<script>

var formatdata = {}
formatdata.original = {
/*
	width : {label : '原始宽度', unit : 'px'}
	, height : {label : '原始高度', unit : 'px'}
	, */imageUrl : {label : '图片地址', type : 'text'}
}
formatdata.resize = {
	width : {label : '宽度', unit : 'px'}
	, height : {label : '高度', unit : 'px'}
	, top : {label : '上边距', unit : 'px'}
	, left : {label : '左边距', unit : 'px'}
//	, 'border-radius' : {label : '圆角', unit : 'px'}
}
formatdata.transform = {
/*
	translate : {
		label : '偏移'
		, opts : [['x', 'px'],['y', 'px']]
	}
	, scale : {
		label : '缩放'
		, opts : [['x', '', '1', '0.1'],['y', '', '1', '0.1']]
	}
	, */rotate : {
		label : '旋转'
		, opts : [['angle', 'deg']]
	}
	, skew : {
		label : '倾斜'
		, opts : [['x-angle', 'deg'], ['y-angle', 'deg']]
	}
}



var flash = require('flash/back/flash.vue')
var item = require('flash/back/item.vue')
var original = require('flash/back/settings/original.vue')
var framesetting = require('flash/back/settings/framesetting.vue')
var flashsetting = require('flash/back/settings/flashsetting.vue')

return {
  components : {
    item : item
		, flash : flash
		, original : original
		, framesetting : framesetting
		, flashsetting : flashsetting
  }
	, props:['itemsdata', 'keybroad']
	, data : function(){

		return {
			focus_item : null
			, focus_frame : null
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
			, formatdata : formatdata
		}
	}
	, methods : {
		blurItem : function(){
			this.$set('focus_item', null)
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
			this.itemsdata.push(itemdata)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
	}
	, events : {
		selectItem : function(item){
			this.$set('focus_item', item)
			this.$dispatch('focusTrackById', item.itemdata.item_id)
		}
		, setFocusItem : function(item){
			this.$set('focus_item', item)
		}
		, setFocusFrame : function(frame){
			this.$set('focus_frame', frame)
		}
		, loadTime : function(){
			this.$refs.flash.$emit('loadTime')
		}
		, focusTrackById : function(item_id){
      this.$refs.flash.$emit('setFocusTrack', item_id)
		} 
		, blurTrack : function(){
      this.$refs.flash.$emit('setFocusTrack', null)
		} 

		, loadItemByFrame : function(item_id, framedata){
      this.$broadcast('loadItemByFrame', item_id, framedata)
		}
		, focusItemById : function(item_id){
      this.$broadcast('focusItemById', item_id)
		} 
	}
	, created : function(){
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : 0.4
		})
	}
}
</script>

