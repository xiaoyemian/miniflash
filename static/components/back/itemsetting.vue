<style>
.itemsetting{
	z-index:900;
	.f(12px);.fc(#ccc);
	.pf;top:26px;left:0px;right:0px;
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
	.inputBox{
		padding:4px; .mr(4px); .i_block;
	}
}
.itemType{
	.bgc(#333); .pa;top:40px;left:0px;
	border:1px solid #222;
	.w(200px);
	.inputBox{
		padding:4px; .mr(4px); .i_block;
	}
}
</style>

<template>
<div class="itemsetting">
	<div class="itemStyle" v-if="focus">
		<div class="inputBox" v-for="(key, value) in focus.itemdata.style"><label for="style|{{key}}">{{label.style[key]}}</label><input type="number" @keyup="updateItem" id="style|{{key}}" placeholder="" value="{{value}}"/>px</div>
	</div>

	<div class="itemType" v-if="focus">
			<div class="inputBox" v-for="(key, value) in focus.itemdata.background"><label for="background|{{key}}">{{label.background[key]}}</label><input type="text" id="background|{{key}}" placeholder="" value="{{value}}"/></div>
	</div>

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
					, top : 'x:'
					, left : 'y:'
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

			this.focus.itemdata[type[0]][type[1]] = value|0

			this.$dispatch('updateItem', this.focus)
		}
	}
}
</script>

