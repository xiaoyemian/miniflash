<template>
<div class="controlItem">
	<div @click.stop="" class="uploadBtn itemBox" v-if="global.item">替换图片<input type="file" @change.stop="changeImage"/></div>
	<div @click.stop="" class="uploadBtn itemBox" v-else>添加图片<input type="file" @change.stop="addImage"/></div>
	<div @click.stop="addBlock" class="itemBox" v-if="global.item">添加动作</div>
</div>

</template>


<script>

return {
	props:['itemsdata', 'global']
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
				mSelf.$set('global.item.itemdata.original', original)
				mSelf.$set('global.item.framedata.resize.height', original.height)
				mSelf.$set('global.item.framedata.resize.width', original.width)

				mSelf.global.item.loadItemOriginal()
				mSelf.global.item.loadItemStyle()
			})
		}
		, addBlock : function(){
			var track = this.global.item.track
			var blocksdata = track.itemdata.blocks
			var block = track.block

			var blocks = track.$refs.block
			var len = blocks.length

			if(!block){
				block = blocks[len-1]
			}

			var framelen = block.blockdata.frames.length
			var endframe = block.blockdata.frames[framelen-1] 

			var blockdatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.resize
					, transform : endframe.transform
				}]
			}))
			track.formatBlockData(blockdatanew)

			var index = block.index
			blocksdata.splice(index+1, 0, blockdatanew)

			this.$nextTick(function(){
				var block = track.$refs.block[index+1]
				block.focusBlock()
			})
		}
	}
}
</script>

