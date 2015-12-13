<style>

.flash{
	z-index:900;
	.pa;left:0px;right:0px;bottom:0px;
	.bgc(#333);
	border:1px solid #222;

	.tracks{
		border:1px solid #222;
	}

	.times{
		.h(20px);.ml(140px);

		.timecontrol{
			.pa;.w(15px);.h(100%);
			&:before, &:after{ content:'';.pa;z-index:1; }
			&:before{
				right:5px;top:0px;bottom:0px;.ml(-1px);border-left:2px solid red;
			}
			&:after{
			}
			
		}
	}

	.frame, .ui-state-highlight{
		.w(14px); .h(24px); .ml(-1px);
		border-left:1px solid #222; border-right:1px solid #222;
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}
</style>


<template>
<div class="flash">
	<div class="times">
		<div class="timecontrol" v-el:timecontrol :style="{left:140 + timedata.framewidth * timedata.time + 'px'}"></div>
	</div>

	<div class="tracks">
		<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :trackdata="itemdata.tracks" :item_id="itemdata.item_id" :focus_track="focus_track" :timedata="timedata"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['itemsdata']
	, data : function(){

		return {
			focus_track : null
			, timedata : {
				length : 10000
				, step : 1000
				, framewidth : 15
				, time : 0
			}
		}
	}
	, methods : {
		loadTime : function(time){
			if(time > this.timedata.length/this.timedata.step)
				return;

			if(typeof time !== 'undefined')
				this.timedata.time = time

			console.log(this.timedata.time, time)
			this.$broadcast('loadItemByTime', this.timedata.time)
		}
		, setFocusTrack : function(item_id){
			this.$set('focus_track', item_id)
		}
	}
	, events : {
		selectTrack : function(track){
			this.setFocusTrack(track.item_id)
			this.$dispatch('loadItemByFrame', track.item_id, track.focus_frame)
			this.$dispatch('focusItemById', track.item_id)
		}
		, focusTrackById : function(item_id){
			this.setFocusTrack(item_id)
		}
		, loadTime : function(time){
			this.loadTime(time)
		}
	}
	, ready : function(){
		this.loadTime(0)

		var mSelf = this
		var $timecontrol = $(this.$els.timecontrol)

		$timecontrol.draggable({
			start : function(event, ui){
			}
			, drag : function(event, ui){
				var time = ((ui.position.left - 140)/mSelf.timedata.framewidth)|0
				if(mSelf.timedata.time != time)
					mSelf.loadTime(time)
			}
			, stop : function(event, ui){
				var time = ((ui.position.left - 140)/mSelf.timedata.framewidth)|0
				if(mSelf.timedata.time != time)
					mSelf.loadTime(time)
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : false
			, grid: [ mSelf.timedata.framewidth, 0 ]
		})
	
	}
}
</script>

