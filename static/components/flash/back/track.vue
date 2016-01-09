<style>
.track{
//	.opacity(60);
	.pr;

	.focusframe{
		.pa;
		.h(100%);
		.bgc(#FF7070);
		.opacity(60);
		z-index:2;
		border:1px solid red;
		box-sizing:border-box;
	}

/*
	&.focus{
		.opacity(100);
		.block{
			.opacity(20);
			&.focus{
				.opacity(100);
			}
		}
	}
*/
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus.track && focus.track.item && focus.track.item.itemdata.item_id == itemdata.item_id}">
	<div class="focusframe" v-if="focus.block && focus.block.frame && focus.track.item && focus.track.item.itemdata.item_id == itemdata.item_id" :style="{width:timedata.framewidth + 'px', left:timedata.time * timedata.framewidth + 'px'}"></div>

	<block v-ref:block v-for="blockdata in itemdata.blocks" :index="$index" :blockdata="blockdata" :timedata="timedata"></block>
</div>

</template>

<script>
var block = require('flash/back/block.vue')
return {
  components : {
    block : block
	}
	, props : ['timedata', 'itemdata', 'formatdata', 'focus']
	, data : function(){
		return {
			item : null
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.focusTrack()
			this.$dispatch('blurBlock')
			this.item.focusItem()
			this.$dispatch('setTime', time)	
		}
		, focusTrack : function(){
			this.$set('focus.track', this)
		}
		, getAnimateFrameData : function(block){
			var framedata = block.frame.framedata

/*
			if(frame.time == 0){
				return frame.framedata
			}

			var enddata = this.itemdata.blocks[frame.index+1]
			if(!enddata){
				return frame.framedata
			}
				
			var framedata = {name:'transition'}
			this.formatBlockData(framedata)

			var line = frame.time / frame.framedata.duration
			for(var i in frame.framedata.resize){
				framedata.resize[i] = enddata.resize[i] * line + frame.framedata.resize[i] * (1-line)
			}
			for(var i in frame.framedata.transform){
				for(var j in frame.framedata.transform[i]){
					framedata.transform[i][j] = enddata.transform[i][j] * line + frame.framedata.transform[i][j] * (1-line)
				}
			}
*/

			return framedata
		}
		, formatBlockData : function(data){
			var formatdata = this.formatdata

			if(!data['timing-function'])
				Vue.set(data, 'timing-function', 'linear')

			if(!data['iteration-count'])
				Vue.set(data, 'iteration-count', 1)

			if(!data['frames']){
				Vue.set(data, 'frames', [ {} , {} ])
			}

			data.frames.length > 1
				? Vue.set(data, 'name', 'transition')
				: Vue.set(data, 'name', 'normal')

		}
		, formatFrameData : function(framedata){
			var formatdata = this.formatdata

			if(!framedata.duration)
				Vue.set(framedata, 'duration', 1)

			if(!framedata.resize)
				Vue.set(framedata, 'resize', {})

			if(!framedata.transform)
				Vue.set(framedata, 'transform', {})

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					var data = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						data[value[0]] = value[2] || 0
					}
					Vue.set(framedata.transform, i, data)
				}
			}

			for(var i in formatdata.resize){
				if(!framedata.resize[i]){
					Vue.set(framedata.resize, i, 0)
				}
			}
		}
	}
	, events : {
		focusTrackByBlock : function(block){
			this.focusTrack()
			this.$set('focus.block', block)

			this.item.focusItem()
		}
		, focusTrackById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.focusTrack()
			}
		}
		, formatBlockData : function(data){
			this.formatBlockData(data)
		}
		, formatFrameData : function(data){
			this.formatFrameData(data)
		}
		, loadItemByTime : function(time){
			var blocks = this.$refs.block
			var frame
			var framedata

			for(var i in blocks){
				var block = blocks[i]
				var frames = block.$refs.frame

				for(var j in frames){
					frame = frames[j]

					if(time >= block.startTime && time <= block.startTime + frame.startTime){
						block.time = time - block.startTime

						if(block.blockdata.name == 'transition'){
							framedata = this.getAnimateFrameData(block)

						}else{
							framedata = frame.framedata
						}

						break;
					}
				}

				if(framedata)
					break;
				
			}
			if(!framedata){
				framedata = frame.framedata
			}

			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
	}
	, ready : function(){
		this.$dispatch('bindItem', this)	

		var mSelf = this
		var $track = $(this.$el)
		var sortStart
		var sortStop

		$track.sortable({
			start : function(event, ui){
				sortStart = ui.item.index()-1
			}
			, stop : function(event, ui){
				sortStop = ui.item.index()-1
				var framesdata = mSelf.itemdata.frames
				framesdata.splice(sortStop, 0, framesdata.splice(sortStart,1)[0])

				mSelf.itemdata.frames = []	
				mSelf.$nextTick(function(){
					this.itemdata.frames = framesdata
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
	}
}
</script>

