<style>
body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.app{
	.pa;
	bottom:0px;left:0px;top:26px;right:0px;
}
.headtop{
	z-index:99;
	.f(14px);.l(26px);.h(26px);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);.bgc(#535353);.fc(white);
}
.keybroad{
	.c;.f(12px);.pa;left:0px;right:0px;
	span{
		.pl(4px);.pr(4px);.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#FF9);.fc(#666);
	}
	.keypress{
		.bgc(#9900ff);.fc(white);
	}
}
</style>

<template>
<div class="app">
	<view v-ref:view :itemsdata="pagedata.items" :formatdata="formatdata" :keybroad="keybroad"></view>
	<flash v-ref:flash :itemsdata="pagedata.items" :formatdata="formatdata" :keybroad="keybroad"></flash>
</div>
</template>


<script>
var flash = require('flash/front/flash.vue')
var view = require('flash/front/view.vue')

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

var keyCode = {
	'91' : 'command'
	, '93' : 'command'
	, '16' : 'shift'
	, '18' : 'alt'
}
return {
  components: {
		flash : flash
		, view : view
  }
	, props:['pages','number']
	, data : function(){
		return {
			pagedata : this.pages[this.number]
			, formatdata : formatdata
			, keybroad : {}
		}
	}
	, methods : {
		save : function(){
			this.$refs.flash.$broadcast('updateFramesData')

			var pageConfigStr = JSON.stringify(this.pages[this.number])
			localStorage.setItem("pageConfig",pageConfigStr)

			var items = JSON.parse(pageConfigStr).items
			var frameConfig = {}

			for(var i in items){
				var item_id = items[i].item_id
				var frames = items[i].frames

			}

		}
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
      this.$refs.view.$broadcast('loadItemByFrame', item_id, framedata)
		}
		, focusItemById : function(item_id){
      this.$refs.view.$broadcast('focusItemById', item_id)
		} 
		, loadTrackById : function(item_id){
			this.$refs.flash.$broadcast('loadTrackById', item_id)
		}
		, focusTrackById : function(item_id){
      this.$refs.flash.setFocusTrack(item_id)
		} 
		, blurTrack : function(){
      this.$refs.flash.setFocusTrack(null)
		} 
		, setTime : function(time){
			this.$refs.flash.setTime(time)
		}
		, loadTime : function(){
			this.$refs.flash.loadTime()
		}
	}
	, created: function(){
  }
}
</script>

