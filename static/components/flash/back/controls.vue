<style>
.controls{
	div{
		.inline;
		.pr;.hidden;

		.pl(4px);.pr(4px);.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#9900FF);.fc(white);

		input{
			.opacity(0);
			.pa;left:0px;right:0px;bottom:0px;top:0px;
		}
	}
}

</style>


<template>
	<div id="addItem">添加图片<input type="file" @change="addImage"/></div>
</template>


<script>

return {
	props:['itemsdata']
	, data : function(){

		return {
		}
	}
	, methods : {
		addImage : function(event){
			var mSelf = this
			this.$dispatch('changeImage', event, function(itemdata){
				mSelf.itemsdata.push(itemdata)

				mSelf.$nextTick(function(){
					this.$dispatch('loadTime')
				})
			})
		}
	}
}
</script>

