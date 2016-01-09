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
			var blocksdata = this.global.item.itemdata.blocks
			var block = this.global.item.track.block
			var index = block.index

			blocksdata.splice(index, 1)

			this.$nextTick(function(){
				this.global.item.track.$broadcast('setStartTime')	
				this.$dispatch('loadTime')
			})
		}
		, addFrame : function(){
			var framesdata = this.global.item.track.block.blockdata.frames
			var frame = this.global.item.track.block.frame

			var framedatanew = JSON.parse(JSON.stringify({
				resize : frame.framedata.resize
				, transform : frame.framedata.transform
			}))
			this.global.item.track.formatFrameData(framedatanew)

			var index = frame.index
			framesdata.splice(index+1, 0, framedatanew)

			this.$nextTick(function(){
				this.global.item.track.$broadcast('setStartTime')	
				this.global.item.track.block.$broadcast('setStartTime')	

				var frame = this.global.item.track.block.$refs.frame[index+1]
				frame.focusFrame()
				this.$dispatch('loadTime')
			})
		}
		, removeFrame : function(){
			var framesdata = this.global.item.track.block.blockdata.frames
			var frame = this.global.item.track.block.frame
			var index = frame.index

			framesdata.splice(index, 1)

			this.$nextTick(function(){
				this.global.item.track.$broadcast('setStartTime')	
				this.global.item.track.block.$broadcast('setStartTime')	

				var frame = this.global.item.track.block.$refs.frame[index]
				frame.focusFrame()
				this.$dispatch('loadTime')
			})
		}

	}
}
</script>

