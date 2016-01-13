<style>
</style>

<template>
<div class="settingFlash" v-if="global.item && global.item.track && global.item.track.inTrack && global.item.track.block">

	<div class="controlBlock">
		<span>转换为:</span>
		<div @click.stop="changeBlock2Normal" class="normalBox" :class="{focus : global.item.track.block.blockdata.name == 'normal'}">关键帧</div>
		<div @click.stop="changeBlock2Transition" class="transitionBox" :class="{focus : global.item.track.block.blockdata.name == 'transition'}">过渡动画</div>
		<div @click.stop="changeBlock2Animation" class="animationBox" :class="{focus : global.item.track.block.blockdata.name == 'animation'}">预设动画</div>
		<div @click.stop="changeBlock2Blank" class="blankBox" :class="{focus : global.item.track.block.blockdata.name == 'blank'}">空白帧</div>
	</div>


	<div class="inputArea" v-for="(key, value) in formatdata.frame" v-if="global.item.track.block.frame">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" @change="updateFrame" v-if="value.options">
			<option value="{{option}}" selected="{{option == global.item.track.block.frame.framedata[key]}}" v-for="(name, option) in value.options">{{option}}</option>
		</select>

		<input v-else type="{{value.type||'number'}}" @keyup="updateFrame" id="{{key}}" min="1" placeholder="" value="{{global.item.track.block.frame.framedata[key]}}" />{{value.unit}}
	</div>



	<div class="inputArea" v-for="(key, value) in formatdata.block" v-if="global.item.track.block.blockdata.name == 'transition'">
		<label for="{{key}}">{{value.label}}:</label>

		<select id="{{key}}" @change="updateBlock" v-if="value.options">
			<option value="{{option}}" selected="{{option == global.item.track.block.blockdata[key]}}" v-for="(name, option) in value.options">{{option}}</option>
		</select>

		<input v-else type="{{value.type||'number'}}" @keyup="updateBlock" id="{{key}}" min="1" placeholder="" value="{{global.item.track.block.blockdata[key]}}" />{{value.unit}}
	</div>

</div>
</template>

<script>
var formatdata = {}
formatdata.block = {
	'iteration-count' : {
		label : '次数'
		, options : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'infinite']
	}
	, 'timing-function' : {
		label : '速度曲线'
		, options : ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']
	}
}


return {
	props : ['global']
	, data : function(){

		formatdata.frame = {
			duration : {
				label : '时长'
				, unit : '*' + this.global.step + 'ms'
			}
		}

		return {
			formatdata : formatdata 
		}
	}
	, methods : {
		updateBlock : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var arr = []
			for(var i in type){
				arr.push('["' + type[i] + '"]')
			}

			this.$set('global.item.track.block.blockdata' + arr.join(''), value||0)
		}
		, updateFrame : function(event){
			var setting = event.target
			var type = setting.id.split('|')
			var value = setting.value

			var arr = []
			for(var i in type){
				arr.push('["' + type[i] + '"]')
			}

			this.$set('global.item.track.block.frame.framedata' + arr.join(''), value||0)
		}

		, changeBlock2Normal : function(){
			this.block2Frame('normal')
		}
		, changeBlock2Blank : function(){
			this.block2Frame('blank')
		}
		, changeBlock2Transition : function(){
			var track = this.global.item.track
			var block = track.block
			block.setName('transition')
		}
		, changeBlock2Animation : function(){
			var track = this.global.item.track
			var block = track.block
			block.setName('animation')
		}
		, block2Frame : function(name){
			var track = this.global.item.track
			var block = track.block

			var blocksdata = track.itemdata.blocks
			var blockindex = block.index
			var framesdata = block.blockdata.frames
			var frameslen = framesdata.length
			var frameindex = block.frame.index

			blocksdata.splice(blockindex, 1)

			for(var i = frameslen-1; i>=0; i--){
				var framedata = framesdata[i]

				var blockdatanew = JSON.parse(JSON.stringify({
					frames:[{
						resize : framedata.resize
						, transform : framedata.transform
						, duration : framedata.duration
					}]
				}))
				track.formatBlockData(blockdatanew)

				blocksdata.splice(blockindex, 0, blockdatanew)
			}

			this.$nextTick(function(){
				var block = track.$refs.block[blockindex + frameindex]
				block.setName(name)
				block.focusBlock()
			})

		}
	}
}
</script>

