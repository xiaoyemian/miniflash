<style>
</style>

<template>
<div class="settingFlash" v-if="focus_frame">
	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" @change="updateFrame" v-if="value.options">
			<option value="{{option}}" selected="{{option == (focus_frame.framedata[key] || 'linear')}}" v-for="(name, option) in value.options">{{option}}</option>
		</select>

		<input v-else type="{{value.type||'number'}}" @keydown="updateFrame" id="{{key}}" placeholder="" value="{{focus_frame.framedata[key]}}" />{{value.unit||''}}
	</div>

</div>
</template>

<script>

return {
	props : ['focus_frame', 'timedata']
	, data : function(){
		return {
			formatdata : {
				name : {
					label : '帧类型'
					, options : [ 'normal', 'animate', 'blank']
				}
				, 'timing-function' : {
					label : '速度曲线'
					, options : ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
				}
				, duration : {
					label : '时长'
					, unit : '*' + this.timedata.step + 'ms'
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

			this.$set('focus_frame.framedata' + arr.join(''), value||0)
			console.log(this.focus_frame.framedata)
		}
	}
}
</script>

