<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu">
	<div v-for="(key, value) in settings"><label for="settings-{{key}}">{{key}}</label>:<input id="settings-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
</div>
</template>


<script>

return {
	data : function(){
		return {
			settings : {
				left:'100%'
			}
		}
	}
	, created: function(){
  }
}
</script>

