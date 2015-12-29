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
	<canvas id="canvas" :width="printdata.width + 'px'" :height="printdata.height + 'px'" :style="{width:printdata.width * printdata.scale + 'px', height:printdata.height * printdata.scale + 'px'}"></canvas>
	<item v-ref:item v-for="itemdata in items" :itemdata="itemdata" :cxt="cxt" :printdata="printdata" :timedata="timedata"></item>
</div>
</template>


<script>
require('zepto')

var item = require('flash/canvas/item.vue')

return {
  components: {
		item : item
  }
	, props:['pages','number']
	, data : function(){
		var items = this.pages[this.number].items

		return {
			items : items
			, waitImageNumber : items.length
			, cxt : null
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, timedata : {
				step :100
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
		loadedImage : function(){
			this.waitImageNumber--

			if(this.waitImageNumber === 0)
				this.$broadcast('startFrame')
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
	, ready : function(){

		var canvas=document.getElementById('canvas');
		var cxt=canvas.getContext('2d');
		this.cxt = cxt

	}
}
</script>

