<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu" v-if="item">
	<div v-for="(key, value) in item.background"><label for="settings-background-{{key}}">{{key}}</label>:<input id="settings-background-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
	<div v-for="(key, value) in item.style"><label for="settings-style-{{key}}">{{key}}</label>:<input id="settings-style-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
</div>
</template>


<script>

return {
	props : ['item']
	, data : function(){

		return {
		}
	}
	, created: function(){
		
  }
}
</script>

