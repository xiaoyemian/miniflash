<style>
.itemStyle{
	.bgc(#333);
	border:1px solid #222;
}
.itemType{
	.bgc(#333);
	border:1px solid #222;
}
</style>

<template>
<div class="itemStyle">
	<div class="inputBox" v-for="(key, value) in label.style"><label for="style|{{key}}">{{value}}</label><input type="number" @keyup="updateItem" id="style|{{key}}" placeholder="" value="{{focus.style[key]}}"/>px</div>
</div>

<div class="itemType" v-if="itemdata && itemdata.background">
	<div class="inputBox" v-for="(key, value) in label.background"><label for="background|{{key}}">{{value}}</label><input type="text" id="background|{{key}}" placeholder="" value="{{itemdata.background[key]}}"/></div>

</div>

</template>

<script>

return {
	props : ['itemdata', 'focus']
	, data : function(){
		return {
			label : {
				style : {
					width : '宽度:'
					, height : '高度:'
					, top : 'top:'
					, left : 'left:'
				}
				, background : {
					image : '背景图片:'
				}
			}
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var style = this.focus.style
			style[type[1]] = value|0

			this.$dispatch('updataItemStyle', style)
		}
	}
}
</script>

