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
<div class="track" @click.stop="selectItem" :class="{focus : focus.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="(frame_id, framedata) in framesdata" :framedata="framedata" :frame_id="$index" :focus="focus" :item_id="item_id"></frameitem>
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
		var tracklength = 4000
		var framestep = 100
		var framesdata = []

		for(var i = 0; i <= tracklength/framestep; i++){
			framesdata.push(this.trackdata[i] || {})
		}

		return {
			tracklength : tracklength 
			, framestep : framestep
			, framesdata : framesdata
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.item_id)
		}
	}
	, events : {
		addFrame : function(frame){
			if(!frame.framedata.style){
				var framedata = this.framesdata[this.focus[this.item_id] || 0]

				frame.$set('framedata', {
					style : {}
					, type : 'keyframe'
				})

				for(var i in framedata.style){
					frame.$set('framedata.style.'+i, framedata.style[i])
				}
			}
		}
	}
	, ready : function(){
		var mSelf = this
		var frame_id = 0
		this.$dispatch('updataItemStyle', {style : this.framesdata[frame_id].style, item_id : this.item_id})
		this.$dispatch('setCurrent', this.item_id, frame_id)




		var $trackframe = $(this.$els.trackframe)
		var index = {}

		$trackframe.sortable({
			start : function(event, ui){
				mSelf.selectItem()
				index = {start:ui.item.index()}

			}
			, stop : function(event, ui){
				index.stop = ui.item.index()

				var framedata = mSelf.framesdata.splice(index.start, 1)[0]
				mSelf.framesdata.splice(index.stop, 0, framedata)

				mSelf.$dispatch('setFocus', mSelf.item_id, index.stop, framedata.style)

			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()
	}
}
</script>

