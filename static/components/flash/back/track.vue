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


	&.focus{
		.opacity(100);
		.frame{
			.opacity(20);
			&.focus{
				.opacity(100);
			}
		}
	}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus_track == itemdata.item_id}">
	<div class="focusframe" v-if="focus_frame && focus_track == itemdata.item_id" :style="{width:timedata.framewidth + 'px', left:timedata.time * timedata.framewidth + 'px'}"></div>
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :index="$index" :framedata="framedata" :timedata="timedata" :keybroad="keybroad"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus_track', 'focus_frame']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$emit('focusTrack')
			this.$dispatch('setTime', time)	

			if(this.keybroad.command){
				this.$emit('addKeyFrame', time)	
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
				
			var framedata = {name:'animate'}
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

			if(!framedata.duration)
				Vue.set(framedata, 'duration', 1)

			if(!framedata.resize)
				Vue.set(framedata, 'resize', {})

			if(!framedata.transform)
				Vue.set(framedata, 'transform', {})

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					var data = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						data[value[0]] = value[2] || 0
					}
					Vue.set(framedata.transform, i, data)
				}
			}

			for(var i in formatdata.resize){
				if(!framedata.resize[i]){
					Vue.set(framedata.resize, i, 0)
				}
			}
		}
		, loadItemByFrame : function(framedata){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
	}
	, events : {
		focusTrack : function(){
			this.$dispatch('setFocusTrack', this.itemdata.item_id)
			this.$dispatch('focusItemById', this.itemdata.item_id)
		}
		, formatFrameData : function(framedata){
			this.formatFrameData(framedata)
		}
		, addKeyFrame : function(time){
			var frames = this.$refs.frame
			var len = frames.length
			var endframe = frames[len-1]
			endframe.framedata.duration = time - endframe.startTime 

			var framedatanew = JSON.parse(JSON.stringify({
				resize : endframe.framedata.resize
				, transform : endframe.framedata.transform
			}))
			this.formatFrameData(framedatanew)
			this.itemdata.frames.push(framedatanew)

			this.$nextTick(function(){
				this.$dispatch('setTime', time)	
			})
		}
		, splitKeyFrame : function(frame){
			var data = frame.framedata
			if(frame.framedata.name == 'animate'){
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

					if(frame.framedata.name == 'animate'){
						framedata = this.getAnimateFrameData(frame)

					}else{
						framedata = frame.framedata
					}
					break;
				}
			}
			if(!framedata){
				framedata = frame.framedata
			}
			this.loadItemByFrame(framedata)
		}
	}
	, watch : {
		'itemdata.frames' : function(frames){
			var len = frames.length
			if(len){
				var enddata = frames[len-1]
//				enddata.name = 'normal'
				enddata.duration = 1
			}
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

