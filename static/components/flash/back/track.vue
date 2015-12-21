<style>
</style>

<template>
<div class="track" @click.stop="selectTrack">
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :framedata="framedata" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata']
	, data : function(){
		return {
			frame : null
		}
	}
	, methods : {
		selectTrack : function(){
			this.$dispatch('selectTrack', this.itemdata.item_id)
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
	}
	, events : {
		setFrame : function(frame){
			this.frame = frame
			this.$dispatch('setTime', frame.frametime + frame.time)	
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			var framedata
			for(var i in frames){
				var frame = frames[i]
				if(frame.frametime <= time){
					framedata = frame.framedata
					break;
				}
			}

			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
		, updateFramesData : function(){
			this.itemdata.frames = {}
			for(var i in this.frameslist){
				var framedata = this.frameslist[i]
				if(framedata.type == 'keyframe')
					this.$set('itemdata.frames["' + i + '"]', framedata)
			}

		}
	}
	, ready : function(){

/*
		var mSelf = this

		var $track = $(this.$els)
		var sortStart
		var sortStop

		$track.sortable({
			start : function(event, ui){
				sortStart = ui.item.index()
			}
			, stop : function(event, ui){
				sortStop = ui.item.index()
				var frames = mSelf.frameslist

				frames.splice(sortStop, 0, frames.splice(sortStart,1)[0])

				mSelf.frameslist = []	

				mSelf.$nextTick(function(){
					this.frameslist = frames	

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
*/
	}
}
</script>

