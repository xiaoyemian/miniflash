<style lang="less" scoped>
@import "atom.less";
div{color:red;}
</style>

<template>
<input v-model="name">
<div>user:{{user}},name:{{name}},message:{{ message }}</div>
<aaa v-ref:bbb :user="user" :name="name"></aaa>
</template>


<script>

var aaa = require('demo/a.vue')

return {
  data:function(){ 
		return {
			message:'444444444444444444'
			, name:'22222222222'
		} 
	}
	,props:['user']
  ,components: {
    aaa:aaa
  }
	,created: function(){
  }
}
</script>

