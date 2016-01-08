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
	<div @click="addBlock" class="blockBox">添加动作</div>
</div>

<div class="btnBox" v-if="focus.track && focus.block">
	<div @click="removeBlock" class="blockBox" v-if="focus.track.itemdata.blocks.length > 1">删除动作</div>
	<div @click="addFrame" class="frameBox">添加帧</div>
</div>

<div class="btnBox" v-if="focus.block && focus.frame">
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
			var endblock
			var len = this.focus.track.itemdata.blocks.length

			if(this.focus.block){
				endblock = this.focus.block.blockdata

			}else{
				endblock = this.focus.track.itemdata.blocks[len-1]
			}

			var framelen = endblock.frames.length
			var endframe = endblock.frames[framelen-1] 

			var blockdatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.resize
					, transform : endframe.transform
				}]
			}))
			this.focus.track.formatBlockData(blockdatanew)
			this.focus.track.itemdata.blocks.push(blockdatanew)

			this.$nextTick(function(){
				var block = this.focus.track.$refs.block[len]
				this.$dispatch('setTime', block.startTime)	
			})
		}
		, removeFrame : function(){
			var framesdata = this.itemdata.frames
			var framedata = frame.framedata
			var index = frame.index

			framesdata.splice(index, 1)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
	}
}
</script>

