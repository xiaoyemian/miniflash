<style lang="less" scoped>
@import "atom.less";
div{color:red;}
</style>

<template>
<div>{{ message }}</div>
<bbb></bbb>
</template>


<script>

var bbb = require('a.vue')

return {
  data:function(){ 
		return {
			message:'444'
		}
	}
  ,components: {
    bbb:bbb
  }
}
</script>

