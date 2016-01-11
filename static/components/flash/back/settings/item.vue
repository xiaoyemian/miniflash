<style>
.controlItem{
	.itemBox{ .bgc(#9900FF); }
}
</style>

<template>
<div class="controlItem">
	<div @click.stop="" class="uploadBtn itemBox" v-if="global.item">替换图片<input type="file" @change.stop="changeImage"/></div>
	<div @click.stop="" class="uploadBtn itemBox" v-else>添加图片<input type="file" @change.stop="addImage"/></div>
	<div @click.stop="addBlock" class="itemBox" v-if="global.item">添加动作</div>
	<div @click.stop="removeBlock" class="itemBox" v-if="global.item && global.item.track && global.item.track.inTrack && global.item.itemdata.blocks.length > 1">删除动作</div>

	<div @click.stop="addFrame" class="transitionBox" v-if="global.item && global.item.track && global.item.track.inTrack && global.item.track.block && global.item.track.block.blockdata.name == 'transition'">添加帧</div>
	<div @click.stop="removeFrame" class="transitionBox" v-if="global.item && global.item.track && global.item.track.inTrack && global.item.track.block && global.item.track.block.blockdata.frames.length > 1">删除帧</div>

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
			var blocks = track.$refs.block
			var block = track.block
			var framedata = this.global.item.framedata

			if(!track.block){
				var blockslen = blocks.length
				block = blocks[blockslen-1]
			}

			var frames = block.$refs.frame
			var endframe = frames[frames.length-1]

			if(!track.block){
				endframe.framedata.duration = this.global.time - (block.startTime + endframe.startTime)
			}

			var blockdatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : framedata.resize
					, transform : framedata.transform
				}]
			}))
			track.formatBlockData(blockdatanew)

			var index = block.index
			track.itemdata.blocks.splice(index+1, 0, blockdatanew)

			this.$nextTick(function(){
				var block = track.$refs.block[index+1]
				block.focusBlock()
			})
		}
		, removeBlock : function(){
			var track = this.global.item.track
			var block = track.block
			var index = block.index

			track.itemdata.blocks.splice(index, 1)

			this.$nextTick(function(){
				track.$broadcast('setStartTime')	
				this.$dispatch('loadTime')
			})
		}
		, addFrame : function(){
			var track = this.global.item.track
			var framesdata = track.block.blockdata.frames
			var frame = track.block.frame

			var framedatanew = JSON.parse(JSON.stringify({
				resize : frame.framedata.resize
				, transform : frame.framedata.transform
			}))
			track.formatFrameData(framedatanew)

			var index = frame.index
			framesdata.splice(index+1, 0, framedatanew)

			this.$nextTick(function(){
				track.$broadcast('setStartTime')	
				track.block.$broadcast('setStartTime')	

				var frames = track.block.$refs.frame
				var frame = frames[index+1]
				frame.focusFrame()
			})
		}
		, removeFrame : function(){
			var track = this.global.item.track
			var framesdata = track.block.blockdata.frames
			var frame = track.block.frame
			var index = frame.index

			framesdata.splice(index, 1)

			this.$nextTick(function(){
				track.$broadcast('setStartTime')	
				track.block.$broadcast('setStartTime')	

				var frames = track.block.$refs.frame
				var frame = index == frames.length ? frames[index-1] : frames[index]
				frame.focusFrame()
			})
		}


	}
}
</script>

