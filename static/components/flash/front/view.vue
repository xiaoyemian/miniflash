<style>

.view{
	.pa;left:0px;right:0;top:0px;bottom:0px;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}
</style>


<template>

<div class="view">
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in itemsdata" :itemdata="itemdata" :index="$index" :printdata="printdata" :formatdata="formatdata"></item>
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
			printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
		}
	}
	, methods : {
		resizePrint : function(printdata){
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

