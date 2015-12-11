<style>
.track{
	.l(24px); .fc(#ccc); .hidden; .mt(-1px);
	border-top:1px solid #222; border-bottom:1px solid #222;

	.trackname{
		.left;.w(140px); .h(100%);
	}
	.trackframe{
		.ml(140px); display:-webkit-box;
	}
	&.focus{
		.bgc(#f69);
	}

	.frame, .ui-state-highlight{
		.w(12px); .h(24px); .ml(-1px);
		border-left:1px solid #222; border-right:1px solid #222;
	}

	.ui-state-highlight{
		.bgc(#222);
	}
}

</style>

<template>
<div class="track" @click.stop="setFocusTrack" :class="{focus:focustrack && focustrack.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in framesdata" :focusframe="focusframe" :framedata="framedata" :frame_id="$index"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focustrack', 'item_id', 'trackdata']
	, data : function(){
		var tracklength = 600
		var framestep = 100
		var framesdata = []

		for(var i = 0; i < tracklength/framestep; i++){
			Vue.set(framesdata, i, this.trackdata[i] || {style:{}, type:'blankframe'})
		}

		return {
			framesdata : framesdata
			, focusframe : 0 
		}
	}
	, methods : {
		setFocusTrack : function(){
			this.$dispatch('setFocusTrack', this)
		}
	}
	, events : {
		setFocusFrame : function(frame){
			this.$set('focusframe', frame)
			this.setFocusTrack()

			console.log(frame)

		}
	}
	, ready : function(){
		var mSelf = this

		var $trackframe = $(this.$els.trackframe)
		var sortStart
		var sortStop

		$trackframe.sortable({
			start : function(event, ui){
				sortStart = ui.item.index()
			}
			, stop : function(event, ui){
				sortStop = ui.item.index()

				var framedata = mSelf.framesdata.splice(sortStart, 1)[0]
				mSelf.framesdata.splice(sortStop, 0, framedata)
				console.log(mSelf.framesdata)

			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()
	}
}
</script>

