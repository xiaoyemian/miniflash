<style>
.name{
	.opacity(60);
	.hidden;
	&.focus{.opacity(100);}
}

</style>

<template>
<div class="name" :class="{focus : global.item && global.item.itemdata.item_id == item_id}">
	<div>{{item_name}}</div>
</div>

</template>

<script>
return {
  components : {
	}
	, props : ['item_id', 'global']
	, data : function(){

		var item_name = this.item_id

		return {
			item_name :item_name 
		}
	}
	, methods : {
	}
	, ready : function(){
	}
}
</script>

