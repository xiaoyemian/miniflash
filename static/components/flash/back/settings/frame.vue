<style>
</style>

<template>
<div class="settingFlash" v-if="global.item && global.item.track && global.item.track.block && global.item.track.block.frame">

	<div class="controlBlock" v-if="global.item && global.item.track && global.item.track.block && global.item.track.block.blockdata.name == 'transition'">
		<span>帧:</span>
		<div @click.stop="addFrame" class="frameBox">添加帧</div>
		<div @click.stop="removeFrame" class="frameBox" v-if="global.item.track.block.blockdata.frames.length > 1">删除帧</div>
	</div>

	<div class="inputArea" v-for="(key, value) in formatdata">
		<label for="{{key}}">{{value.label}}:</label>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{global.item.track.block.frame.framedata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>

return {
	props : ['global']
	, data : function(){
		return {
			formatdata : {
				duration : {
					label : '时长'
					, unit : '*' + this.global.step + 'ms'
				}
			}
		}
	}
	, methods : {
		updateFrame : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var arr = []
			for(var i in type){
				arr.push('["' + type[i] + '"]')
			}

			this.$set('global.item.track.block.frame.framedata' + arr.join(''), value||0)
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

