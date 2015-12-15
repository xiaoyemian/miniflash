<style>
.track{
	.l(24px); .fc(#ccc); .hidden;
	.mt(-1px);
	border-top:1px solid #222;
	border-bottom:1px solid #222;
	&:nth-last-child(1){
		.mb(-1px);
	}

	.trackname{
		.left;.w(140px); .h(100%);
	}
	.trackframe{
		.ml(140px); display:-webkit-box;
	}
	&.focus{
		//.bgc(#f69);
	}
}

</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus:focus_track == item_id}">
	<div class="trackname">{{item_name}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-ref:frame v-for="framedata in frameslist" :focus_frame="focus_frame" :framedata="framedata" :time="$index" :timedata="timedata"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'focus_track', 'item_id', 'framesdata']
	, data : function(){

		var frameslist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			frameslist.push(this.framesdata[i] || {transform:{}, type:'blankframe'})
		}

		var item_name = this.item_id.split('|')
		item_name = item_name[0] + item_name[1]

		return {
			frameslist : frameslist
			, focus_frame : null 
			, item_name :item_name 
		}
	}
	, methods : {
		selectTrack : function(){
			this.$dispatch('selectTrack', this.item_id)
		}
		, setFocusFrame : function(frame){
			this.$set('focus_frame', frame)
		}
	}
	, events : {
		selectFrame : function(frame){
			this.setFocusFrame(frame)
			this.selectTrack()
		}
		, loadItemByTime : function(time){
			var frame = this.$refs.frame[time]
			this.setFocusFrame(frame)

			if(this.focus_frame.framedata.type == 'blankframe'){
				var resize = {}
				var transform = {}

				for(var i = this.focus_frame.time; i >= 0; i--){
					var framedata = this.frameslist[i]

					if(framedata.type && framedata.type != 'blankframe'){

						for(var i in framedata.resize){
							resize[i] = framedata.resize[i]
						}

						for(var i in framedata.transform){
							transform[i] = {}
							for(var j in framedata.transform[i]){
								transform[i][j] = framedata.transform[i][j]
							}
						}

						break;
					}
				}
				this.$set('focus_frame.framedata.resize', resize)
				this.$set('focus_frame.framedata.transform', transform)
			}

			this.$dispatch('loadItemByTrack', this)
		}
	}
	, watch : {
		frameslist : function(){
			//console.log(arguments)
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
				var frames = mSelf.frameslist

				frames.splice(sortStop, 0, frames.splice(sortStart,1)[0])

				mSelf.frameslist = []	

				mSelf.$nextTick(function(){
					mSelf.frameslist = frames	

					mSelf.$nextTick(function(){
						mSelf.$dispatch('loadTime')
					})

				})
			}
			, axis: "x"
			, cursor: "move"
			, placeholder: 'ui-state-highlight'
		})

		$trackframe.disableSelection()
	}
}
</script>

