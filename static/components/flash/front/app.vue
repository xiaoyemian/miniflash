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
			<item v-ref:item v-for="itemdata in items" :itemdata="itemdata" :index="$index" :printdata="printdata" :formatdata="formatdata" :timedata="timedata"></item>
		</div>
	</div>

</div>
</template>


<script>
require('zepto')

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
			, formatdata : formatdata
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

