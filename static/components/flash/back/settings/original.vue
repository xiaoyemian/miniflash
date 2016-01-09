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
<div class="settingOriginal" v-if="global.item && global.item.itemdata.original">
	<div class="uploadBtn" v-if="global.item && global.item.itemdata.original.imageUrl" :style="{'background-image':'url('+global.item.itemdata.original.imageUrl+')'}">
		<input type="file" @change="changeImage"/>
	</div>
	<div class="inputArea">
	</div>
</div>
</template>

<script>

return {
	props : ['global', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		changeImage : function(event){
			var mSelf = this
			this.$dispatch('changeImage', event, function(itemdata){
				var original = itemdata.original
				mSelf.$set('global.item.itemdata.original', original)
				mSelf.$set('global.item.framedata.resize.height', original.height)
				mSelf.$set('global.item.framedata.resize.width', original.width)

				mSelf.global.item.loadItemOriginal()
				mSelf.global.item.loadItemStyle()
			})
		}
	}
}
</script>

