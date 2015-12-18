<style>
.track{
	.l(24px); .fc(#ccc); .hidden;
	.mt(-1px);
	border-top:1px solid #222;
	border-bottom:1px solid #222;
	&:nth-last-child(1){
		.mb(-1px);
	}

	.trackname{
		.left;.w(140px); .h(100%);
	}
	.trackframe{
		.ml(140px); display:-webkit-box;
	}
	&.focus{
		//.bgc(#f69);
	}
}

</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus:focus_track == item_id}">
	<div class="trackname">{{item_name}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in frameslist" :framedata="framedata" :time="$index" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'focus_track', 'item_id', 'framesdata', 'keybroad', 'formatdata']
	, data : function(){

		var frameslist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			frameslist.push(this.framesdata[i] || {})
		}

		var item_name = this.item_id.split('|')
		item_name = item_name[0] + item_name[1]

		return {
			frameslist : frameslist
			, item_name :item_name 
		}
	}
	, methods : {
		selectTrack : function(){
			this.$dispatch('selectTrack', this.item_id)
		}
		, loadTrack : function(){
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
	}
	, events : {
		selectFrame : function(time){
			this.selectTrack()
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
			
			this.$dispatch('loadItemByFrame', this.item_id, framedata)
		}
		, loadTrack : function(){
			this.loadTrack()
		}
		, loadTrackById : function(item_id){
			if(item_id == this.item_id)
				this.loadTrack()
		}
		, updateFramesData : function(){
			for(var i in this.frameslist){
				var framedata = this.frameslist[i]

				if(framedata.type == 'keyframe')
					this.$set('framesdata["' + i + '"]', framedata)
			}
		}
	}
	, ready : function(){
		var mSelf = this
		var $trackframe = $(this.$els.trackframe)
		var sortStart
		var sortStop

		$trackframe.sortable({
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
						this.loadTrack()
					})

				})
			}
			, axis: "x"
			, cursor: "move"
			, placeholder: 'ui-state-highlight'
		})

		$trackframe.disableSelection()
	}
}
</script>

