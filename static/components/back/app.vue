<style>
@headtopHeight:26px;

body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.app{
	.pa;
	bottom:0px;left:0px;top:@headtopHeight;right:0px;
}
.headtop{
	z-index:99;
	.f(14px);.l(@headtopHeight);.h(@headtopHeight);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);.bgc(#535353);.fc(white);
}
.keybroad{
	.c;.f(12px);.pa;left:0px;right:0px;
	span{
		.pl(4px);.pr(4px);.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#FF9);.fc(#666);
	}
	.keypress{
		.bgc(#9900FF);.fc(white);
	}
}
</style>

<template>
<div class="app">
	<div class="headtop">
		<div class="keybroad">
			<span class="keypress" v-for="keydata in keybroad" v-if="keydata">{{$key}}</span>
		</div>

		<div @click="save">保存</div>
	</div>

	<page v-ref:page :global="global"></page>

</div>
</template>


<script>
require('core/jqui/draggable')
require('core/jqui/resizable')
require('core/jqui/sortable')

var page = require('back/page.vue')

var keyCode = {
	'91' : 'command'
	, '93' : 'command'
	, '16' : 'shift'
	, '18' : 'alt'
}


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
		page : page 
  }
	, props:['pages']
	, data : function(){

		return {
			global : {
				pages : this.pages
				, number : null
				, formatdata : formatdata
				, time : null
				, min : 10 
				, step : 100
				, framewidth : 14
				, frameheight : 26
				, scrollLeft : 0
				, dtime : 0
			}
			, keybroad : {}

		}
	}
	, methods : {
		save : function(){
			var pageConfigStr = JSON.stringify(this.global.pages[this.global.number])
			localStorage.setItem("pageConfig",pageConfigStr)

			var items = JSON.parse(pageConfigStr).items
			console.log(items)
		}
	}
	, events : {
	}
	, created: function(){
		var mSelf = this
		this.$set('global.number', 0)

			console.log(this.global.pages)

		$(window)
			.on('keydown', function(e){
				console.log(e.keyCode, keyCode[e.keyCode])

				if(!keyCode[e.keyCode])
					return;

				mSelf.$set('keybroad["' + keyCode[e.keyCode] + '"]', true)

			})
			.on('keyup', function(e){
				if(!keyCode[e.keyCode])
					return;

				mSelf.$set('keybroad["' + keyCode[e.keyCode] + '"]', false)

			})
  }
}
</script>

