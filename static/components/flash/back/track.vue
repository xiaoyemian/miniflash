<style>
.track{
	.opacity(60);
	&.focus{
		.opacity(100);

		.frame.focus{
			&:after{
				content:'';.pa;.h(1px);left:6px;right:6px;.bgc(black);bottom:50%;z-index:2;
			}
		}
	}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus_track == itemdata.item_id}">
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :index="$index" :framedata="framedata" :timedata="timedata" :keybroad="keybroad"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus_track']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)

			if(this.keybroad.command){
				this.$emit('addKeyFrame', time)	
			}

			this.loadTrack(time)
		}
		, loadTrack : function(time){
			this.$nextTick(function(){
				this.$dispatch('setTime', time)	
				this.$dispatch('focusTrack', this.itemdata.item_id)
			})
		}
		, loadItemNormal : function(frame){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, frame.framedata)
		}
		, loadItemAnimate : function(frame){
			var framedata = {name:'animate'}
			this.formatFrameData(framedata)

			var startdata = frame.framedata 
			var enddata = this.itemdata.frames[frame.index+1]
			var line = frame.time / frame.framedata.duration

			for(var i in startdata.resize){
				framedata.resize[i] = enddata.resize[i] * line + startdata.resize[i] * (1-line)
			}
			for(var i in startdata.transform){
				for(var j in startdata.transform[i]){
					framedata.transform[i][j] = enddata.transform[i][j] * line + startdata.transform[i][j] * (1-line)
				}
			}

			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
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
	}
	, events : {
		formatFrameData : function(framedata){
			this.formatFrameData(framedata)
		}
		, loadTrack : function(time){
			this.loadTrack(time)
		}
		, splitKeyFrame : function(frame){
			
			console.log(frame)
			
		}
		, addKeyFrame : function(time){
			var frames = this.$refs.frame
			var len = frames.length
			var endframe = frames[len-1]
			endframe.framedata.duration = time - endframe.startTime 

			var framenew = JSON.parse(JSON.stringify({
				resize : endframe.framedata.resize
				, transform : endframe.framedata.transform
			}))
			this.formatFrameData(framenew)
			this.itemdata.frames.push(framenew)
		}
		, clearKeyFrame : function(frame, keepTime){
			var framesdata = this.itemdata.frames
			var framedata = frame.framedata
			var index = frame.index

			if(index != 0 && keepTime){
				framesdata[index-1].duration += framedata.duration
			}
			framesdata.splice(index, 1)

			this.itemdata.frames = []	
			this.$nextTick(function(){
				this.itemdata.frames = framesdata
				this.$nextTick(function(){
					this.$dispatch('loadTime')
				})
			})
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			for(var i in frames){
				var frame = frames[i]
				if(time >= frame.startTime && time < frame.startTime + frame.framedata.duration){
					frame.time = time - frame.startTime

					if(frame.framedata.name == 'animate'){
						if(frame.time == 0){
							this.loadItemNormal(frame)

						}else{
							this.loadItemAnimate(frame)
						}

					}else{
						this.loadItemNormal(frame)
					}
					break;
				}
			}
		}
	}
	, watch : {
		'itemdata.frames' : function(frames){
			var len = frames.length
			if(len){
				var framedata = frames[len-1]
				framedata.name = 'normal'
				framedata.duration = 1
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
				sortStart = ui.item.index()
			}
			, stop : function(event, ui){
				sortStop = ui.item.index()
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

