<style>
.track{
	.l(24px);
	.fc(#ccc);
	.hidden;
	border-top:1px solid #222;

	border-bottom:1px solid #222;
	.mt(-1px);

	.trackname{
		.left;.w(140px);
		.h(100%);
	}
	.trackframe{
		.ml(140px);
		display:-webkit-box;
	}
	&.focus{
	}

	.frame{
		.w(12px); .h(24px);
		border-left:1px solid #222;

		&:nth-last-child(1){
			border-right:1px solid #222;
		}

	}

	.ui-state-highlight{
		.w(12px);.h(24px);.bgc(#222);
		border-left:1px solid #222;

		&:nth-last-child(1){
			border-right:1px solid #222;
		}
	}


}

</style>

<template>
<div class="track" @click.stop="selectItem" v-if="trackdata" :class="{focus : focus.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="index in tracklength/framestep" :framedata="trackdata[$index]" :frame_id="$index" :focus="focus" :item_id="item_id"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focus', 'item_id', 'trackdata']
	, data : function(){
		return {
			tracklength : 4000
			, framestep : 100
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.item_id)
		}
	}
	, events : {
		addFrame : function(frame){
			if(!frame.framedata){
				var framedata = this.$children[this.focus[this.item_id] || 0].framedata

				Vue.set(frame, 'framedata', {
					style : {}
					, type : 'blankframe'
				})

				for(var i in framedata.style){
					Vue.set(frame.framedata.style, i ,framedata.style[i])
				}
			}
		}
	}
	, ready : function(){
		var mSelf = this
		var frame = this.$children[this.focus[this.item_id] || 0]

		this.$dispatch('updataItemStyle', frame.framedata.style, this.item_id)
		this.$dispatch('setCurrent', this.item_id, frame.frame_id)

		var $trackframe = $(this.$els.trackframe)
		var index = {}

		$trackframe.sortable({
			start : function(event, ui){
				mSelf.selectItem()

				index = {start:ui.item.index()}

			}
			, stop : function(event, ui){
				index.stop = ui.item.index()
				console.log('stop', index)
			
				console.log(mSelf.$children)

			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()

	}
}
</script>

