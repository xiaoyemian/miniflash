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
	.f(14px);
	.l(26px);.h(26px);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);
	.bgc(#535353);
	.fc(white);
}
</style>

<template>
<div class="app">
	<div class="headtop"></div>
	<view v-ref:view :pagedata="pages[number]" :pagesize="pagesize" :flashsize="flashsize" :viewsize="viewsize"></view>
</div>
</template>


<script>
var view = require('back/view.vue')


return {
  components: {
		view:view
  }
	, data : function(){
		return {
			flashsize : {}
			, viewsize : {} 
			, pagesize : {}
		}
	}
	, props:['pages','number']
	, methods : {
		clearFocus : function(){
			this.$broadcast('clearFocus')
		}
		, updateFlash : function(height){
			Vue.set(this.flashsize, 'height', height)
		}
		, updatePage : function(width, height){
			var scale = 0.4

			Vue.set(this.pagesize, 'width', width * scale)
			Vue.set(this.pagesize, 'height', height * scale)
		}
	}
	, events : {
		updateFlash : function(height){
			this.updateFlash(height)
		}
	}
	, created: function(){
		this.updatePage(640, 1136)
		this.updateFlash(75)
  }
}
</script>

