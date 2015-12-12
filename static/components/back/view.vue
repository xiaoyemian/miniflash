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
<itemsetting :focus_item="focus_item"></itemsetting>

<div class="view" @click="clearFocus">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in pagedata.items" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :printsize="printsize"></item>
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
			, printscale : 1
			, printsize : {}	
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
			
			Vue.set(this.pagestyle, 'width', this.printsize.width * this.printscale + 'px')
			Vue.set(this.pagestyle, 'height', this.printsize.height * this.printscale + 'px')
			Vue.set(this.pagestyle, 'margin-left', this.printsize.width * this.printscale/-2 + 'px')
			Vue.set(this.pagestyle, 'margin-top', this.printsize.height * this.printscale/-2 + 'px')
    }
	}
	, ready : function(){
		this.$set('printscale', 0.4)
		this.$emit('updatePage', 640, 1136)
	}
}
</script>

