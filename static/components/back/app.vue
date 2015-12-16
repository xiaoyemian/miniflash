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
	z-index:998;
	.f(14px);.l(26px);.h(26px);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);.bgc(#535353);.fc(white);
}
</style>

<template>
<div class="app">
	<div class="headtop"></div>
	<view v-ref:view :itemsdata="pagedata.items" :formatdata="formatdata"></view>
	<flash v-ref:flash :itemsdata="pagedata.items" :formatdata="formatdata"></flash>
</div>
</template>


<script>
require('jquery')
require('jqui/draggable')
require('jqui/resizable')
require('jqui/sortable')

var flash = require('back/flash.vue')
var view = require('back/view.vue')

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
  components: {
		flash : flash
		, view : view
  }
	, props:['pages','number']
	, data : function(){
		return {
			pagedata : this.pages[this.number]
			, formatdata : formatdata
		}
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
      this.$refs.view.$broadcast('loadItemByFrame', item_id, framedata)
		}
		, focusItemById : function(item_id){
      this.$refs.view.$broadcast('focusItemById', item_id)
		} 
		, focusTrackById : function(item_id){
      this.$refs.flash.setFocusTrack(item_id)
		} 
		, blurTrack : function(){
      this.$refs.flash.setFocusTrack(null)
		} 
		, loadTime : function(time){
			this.$refs.flash.loadTime(time)
		}
		, loadTrack : function(){
			this.$refs.flash.$broadcast('loadTrack')
		}
	}
	, ready: function(){
  }
}
</script>

