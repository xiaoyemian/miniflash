<style>
.flash{
	.pr;
	border-bottom:1px solid #222;

	.tracks{
		overflow-y:auto;
	}
	.track{.pr(100px);}

	.track, .name{
		border-top:1px solid #222;

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
		.w(10%);
		.pr;z-index:10;
		&:after{
			content:'';.pa;top:0px;right:0px;border-right:1px solid #222;.h(100%);
		}
	}
	.trackblockbox{
		.w(90%);
		.hidden;
		overflow-x:auto;
		.pb(20px);
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
		.pa;left:10%;right:0px;top:0px;
		.timecontrol{
			.pa;z-index:4;.w(1px);
			.bgc(red);

			span{.pa;top:0px;
				.bgc(#FF7070);z-index:10;
				border:1px solid red;
				box-sizing:border-box;
			}
			
		}
	}

}
</style>


<template>

<div class="flash" @click="blurItem" :style="{height:(global.frameheight) * (global.min+1) + 'px', 'line-height':global.frameheight-1 + 'px'}">
	<div class="flashbox" v-el:flashbox>
		<div class="trackbox">
			<div class="times" :style="{height:global.frameheight + 'px'}">
				<div class="timecontrol" v-el:timecontrol :style="{height:(global.frameheight) * (global.min+1) + 'px',left:-global.scrollLeft + global.framewidth * global.time + global.framewidth/2 + 'px'}">
					<span :style="{height:global.frameheight + 'px', width:global.framewidth + 'px', left: -(global.framewidth)/2 + 'px'}"></span>
				</div>
			</div>

			<div class="tracks" :style="{'margin-top':global.frameheight + 'px', height:global.min * (global.frameheight) + 1 + 'px'}">
				<div class="tracknames">
					<name v-ref:name v-for="itemdata in itemsdata" :index="$index" :item_id="itemdata.item_id" :global="global" :style="{height:global.frameheight + 'px'}"></name>
				</div>

				<div class="trackblockbox" v-el:trackblockbox @scroll="setScrollLeft" :style="{height:itemsdata.length * (global.frameheight) + 1 + 'px'}">
					<div class="trackblocks">
						<track v-ref:track v-for="itemdata in itemsdata" :index="$index" :itemdata="itemdata" :global="global" :style="{height:global.frameheight + 'px'}"></track>
					</div>
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
		, setScrollLeft : function(event){
			this.$set('global.scrollLeft', event.target.scrollLeft)

			console.log(this.global.scrollLeft)
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
				var time = (ui.position.left/mSelf.global.framewidth)|0
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

