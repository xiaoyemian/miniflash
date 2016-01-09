<template>
<div class="controlItem">
	<div @click.stop="" class="uploadBtn itemBox" v-if="focus.item">替换图片<input type="file" @change.stop="changeImage"/></div>
	<div @click.stop="" class="uploadBtn itemBox" v-else>添加图片<input type="file" @change.stop="addImage"/></div>
	<div @click.stop="addBlock" class="itemBox" v-if="focus.item">添加动作</div>
</div>

</template>


<script>

return {
	props:['itemsdata', 'focus']
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
		, addBlock : function(){
			var blocksdata = this.focus.item.itemdata.blocks
			var block = this.focus.item.track.block

			var blocks = this.focus.item.track.$refs.block
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
			this.focus.item.track.formatBlockData(blockdatanew)

			var index = block.index
			blocksdata.splice(index+1, 0, blockdatanew)

			this.$nextTick(function(){
				var block = this.focus.item.track.$refs.block[index+1]
				block.focusBlock()
			})
		}
	}
}
</script>

