<style>
.track{
	.opacity(60);
	.pr;

	.focusframe{
		.pa;
		.h(100%);
		.bgc(#FF7070);
		.opacity(60);
		.eventNone;
		z-index:2;
		border:1px solid red;
		box-sizing:border-box;
	}

/*
	&.focus{
		.opacity(100);
		.frame{
			.opacity(20);
			&.focus{
				.opacity(100);
			}
		}
	}
*/
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus.track && focus.track.itemdata.item_id == itemdata.item_id}">
	<div class="focusframe" v-if="focus.track && focus.track.itemdata.item_id == itemdata.item_id" :style="{width:timedata.framewidth + 'px', left:timedata.time * timedata.framewidth + 'px'}"></div>
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :index="$index" :framedata="framedata" :timedata="timedata" :keybroad="keybroad"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus']
	, data : function(){
		return {
			frame : null 
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$set('focus.track', this)
			this.$dispatch('focusItemById', this.itemdata.item_id)
			this.$dispatch('setTime', time)	

			if(this.keybroad.command){
				this.$emit('addFrame')	
			}
		}
		, getAnimateFrameData : function(frame){
			if(frame.time == 0){
				return frame.framedata
			}

			var enddata = this.itemdata.frames[frame.index+1]
			if(!enddata){
				return frame.framedata
			}
				
			var framedata = {name:'transition'}
			this.formatFrameData(framedata)

			var line = frame.time / frame.framedata.duration
			for(var i in frame.framedata.resize){
				framedata.resize[i] = enddata.resize[i] * line + frame.framedata.resize[i] * (1-line)
			}
			for(var i in frame.framedata.transform){
				for(var j in frame.framedata.transform[i]){
					framedata.transform[i][j] = enddata.transform[i][j] * line + frame.framedata.transform[i][j] * (1-line)
				}
			}
			return framedata
		}
		, formatFrameData : function(framedata){
			var formatdata = this.formatdata

			if(!framedata.name)
				Vue.set(framedata, 'name', 'normal')

			if(!framedata['keyframes']){
				Vue.set(framedata, 'keyframes', [ {} , {} ])
			}

			for(var i in framedata.keyframes){
				this.formatKeyFrameData(framedata.keyframes[i])
			}

			if(!framedata['timing-function'])
				Vue.set(framedata, 'timing-function', 'linear')

			if(!framedata['iteration-count'])
				Vue.set(framedata, 'iteration-count', 1)

		}
		, formatKeyFrameData : function(keyframe){
			var formatdata = this.formatdata

			if(!keyframe.duration)
				Vue.set(keyframe, 'duration', 1)

			if(!keyframe.resize)
				Vue.set(keyframe, 'resize', {})

			if(!keyframe.transform)
				Vue.set(keyframe, 'transform', {})

			for(var i in formatdata.transform){
				if(!keyframe.transform[i]){
					var data = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						data[value[0]] = value[2] || 0
					}
					Vue.set(keyframe.transform, i, data)
				}
			}

			for(var i in formatdata.resize){
				if(!keyframe.resize[i]){
					Vue.set(keyframe.resize, i, 0)
				}
			}
		}
		, loadItemByFrame : function(framedata){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
	}
	, events : {
		focusTrackByFrame : function(frame){
			this.$set('frame', frame)
			this.$set('focus.track', this)
			this.$dispatch('focusItemById', this.itemdata.item_id)
		}
		, focusTrackById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.$set('focus.track', this)
			}
		}
		, formatFrameData : function(framedata){
			this.formatFrameData(framedata)
		}
		, addFrame : function(){
			var frames = this.$refs.frame
			var len = frames.length
			var endframe = frames[len-1]

			var framedatanew = JSON.parse(JSON.stringify({
				keyframes:[{
					resize : endframe.framedata.resize
					, transform : endframe.framedata.transform
				}]
			}))
			this.formatFrameData(framedatanew)
			this.itemdata.frames.push(framedatanew)

			this.$nextTick(function(){

				var frames = this.$refs.frame
				var len = frames.length
				var endframe = frames[len-1]
				this.$dispatch('setTime', endframe.startTime)	
			})
		}
		, splitKeyFrame : function(frame){
			var data = frame.framedata
			if(frame.framedata.name == 'transition'){
				data = this.getAnimateFrameData(frame)
			}

			var framedatanew = JSON.parse(JSON.stringify(data))

			framedatanew.duration = frame.framedata.duration - frame.time
			frame.framedata.duration = frame.time
			frame.time = 0

			this.formatFrameData(framedatanew)
			this.itemdata.frames.splice(frame.index+1, 0, framedatanew)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, clearKeyFrame : function(frame, keepTime){
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
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			var frame
			var framedata
			for(var i in frames){
				frame = frames[i]
				if(time >= frame.startTime && time < frame.startTime + frame.framedata.duration){
					frame.time = time - frame.startTime

					if(frame.framedata.name == 'transition'){
						framedata = this.getAnimateFrameData(frame)

					}else{
						framedata = frame.framedata.keyframes[0]
					}
					break;
				}
			}
			if(!framedata){
				framedata = frame.framedata.keyframes[0]
			}
			this.loadItemByFrame(framedata)
			this.$set('frame', frame)
		}
	}
	, ready : function(){
		var mSelf = this
		var $track = $(this.$el)
		var sortStart
		var sortStop

		$track.sortable({
			start : function(event, ui){
				sortStart = ui.item.index()-1
			}
			, stop : function(event, ui){
				sortStop = ui.item.index()-1
				var framesdata = mSelf.itemdata.frames
				framesdata.splice(sortStop, 0, framesdata.splice(sortStart,1)[0])

				mSelf.itemdata.frames = []	
				mSelf.$nextTick(function(){
					this.itemdata.frames = framesdata
					this.$nextTick(function(){
						this.$dispatch('loadTime')
					})
				})
			}
			, axis: "x"
			, cursor: "move"
			, placeholder: 'ui-state-highlight'
		})

		$track.disableSelection()
	}
}
</script>

