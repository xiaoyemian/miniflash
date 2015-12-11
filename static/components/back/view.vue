<style>
.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

.view{
	.pa;left:0px;right:0px;top:0px;bottom:0px;
	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}
</style>


<template>
<itemsetting :focus_item="focus_item"></itemsetting>

<div class="view" @click="clearFocus">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in pagedata.items" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :pagesize="pagesize"></item>
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
			, printsize : {}	
			, pagesize : {}
			, pagestyle : {}
		}
	}
	, methods : {
		clearFocus : function(){
			this.$dispatch('clearFocus')
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
	, ready : function(){
		this.$emit('updatePage', 640, 1136)
	}
}
</script>

