<style>
.controls{
	.btnBox{
		.left;
		.ml(2px);.mr(2px);

		div{
			.inline;
			padding:2px 4px;
			.border-r(2px);
			.fc(white);
			.cursor;
		}
	}
	.itemBox{ .bgc(#9900FF); }
	.blockBox{ .bgc(#0099FF); }
	.frameBox{ .bgc(#FF9900); }
}
</style>


<template>
<div class="btnBox">
	<div class="uploadBtn itemBox" v-if="focus.item">修改图片<input type="file" @change="changeImage"/></div>
	<div class="uploadBtn itemBox" v-else>添加图片<input type="file" @change="addImage"/></div>
</div>

<div class="btnBox" v-if="focus.track">
	<div @click="addBlock" class="itemBox">添加动作块</div>
</div>

<div class="btnBox" v-if="focus.track && focus.block">
	<div @click="removeBlock" class="itemBox" v-if="focus.track.itemdata.blocks.length > 1">删除动作块</div>
	<div @click="changeBlock2Normal" class="blockBox" v-if="focus.block.blockdata.name == 'transition'">转换为逐帧动画</div>
	<div @click="changeBlock2Transition" class="blockBox" v-if="focus.block.blockdata.name == 'normal'">转换为过渡动画</div>
	<div @click="addFrame" class="frameBox">添加帧</div>
</div>

<div class="btnBox" v-if="focus.block && focus.block.frame">
	<div @click="removeFrame" class="frameBox" v-if="focus.block.blockdata.frames.length > 1">删除帧</div>
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
			var blocksdata = this.focus.track.itemdata.blocks
			var block = this.focus.block

			var blocks = this.focus.track.$refs.block
			var len = blocks.length

			if(!block){
				block = blocks[len-1]
			}

			var index = block.index

			var framelen = block.blockdata.frames.length
			var endframe = block.blockdata.frames[framelen-1] 

			var blockdatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.resize
					, transform : endframe.transform
				}]
			}))
			this.focus.track.formatBlockData(blockdatanew)

			blocksdata.splice(index+1, 0, blockdatanew)

			this.$nextTick(function(){
				var block = this.focus.track.$refs.block[index+1]
				block.focusBlock()
			})
		}
		, removeBlock : function(){
			var blocksdata = this.focus.track.itemdata.blocks
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

