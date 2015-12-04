<style scoped>
</style>

<template>
<div>{{name}}{{msg}}{{message}}</div>
</template>


<script>
return {
  data:function(){ 
		console.log(this)
		return {
			message:this.$parent.message
			,msg:'component!'
		} 
	}
	,props:['user', 'name']
	,created: function(){
		console.log(this.name)
  }
}
</script>

