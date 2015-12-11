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
<itemsetting :itemsettingstyle="itemsettingstyle"></itemsetting>

<div class="view" @click="clearFocus" :style="viewstyle">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="(index, itemdata) in pagedata.items" :itemdata="itemdata"></item>
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
	, props:['pagedata', 'pagestyle', 'viewstyle', 'itemsettingstyle']
	, data : function(){
		return {
		}
	}
	, methods : {
		clearFocus : function(){
			this.$dispatch('clearFocus')
		}
	}
	, events : {
		focusItem : function(item_id, framedata){
			console.log(item_id, framedata)
		}
	}
	, ready : function(){
	}
}
</script>

