<style>
.track{
	.opacity(60);
	&.focus{.opacity(100);}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus_track == itemdata.item_id}">
	<frameitem v-ref:frame v-for="framedata in itemdata.frames" :framedata="framedata" :timedata="timedata" :keybroad="keybroad" :formatdata="formatdata"></frameitem>
</div>

</template>

<script>
var frame = require('flash/back/frame.vue')
return {
  components : {
    frameitem : frame
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus_track']
	, data : function(){
		return {
			frame : null
		}
	}
	, methods : {
		selectTrack : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('setTime', this.time)	
			this.$dispatch('selectTrack', this.itemdata.item_id)

			console.log(this.frame)
			
		}
	}
	, events : {
		setFrame : function(frame){
			this.frame = frame
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.frame
			var frame = frames[0]
			for(var i in frames){
				frame = frames[i]

				if(frame.frametime >= time){
					break;
				}
			}
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, frame.framedata)
		}
	}
	, ready : function(){

/*
		var mSelf = this

		var $track = $(this.$els)
		var sortStart
		var sortStop

		$track.sortable({
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
						this.$dispatch('loadTime')
					})

				})
			}
			, axis: "x"
			, cursor: "move"
			, placeholder: 'ui-state-highlight'
		})

		$track.disableSelection()
*/
	}
}
</script>

