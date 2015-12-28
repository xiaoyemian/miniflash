<style>
</style>

<template>
<div class="settingFlash" v-if="focus_frame">
	<div class="inputArea" v-for="(name, setting) in formatdata">
		<label for="{{name}}">{{setting.label}}:</label>
		
		<select id="{{name}}" @change="setFrame" v-if="setting.type == 'select'">
			<option value="{{value}}" selected="{{value == (focus_frame.framedata[name] || 'linear')}}" v-for="(key, value) in setting.options">{{value}}</option>
		</select>
	</div>

</div>
</template>

<script>

var formatdata = {}
formatdata.name = {
	label : '帧类型'
	, options : [ 'normal', 'animate', 'blank']
	, type : 'select'
}
formatdata['timing-function'] = {
	label : '速度曲线'
	, options : ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
	, type : 'select'
}

return {
	props : ['focus_frame']
	, data : function(){
		return {
			formatdata : formatdata
		}
	}
	, methods : {
		setFrame : function(event){
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

