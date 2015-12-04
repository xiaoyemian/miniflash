<style scoped>
.item{
//	.pa;
}
</style>

<template>
<div class="item">{{item | json}}</div>
</template>


<script>
return {
	props:['item']
	, created:function(){
		console.log(this)
	}
}
</script>

