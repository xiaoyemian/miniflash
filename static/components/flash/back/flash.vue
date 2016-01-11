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

	.trackbox{
		.left;
		.h(100%);
		min-width:100%;
	}

	.trackblocks{
		min-width:100%;
	}
	.tracknames{
		.pr;z-index:10;
	}

	.ui-state-highlight{
		.h(100%);
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

<div class="flash" @click="blurItem" :style="{height:(global.frameheight+1) * (global.min+1) + 1 + 'px', 'line-height':global.frameheight + 'px'}">
	<div class="flashbox" v-el:flashbox>
		<div class="trackbox">
			<div class="times" :style="{'margin-left':global.namewidth + 'px', height:global.frameheight + 'px'}">
				<div class="timecontrol" v-el:timecontrol :style="{left:global.namewidth + global.framewidth * global.time + global.framewidth/2 + 'px'}">
					<span :style="{height:global.frameheight + 'px', width:global.framewidth + 'px', left: -(global.framewidth)/2 + 'px'}"></span>
				</div>
			</div>

			<div class="tracks" :style="{'padding-bottom':global.frameheight + 'px'}">
				<div class="tracknames" :style="{width:global.namewidth + 'px'}">
					<name v-ref:name v-for="itemdata in itemsdata" :index="$index" :item_id="itemdata.item_id" :global="global" :style="{height:global.frameheight + 'px'}"></name>
				</div>

				<div class="trackblocks">
					<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :itemdata="itemdata" :global="global" :style="{height:global.frameheight + 'px', 'padding-right':global.min * global.framewidth + 'px'}"></track>
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
	, props:['itemsdata', 'global']
	, data : function(){

		return {
		}
	}
	, methods : {
		blurItem : function(){
			this.global.item && this.global.item.blurItem()
		}
	}
	, events : {
	}
	, ready : function(){

		this.$dispatch('setTime', 0)

		var mSelf = this

		var $timecontrol = $(this.$els.timecontrol)

		$timecontrol.draggable({
			start : function(event, ui){
			}
			, drag : function(event, ui){
				var time = ((ui.position.left-mSelf.global.namewidth)/mSelf.global.framewidth)|0
				if(mSelf.global.time != time)
					mSelf.$dispatch('setTime', time)
			}
			, stop : function(event, ui){
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : true
			, grid: [ mSelf.global.framewidth, 0 ]
		})
	}
}
</script>

