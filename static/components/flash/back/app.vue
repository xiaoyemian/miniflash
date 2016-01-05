<style>
@headtopHeight:26px;
@controlsHeight:24px;

body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.app{
	.pa;
	bottom:0px;left:0px;top:@controlsHeight + @headtopHeight;right:0px;
}
.headtop{
	z-index:99;
	.f(14px);.l(@headtopHeight);.h(@headtopHeight);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);.bgc(#535353);.fc(white);
}
.controls{
	z-index:100;
	.h(@controlsHeight);.l(@controlsHeight);
	.pa;top:-@controlsHeight;right:0px;left:0px;
	.bgc(#333); .fc(#ccc);
}

.keybroad{
	.c;.f(12px);.pa;left:0px;right:0px;
	span{
		.pl(4px);.pr(4px);.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#FF9);.fc(#666);
	}
	.keypress{
		.bgc(#9900ff);.fc(white);
	}
}
</style>

<template>
<div class="app">
	<div class="headtop">
		<div class="keybroad">
			<span class="keypress" v-for="keydata in keybroad" v-if="keydata">{{$key}}</span>
			<span v-if="keybroad.command && keybroad.alt">清除关键帧</span>
			<span v-if="keybroad.command && !keybroad.alt">转换关键帧类型/插入关键帧</span>
		</div>

		<div @click="save">保存</div>
	</div>

	<div class="controls">
		<controls :itemsdata="pagedata.items"></controls>
	</div>

	<page v-ref:page :itemsdata="pagedata.items" :keybroad="keybroad"></page>

</div>
</template>


<script>
require('jquery')
require('jqui/draggable')
require('jqui/resizable')
require('jqui/sortable')

var page = require('flash/back/page.vue')
var controls = require('flash/back/controls.vue')

var keyCode = {
	'91' : 'command'
	, '93' : 'command'
	, '16' : 'shift'
	, '18' : 'alt'
}
return {
  components: {
		page : page 
		, controls : controls
  }
	, props:['pages','number']
	, data : function(){
		return {
			pagedata : this.pages[this.number]
			, keybroad : {}
		}
	}
	, methods : {
		save : function(){
			var pageConfigStr = JSON.stringify(this.pages[this.number])
			localStorage.setItem("pageConfig",pageConfigStr)

			var items = JSON.parse(pageConfigStr).items
			console.log(items)
		}
	}
	, created: function(){
		var mSelf = this

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

