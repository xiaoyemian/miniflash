<style lang="less">
body{
	.bgc(#393939);
}
</style>

<style lang="less" scoped>
.pa;top:0px;bottom:0px;left:0px;right:0px;
</style>

<template>
{{pages[number].items | json}}
<view v-ref:view :items="pages[number].items"></view>
</template>


<script>
var view = require('back/view.vue')

return {
	props:['pages', 'number']
  ,components: {
    view:view
  }
	,created: function(){
		console.log(this.pages, this.number)
		console.log(this)
  }
}
</script>

