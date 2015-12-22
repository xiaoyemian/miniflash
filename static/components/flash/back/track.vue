<style>
.track{
	.opacity(60);
	&.focus{.opacity(100);}
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
			this.setTrackByTime(time)
		}
		, setTrackByTime : function(time){
			var frames = this.$refs.frame
			var frame = null
			for(var i in frames){
				if(frames[i].time + frames[i].startTime >= time){
					frame = frames[i]
					break;
				}
			}

			if(this.keybroad.command){

				if(frame){
					if(this.keybroad.alt){
						this.clearKeyFrame(frame)	

					}else{
						switch(frame.framedata.name){
							case 'normal' :
								frame.framedata.name = 'animate'
								break;

							case 'animate' :
								frame.framedata.name = 'blank'
								break;

							case 'blank' :
								frame.framedata.name = 'normal'
								break;

							default : 
								break;
						}
					}

				}else{
					this.addKeyFrame(time)	
				}
			}

			this.$nextTick(function(){
				this.$dispatch('setTime', time)	
				this.$dispatch('selectTrack', this.itemdata.item_id)
			})


		}
		, clearKeyFrame : function(frame){
				var framesdata = this.itemdata.frames
				var framedata = frame.framedata
				var index = frame.index


				if(index != 0){
					framesdata[index-1].duration += framedata.duration
				}
				framesdata.splice(index, 1)
				
		}
		, addKeyFrame : function(time){
			var framesdata = this.itemdata.frames
			var startTime = 0
			var framedata
			for(var i in framesdata){
				framedata = framesdata[i]
				startTime += framedata.duration
			}
			
			framedata.duration += time - startTime	

			var framenew = JSON.parse(JSON.stringify({
				resize : framedata.resize
				, transform : framedata.transform
			}))
			this.formatFrameData(framenew)
			
			framesdata.push(framenew)
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
		setTrackByFrame : function(frame){
			this.setTrackByTime(frame.time + frame.startTime)
		}
		, formatFrameData : function(framedata){
			this.formatFrameData(framedata)
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

