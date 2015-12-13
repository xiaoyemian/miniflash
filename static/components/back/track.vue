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
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in tracklist" :focus_frame="focus_frame" :framedata="framedata" :time="$index" :timedata="timedata"></frameitem>
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
			this.$dispatch('selectTrack', this.item_id, this.focus_frame)
		}
		, setFocusFrame : function(frame){
			this.$set('focus_frame', frame)
		}
	}
	, events : {
		selectFrame : function(frame){
			this.setFocusFrame(frame)
			this.selectTrack()
		}
		, loadItemByTime : function(time){
			var frame = this.$refs.frame[time]
			this.setFocusFrame(frame)
			this.$dispatch('loadItemByFrame', this.item_id, frame)
		}
	}
	, ready : function(){
		var mSelf = this
/*
		var t = setInterval(function(){
			var a = mSelf.tracklist.shift()
			mSelf.tracklist.push(a)

			mSelf.$nextTick(function () {
				mSelf.$dispatch('loadTime')
			})
		}, 3000)
*/

		var $trackframe = $(this.$els.trackframe)
		var sortStart
		var sortStop

		$trackframe.sortable({
			start : function(event, ui){
				sortStart = ui.item.index()
			}
			, update : function(event, ui){
				sortStop = ui.item.index()

				$trackframe.sortable('cancel')

				var a = mSelf.tracklist.shift()
				mSelf.tracklist.push(a)


				mSelf.$nextTick(function(){
	//				mSelf.$dispatch('loadTime')
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

