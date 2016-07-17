<style>
@namewidth:20%;

.flash{
	.pr;
	border-bottom:1px solid #222;

	.tracks{
		overflow-y:auto;
	}

	.track, .name{
		&:before{content:'';.pa;top:0px;.w(100%);border-top:1px solid #222;z-index:1;}

		&:nth-last-child(1){
			border-bottom:1px solid #222;
		}
	}

	.trackbox{
		.w(100%);
	}

	.trackblocks{
		.left;
		min-width:100%;
	}
	.tracknames{
		.left;
		.w(@namewidth);
		.pr;z-index:10;
		&:after{
			content:'';.pa;top:0px;right:0px;border-right:1px solid #222;.h(100%);
		}
	}
	.trackblockbox{
		.w(100%-@namewidth);
		.h(100%);
		.hidden;
		overflow-x:auto;
	}

	.ui-state-highlight{
		.h(100%);
		.bgc(#222);.w(24px);
	}

	.flashbox{
		.pr;
		.hidden;

		.bgc(#333);.fc(#ccc);

		box-sizing:border-box;
		.pa;top:0px;bottom:0px;left:0px;right:0px;
	}

	.times{
		.pa;left:@namewidth;right:0px;top:0px;
		.timecontrol{
			.bgc(#FF7070);z-index:10;
			border:1px solid red;
			box-sizing:border-box;
			.pa;top:0px;

			span{
				.pa;z-index:4;.w(1px);
				.bgc(red);
			}

			&.none{.none;}
		}
	}
}
</style>


<template>

<div class="flash" @click="blurItem" :style="{height:(global.frameheight) * (global.min+1) + 'px', 'line-height':global.frameheight + 'px'}">
	<div class="flashbox" v-el:flashbox>
		<div class="trackbox">
			<div class="times" :style="{height:global.frameheight + 'px'}">
				<div class="timecontrol" v-el:timecontrol :class="{none:global.framewidth * global.time - global.scrollLeft < 0}" :style="{height:global.frameheight + 'px', width: global.framewidth + 'px', left:global.framewidth * global.time - global.scrollLeft + 'px'}">
					<span :style="{top:global.frameheight+'px',height:(global.frameheight) * (global.min) + 'px', left:(global.framewidth-2)/2 + 'px'}"></span>
				</div>
			</div>

			<div class="tracks" :style="{'margin-top':global.frameheight + 'px', height:global.min * (global.frameheight) + 'px'}">
				<div class="tracknames">
					<name v-ref:name v-for="itemdata in global.pages[global.number].items" :index="$index" :item_id="itemdata.item_id" :global="global" :style="{height:global.frameheight + 'px'}"></name>
				</div>

				<div class="trackblockbox" v-el:trackblockbox @scroll="setScrollLeft" :style="{'padding-bottom':global.frameheight + 'px'}">
					<div class="trackblocks">
						<track v-ref:track v-for="itemdata in global.pages[global.number].items" :index="$index" :itemdata="itemdata" :global="global" :style="{height:global.frameheight + 'px', 'padding-right':global.min * global.framewidth + 'px'}"></track>
					</div>
				</div>
			</div>
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
	, props:['global']
	, data : function(){

		return {
		}
	}
	, methods : {
		blurItem : function(){
			this.global.item && this.global.item.blurItem()
		}
		, setScrollLeft : function(event){
			this.$set('global.scrollLeft', event.target.scrollLeft)
		}
	}
	, watch : {
		'global.scrollLeft' : function(scrollLeft){
			var dtime = Math.floor(scrollLeft/this.global.framewidth)
			this.$set('global.dtime', dtime)
		}
		, 'global.dtime' : function(time){
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
				var time = Math.floor((ui.position.left + mSelf.global.scrollLeft)/mSelf.global.framewidth)
				if(mSelf.global.time != time)
					mSelf.$dispatch('setTime', time)
			}
			, stop : function(event, ui){
			}
			, cursor: "move"
			, containment : "parent"
			, scroll : true
			, grid: [mSelf.global.framewidth, 0 ]
		})
	}
}
</script>

