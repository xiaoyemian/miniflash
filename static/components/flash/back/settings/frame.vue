<style>
</style>

<template>
<div class="settingFlash" v-if="focus.frame">
	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" @change="updateFrame" v-if="value.options">
			<option value="{{option}}" selected="{{option == focus.frame.framedata[key]}}" v-for="(name, option) in value.options">{{option}}</option>
		</select>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{focus.frame.framedata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>

return {
	props : ['focus', 'timedata']
	, data : function(){
		return {
			formatdata : {
				name : {
					label : '帧类型'
					, options : [ 'normal', 'transition', 'blank']
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

			this.$set('focus.frame.framedata' + arr.join(''), value||0)
		}
	}
}
</script>

