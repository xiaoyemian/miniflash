<style>
.name{
	.opacity(60);
	&.focus{.opacity(100);}
}

</style>

<template>
<div class="name" :class="{focus:focus_track == item_id}">
	<div>{{item_name}}</div>
</div>

</template>

<script>
return {
  components : {
	}
	, props : ['focus_track', 'item_id']
	, data : function(){

		var item_name = this.item_id.split('|')
		item_name = item_name[0] + item_name[1]

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

