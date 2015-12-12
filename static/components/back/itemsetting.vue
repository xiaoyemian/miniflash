<style>
.itemsetting{
	z-index:900;
	.pa; right:0px; .w(130px); padding:0px 10px 10px 10px;

	&>div{.hidden;.mt(10px);padding:2px;}

	.inputBox{
		.f(12px);.fc(#ccc); padding:2px; .l(20px); .left;
	}
	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);padding:2px 6px;
			border:1px solid #2e2e2e;
		}
		&[type="text"]{ .w(100px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}
}

.itemStyle{
	.bgc(#333); border:1px solid #222;
}
.itemType{
	.bgc(#333); border:1px solid #222;
}
</style>

<template>
<div class="itemsetting" v-if="focus_item">

	<div class="itemStyle">
		<div class="inputBox" v-for="(key, value) in stylekey"><label for="style|{{key}}">{{value}}:</label><input type="number" @keyup="updateItem" id="style|{{key}}" placeholder="" value="{{focus_item.frame.framedata.style[key]}}"/>px</div>
	</div>

	<div class="itemType" v-if="focus_item.itemdata.background">
		<div class="inputBox" v-for="(key, value) in backgroundkey"><label for="background|{{key}}">{{value}}:</label><input type="text" id="background|{{key}}" placeholder="" value="{{focus_item.itemdata.background[key]}}"/></div>

	</div>
</div>
</template>

<script>

return {
	props : ['focus_item', 'stylekey', 'backgroundkey']
	, data : function(){
		return {
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			this.$set('focus_item.frame.framedata.style["'+ type[1] +'"]', value|0)

			this.focus_item.updateItemStyle()
		}
	}
}
</script>

