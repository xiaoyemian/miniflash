<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu" v-if="focus">
	<div v-for="(key, value) in focus.itemdata.background"><label for="background|{{key}}">{{key}}</label>:<input id="background|{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
	<div v-for="(key, value) in focus.itemdata.style"><label for="style|{{key}}">{{key}}</label>:<input @keyup="updateItem" id="style|{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
</div>
</template>


<script>

return {
	props : ['focus']
	, data : function(){
		return {
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			this.focus.itemdata[type[0]][type[1]] = value|0

			this.$dispatch('updateItem', this.focus)
		}
	}
}
</script>

