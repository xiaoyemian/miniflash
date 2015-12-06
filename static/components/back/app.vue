<style>
body{
	.bgc(#393939);
}
</style>

<template>
<view :page="pages[number]"></view>
</template>


<script>
var view = require('back/view.vue')

return {
  components: {
		view:view
  }
	, props:['pages','number']
	, created: function(){
  }
}
</script>

