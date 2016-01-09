<style>
.uploadBtn{
	.pr;.hidden;
	input{
		.opacity(0);
		.pa;left:0px;top:0px;
		.w(100%);.h(100%);
	}
}

@settingsWidth:210px;

.view, .settings{
	top:0px;
}

.view{
	.pa;right:0px;left:@settingsWidth;bottom:0px;
	box-sizing:border-box;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

.settings{
	overflow:auto;
	.pa;left:0px;.w(@settingsWidth);
	bottom:0px;
	z-index:10;
	box-sizing:border-box;

	.bgc(#333);
	border:1px solid #222;

}

.controlItem, .controlBlock{
	.hidden;
	padding:4px;

	div{
		.left;
		padding:2px 4px;
		margin:2px;
		.border-r(2px);
		.fc(white);
		.cursor;
	}
	.itemBox{ .bgc(#9900FF); }
	.frameBox{ .bgc(#FF9900); }
	.animationBox{ .bgc(#0099FF); }
	.transitionBox{ .bgc(#33B666); }
	.normalBox{ .bgc(#999); }
}
.controlBlock{
	border-bottom:1px solid #222;
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

	.btn{
		.i_block;
		padding:2px 4px;
		.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#444);.fc(#ccc);
		border:1px solid #222;
		.cursor;
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
	<itemcontrol :itemsdata="itemsdata" :focus="focus"></itemcontrol>
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus="focus" :printdata="printdata" :formatdata="formatdata"></item>
	</div>
</div>


<div class="settings">
	<flash v-ref:flash :itemsdata="itemsdata" :formatdata="formatdata" :focus="focus" :timedata="timedata"></flash>

	<blockcontrol :focus="focus"></blockcontrol>
	<blocksetting :focus="focus"></blocksetting>
	<framesetting :focus="focus" :timedata="timedata"></framesetting>
	<resizesetting :formatdata="formatdata" :focus="focus"></resizesetting>

</div>

</template>


<script>

var formatdata = {}
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
var resizesetting = require('flash/back/settings/resize.vue')
var blocksetting = require('flash/back/settings/block.vue')
var framesetting = require('flash/back/settings/frame.vue')

var itemcontrol = require('flash/back/controls/item.vue')
var blockcontrol = require('flash/back/controls/block.vue')

return {
  components : {
    item : item
		, flash : flash
		, resizesetting : resizesetting 
		, blocksetting : blocksetting
		, framesetting : framesetting
		, blockcontrol : blockcontrol
		, itemcontrol : itemcontrol
  }
	, props:['itemsdata']
	, data : function(){

		return {
			printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
			, formatdata : formatdata
			, focus : {}
			, timedata : {
				min : 8 
				, step : 100
				, framewidth : 14
				, frameheight : 26
				, namewidth : 36
				, scrollleft : null
				, time : null
			}
		}
	}
	, methods : {
		blurItem : function(){
			this.$set('focus.item', null)
			this.blurBlock()
		}
		, blurBlock : function(){
			this.$set('focus.block', null)
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
		, loadTime : function(){
			console.log(111, this.focus)
			this.$broadcast('loadItemByTime', this.timedata.time)
		}
	}
	, events : {
		blurItem : function(){
			this.blurItem()
		}
		, blurBlock : function(){
			this.blurBlock()
		}
		, bindTrackItem : function(track){
			this.$broadcast('bindTrackItem', track)
		}
		, setTime : function(time){
			this.timedata.time = time
			this.loadTime()
		}
		, loadTime : function(){
			this.loadTime()
		}
		, loadItemByFrame : function(item_id, framedata){
      this.$broadcast('loadItemByFrame', item_id, framedata)
		}
		, changeImage : function(event, cbk){
			var mSelf = this
			var files = event.target.files
				, file

			if(!files || !files.length)
				return;

			file = files[0]
			console.log(file)	

			if(file.size > 1024 * 200) {
        alert('图片大小不能超过 200K!');
        return false;
      }

			var URL = window.URL || window.webkitURL
			var imgURL = URL.createObjectURL(file)

			var img = new Image()
			img.onload = function(){
				var itemdata = {
					original : {
						width : img.width
						, height : img.height
						, imageUrl : imgURL
					}
				}

				cbk && cbk(itemdata)
			}
			img.src = imgURL
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

