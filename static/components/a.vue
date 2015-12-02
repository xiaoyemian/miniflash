<style lang="less" scoped>
@import "atom.less";
.component h2{color:red;}
.a{.h(22px);}
.c{background-image:url('/image');}
</style>

<style> 
h2{color:blue;}
</style>


<template>
<div class="my-component">
	<h2>{{msg}}</h2>
</div>
</template>

<script>
return {
	data : function(){
		return {
			msg : 'hello!'
		}
	}
}
</script>
