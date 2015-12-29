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
		<div class="page" :style="pagestyle">
			<item v-ref:item v-for="itemdata in items" :itemdata="itemdata" :index="$index" :printdata="printdata" :timedata="timedata"></item>
		</div>
	</div>

</div>
</template>


<script>
require('zepto')

var item = require('flash/front/item.vue')

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
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
			, timedata : {
				step :200
			}
		}
	}
	, methods : {
		resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
			this.updatePage()
		}
		, updatePage : function(){
			var printdata = this.printdata

			this.$set('pagestyle.width', printdata.width * printdata.scale + 'px')
			this.$set('pagestyle.height', printdata.height * printdata.scale + 'px')

			this.$broadcast('reloadItem')
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
}
</script>

