<style>
.track{
	.opacity(60);
	&.focus{.opacity(100);}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus_track == itemdata.item_id}">
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :framedata="framedata" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></frameitem>
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
			frame : null
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

				}else{
					this.addFrame(time)	
				}
			}

			this.$nextTick(function(){
				this.$dispatch('setTime', time)	
				this.$dispatch('selectTrack', this.itemdata.item_id)
			})
		}
		, addFrame : function(time){
			var framesdata = this.itemdata.frames
			var startTime = 0
			var framedata
			for(var i in framesdata){
				framedata = framesdata[i]
				startTime += framedata.duration
			}
			
			framedata.duration += time - startTime	

			var framenew = JSON.parse(JSON.stringify(framedata))
			framenew.duration = 1
			framenew.name = 'normal'
			framesdata.push(framenew)
		}
		, loadItemNormal : function(frame){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, frame.framedata)
		}
		, loadItemAnimate : function(frame){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, frame.framedata)
		}
	}
	, events : {
		setTrackByFrame : function(frame){
			this.setTrackByTime(frame.time + frame.startTime)
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			for(var i in frames){
				var frame = frames[i]
				if(time >= frame.startTime && time < frame.startTime + frame.framedata.duration){
					if(frame.framedata.name == 'animate'){
						this.loadItemAnimate(frame)

					}else{
						this.loadItemNormal(frame)

					}

					break;
				}
			}
		}
	}
	, ready : function(){
	}
}
</script>

