<style lang="less">
body{
	.bgc(#393939);
}
</style>

<style lang="less" scoped>
.pa;top:0px;bottom:0px;left:0px;right:0px;
</style>

<template>
{{page.items | json}}
<view v-ref:view :items="page.items"></view>
</template>


<script>
var view = require('back/view.vue')

return {
	props:['page']
  ,components: {
    view:view
  }
	,created: function(){
		console.log(this.page)
		console.log(this)
  }
}
</script>

