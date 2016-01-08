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

<div class="btnBox" v-if="focus.block">
	<div @click="removeBlock" class="blockBox" v-if="focus.item.itemdata.blocks.length > 1">删除动作</div>
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

			if(this.focus.block){
				endblock = this.focus.block.blockdata

			}else{
				var len = this.focus.item.itemdata.blocks.length
				endblock = this.focus.item.itemdata.blocks[len-1]
			}

			var len = endblock.frames.length
			var endframe = endblock.frames[len-1] 

			var blockdatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.resize
					, transform : endframe.transform
				}]
			}))
			this.focus.track.formatBlockData(blockdatanew)
			this.focus.item.itemdata.blocks.push(blockdatanew)

			this.$nextTick(function(){

				var len = this.focus.item.itemdata.blocks.length
				endblock = this.focus.item.itemdata.blocks[len-1]

				this.$dispatch('setTime', endblock.startTime)	
			})
		}
		, removeFrame : function(frame, keepTime){
			var framesdata = this.itemdata.frames
			var framedata = frame.framedata
			var index = frame.index

			if(index != 0 && keepTime){
				framesdata[index-1].duration += framedata.duration
			}
			framesdata.splice(index, 1)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}

	}
}
</script>

