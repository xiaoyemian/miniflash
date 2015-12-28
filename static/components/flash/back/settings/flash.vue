<style>
</style>

<template>
<div class="settingFlash" v-if="focus_frame">
	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for=""></label>
	</div>
</div>
</template>

<script>

return {
	props : ['focus_frame', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
	}
}
</script>

