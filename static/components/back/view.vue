<style>
.itemsetting{
	z-index:900;
	.pa;
	left:0px;

	.w(130px);
	padding:4px;

	&>div{.hidden;.mt(10px);padding:2px;}

	.inputBox{
		.f(12px);.fc(#ccc);
		padding:2px;
		.l(20px);
		.left;
	}
	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#3a3a3a);padding:2px 6px;
			border:1px solid #2e2e2e;
		}
		&[type="text"]{
      .w(100px);
    }
    &[type="number"]{
      .c;.w(44px);
    }		
	}
	label {
		.i_block; .tr;
	}
}

.flash{
	border:1px solid #222;
	.pa;left:0px;right:0px;top:0px;
	overflow:auto;
	.bgc(#333);
	box-sizing:border-box;
}

.view{
	.pa;left:0px;right:0px;bottom:0px;
	.page{
		.pa;
		.bgc(#fff);
	}
}
</style>


<template>
<div class="flash" :style="flashstyle">
	<track v-for="(item_id, trackdata) in pagedata.tracks" :focus="focus" :item_id="item_id" :trackdata="trackdata"></track>
</div>

<div class="itemsetting" :style="itemsettingstyle" v-if="focus.item_id">
	<itemsetting :focus="focus" :itemdata="pagedata.items[focus.item_id]"></itemsetting>
</div>

<div class="view" @click="clearFocus" :style="viewstyle">
	<div class="page" :style="pagestyle">
		<item v-for="(item_id, itemdata) in pagedata.items" :itemdata="itemdata" :focus="focus"></item>
	</div>
</div>

</template>


<script>
require('jquery')
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')
var track = require('back/track.vue')

return {
  components : {
    item : item
		, track : track
		, itemsetting : itemsetting
  }
	, props:['pagedata', 'pagesize', 'flashsize', 'viewsize']
	, data : function(){
		this.updateAppView() 

		return {
			focus : {} 
			, pagestyle : {}
			, itemsettingstyle : {} 
			, flashstyle : {}
			, viewstyle : {}
		}
	}
	, watch : {
		'focus' : function(){
			console.log(arguments)
		}
	}
	, methods : {
		clearFocus : function(){
			Vue.set(this.focus, 'item_id', null)
			Vue.set(this.focus, 'frame_id', null)
			Vue.set(this.focus, 'style', {})
		}
		, updateAppView : function(){
			this.pagestyle = {
				width : this.pagesize.width + 'px'
				, height : this.pagesize.height + 'px'
				, left : '50%'
				, top : '50%'
				, 'margin-top' : this.pagesize.height/-2 + 'px'
				, 'margin-left' : this.pagesize.width/-2 + 'px'
			}
			this.itemsettingstyle = {
				top : this.flashsize.height + 'px'
			}
			this.flashstyle = {
				height : this.flashsize.height + 'px'
			}
			this.viewstyle = {
				top : this.flashsize.height + 'px'
			}
		}
	}
	, events : {
		setFocus : function(item_id, frame_id){
			if(item_id == this.focus.item_id && frame_id == this.focus.frame_id)
				return;

			if(typeof frame_id == 'undefined'){
				frame_id = this.focus[item_id]|0 + ''
				this.$broadcast('selectFrame', item_id, frame_id)

			}else{
				frame_id = frame_id|0 + ''
				Vue.set(this.focus, 'item_id', item_id)
				Vue.set(this.focus, 'frame_id', frame_id)

				Vue.set(this.focus, 'style', this.pagedata.tracks[item_id][frame_id].style)
				Vue.set(this.focus, item_id, frame_id)

				this.$emit('updataItemStyle')
			}
		}
		, updataItemStyle : function(style, item_id){
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

			this.$broadcast('updateItem', {style:style, item_id:item_id})
		}
		, clearFocus : function(){
			this.clearFocus()
		}

	}
	, created : function(){
		this.updateAppView()
	}
}
</script>

