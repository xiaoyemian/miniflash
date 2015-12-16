<style>
.transformSetting{
	right:10px;top:10px;
}
</style>

<template>
<div class="settingBox transformSetting" v-if="focus_item && focus_item.framedata.transform">
	<div class="inputArea" v-for="(key, transform) in formatdata">
		<div class="inputLabel">{{transform.label || key}}:</div>
		<div class="inputBox" v-for="value in transform.opts">
			<label for="{{key}}|{{value[0]}}">{{value[0]}}:</label>
			<input type="number" step="{{value[3]}}" @keydown="updateItem" id="{{key}}|{{value[0]}}" placeholder="" value="{{ focus_item.framedata.transform[key][value[0]] }}"/>{{value[1]||''}}
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

			this.$set('focus_item.framedata.transform' + arr.join(''), value||0)
			console.log(this.focus_item.framedata, value||0)

			this.focus_item.loadItemStyle()
			this.focus_item.setKeyFrame()
		}
	}
}
</script>

