<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	.none;

	&.animate, &.normal{
		.block;
		transition-timing-function : linear;
		transition-property : all;
	}
}
</style>

<template>
<div class="item" :class="[framedata && framedata.name]" :style="[originalstyle, framestyle]">
</div>
</template>


<script>

return {
	props:['itemdata', 'index', 'printdata', 'formatdata', 'timedata']
	, data:function(){
		return {
			framedata : null
			, originalstyle : {}
			, framestyle : {} 
			, frameindex : null
		}
	}
	, methods : {
		loadItemOriginal : function(){
			var original = this.itemdata.original

			this.originalstyle = {
				width : original.width * this.printdata.scale + 'px'
				, height : original.height * this.printdata.scale + 'px'
				, 'background-image' : 'url("' + original.imageUrl + '")'
			}
		}
		, loadImage : function(cbk) {
			var mSelf = this
			var img = new Image()
			img.onload = function(){
				img.onload = null
				mSelf.$dispatch('loadedImage')	
			}
			img.src = this.itemdata.original.imageUrl
		}
		, getStyleByFrame : function(framedata, duration){
			var formatdata = this.formatdata
			var transformList = []

			var style = {}

			if(duration){
				style['transition-duration'] = duration + 'ms'
			}

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
		, loadItemStyle : function(){
			this.framestyle = this.getStyleByFrame(this.framedata)
		}
	}
	, events : {
		reloadItem : function(){
			this.loadItemOriginal()
			this.loadItemStyle()
		}
		, startFrame : function(){
			this.frameindex = 0
		}
	}
	, watch : {
		'frameindex' : function(index){
			if(index >= this.itemdata.frames.length){
				return;
			}

			var mSelf = this
			var framedata = this.itemdata.frames[index] 
			var time = framedata.duration * this.timedata.step

			this.framedata = framedata
			
			if(framedata.name == 'animate'){
				this.framestyle = this.getStyleByFrame(framedata, time)
				var enddata = mSelf.itemdata.frames[index+1]
				this.framestyle = this.getStyleByFrame(enddata, time)

			}else{
				this.framestyle = this.getStyleByFrame(framedata)
			}

			var t2 = setTimeout(function(){
				mSelf.frameindex++;
			}, time)

		}
	}
	, created : function(){
		this.loadImage()
		this.loadItemOriginal()
	}
}
</script>

