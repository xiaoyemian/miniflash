<style lang="less" scoped>
@import "atom.less";
div{color:red;}
</style>

<template>
<input v-model="name">
<div>{{name}}{{ message }}</div>
<aaa :name="name"></aaa>
</template>


<script>

var aaa = require('a.vue')

return {
  data:function(){ 
		return {
			message:333
		} 
	}
	,props:['user', 'name']
  ,components: {
    aaa:aaa
  }
	,created: function(){
		console.log(this.name)
  }
}
</script>

