<style>
.track{
	.l(24px); .fc(#ccc); .hidden; .mt(-1px);
	border-top:1px solid #222; border-bottom:1px solid #222;

	.trackname{
		.left;.w(140px); .h(100%);
	}
	.trackframe{
		.ml(140px); display:-webkit-box;
	}
	&.focus{
	}

	.frame, .ui-state-highlight{
		.w(12px); .h(24px); .ml(-1px);
		border-left:1px solid #222; border-right:1px solid #222;
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}

</style>

<template>
<div class="track" @click.stop="setFocusTrack" :class="{focus:focus_track && focus_track.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in tracklist" :focus_frame="focus_frame" :framedata="framedata" :index="$index"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focus_track', 'item_id', 'trackdata']
	, data : function(){
		var tracklength = 600
		var framestep = 100
		var tracklist = []

		for(var i = 0; i < tracklength/framestep; i++){
			Vue.set(tracklist, i, this.trackdata[i] || {style:{}, type:'blankframe'})
		}

		return {
			tracklist : tracklist
			, focus_frame : null 
		}
	}
	, methods : {
		setFocusTrack : function(forbiddenFocusItem){
			this.$dispatch('setFocusTrack', this, forbiddenFocusItem)
		}
	}
	, events : {
		setFocusFrame : function(frame){
			this.$set('focus_frame', frame)
			this.setFocusTrack()
		}
		, updateTrackByItem : function(item_id){
			if(item_id == this.item_id){
				this.setFocusTrack(true)
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

				var framedata = mSelf.tracklist.splice(sortStart, 1)[0]
				mSelf.tracklist.splice(sortStop, 0, framedata)
				console.log(mSelf.tracklist)

			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()
	}
}
</script>

