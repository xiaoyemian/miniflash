<style>
.itemsetting{
	z-index:900;
	.pa; right:0px; padding:0px 10px 10px 10px;
	.w(200px);

	&>div{.hidden;.mt(10px);padding:0px 4px;.right;}

	.inputArea, .inputBox, .inputLabel{
		.f(12px);.fc(#ccc); .l(20px);
	}
	.inputArea{
		padding:4px 0px;
		border-bottom:1px solid #2E2E2E;
		&:nth-last-child(1){
			border:0 none;;
		}
	}
	.inputLabel{
		.left;
	}
	.inputBox{
		.ml(40px);
	}

	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);
			padding:2px 6px;
			border:1px solid #2E2E2E;
		}
		&[type="text"]{ .w(88px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}
}

.itemOriginal{
	.bgc(#333); border:1px solid #222;
}
.itemFrame{
	.bgc(#333); border:1px solid #222;
}
.itemTramsform{
	.bgc(#333); border:1px solid #222;
}
</style>

<template>
<div class="itemsetting" v-if="focus_item">

	<div class="itemOriginal" v-if="focus_item.itemdata.original">
		<div class="inputArea" v-for="(key, value) in original">
			<label for="original|{{key}}">{{value.label || key}}:</label>
			<input type="{{value.type||'number'}}" @keyup="updateItem" id="original|{{key}}" placeholder="" value="{{focus_item.itemdata.original[key]}}" disabled/>{{value.unit||'px'}}
		</div>
	</div>

	<div class="itemFrame" v-if="focus_item.framedata.style">
		<div class="inputArea" v-for="(key, value) in style">
			<label for="style|{{key}}">{{value.label || key}}:</label>
			<input type="{{value.type||'number'}}" @keyup="updateItem" id="style|{{key}}" placeholder="" value="{{focus_item.framedata.style[key]}}"/>{{value.unit||'px'}}
		</div>
	</div>

	<div class="itemTramsform" v-if="focus_item.framedata.transform">
		<div class="inputArea" v-for="(name, transformdata) in transform">
			<div class="inputLabel">{{transformdata.label || name}}:</div>
			<div class="inputBox" v-for="(key, value) in transformdata.opts">
				<label for="transform|{{name}}|{{key}}">{{value.label || key}}:</label>
				<input type="{{value.type||'number'}}" @keyup="updateItem" id="transform|{{name}}|{{key}}" placeholder="" value="{{focus_item.framedata.transform[name][key]}}"/>{{value.unit||'px'}}
			</div>
		</div>
	</div>

</div>
</template>

<script>

return {
	props : ['focus_item']
	, data : function(){
		return {
			original : {
				width : {label : '宽度'}
				, height : {label : '高度'}
				, imageUrl : {label : '背景图片', type : 'text', unit : ''}
			}
			, style : {
				width : {label : '宽度'}
				, height : {label : '高度'}
				, top : {}
				, left : {}
			}
			, transform : {
				translate : {
					opts : {
						x : {}
						, y : {}
					}
					, label : '坐标'
				}
				, scale : {
					opts : {
						x : {}
						, y : {}
					}
					, label : '缩放'
				}
				, rotate : {
					opts : {
						angle : {unit : 'deg'}
					}
					, label : '旋转'
				}
				, skew : {
					opts : {
						'x-angle' : {unit : 'deg'}
						, 'y-angle' : {unit : 'deg'}
					}
					, label : '倾斜'
				}

			}
		}
	}
	, methods : {
		updateItem : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			this.$set('focus_item.framedata["' + type[0] + '"]["'+ type[1] +'"]', value|0)

			this.focus_item.loadItemStyle()
		}
	}
}
</script>

