<style>
.track{
	.opacity(60);
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

	&.focus{
		.opacity(100);
		.block{
			.opacity(20);
			&.focus{
				.opacity(100);
			}
		}
	}
}
</style>

<template>
<div class="track" @click.stop="selectTrack" :class="{focus : focus.track && focus.track.itemdata.item_id == itemdata.item_id}">
	<div class="focusframe" v-if="focus.track && focus.track.itemdata.item_id == itemdata.item_id" :style="{width:timedata.framewidth + 'px', left:timedata.time * timedata.framewidth + 'px'}"></div>
	<block v-ref:block v-for="blockdata in itemdata.blocks" :index="$index" :blockdata="blockdata" :timedata="timedata" :keybroad="keybroad"></block>
</div>

</template>

<script>
var block = require('flash/back/block.vue')
return {
  components : {
    block : block
	}
	, props : ['timedata', 'itemdata', 'keybroad', 'formatdata', 'focus']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectTrack : function(event){
			var time = Math.floor(event.offsetX / this.timedata.framewidth)

			this.$set('focus.track', this)
			this.$set('focus.block', null)
			this.$set('focus.frame', null)

			this.$dispatch('focusItemById', this.itemdata.item_id)
			this.$dispatch('setTime', time)	

			if(this.keybroad.command){
				this.$emit('addFrame')	
			}
		}
		, getAnimateFrameData : function(frame){
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
			return framedata
		}
		, formatBlockData : function(data){
			var formatdata = this.formatdata

			if(!data.name)
				Vue.set(data, 'name', 'normal')

			if(!data['timing-function'])
				Vue.set(data, 'timing-function', 'linear')

			if(!data['iteration-count'])
				Vue.set(data, 'iteration-count', 1)

			if(!data['frames']){
				Vue.set(data, 'frames', [ {} , {} ])
			}
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

			console.log(framedata)
		}
		, loadItemByFrame : function(framedata){
			this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
		}
	}
	, events : {
		focusTrackByBlock : function(frame){
			this.$set('focus.track', this)
			this.$set('focus.block', frame)
			this.$set('focus.frame', frame.frame)

			this.$dispatch('focusItemById', this.itemdata.item_id)
		}
		, focusTrackById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.$set('focus.track', this)
			}
		}
		, formatBlockData : function(data){
			this.formatBlockData(data)
		}
		, formatFrameData : function(data){
			this.formatFrameData(data)
		}
		, addFrame : function(){
			var frames = this.$refs.block
			var len = frames.length
			var endframe = frames[len-1]

			var framedatanew = JSON.parse(JSON.stringify({
				frames:[{
					resize : endframe.framedata.resize
					, transform : endframe.framedata.transform
				}]
			}))
			this.formatBlockData(framedatanew)
			this.itemdata.frames.push(framedatanew)

			this.$nextTick(function(){

				var frames = this.$refs.block
				var len = frames.length
				var endframe = frames[len-1]
				this.$dispatch('setTime', endframe.startTime)	
			})
		}
		, splitFrame : function(frame){
			var data = frame.framedata
			if(frame.framedata.name == 'transition'){
				data = this.getAnimateFrameData(frame)
			}

			var framedatanew = JSON.parse(JSON.stringify(data))

			framedatanew.duration = frame.framedata.duration - frame.time
			frame.framedata.duration = frame.time
			frame.time = 0

			this.formatBlockData(framedatanew)
			this.itemdata.frames.splice(frame.index+1, 0, framedatanew)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, clearFrame : function(frame, keepTime){
			var framesdata = this.itemdata.frames
			var framedata = frame.framedata
			var index = frame.index

			if(index != 0 && keepTime){
				framesdata[index-1].duration += framedata.duration
			}
			framesdata.splice(index, 1)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
		, loadItemByTime : function(time){
			var frames = this.$refs.block
			var frame
			var data

			for(var i in frames){
				var block = frames[i]
				console.log(block)

				for(var j in block.$refs.frame){
					frame = block.$refs.frame[j]

					if(time >= block.startTime && time <= block.startTime + frame.startTime){
						block.time = time - block.startTime

						if(block.blockdata.name == 'transition'){
							data = this.getAnimateFrameData(block)

						}else{
							data = frame.framedata
						}

						break;
					}
				}
			}
			return;
			if(!data){
				data = frame.framedata
			}
			this.loadItemByFrame(data)
		}
	}
	, ready : function(){
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

