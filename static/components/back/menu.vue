<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu" v-if="item">
	<div v-for="(key, value) in item.background"><label for="background-{{key}}">{{key}}</label>:<input id="background-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
	<div v-for="(key, value) in item.style"><label for="style-{{key}}">{{key}}</label>:<input @keyup="updateItem" id="style-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
</div>
</template>


<script>

return {
	props : ['item']
	, data : function(){

		return {
		}
	}
	, methods : {
		updateFocus : function(){
			this.$dispatch('updateFocus', this.item)
		}
		, updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('-')
			var value = setting.value

			this.item[type[0]][type[1]] = value|0

			this.updateFocus()
		}
	}
}
</script>

