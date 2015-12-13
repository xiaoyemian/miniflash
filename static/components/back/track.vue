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
		<frameitem v-ref:frame v-for="framedata in framelist" :focus_frame="focus_frame" :framedata="framedata" :time="$index" :timedata="timedata"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'focus_track', 'item_id', 'framesdata']
	, data : function(){
		var framelist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			framelist.push(this.framesdata[i] || {style:{}, type:'blankframe'})
		}

		return {
			framelist : framelist
			, focus_frame : null 
		}
	}
	, methods : {
		selectTrack : function(){
			this.$dispatch('selectTrack', this.item_id, this.focus_frame.framedata)
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
			this.$dispatch('loadItemByFrame', this.item_id, frame.framedata)
		}
	}
	, watch : {
		framelist : function(){
				console.log(arguments)
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
				var frames = mSelf.framelist

				frames.splice(sortStop, 0, frames.splice(sortStart,1)[0])

				mSelf.framelist = []	

				mSelf.$nextTick(function(){
					mSelf.framelist = frames	

					mSelf.$nextTick(function(){
						mSelf.$dispatch('loadTime')
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

