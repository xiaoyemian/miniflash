<style>
</style>

<template>
<div class="settingPage" v-if="!global.item">

	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" v-if="value.options">
			<option value="{{option}}" selected="{{option}}" v-for="(name, option) in value.options">{{name}}</option>
		</select>

	</div>

</div>
</template>

<script>
var formatdata = {
	in : {
		label : '进入效果'
		, options : {'飞入':'fly', '切入':'cut'}
	}
}

var options = {
	in : {
		'fly' : {
			'从底部':'bottom', '从左下角':'bottomleft', '从左侧':'left', '从左上角':'topleft', '从顶部':'top', '从右上角':'topright', '从右侧':'right', '从右下角':'bottomright'
		}
		, 'cut' : {
			'从底部':'bottom', '从左下角':'bottomleft', '从左侧':'left', '从左上角':'topleft', '从顶部':'top', '从右上角':'topright', '从右侧':'right', '从右下角':'bottomright'
		}
	}
}


return {
	props : ['global']
	, data : function(){
		return {
			formatdata : formatdata 
			, pagedata : {
				in : null
				, out : null
			}
		}
	}
	, methods : {
	}
}
</script>

