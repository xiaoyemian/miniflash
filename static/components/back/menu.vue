<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu" v-if="focus">
	<div v-for="(key, value) in focus.itemdata.background"><label for="background|{{key}}">{{label.background[key]}}</label><input id="background|{{key}}" placeholder="{{placeholder.background[key]}}" value="{{value}}"/></div>
	<div v-for="(key, value) in focus.itemdata.style"><label for="style|{{key}}">{{label.style[key]}}</label><input type="number" @keyup="updateItem" id="style|{{key}}" placeholder="{{placeholder.style[key]}}" value="{{value}}"/></div>

</div>
</template>


<script>

return {
	props : ['focus']
	, data : function(){
		return {
			label : {
				style : {
					width : '宽度:'
					, height : '高度:'
					, top : '顶部距离:'
					, left : '左边距离:'
				}
				, background : {
					image : '背景图片url:'
				}
			}
			, placeholder : {
				style : {
					width : '宽度'
					, height : '高度'
					, top : '顶部距离'
					, left : '左边距离'
				}
				, background : {
					image : '背景图片url'
				}
			}
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			this.focus.itemdata[type[0]][type[1]] = value|0

			this.$dispatch('updateItem', this.focus)
		}
	}
}
</script>

