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
		.h(14px);.ml(140px);

		.timecontrol{
			.pa;.h(100%);z-index:2;.w(4px);

			&:before, &:after{ content:'';.pa;z-index:1; }
			&:before{
				top:0px;bottom:0px;border-right:1px solid red;
				.w(50%);
			}
			&:after{
			}

			span{.pa;top:0px;.w(14px);.h(14px);left:-5px;}
			
		}
	}

	.frame, .ui-state-highlight{
		.h(24px); .ml(-1px);
		border-left:1px solid #222; border-right:1px solid #222;
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
		<div class="timecontrol" v-el:timecontrol :style="{left:140 + timedata.framewidth * timedata.time + timedata.framewidth/2 - 2 + 'px'}">
			<span></span>
		</div>
	</div>

	<div class="tracks">
		<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :framesdata="itemdata.frames" :item_id="itemdata.item_id" :focus_track="focus_track" :timedata="timedata"></track>
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
				, step : 200
				, framewidth : 15
				, time : 0
			}
		}
	}
	, methods : {
		setFocusTrack : function(item_id){
			this.$set('focus_track', item_id)
		}
		, loadTime : function(time){
			if(time > this.timedata.length/this.timedata.step)
				return;

			if(typeof time !== 'undefined')
				this.timedata.time = time

			this.$broadcast('loadItemByTime', this.timedata.time)
		}
	}
	, events : {
		selectTrack : function(item_id){
			this.setFocusTrack(item_id)
			this.$dispatch('focusItemById', item_id)
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
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : false
			, grid: [ mSelf.timedata.framewidth, 0 ]
		})


		$(window).on('keydown', function(e){
			console.log(e.keyCode)

			return;
			switch(e.keyCode){
			}

		})
	}
}
</script>

