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
		<frameitem v-ref:frame v-for="framedata in frameslist" :focus_frame="focus_frame" :framedata="framedata" :time="$index" :timedata="timedata" :command="command" :formatdata="formatdata"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'focus_track', 'item_id', 'framesdata', 'command', 'formatdata']
	, data : function(){

		var frameslist = []

		for(var i = 0; i <= this.timedata.length/this.timedata.step; i++){
			frameslist.push(this.framesdata[i] || {})
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
		, setFocusFrame : function(time){
			this.$set('focus_frame', time)
		}
		, loadTrack : function(){
			var len = this.frameslist.length
			var name = ''

			for(var i = len-1; i >= 0; i--){
				var framedata = this.frameslist[i]

				if(framedata.type == 'keyframe'){
					name = framedata.name

				}else{
					framedata.name = name
				}

				console.log(name, framedata.name, framedata.type)
			}
		}
	}
	, events : {
		selectFrame : function(time){
			this.setFocusFrame(time)
			this.selectTrack()
		}
		, formatTransform : function(framedata){
			var formatdata = this.formatdata

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					framedata.transform[i] = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						framedata.transform[i][value[0]] = value[2] || 0
					}
				}
			}
		}
		, loadItemByTime : function(time){
			this.setFocusFrame(time)

			var framedata = this.frameslist[time]

			if(framedata.type == 'blankframe'){
				var resize = {} 
				var transform = {} 

				for(var i = time; i >= 0; i--){
					var data = this.frameslist[i]
					if(data.type && data.type == 'keyframe'){

						for(var i in data.resize){
							resize[i] = data.resize[i]
						}

						for(var i in data.transform){
							transform[i] = {}
							for(var j in data.transform[i]){
								transform[i][j] = data.transform[i][j]
							}
						}

						break;
					}
				}
				this.$set('frameslist[' + time + '].resize', resize)
				this.$set('frameslist[' + time + '].transform', transform)

				this.$emit('formatTransform', framedata)
			}

			this.$dispatch('loadItemByFrame', this.item_id, framedata)
		}
		, loadTrack : function(){
			if(this.focus_track == this.item_id)
				this.loadTrack()

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
					this.frameslist = frames	

					this.$nextTick(function(){
						this.loadTrack()
						this.$dispatch('loadTime')
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

