<style>
.track{
	.h(30px);.l(30px);
	.fc(#ccc);
	.name{.left;.w(180px);}
	.frames{.ml(200px);}
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

