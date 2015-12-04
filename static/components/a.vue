<style scoped>
</style>

<template>
<div>user:{{user}},name:{{name}},message:{{message}},msg:{{msg}}</div>
</template>


<script>
return {
  data:function(){ 
		return {
			msg:'component!'
		} 
	}
	,props:['user', 'name']
	,created: function(){
  }
}
</script>

