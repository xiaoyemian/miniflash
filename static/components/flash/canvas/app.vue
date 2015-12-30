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
	<item v-ref:item v-for="itemdata in pages[number].items" :itemdata="itemdata" :cxt="cxt" :timedata="timedata"></item>
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

		return {
			items : null
			, len : null
			, waitNumber : null 
			, cxt : null
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, timedata : {
				step : 100
				, time : null
			}
		}
	}
	, methods : {
		resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
		}
		, action : function(){
			for(var i in this.items){
				var item = this.items[i]
				item.drawImage()
			}
		}
	}
	, events : {
		loadedImage : function(){
			this.waitNumber--

			if(this.waitNumber == 0){
				this.timedata.time = 0
			}
		}
	}
	, watch : {
		'timedata.time' : function(){
			var mSelf = this
			mSelf.action()

			var t = setTimeout(function(){

				if(mSelf.timedata.time == 100){
					console.log('done')
					return;
				}

				mSelf.timedata.time++

			}, this.timedata.step)

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

		this.items = this.$refs.item
		this.len = this.items.length
		this.waitNumber = this.len
	}
}
</script>

