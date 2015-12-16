<style>
</style>

<template>
<div class="settingBox" v-if="focus_item && focus_item.itemdata.original">
	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label || key}}:</label>
		<input type="{{value.type||'number'}}" @keyup="updateItem" id="{{key}}" placeholder="" value="{{focus_item.itemdata.original[key]}}" disabled/>{{value.unit||''}}
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

			this.$set('focus_item.itemdata.original' + arr.join(''), value||0)

			this.focus_item.loadItemStyle()
			this.focus_item.setKeyFrame()
		}
	}
}
</script>

