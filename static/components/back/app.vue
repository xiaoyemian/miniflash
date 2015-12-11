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

	<view v-ref:view :focus="focus" :pagedata="pagedata" :pagestyle="pagestyle" :viewstyle="viewstyle" :itemsettingstyle="itemsettingstyle"></view>

	<flash v-ref:flash :style="flashstyle" :tracksdata="pagedata.tracks" :focus="focus"></flash>

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
			, focus : {}
			, printsize : {}	
			, flashsize : {}
			, viewsize : {} 
			, pagesize : {}
			
			, flashstyle : {}
			, viewstyle : {}
			, itemsettingstyle : {}
			, pagestyle : {}
		}
	}
	, methods : {
	}
	, events : {
    setFocus : function(item_id, frame_id, style){
      if(item_id == this.focus.item_id && frame_id == this.focus.frame_id)
        return;

      if(typeof frame_id == 'undefined'){
        frame_id = this.focus[item_id]
        this.$broadcast('selectFrame', item_id, frame_id)

      }else{
        frame_id = frame_id|0
				this.$set('focus.item_id', item_id)
				this.$set('focus.frame_id', frame_id)
				this.$set('focus.style', style)

				this.$emit('setCurrent', item_id, frame_id)
        this.$emit('updataItemStyle')
      }
    }
		, setCurrent : function(item_id, frame_id){
			frame_id = frame_id|0

			console.log(item_id, frame_id)
			if(this.focus[item_id] == frame_id)
				return

			this.$set('focus["' + item_id + '"]', frame_id)
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

		, clearFocus : function(){
			this.$set('focus.item_id', null)
			this.$set('focus.frame_id', null)
			this.$set('focus.style', {})
    }


		, updateFlash : function(height){
			height = height || 0
			Vue.set(this.flashsize, 'height', height)

      Vue.set(this.flashstyle, 'height', this.flashsize.height + 'px')

      Vue.set(this.viewstyle, 'bottom', this.flashsize.height + 'px')

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
//		this.$emit('updateFlash', 75)
  }
}
</script>

