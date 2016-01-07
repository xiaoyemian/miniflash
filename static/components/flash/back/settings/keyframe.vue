<style>
</style>

<template>
<div class="settingFlash" v-if="focus.keyframe">

	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{focus.keyframe.framedata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>

return {
	props : ['focus', 'timedata']
	, data : function(){
		return {
			formatdata : {
				duration : {
					label : '时长'
					, unit : '*' + this.timedata.step + '毫秒'
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

			this.$set('focus.keyframe.framedata' + arr.join(''), value||0)
		}
	}
}
</script>

