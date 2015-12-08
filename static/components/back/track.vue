<style>
.track{
	.h(30px);.l(30px);
	.fc(#ccc);
	.name{.left;.w(100px);}
	.frames{.ml(120px);}
}
</style>

<template>
<div class="track">
	<div class="name">{{item_id}}</div>
	<div class="frames">
		123
	</div>
</div>
</template>

<script>

return {
	props : ['focus', 'trackdata', 'item_id']
	, created : function(){
		console.log(this.trackdata)
	}
}
</script>

