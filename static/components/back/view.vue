<style>

.view{
	.pa;left:0px;right:360px;top:0px;bottom:0px;
	box-sizing:border-box;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

.viewcontrol{
	.pa;z-index:100;top:50%;right:0px;
	.bgc(white);
}


.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

.itemsettings{
	.pa;bottom:0px;right:0px;top:434px;.w(360px);
	z-index:10;
	box-sizing:border-box;
	.bgc(#333);
	display:-webkit-box;
	border:1px solid #222;

	&>div{ -webkit-box-flex:1;
	}
}
.settingBox{
	z-index:900;
	padding:4px 0px;

	.inputArea, .inputBox, .inputLabel{
		.f(12px);.fc(#ccc); .l(20px);
	}
	.inputArea{
		padding:4px;
		border-bottom:1px solid #2E2E2E;

		&:nth-last-child(1){
			border:0 none;;
		}
	}
	.inputLabel{
		.left;
	}
	.inputBox{
		.ml(34px);
	}

	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);
			padding:2px 6px;
			border:1px solid #2E2E2E;
		}
		&[type="text"]{ .w(88px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}
}
</style>


<template>
<div class="itemsettings">
	<original :focus_item="focus_item" :formatdata="formatdata.original"></original>
	<div class="frameSetting">
		<resize :focus_item="focus_item" :formatdata="formatdata.resize"></resize>
		<transform :focus_item="focus_item" :formatdata="formatdata.transform"></transform>
	</div>
</div>

<div class="viewcontrol">
	<div @click="addItem">addItem</div>
</div>

<div class="view" @click="blurItem">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :printdata="printdata" :formatdata="formatdata" :keybroad="keybroad"></item>
	</div>
</div>

</template>


<script>
var item = require('back/item.vue')
var original = require('back/settings/original.vue')
var transform = require('back/settings/transform.vue')
var resize = require('back/settings/resize.vue')

return {
  components : {
    item : item
		, original : original
		, transform : transform
		, resize : resize
  }
	, props:['itemsdata', 'formatdata', 'keybroad']
	, data : function(){

		return {
			focus_item : null
			, printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
		}
	}
	, methods : {
		blurItem : function(){
			this.setFocusItem(null)
			this.$dispatch('blurTrack')
		}
		, resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
			this.updatePage()
		}
		, updatePage : function(){
			var printdata = this.printdata

			this.$set('pagestyle.width', printdata.width * printdata.scale + 'px')
			this.$set('pagestyle.height', printdata.height * printdata.scale + 'px')
			this.$set('pagestyle["margin-left"]', printdata.width * printdata.scale/-2 + 'px')
			this.$set('pagestyle["margin-top"]', printdata.height * printdata.scale/-2 + 'px')
    }
		, addItem : function(){
			var itemdata = {
				original : {
					width : 100
					, height : 100
				}
			}
			this.itemsdata.push(itemdata)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, setFocusItem : function(item){
			this.$set('focus_item', item)
		}
	}
	, events : {
		selectItem : function(item){
			this.setFocusItem(item)
			this.$dispatch('focusTrackById', item.itemdata.item_id)
		}
		, setFocusItem : function(item){
			this.setFocusItem(item)
		}
	}
	, created : function(){
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : 0.4
		})
	}
}
</script>

