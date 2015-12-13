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
		.bgc(#f69);
	}
}

</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus:focus_track && focus_track.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in tracklist" :focus_frame="focus_frame" :framedata="framedata" :time="$index"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'focus_track', 'item_id', 'trackdata']
	, data : function(){
		var tracklist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			tracklist.push(this.trackdata[i] || {style:{}, type:'blankframe'})
		}

		return {
			tracklist : tracklist
			, focus_frame : null 
		}
	}
	, methods : {
		selectTrack : function(){
			this.$dispatch('selectTrack', this)
		}
	}
	, events : {
		updateFrameByItem : function(item){
			if(item.itemdata.item_id == this.item_id){
				this.$dispatch('setFocusTrack', this)
			}
		}
		, selectFrame : function(frame){
			this.$set('focus_frame', frame)
			this.selectTrack()
		}
		, loadItemByTime : function(time){
			var frame = this.$refs.frame[time]
			this.$set('focus_frame', frame)
			this.$dispatch('loadItemByFrame', this)
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

/*
				var framedata = mSelf.tracklist.splice(sortStart, 1)[0]
				mSelf.tracklist.splice(sortStop, 0, framedata)
				//console.log(mSelf.tracklist)
*/

			}
			, axis: "x"
			, cursor: "move"
			, placeholder: 'ui-state-highlight'
		})

		$trackframe.disableSelection()
	}
}
</script>

