<template>
<div class="controlBlock" v-if="focus.item && focus.block">
	<div @click.stop="changeBlock2Normal" class="normalBox" v-if="focus.block.blockdata.name != 'normal'">转换为逐帧动画</div>
	<div @click.stop="changeBlock2Transition" class="transitionBox" v-if="focus.block.blockdata.name != 'transition'">转换为过渡动画</div>
	<div @click.stop="changeBlock2Animation" class="animationBox" v-if="focus.block.blockdata.name != 'animation'">转换为预设动画</div>

	<div @click.stop="removeBlock" class="itemBox" v-if="focus.item && focus.item.itemdata.blocks.length > 1">删除动作</div>

	<div @click.stop="addFrame" class="frameBox" v-if="focus.block.blockdata.name == 'transition'">添加帧</div>
	<div @click.stop="removeFrame" class="frameBox" v-if="focus.block.blockdata.name == 'transition' && focus.block.blockdata.frames.length > 1">删除帧</div>
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
		removeBlock : function(){
			var blocksdata = this.focus.item.itemdata.blocks
			var block = this.focus.block
			var index = block.index

			blocksdata.splice(index, 1)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
	}
}
</script>

