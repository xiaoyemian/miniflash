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
		this.framesdata = []

		for(var i = 0; i <= tracklength/framestep; i++){
			Vue.set(this.framesdata, i, this.trackdata[i] || {style:{}, type:'blankframe'})
		}

		return {
			tracklength : tracklength 
			, framestep : framestep
			, framesdata : this.framesdata
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.item_id)
		}
	}
	, events : {
		addKeyFrame : function(frame){
			var framedata = this.framesdata[this.focus[this.item_id] || 0]

			frame.$set('framedata.type', 'keyframe')

			for(var i in framedata.style){
				frame.$set('framedata.style.'+i, framedata.style[i])
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
		var sortStart

		$trackframe.sortable({
			start : function(event, ui){
				mSelf.selectItem()
				sortStart = ui.item.index()
			}
			, stop : function(event, ui){
				var frame_id = ui.item.index()

				mSelf.framesdata.splice(frame_id, 0, mSelf.framesdata.splice(sortStart, 1)[0])

				mSelf.$dispatch('setFocus', mSelf.item_id, frame_id, mSelf.framesdata[frame_id])
			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()
	}
}
</script>

