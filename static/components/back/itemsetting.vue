<style>
.itemsetting{
	z-index:900;
	.pf;top:26px;left:0px;right:0px;

	.inputBox{
		.f(12px);.fc(#ccc);
		padding:4px; .mr(4px); .i_block;
	}
	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#3a3a3a);padding:2px 6px;
			border:1px solid #2e2e2e;
		}
		&[type="text"]{
      .w(100px);
    }
    &[type="number"]{
      .c;.w(44px);
    }		
	}
	label {
		.i_block; .tr;
	}
}
.itemStyle{
	.bgc(#333); .pa;top:0px;left:0px;right:0px;
	border:1px solid #222;
}
.itemType{
	.bgc(#333); .pa;top:40px;left:0px;
	border:1px solid #222;
}
</style>

<template>
<div class="itemsetting" v-if="focus.item_id">
	<div class="itemStyle">
		<div class="inputBox" v-for="(key, value) in label.style"><label for="style|{{key}}">{{value}}</label><input type="number" @keyup="updateItem" id="style|{{key}}" placeholder="" value="{{focus.style[key]}}"/>px</div>
	</div>

	<div class="itemType" v-if="itemdata && itemdata.background">
		<div class="inputBox" v-for="(key, value) in label.background"><label for="background|{{key}}">{{value}}</label><input type="text" id="background|{{key}}" placeholder="" value="{{itemdata.background[key]}}"/></div>

	</div>

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

			this.$dispatch('updateItemByStyle', style)
		}
	}
}
</script>

