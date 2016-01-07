<style>
.flash{
	.pr;
	box-sizing:border-box;
	border-bottom:1px solid #222;

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

		.bgc(#333);.fc(#ccc);

		box-sizing:border-box;
		.pa;top:0px;bottom:0px;left:0px;right:0px;
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

<div class="flash" :style="{height:(timedata.frameheight+1) * (timedata.min+1) + 1 + 'px', 'line-height':timedata.frameheight + 'px'}">
	<div class="flashbox" v-el:flashbox>
		<div class="trackbox">
			<div class="times" :style="{'margin-left':timedata.namewidth + 'px', height:timedata.frameheight + 'px'}">
				<div class="timecontrol" v-el:timecontrol :style="{left:timedata.namewidth + timedata.framewidth * timedata.time + timedata.framewidth/2 + 'px'}">
					<span :style="{height:timedata.frameheight + 'px', width:timedata.framewidth + 'px', left: -(timedata.framewidth)/2 + 'px'}"></span>
				</div>
			</div>

			<div class="tracks" :style="{'padding-bottom':timedata.frameheight + 'px'}">
				<div class="tracknames" :style="{width:timedata.namewidth + 'px'}">
					<name v-ref:name v-for="itemdata in itemsdata" :index="$index" :item_id="itemdata.item_id" :focus="focus" :style="{height:timedata.frameheight + 'px'}"></name>
				</div>


				<div class="trackframes">
					<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :itemdata="itemdata" :focus="focus" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata" :style="{height:timedata.frameheight + 'px', 'padding-right':timedata.min * 2 * timedata.framewidth + 'px'}"></track>
				</div>
			</div>
		</div>
	</div>
</div>

<blocksetting :focus="focus" :timedata="timedata"></blocksetting>
<framesetting :focus="focus" :timedata="timedata"></framesetting>

</template>


<script>
var track = require('flash/back/track.vue')
var name = require('flash/back/name.vue')
var blocksetting = require('flash/back/settings/block.vue')
var framesetting = require('flash/back/settings/frame.vue')

return {
  components : {
		track : track
		, name : name
		, blocksetting : blocksetting
		, framesetting : framesetting
  }
	, props:['itemsdata', 'formatdata', 'keybroad', 'focus']
	, data : function(){

		return {
			timedata : {
				min : 8 
				, step : 100
				, framewidth : 12
				, frameheight : 22
				, namewidth : 60
				, scrollleft : null
				, time : null
			}
		}
	}
	, events : {
		setTime : function(time){
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

