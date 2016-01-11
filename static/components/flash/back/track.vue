<style>
.track{
	display:-webkit-box;
//	.opacity(60);
	.pr;

	.focusframe{
		.pa;
		.h(100%);
		.bgc(#FF7070);
		.opacity(60);
		.eventNone;
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
<div class="track" @click.stop="selectTrack" :class="{focus : global.item && global.item.itemdata.item_id == itemdata.item_id}">
	<div class="focusframe" v-if="global.item && global.item.itemdata.item_id == itemdata.item_id" :style="{width:global.framewidth + 'px', left:global.time * global.framewidth + 'px'}"></div>

	<block v-ref:block v-for="blockdata in itemdata.blocks" :index="$index" :blockdata="blockdata" :global="global"></block>
</div>

</template>

<script>
var block = require('flash/back/block.vue')
return {
  components : {
    block : block
	}
	, props : ['itemdata', 'global']
	, data : function(){
		return {
			item : null
			, block : null
			, inTrack : null
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.global.framewidth)
			this.$set('block', null)
			this.item.focusItem()

			this.$dispatch('setTime', time)	
		}
		, getTransitionFrameData : function(){
			var block = this.block
			var blocks = this.$refs.block
			var blockindex = block.index
			var blockslen = blocks.length

			var frame = block.frame
			var frames = block.$refs.frame
			var frameindex = frame.index
			var frameslen = frames.length
			var nextframe = frame
	
			if(this.inTrack){
				if(frameindex == frameslen-1){
					if(blockindex == blockslen-1){
						nextframe = frames[frameslen-1] 

					}else{
						nextframe = blocks[blockindex+1].$refs.frame[0]
					}

				}else{
					nextframe = frames[frameindex+1]
				}
			}

			//console.log(nextframe)

			var framedata = frame.framedata

			
	/*		
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
			var formatdata = this.global.formatdata

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
			var formatdata = this.global.formatdata

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
		, setBlock : function(block){
			this.$set('block', block)
		}
	}
	, events : {
		setBlock : function(block){
			this.setBlock(block)
			this.$set('global.time', this.block.startTime + this.block.time)
			this.item.focusItem()
		}
		, formatBlockData : function(data){
			this.formatBlockData(data)
		}
		, formatFrameData : function(data){
			this.formatFrameData(data)
		}
		, loadItemByTime : function(time){
			console.log(time)
			var blocks = this.$refs.block
			var block
			var frame
			var framedata

			this.inTrack = false

			for(var i in blocks){
				block = blocks[i]

				var frames = block.$refs.frame

				for(var j in frames){
					frame = frames[j]
					var start = frame.startTime + block.startTime

					if(time >= start && time < start + frame.framedata.duration){
						this.inTrack = true
						break;
					}
				}

				if(this.inTrack)
					break;
			}

			block.setFrame(frame)
			this.setBlock(block)

			if(block.blockdata.name == 'transition'){
				framedata = this.getTransitionFrameData()

			}else{
				framedata = frame.framedata
			}

			if(!this.inTrack){
				framedata = JSON.parse(JSON.stringify(framedata))
			}

			this.item.loadItemByFrame(framedata)
		}
	}
	, ready : function(){
		this.$dispatch('bindTrackItem', this)	

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
				var blocksdata = mSelf.itemdata.blocks
				blocksdata.splice(sortStop, 0, blocksdata.splice(sortStart,1)[0])

				mSelf.itemdata.blocks = []	
				mSelf.$nextTick(function(){
					this.itemdata.blocks = blocksdata
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

