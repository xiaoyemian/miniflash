<style>

.view{
	.pa;left:0px;right:40%;top:0px;bottom:0px;
	box-sizing:border-box;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

</style>


<template>

<div class="view" @click="blurItem">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :focus_item="focus_item" :printdata="printdata" :formatdata="formatdata"></item>
	</div>
</div>

</template>


<script>
var item = require('flash/front/item.vue')

return {
  components : {
    item : item
  }
	, props:['itemsdata', 'formatdata']
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
		setFocusItem : function(item){
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

