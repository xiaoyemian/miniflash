<style>
.flash{
	.pa;right:0px;top:0px;
	.h(60%);.w(50%);
	box-sizing:border-box;
	padding:4px;

	.track, .name{
		border-top:1px solid #222;

		&:nth-last-child(1){
			border-bottom:1px solid #222;
		}
	}

	.track{
		display:-webkit-box;
	}
	.trackbox{
		.left;
		.h(100%);
		min-width:100%;
	}

	.trackframes{
		min-width:100%;
	}
	.tracknames{
		.pr;z-index:10;
	}

	.frame, .ui-state-highlight{.h(100%);}

	.ui-state-highlight{
		.bgc(#222);.w(24px);
	}

	.flashbox{
		.pr;
		.hidden;
		overflow-x:auto;
		.h(100%);

		.bgc(#333);.fc(#ccc);.l(26px);
		border:1px solid #222;

	}

	.times{
		.timecontrol{
			.pa;.h(100%);z-index:4;.w(1px);
			.bgc(red);

			span{.pa;top:0px;
				.bgc(#FF7070);z-index:10;
				border:1px solid red;
				box-sizing:border-box;
			}
			
		}
	}

	.tracks{
		.h(100%);
		.hidden;
		overflow-y:auto;
		box-sizing:border-box;
		display:-webkit-box;
	}
}
</style>


<template>

<div class="flash">
	<div class="flashbox" v-el:flashbox>
		<div class="trackbox">
			<div class="times" :style="{'margin-left':timedata.namewidth + 'px', height:timedata.frameheight + 'px'}">
				<div class="timecontrol" v-el:timecontrol :style="{left:timedata.namewidth + timedata.framewidth * timedata.time + timedata.framewidth/2 + 'px'}">
					<span :style="{height:timedata.frameheight + 'px', width:timedata.framewidth + 'px', left: -(timedata.framewidth)/2 + 'px'}"></span>
				</div>
			</div>

			<div class="tracks" :style="{'padding-bottom':timedata.frameheight + 'px'}">
				<div class="tracknames" :style="{width:timedata.namewidth + 'px'}">
					<name v-ref:name v-for="itemdata in itemsdata" :index="$index" :item_id="itemdata.item_id" :focus_track="focus_track" :style="{height:timedata.frameheight + 'px'}"></name>
				</div>


				<div class="trackframes">
					<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :itemdata="itemdata" :focus_track="focus_track" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata" :style="{height:timedata.frameheight + 'px', 'padding-right':timedata.min * timedata.framewidth + 'px'}"></track>
				</div>
			</div>
		</div>
	</div>

</div>
</template>


<script>
var track = require('flash/back/track.vue')
var name = require('flash/back/name.vue')

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
				min : 10
				, step : 100
				, framewidth : 12
				, frameheight : 26
				, namewidth : 60
				, scrollleft : null
				, time : null
			}
		}
	}
	, methods : {
		setFocusTrack : function(item_id){
			this.$set('focus_track', item_id)
		}
	}
	, events : {
		focusTrack : function(item_id){
			this.setFocusTrack(item_id)
			this.$dispatch('focusItemById', item_id)
		}
		, setTime : function(time){
			this.timedata.time = time
			this.$emit('loadTime')
		}
		, loadTime : function(){
			this.$broadcast('loadItemByTime', this.timedata.time)
		}
	}
	, ready : function(){

		this.$emit('setTime', 0)

		var mSelf = this

		this.timedata.scrollleft = 0
		var $flashbox = $(this.$els.flashbox)
		$flashbox.on('scroll', function(){
			mSelf.timedata.scrollleft = $(this).scrollLeft()
		})



		var $timecontrol = $(this.$els.timecontrol)

		$timecontrol.draggable({
			start : function(event, ui){
			}
			, drag : function(event, ui){
				var time = ((ui.position.left-mSelf.timedata.namewidth)/mSelf.timedata.framewidth)|0
				if(mSelf.timedata.time != time)
					mSelf.$emit('setTime', time)
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

