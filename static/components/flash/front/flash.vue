<style>
.flash{
	.pa;right:0px;top:0px;bottom:0px;
	.w(40%);
	box-sizing:border-box;

	.bgc(#333);.fc(#ccc);.l(26px);
	border:1px solid #222;

	.trackbox{
		.pr;
		.hidden;
		overflow-x:auto;
		box-sizing: border-box;
	}

	.tracks{
		.left;.pr;
	}

	.track{
		border-bottom:1px solid #222;

		.trackframe{
			display:-webkit-box;
		}
		&.focus{
			//.bgc(#f69);
		}
	}

	.times{
		.h(26px);
		border-bottom:1px solid #222;

		.timecontrol{
			.pa;.h(100%);z-index:2;.w(1px);
			.bgc(red);

			span{.pa;top:0px;.h(26px);
				.bgc(#FF7070);z-index:10;
				border:1px solid red;
				box-sizing:border-box;
			}
			
		}
	}

	.frame, .name, .ui-state-highlight{
		.h(26px);
	}
	.ui-state-highlight{
		.w(12px);
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}
</style>


<template>

<div class="flash">

	<div class="trackbox">
		<div class="tracks">

			<div class="times">
				<div class="timecontrol" v-el:timecontrol :style="{left:timedata.framewidth * timedata.time + timedata.framewidth/2 + 'px'}">
					<span :style="{width:timedata.framewidth + 'px', left: -(timedata.framewidth)/2 + 'px'}"></span>
				</div>
			</div>

			<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :itemdata="itemdata" :timedata="timedata" :formatdata="formatdata"></track>
		</div>
	</div>

</div>
</template>


<script>
require('jquery')
require('jqui/draggable')

var track = require('flash/front/track.vue')

return {
  components : {
		track : track
  }
	, props:['itemsdata', 'formatdata']
	, data : function(){

		return {
			timedata : {
				length : 10000
				, step : 200
				, framewidth : 12
				, time : 0
			}
		}
	}
	, methods : {
		loadTime : function(){
			this.$broadcast('loadItemByTime', this.timedata.time)
		}
	}
	, ready : function(){
		this.$broadcast('loadTrack')

		var mSelf = this
		var t = setInterval(function(){

			mSelf.loadTime()
			mSelf.timedata.time++;

			if(mSelf.timedata.time == mSelf.timedata.length/mSelf.timedata.step)
				clearInterval(t)

		}, 200)

	}
}
</script>

