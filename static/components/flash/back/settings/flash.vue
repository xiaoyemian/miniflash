<style>
</style>

<template>
<div class="settingFlash" v-if="focus_track && focus_track.frame">
	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" @change="updateFrame" v-if="value.options">
			<option value="{{option}}" selected="{{option == focus_track.frame.framedata[key]}}" v-for="(name, option) in value.options">{{option}}</option>
		</select>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{focus_track.frame.framedata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>

return {
	props : ['focus_track', 'timedata']
	, data : function(){
		return {
			formatdata : {
				name : {
					label : '帧类型'
					, options : [ 'normal', 'animate', 'blank']
				}
				, duration : {
					label : '时长'
					, unit : '*' + this.timedata.step + '毫秒'
				}
				, 'timing-function' : {
					label : '速度曲线'
					, options : ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
				}
				, 'iteration-count' : {
					label : '次数'
					, options : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'infinite']
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

			console.log(value)
			this.$set('focus_track.frame.framedata' + arr.join(''), value||0)
			console.log(this.focus_track.frame.framedata)
		}
	}
}
</script>

