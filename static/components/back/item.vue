<style scoped>
.item{
	.pa;
}
</style>

<template>
<div class="item">{{itemdata}}</div>
</template>


<script>
return {
	props:['itemdata']
	, created:function(){
		console.log(this)
	}
}
</script>

