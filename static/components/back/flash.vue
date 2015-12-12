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
			.pa;.w(13px);.h(100%);
			&:before, &:after{ content:'';.pa;z-index:1; }
			&:before{
				right:5px;top:0px;bottom:0px;.ml(-1px);border-left:2px solid red;
			}
			&:after{
			}
			
		}
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
<div class="flash">
	<div class="times">
		<div class="timecontrol" v-el:timecontrol></div>
	</div>

	<div class="tracks">
		<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :trackdata="itemdata.tracks" :item_id="itemdata.item_id" :focus_track="focus_track" :flashdata="flashdata"></track>
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
			, flashdata : {
				length : 10000
				, step : 1000
				, framewidth : 13
			}
			, time : 0
		}
	}
	, methods : {
		setTime : function(time){
			if(typeof time !== 'undefined')
				this.$set('time', time)

      this.$broadcast('setTime', this.time)
		}
	}
	, events : {
		setFocusTrack : function(track, doFocusItem){
			console.log('doFocusItem', doFocusItem)
			this.$set('focus_track', track)

			if(doFocusItem)
				this.$dispatch('focusItemByTrack', this.focus_track)
		}
	}
	, ready : function(){
		this.setTime(0)

		var mSelf = this
		var $timecontrol = $(this.$els.timecontrol)

		$timecontrol.draggable({
			start : function(event, ui){
			}
			, drag : function(event, ui){
				var time = ((ui.position.left - 140)/mSelf.flashdata.framewidth)|0
				mSelf.setTime(time)
			}
			, stop : function(event, ui){
				var time = ((ui.position.left - 140)/mSelf.flashdata.framewidth)|0
				mSelf.setTime(time)
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : false
			, grid: [ mSelf.flashdata.framewidth, 0 ]
		})
	
	}
}
</script>

