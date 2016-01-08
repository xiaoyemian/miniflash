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
<div class="uploadBtn" v-if="focus.item">修改图片<input type="file" @change="changeImage"/></div>
<div class="uploadBtn" v-else>添加图片<input type="file" @change="addImage"/></div>
</template>


<script>

return {
	props:['itemsdata', 'keybroad', 'focus']
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
		, changeImage : function(event){
			var mSelf = this
			this.$dispatch('changeImage', event, function(itemdata){
				var original = itemdata.original
				mSelf.$set('focus.item.itemdata.original', original)
				mSelf.$set('focus.item.framedata.resize.height', original.height)
				mSelf.$set('focus.item.framedata.resize.width', original.width)

				mSelf.focus.item.loadItemOriginal()
				mSelf.focus.item.loadItemStyle()
			})
		}
	}
}
</script>

