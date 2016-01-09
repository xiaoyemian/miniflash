<style>
</style>

<template>
<div class="settingFlash" v-if="global.item && global.item.track && global.item.track.block && global.item.track.block.frame">

	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{global.item.track.block.frame.framedata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>

return {
	props : ['global']
	, data : function(){
		return {
			formatdata : {
				duration : {
					label : '时长'
					, unit : '*' + this.global.step + '毫秒'
				}
			}
		}
	}
	, methods : {
		updateFrame : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var arr = []
			for(var i in type){
				arr.push('["' + type[i] + '"]')
			}

			this.$set('global.item.track.block.frame.framedata' + arr.join(''), value||0)
		}
	}
}
</script>

