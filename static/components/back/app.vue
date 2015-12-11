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

	<view v-ref:view :pagedata="pagedata" :pagestyle="pagestyle" :viewstyle="viewstyle" :itemsettingstyle="itemsettingstyle"></view>

	<flash v-ref:flash :flashdata="pagedata.tracks"></flash>

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
			, printsize : {}	
			, flashsize : {}
			, viewsize : {} 
			, pagesize : {}
			
			, viewstyle : {}
			, itemsettingstyle : {}
			, pagestyle : {}
		}
	}
	, methods : {
	}
	, events : {
		focusItem : function(track){
			this.$refs.view.$emit('focusItem', track.item_id, track.focus_frame.framedata)
		} 
		, updataItemStyle : function(opts){
			opts = opts || {}
			var style = opts.style

      if(!style)
        style = this.focus.style

      if(style['padding-top']){
        var pagesize = this.pagesize

        Vue.set(style, 'height', pagesize.width * style['padding-top']/100)

        style.width = pagesize.width * style['width']/100
        style.top = pagesize.height * style['top']/100
        style.left = pagesize.width * style['left']/100

        delete style['padding-top']
      }

      this.$broadcast('updateItem', opts)
    }

		, updatePage : function(width, height){
			width = width || 640
			height = height || 1136

			Vue.set(this.printsize, 'width', width)
			Vue.set(this.printsize, 'height', height)
			
			Vue.set(this.pagesize, 'width', this.printsize.width * 0.4)
			Vue.set(this.pagesize, 'height', this.printsize.height * 0.4)

			Vue.set(this.pagestyle, 'width', this.pagesize.width + 'px')
			Vue.set(this.pagestyle, 'height', this.pagesize.height + 'px')
			Vue.set(this.pagestyle, 'margin-top', this.pagesize.height/-2 + 'px')
			Vue.set(this.pagestyle, 'margin-left', this.pagesize.width/-2 + 'px')
    }
	}
	, created: function(){
		this.$emit('updatePage', 640, 1136)
  }
}
</script>

