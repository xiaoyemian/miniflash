<style>

.flash{
	z-index:900;
	.pa;left:0px;right:0px;bottom:0px;
	.bgc(#333);
	border:1px solid #222;
	.pl(80px);

	.tracks{
		.trackname{
			.pa;left:0px;
			.w(80px);
		}
		.trackframe{
			border-left:1px solid #222;
		}
	}

	.times{
		.h(24px);

		.timecontrol{
			.pa;.h(100%);z-index:2;.w(2px);
			.bgc(red);

			span{.pa;top:0px;.h(24px);
				.bgc(#FF7070);z-index:1;
				border:1px solid red;
				box-sizing:border-box;
			}
			
		}
	}

	.frame, .ui-state-highlight{
		.h(24px);
		.ml(-1px);
		border-left:1px solid #222;
		border-right:1px solid #222;
	}
	.ui-state-highlight{
		.w(14px);
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}
</style>


<template>
<div class="flash">
	<div class="times">
		<div class="timecontrol" v-el:timecontrol :style="{left:80 + timedata.framewidth * timedata.time + timedata.framewidth/2 + 'px'}">
			<span :style="{width:timedata.framewidth + 'px', left: -(timedata.framewidth)/2 +1 + 'px'}"></span>
		</div>
	</div>

	<div class="tracks">
		<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :framesdata="itemdata.frames" :item_id="itemdata.item_id" :focus_track="focus_track" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['itemsdata', 'formatdata', 'keybroad']
	, data : function(){

		return {
			focus_track : null
			, timedata : {
				length : 10000
				, step : 200
				, framewidth : 16
				, time : 0
			}
		}
	}
	, methods : {
		setFocusTrack : function(item_id){
			this.$set('focus_track', item_id)
		}
		, loadTime : function(){
			this.$broadcast('loadItemByTime', this.timedata.time)
		}
		, setTime : function(time){
			if(time > this.timedata.length/this.timedata.step)
				return;

			this.timedata.time = time
			this.loadTime()
		}
	}
	, events : {
		selectTrack : function(item_id){
			this.setFocusTrack(item_id)
			this.$dispatch('focusItemById', item_id)
		}
		, setTime : function(time){
			this.setTime(time)
		}
	}
	, ready : function(){
		this.setTime(0)
		this.$broadcast('loadTrack')

		var mSelf = this
		var $timecontrol = $(this.$els.timecontrol)

		$timecontrol.draggable({
			start : function(event, ui){
			}
			, drag : function(event, ui){
				var time = ((ui.position.left - 80)/mSelf.timedata.framewidth)|0
				if(mSelf.timedata.time != time)
					mSelf.setTime(time)
			}
			, stop : function(event, ui){
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : false
			, grid: [ mSelf.timedata.framewidth, 0 ]
		})
	}
}
</script>

