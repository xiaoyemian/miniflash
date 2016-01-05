<style>
.controls{
	div{
		.inline;
		padding:2px 4px;
		.border-r(2px);
		.ml(2px);.mr(2px);
		.bgc(#9900FF);.fc(white);

	}
}

</style>


<template>
	<div class="uploadBtn">添加图片<input type="file" @change="addImage"/></div>
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

