<style>
body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.app{
	.pa;
	bottom:0px;left:0px;top:0px;right:0px;
}
</style>

<template>
<div class="app">
	<view v-ref:view :itemsdata="pagedata.items" :formatdata="formatdata"></view>
	<flash v-ref:flash :itemsdata="pagedata.items" :formatdata="formatdata"></flash>
</div>
</template>


<script>
var flash = require('flash/front/flash.vue')
var view = require('flash/front/view.vue')

var formatdata = {}
formatdata.original = {
	imageUrl : {label : '图片地址', type : 'text'}
}
formatdata.resize = {
	width : {label : '宽度', unit : 'px'}
	, height : {label : '高度', unit : 'px'}
	, top : {label : '上边距', unit : 'px'}
	, left : {label : '左边距', unit : 'px'}
}
formatdata.transform = {
	rotate : {
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
	, methods : {
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
      this.$refs.view.$broadcast('loadItemByFrame', item_id, framedata)
		}
		, loadTime : function(){
			this.$refs.flash.loadTime()
		}
	}
	, created: function(){
  }
}
</script>

