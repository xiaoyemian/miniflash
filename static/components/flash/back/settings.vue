<style>
.settingFrame, .settingOriginal, .settingFlash, .settingPage{
	.hidden;
	border-bottom:1px solid #222;
	padding:2px;

	.inputArea, .inputBox, .inputLabel{
		.f(12px);.fc(#ccc); .l(20px);
	}
	.inputArea{
		padding:4px;

		&:nth-last-child(1){
			border:0 none;
		}
	}
	.inputLabel{
		.left;
	}
	.inputBox{
		.ml(34px);
	}

	input{
		&[type="text"],&[type="number"]{
			.i_block;.fc(#ccc);.bgc(#383838);
			padding:2px 0px 2px 6px;
			border:1px solid #2E2E2E;
		}
		&[type="text"]{ .w(88px); }
    &[type="number"]{ .c;.w(44px); }		
	}
	label {
		.i_block; .tr;
	}

	.btn{
		.i_block;
		padding:2px 4px;
		.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#444);.fc(#ccc);
		border:1px solid #222;
		.cursor;
	}
}

</style>


<template>
	<pagesetting :global="global"></pagesetting>

	<blocksetting :global="global"></blocksetting>
	<resizesetting :global="global"></resizesetting>

</template>


<script>

var pagesetting = require('flash/back/settings/page.vue')
var resizesetting = require('flash/back/settings/resize.vue')
var blocksetting = require('flash/back/settings/block.vue')

return {
  components : {
		resizesetting : resizesetting 
		, blocksetting : blocksetting
		, pagesetting : pagesetting
  }
	, props:['global']
	, data : function(){

		return {
		}
	}
}
</script>

