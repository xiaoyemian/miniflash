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
.itemResize{
	.bgc(#333); border:1px solid #222;
}
.itemTramsform{
	.bgc(#333); border:1px solid #222;
}
</style>

<template>
<div class="itemsetting" v-if="focus_item">

	<div class="itemOriginal" v-if="focus_item.itemdata.original">
		<div class="inputArea" v-for="(key, value) in formatdata.original">
			<label for="original|{{key}}">{{value.label || key}}:</label>
			<input type="{{value.type||'number'}}" @keyup="updateItem" id="original|{{key}}" placeholder="" value="{{focus_item.itemdata.original[key]}}" disabled/>{{value.unit||'px'}}
		</div>
	</div>

	<div class="itemResize" v-if="focus_item.framedata.resize">
		<div class="inputArea" v-for="(key, value) in formatdata.resize">
			<label for="resize|{{key}}">{{value.label || key}}:</label>
			<input type="{{value.type||'number'}}" @keyup="updateItem" id="resize|{{key}}" placeholder="" value="{{focus_item.framedata.resize[key]}}"/>{{value.unit||'px'}}
		</div>
	</div>

	<div class="itemTramsform" v-if="focus_item.framedata.transform">
		<div class="inputArea" v-for="(key, transform) in formatdata.transform" v-if="focus_item.framedata.transform[key]">
			<div class="inputLabel">{{transform.label || key}}:</div>
			<div class="inputBox" v-for="value in transform.opts">
				<label for="transform|{{key}}|{{value[0]}}">{{value[0]}}:</label>
				<input type="{{value.type||'number'}}" @keyup="updateItem" id="transform|{{key}}|{{value[0]}}" placeholder="" value="{{focus_item.framedata.transform[key][value[0]]}}"/>{{value[1]||'px'}}
			</div>
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

			this.$set('focus_item.framedata["' + type[0] + '"]["'+ type[1] +'"]', value|0)

			this.focus_item.loadItemStyle()
		}
	}
}
</script>

