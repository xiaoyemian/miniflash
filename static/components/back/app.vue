<style>
body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.app{
	.pa;
	bottom:20px;left:0px;top:26px;right:0px;
}
.headtop{
	z-index:998;
	.f(14px);.l(26px);.h(26px);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);.bgc(#535353);.fc(white);
}
</style>

<template>
<div class="app">
	<div class="headtop"></div>
	<view v-ref:view :itemsdata="pagedata.items"></view>
	<flash v-ref:flash :itemsdata="pagedata.items"></flash>
</div>
</template>


<script>
require('jquery')
require('jqui/draggable')
require('jqui/resizable')
require('jqui/sortable')

var flash = require('back/flash.vue')
var view = require('back/view.vue')


return {
  components: {
		flash : flash
		, view : view
  }
	, props:['pages','number']
	, data : function(){
		return {
			pagedata : this.pages[this.number]
		}
	}
	, methods : {
		loadItemByTrack : function(track){
      this.$refs.view.$broadcast('loadItemByFrame', track)
		}
	}
	, events : {
		loadItemByTrack : function(track){
			this.loadItemByTrack(track)
		}
		, focusItemByTrack : function(track){
			this.loadItemByTrack(track)
      this.$refs.view.$broadcast('updateItemByFrame', track)
		} 
		, focusTrackByItem : function(item){
      this.$refs.flash.$broadcast('updateFrameByItem', item)
		} 
		, loadTime : function(){
      this.$refs.flash.loadTime()
		}
	}
	, ready: function(){

  }
}
</script>

