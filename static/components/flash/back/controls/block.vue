<template>
<div class="controlBlock" v-if="global.item && global.item.track && global.item.track.block">
	<div @click.stop="changeBlock2Normal" class="normalBox" v-if="global.item.track.block.blockdata.name != 'normal'">转换为逐帧动画</div>
	<div @click.stop="changeBlock2Transition" class="transitionBox" v-if="global.item.track.block.blockdata.name != 'transition'">转换为过渡动画</div>
	<div @click.stop="changeBlock2Animation" class="animationBox" v-if="global.item.track.block.blockdata.name != 'animation'">转换为预设动画</div>

	<div @click.stop="removeBlock" class="itemBox" v-if="global.item && global.item.itemdata.blocks.length > 1">删除动作</div>

	<div @click.stop="addFrame" class="frameBox" v-if="global.item.track.block.blockdata.name == 'transition'">添加帧</div>
	<div @click.stop="removeFrame" class="frameBox" v-if="global.item.track.block.blockdata.name == 'transition' && global.item.track.block.blockdata.frames.length > 1">删除帧</div>
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
		removeBlock : function(){
			var track = this.global.item.track
			var blocksdata = track.itemdata.blocks
			var block = track.block
			var index = block.index

			blocksdata.splice(index, 1)

			this.$nextTick(function(){
				track.$broadcast('setStartTime')	
				this.$dispatch('loadTime')
			})
		}
		, changeBlock2Normal : function(){
			var track = this.global.item.track
			var blocksdata = track.itemdata.blocks
			var block = track.block
			var index = block.index
			var framesdata = block.blockdata.frames
			var len = framesdata.length

			blocksdata.splice(index, 1)

			for(var i = len-1; i>=0; i--){
				var framedata = framesdata[i]

				var blockdatanew = JSON.parse(JSON.stringify({
					frames:[{
						resize : framedata.resize
						, transform : framedata.transform
						, duration : framedata.duration
					}]
				}))
				track.formatBlockData(blockdatanew)

				blocksdata.splice(index, 0, blockdatanew)
			}

			this.$nextTick(function(){
				var block = track.$refs.block[index]
				block.focusBlock()
			})

		}
		, changeBlock2Transition : function(){
			var track = this.global.item.track
			var blocksdata = track.itemdata.blocks
			var block = track.block

			Vue.set(block.blockdata, 'name', 'transition')
		}
		, changeBlock2Animation : function(){
			
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

