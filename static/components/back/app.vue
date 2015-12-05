<style lang="less">
body{
	.bgc(#393939);
}
</style>

<template>
<view v-ref:view :page="pages[number]"></view>
<menu v-ref:menu></menu>
</template>


<script>
var view = require('back/view.vue')
var menu = require('back/menu.vue')

return {
	props:['pages','number']
  ,components: {
		view:view
		, menu:menu
  }
	,created: function(){
		console.log(this)
  }
}
</script>

