<style>
body{
	.bgc(#393939); .f(12px); .hidden;
}
.app{
	.pa;
	.w(100%);.h(100%);

	.view{
		.w(100%);.h(100%);
		.page{
			.auto;.pr;.bgc(#fff);
			.hidden;
		}
	}
}

</style>

<template>
<div class="app">

	<div class="view">
		<div class="page" :style="{width:printdata.width * printdata.scale + 'px', height:printdata.height * printdata.scale + 'px'}">
			<item v-ref:item v-for="itemdata in items" :itemdata="itemdata" :printdata="printdata" :global="global"></item>
		</div>
	</div>

</div>
</template>


<script>
require('zepto')

var item = require('flash/front/item.vue')

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


return {
  components: {
		item : item
  }
	, props:['pages','number']
	, data : function(){
		var items = this.pages[this.number].items
		var itemslen = items.length

		return {
			items : items
			, itemslen : itemslen
			, wait : {
				loadedImage : itemslen
				, loadedBlock : itemslen 
			} 
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, global : {
				step : 100
				, formatdata : formatdata
			}
		}
	}
	, methods : {
		resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
		}
	}
	, events : {
		done : function(name){
			if(!this.wait[name])
				this.$set('wait["'+name +'"]', this.itemslen)
			
			this.wait[name]--
		}
	}
	, watch : {
		'wait.loadedImage' : function(value){
			if(value > 0)
				return;

			this.$broadcast('startFrame')
		}
		, 'wait.loadedBlock' : function(value){
			console.log(value)
			if(value > 0)
				return;

			console.log('loadedBlock')
		}
	}
	, created : function(){
		var $win = $(window)
			, win_h = $win.height()
			, win_w = $win.width()

		var mSelf = this
		
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : $win.width()/640
			//, scale : $win.height()/1136
		})

		$win.on('resize', function(){
			mSelf.resizePrint({
				scale : $win.width()/640
				//scale : $win.height()/1136
			})
		})
	}
}
</script>

