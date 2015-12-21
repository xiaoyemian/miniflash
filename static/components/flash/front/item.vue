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
<div class="item" :class="[framedata && framedata.type, framedata && framedata.name]" :style="[originalstyle, framestyle]">
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
		}
	}
	, events : {
		reloadItem : function(){
			this.loadItemOriginal()
			this.loadItemStyle()
		}
	}
	, methods : {
		loadItemOriginal : function(){
			var style = this.itemdata.original

			this.originalstyle = {
				width : style.width * this.printdata.scale + 'px'
				, height : style.height * this.printdata.scale + 'px'
				, 'background-image' : 'url("' + style.imageUrl + '")'
			}
		}
		, loadItemStyle : function(duration){
			var framedata = this.framedata

			if(!framedata) return;

			var formatdata = this.formatdata
			var transformList = []

			this.framestyle = {}

			if(duration){
				this.framestyle['transition-duration'] = duration * this.timedata.step + 'ms'
			}

			for(var i in framedata.resize){
				var value = framedata.resize[i] || 0
				var unit = formatdata.resize[i].unit || ''
				
				if(unit == 'px'){
					value *= this.printdata.scale
				}
				this.framestyle[i] = value + unit 
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

			this.framestyle.transform = transformList.join(' ')
		}
	}
	, watch : {
		'timedata.time' : function(time, oldTime){
			var framedata = this.itemdata.frames[time]
			if(framedata){
				this.framedata = framedata
				this.loadItemStyle()

				if(framedata.name == 'animate'){
					for(var i = time+1; i < this.timedata.length/this.timedata.step; i++){
						if(this.itemdata.frames[i]){
							var mSelf = this
							var t = setTimeout(function(){
								mSelf.framedata = mSelf.itemdata.frames[i]
								mSelf.loadItemStyle(i - time)
							}, 1)
							break;
						}
					}
				}
			}
		}
	}
	, created : function(){
		this.loadItemOriginal()
	}
}
</script>

