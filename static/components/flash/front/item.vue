<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	.none;

	&.transition, &.normal, &.animation{
		.block;
	}
}
</style>

<template>
<style>
{{
'.' + itemdata.item_id + '{'
+'width:' + itemdata.original.width * printdata.scale + 'px' + ';'
+'height:' + itemdata.original.height * printdata.scale + 'px' + ';'
+'background-image:' + 'url("' + itemdata.original.imageUrl + '")' + ';'
+ '}'
}}
</style>

<style v-if="blockdata && blockdata.keyframes">
{{
'.' + itemdata.item_id + '{'
+ '-webkit-animation:' + itemdata.item_id + blockindex + ' ' + blockdata['duration'] * global.step + 'ms ' + blockdata['timing-function'] + ' 0ms ' + blockdata['iteration-count'] + ' normal;'
+ '-webkit-animation-fill-mode:both;'
+ '}'
}}

{{
'@-webkit-keyframes ' + itemdata.item_id + blockindex + '{' + blockdata.keyframes + '}'
}} 
</style>

<div class="item" v-el:item :class="[itemdata.item_id, blockdata && blockdata.name]">
</div>
</template>

<script>

return {
	props:['itemdata', 'printdata', 'global']
	, data:function(){
		return {
			blockdata : null
			, blockindex : null
			, blockslen : this.itemdata.blocks.length
		}
	}
	, methods : {
		loadImage : function(cbk) {
			var mSelf = this
			var img = new Image()
			img.onload = function(){
				img.onload = null
				mSelf.$dispatch('loadedImage')	
			}
			img.src = this.itemdata.original.imageUrl
		}
		, getStyleByFrame : function(framedata){
			var formatdata = this.global.formatdata
			var transformList = []

			var style = {}

			for(var i in framedata.resize){
				var value = framedata.resize[i] || 0
				var unit = formatdata.resize[i].unit || ''
				
				if(unit == 'px'){
					value *= this.printdata.scale
				}
				style[i] = value + unit 
			}

			for(var i in framedata.transform){
				var transform = framedata.transform[i]
				var opts = formatdata.transform[i].opts
				var arr = []
				for(var j in opts){
					var opt = opts[j]

					var value = transform[opt[0]] || opt[2] || 0
					var unit = opt[1] || ''

					if(unit == 'px'){
						value *= this.printdata.scale
					}
					arr.push(value + unit)
				}
				transformList.push(i + '(' + arr.join(',') + ')')
			}

			style.transform = transformList.join(' ')
			
			return style
		}

		, getStyleStringByFrame : function(frame){
			var style = this.getStyleByFrame(frame)
			var string = ''
			for(var i in style){
				string += i + ':' + style[i] + ';'
			}

			return string;
		}

	}
	, events : {
		startFrame : function(){
			this.blockindex = 0
		}
	}
	, watch : {
		'blockindex' : function(index){

			if(index >= this.blockslen)
				return;

			var blocksdata = this.itemdata.blocks
			var blockdata = blocksdata[index] 
			var framesdata = blockdata.frames
			var framedata = framesdata[0]

			var duration = 0

			for(var i in framesdata){
				duration += framesdata[i]['duration']
			}

			if(blockdata.name == 'blank'){
				var mSelf = this
				var t = setTimeout(function(){
					mSelf.blockindex++;
					
				}, duration * this.global.step)
			}

			if(blockdata.name == 'animation'){
			}

			if(blockdata.name == 'normal'){
				var keyframes = []
				var style = this.getStyleStringByFrame(framedata)
				keyframes.push('0% {' + style + '}')
				keyframes.push('100% {' + style + '}')
				blockdata.keyframes = keyframes.join(' ')
			}

			if(blockdata.name == 'transition'){
				var keyframes = []
				var line = 0
				var style

				for(var i in framesdata){
					framedata = framesdata[i]
					style = this.getStyleStringByFrame(framedata)
					keyframes.push(line * 100 + '% {' + style + '}')
					line += framedata.duration / duration
				}

				if(index < this.blockslen){
					style = this.getStyleStringByFrame(blocksdata[index+1].frames[0])
				}

				keyframes.push('100% {' + style + '}')
				blockdata.keyframes = keyframes.join(' ')
			}

			blockdata['duration'] = duration
			this.blockdata = blockdata
		}
	}
	, created : function(){
		this.loadImage()
	}
	, ready : function(){
		var mSelf = this
		$(this.$els.item)
			.on('webkitAnimationEnd', function(){
				if(mSelf.blockindex < mSelf.blockslen - 1)
					mSelf.blockindex++;
			})
	}
}
</script>

