<style>
</style>

<template>
	
<div class="track">
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in frameslist" :framedata="framedata" :time="$index" :timedata="timedata" :formatdata="formatdata"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('flash/front/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'formatdata']
	, data : function(){

		var frameslist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			frameslist.push(this.itemdata.frames[i] || {})
		}

		return {
			frameslist : frameslist
		}
	}
	, methods : {
		loadTrack : function(){
			var name = ''
				, arr = []

			for(var i in this.frameslist){
				framedata = this.frameslist[i]
				if(framedata.type == 'blankframe'){
					arr.push(framedata)

				}else{
					for(var k in arr){
						arr[k].name = name 
					}
					name = framedata.name
					arr = []
				}
			}

			for(var j in arr){
				arr[j].name = '' 
			}
		}
		, getStartData : function(time){
			var data = {}
				, index

			for(var i = time; i--; i>=0){
				var framedata = this.frameslist[i]
				if(framedata.type == 'keyframe'){
					data = framedata
					index = i
					break;
				}
			}

			return {framedata:data, index:index} 
		}
		, getEndData : function(time){
			var data = {}
				, index
			var len = this.frameslist.length

			for(var i = time; i++; i< len){
				var framedata = this.frameslist[i]
				if(framedata.type == 'keyframe'){
					data = framedata
					index = i
					break;
				}
			}

			return {framedata:data, index:index} 
		}
		, setNormalFrameData : function(framedata, time){
			var start = this.getStartData(time)
			var startdata = start.framedata

			for(var i in startdata.resize){
				framedata.resize[i] = startdata.resize[i]
			}
			for(var i in startdata.transform){
				for(var j in startdata.transform[i]){
					framedata.transform[i][j] = startdata.transform[i][j]
				}
			}
		}
		, setAnimateFrameData : function(framedata, time){
			var start = this.getStartData(time)
			var end = this.getEndData(time)
			var at = (time - start.index)/(end.index - start.index)

			var startdata = start.framedata
			var enddata = end.framedata

			for(var i in startdata.resize){
				framedata.resize[i] = enddata.resize[i] * at + startdata.resize[i] * (1-at)
			}
			for(var i in startdata.transform){
				for(var j in startdata.transform[i]){
					framedata.transform[i][j] = enddata.transform[i][j] * at + startdata.transform[i][j] * (1-at)
				}
			}
		}
		, loadItemByTime : function(time){
			var framedata = this.frameslist[time]
			var frame = this.$refs.frame[time]

			if(framedata.type == 'blankframe'){
				frame.cleanFrameData()

				if(framedata.name == 'animate'){
					this.setAnimateFrameData(framedata, time)

				}else{
					this.setNormalFrameData(framedata, time)
				}
			}
			
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
	}
	, watch : {
		'timedata.time' : function(time, oldTime){
			this.loadItemByTime(time)
		}
	}
	, ready : function(){
		this.loadTrack()
	}
}
</script>

