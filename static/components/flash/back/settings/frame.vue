<style>
</style>

<template>
<div class="settingFrame" v-if="focus_item">
	<div class="inputArea" v-for="(key, value) in formatdata.resize">
		<label for="resize|{{key}}">{{value.label || key}}:</label>
		<input type="{{value.type||'number'}}" @keyup="updateItem" id="resize|{{key}}" placeholder="" value="{{focus_item.framedata.resize[key]}}"/>{{value.unit||''}}
	</div>

	<div class="inputArea" v-for="(key, transform) in formatdata.transform">
		<div class="inputLabel">{{transform.label || key}}:</div>
		<div class="inputBox" v-for="value in transform.opts">
			<label for="transform|{{key}}|{{value[0]}}">{{value[0]}}:</label>
			<input type="number" step="{{value[3]}}" @keyup="updateItem" id="transform|{{key}}|{{value[0]}}" placeholder="" value="{{ focus_item.framedata.transform[key][value[0]] }}"/>{{value[1]||''}}
		</div>
	</div>
</div>
</template>

<script>

return {
	props : ['focus_item', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var arr = []
			for(var i in type){
				arr.push('["' + type[i] + '"]')
			}

			this.$set('focus_item.framedata' + arr.join(''), value||0)
			console.log(this.focus_item.framedata, value||0)

			this.focus_item.loadItemStyle()
		}
	}
}
</script>

