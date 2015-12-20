<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	.none;

	&.animate, &.normal{
		.block;
		transition:all 200ms linear;
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
	, methods : {
		loadItemOriginal : function(){
			var style = this.itemdata.original

			this.originalstyle = {
				width : style.width * this.printdata.scale + 'px'
				, height : style.height * this.printdata.scale + 'px'
				, 'background-image' : 'url("' + style.imageUrl + '")'
			}
		}
		, loadItemStyle : function(){
			var formatdata = this.formatdata
			var framedata = this.framedata
			var transformList = []

			this.framestyle = {}

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
		, formatResizeByOriginal : function(){
			var original = this.itemdata.original
			var framedata = this.framedata
			framedata.resize.width = framedata.resize.width || original.width || 0
			framedata.resize.height = framedata.resize.height || original.height || 0
			framedata.resize.top = framedata.resize.top || original.top || 0
			framedata.resize.left = framedata.resize.left || original.left || 0
		}
	}
	, watch : {
		'timedata.time' : function(time, oldTime){
			var framedata = this.itemdata.frames[time]
			if(framedata){
				console.log(this.itemdata.item_id, framedata)
				this.$dispatch('loadItemByFrame', this.itemdata.item_id, framedata)
			}
		}
	}
	, events : {
		loadItemByFrame : function(item_id, framedata){
			if(item_id != this.itemdata.item_id)
				return;

			this.framedata = framedata

			this.formatResizeByOriginal()
			this.loadItemStyle()
		}
	}
	, created : function(){
		this.loadItemOriginal()
	}
}
</script>

