<style>
.settingOriginal{
	.uploadBtn{
		.h(200px);.w(50%);.left;
		background-size:contain;
		background-repeat:no-repeat;
	}
}
</style>

<template>
<div class="settingOriginal" v-if="focus_item && focus_item.itemdata.original">
	<div class="uploadBtn" v-if="focus_item.itemdata.original.imageUrl" :style="{'background-image':'url('+focus_item.itemdata.original.imageUrl+')'}">
		<input type="file" @change="changeImage"/>
	</div>
	<div class="inputArea">
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
		changeImage : function(event){
			var mSelf = this
			this.$dispatch('changeImage', event, function(itemdata){
				var original = itemdata.original
				mSelf.$set('focus_item.itemdata.original', original)
				mSelf.$set('focus_item.framedata.resize.height', original.height)
				mSelf.$set('focus_item.framedata.resize.width', original.width)

				mSelf.focus_item.loadItemOriginal()
				mSelf.focus_item.loadItemStyle()
			})
		}
	}
}
</script>

