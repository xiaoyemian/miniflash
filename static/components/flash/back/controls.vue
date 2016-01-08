<style>
.controls{
	.btnBox{
		.left;
		.ml(2px);.mr(2px);

		div{
			.inline;
			padding:2px 4px;
			.border-r(2px);
			.bgc(#9900FF);.fc(white);

		}
	}
}
</style>


<template>
<div class="btnBox">
	<div class="uploadBtn" v-if="focus.item">修改图片<input type="file" @change="changeImage"/></div>
	<div class="uploadBtn" v-else>添加图片<input type="file" @change="addImage"/></div>
</div>

<div class="btnBox" v-if="focus.track">
	<div @click="addBlock">添加动作</div>
</div>

<div class="btnBox" v-if="focus.block">
	<div @click="spliceBlock">拆分动作</div>
	<div @click="removeBlock">删除动作</div>
	<div @click="addFrame">添加关键帧</div>
</div>

<div class="btnBox" v-if="focus.frame">
	<div @click="removeFrame">删除关键帧</div>
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
		, addFrame : function(){
			var frames = this.$refs.block
			var len = frames.length
			var endframe = frames[len-1]

			var framedatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.framedata.resize
					, transform : endframe.framedata.transform
				}]
			}))
			this.formatBlockData(framedatanew)
			this.itemdata.frames.push(framedatanew)

			this.$nextTick(function(){

				var frames = this.$refs.block
				var len = frames.length
				var endframe = frames[len-1]
				this.$dispatch('setTime', endframe.startTime)	
			})
		}
		, splitFrame : function(frame){
			var data = frame.framedata
			if(frame.framedata.name == 'transition'){
				data = this.getAnimateFrameData(frame)
			}

			var framedatanew = JSON.parse(JSON.stringify(data))

			framedatanew.duration = frame.framedata.duration - frame.time
			frame.framedata.duration = frame.time
			frame.time = 0

			this.formatBlockData(framedatanew)
			this.itemdata.frames.splice(frame.index+1, 0, framedatanew)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
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

