<style>
.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

.view{
	.pa;left:0px;right:0px;top:0px;bottom:100px;
	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}
</style>


<template>
<itemsetting :focus_item="focus_item" :stylekey="stylekey" :backgroundkey="backgroundkey"></itemsetting>

<div class="view" @click="clearFocus">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in pagedata.items" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :print="print" :stylekey="stylekey" :backgroundkey="backgroundkey"></item>
	</div>
</div>

</template>


<script>
var item = require('back/item.vue')
var itemsetting = require('back/itemsetting.vue')

return {
  components : {
    item : item
		, itemsetting : itemsetting
  }
	, props:['pagedata']
	, data : function(){

		return {
			focus_item : null
			, print : {
				size : {}
				, scale : 1
			}
			, pagestyle : {}
			, stylekey : {
				width : '宽度'
				, height : '高度'
				, top : 'top'
				, left : 'left'
			}
			, backgroundkey : {
				image : '背景图片'
			}
		}
	}
	, methods : {
		clearFocus : function(){
			this.$dispatch('clearFocus')
		}
		, updatePage : function(){
			var size = this.print.size
			var scale = this.print.scale

			this.$set('pagestyle.width', size.width * scale + 'px')
			this.$set('pagestyle.height', size.height * scale + 'px')
			this.$set('pagestyle["margin-left"]', size.width * scale/-2 + 'px')
			this.$set('pagestyle["margin-top"]', size.height * scale/-2 + 'px')
    }
	}
	, events : {
		setFocusItem : function(item){
			this.$set('focus_item', item)
			this.$dispatch('focusTrackByItem', item)
		}
		, focusItem : function(item_id, framedata){
      this.$broadcast('updateItemByFrame', item_id, framedata)
		}
		, resizePrint : function(width, height){
			this.$set('print.size.width', width || 640)
			this.$set('print.size.height', height || 1136)
			this.updatePage()
		}
	}
	, created : function(){
		this.print.scale = 0.4
		this.$emit('resizePrint', 640, 1136)

/*
		var mSelf = this
		var t = setTimeout(function(){
			mSelf.print.scale = 1
			mSelf.updatePage()
      mSelf.$broadcast('updateItemStyle')
		}, 4000)
*/
	}
}
</script>

