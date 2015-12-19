<style>
.flash{
	z-index:900;
	.pa;right:0px;left:0px;bottom:0px;
	.pl(50px);
	box-sizing:border-box;
	overflow:auto;

	.bgc(#333);.fc(#ccc);.l(26px);
	border:1px solid #222;

	.names{
		.pa;left:0px;top:27px;
	}
	.name{
		.pb(1px);
	}

	.trackbox{
		.pr;
		.hidden;
		overflow-x:auto;
		box-sizing: border-box;
		border-left:1px solid #222;
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
		.w(14px);
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}
</style>


<template>

<div class="flash">

	<div class="names">
		<name v-ref:name v-for="itemdata in itemsdata" :index="$index" :item_id="itemdata.item_id" :focus_track="focus_track"></name>
	</div>

	<div class="trackbox">
		<div class="tracks">
			<div class="times">
				<div class="timecontrol" v-el:timecontrol :style="{left:timedata.framewidth * timedata.time + timedata.framewidth/2 + 'px'}">
					<span :style="{width:timedata.framewidth + 'px', left: -(timedata.framewidth)/2 + 'px'}"></span>
				</div>
			</div>


			<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :framesdata="itemdata.frames" :item_id="itemdata.item_id" :focus_track="focus_track" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></track>
		</div>
	</div>

</div>
</template>


<script>
var track = require('back/track.vue')
var name = require('back/name.vue')

return {
  components : {
		track : track
		, name : name
  }
	, props:['itemsdata', 'formatdata', 'keybroad']
	, data : function(){

		return {
			focus_track : null
			, timedata : {
				length : 10000
				, step : 200
				, framewidth : 14
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
				var time = (ui.position.left/mSelf.timedata.framewidth)|0
				if(mSelf.timedata.time != time)
					mSelf.setTime(time)
			}
			, stop : function(event, ui){
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : true
			, grid: [ mSelf.timedata.framewidth, 0 ]
		})
	}
}
</script>

