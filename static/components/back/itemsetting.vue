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

.itemFrame{
	.bgc(#333); border:1px solid #222;
}
.itemOriginal{
	.bgc(#333); border:1px solid #222;
}
</style>

<template>
<div class="itemsetting" v-if="focus_item">

	<div class="itemOriginal" v-if="focus_item.itemdata.original">
		<div class="inputBox" v-for="(key, value) in original"><label for="original|{{key}}">{{value.label || key}}:</label><input type="{{value.type||'type'}}" @keyup="updateItem" id="original|{{key}}" placeholder="" value="{{focus_item.itemdata.original[key]}}" disabled/>{{value.unit||''}}</div>
	</div>

	<div class="itemFrame" v-if="focus_item.framedata">
		<div class="inputBox" v-for="(key, value) in frame"><label for="frame|{{key}}">{{value.label || key}}:</label><input type="{{value.type||'text'}}" @keyup="updateItem" id="frame|{{key}}" placeholder="" value="{{focus_item.framedata.style[key]}}"/>{{value.unit||''}}</div>
	</div>

</div>
</template>

<script>

return {
	props : ['focus_item']
	, data : function(){
		return {
			original : {
				width : {label : '宽度', unit : 'px', type : 'number'}
				, height : {label : '高度', unit : 'px', type : 'number'}
				, imageUrl : {label : '背景图片'}
			}
			, frame : {
				width : {label : '宽度', unit : 'px', type : 'number'}
				, height : {label : '高度', unit : 'px', type : 'number'}
				, top : {unit : 'px', type : 'number'}
				, left : {unit : 'px', type : 'number'}
			}
			, transform : {
				translate : {
					label : '坐标'
					, opts : {
						x : {unit : 'px', type : 'number'}
						, y : {unit : 'px', type : 'number'}
					}
				}
				, scale : {
					label : '缩放'
					, opts : {
						x : {unit : 'px', type : 'number'}
						, y : {unit : 'px', type : 'number'}
					}
				}
			}
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			this.$set('focus_item.framedata.style["'+ type[1] +'"]', value|0)

			this.focus_item.loadItemStyle()
		}
	}
}
</script>

