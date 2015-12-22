<style>
.frame{
	.pr; .bgc(#333);

	.keyframe{
		.h(100%);.pa;left:0px;
		box-sizing:border-box;

		&:before, &:after{ content:'';.pa;z-index:1; }
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.normal{
		.bgc(#999);
	}
	&.animate{
		.bgc(#33B666);
	}

}
</style>

<template>
<div class="frame" :class="[framedata.name]" @click.stop="selectFrame" :style="{width:framedata.duration * timedata.framewidth + 'px'}">
	<div class="keyframe" :style="{width:timedata.framewidth + 'px'}"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'timedata', 'keybroad', 'formatdata']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectFrame : function(event){
			this.setTime()
			this.$dispatch('setTrackByFrame', this)
		}
		, setTime : function(){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
		}
		, formatFrameData : function(){
			var formatdata = this.formatdata
			var framedata = this.framedata

			if(!framedata.name)
				this.$set('framedata.name', '')

			if(!framedata.resize)
				this.$set('framedata.resize', {})

			if(!framedata.transform)
				this.$set('framedata.transform', {})

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					var data = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						data[value[0]] = value[2] || 0
					}
					this.$set('framedata.transform["'+i+'"]', data)
				}
			}

			for(var i in formatdata.resize){
				if(!framedata.resize[i]){
					this.$set('framedata.resize["'+i+'"]', 0)
				}
			}
		}
		, cleanFrameData : function(){
			this.$set('framedata.resize', {})
			this.$set('framedata.transform', {})
			this.formatFrameData()
		}
	}
	, created : function(){
		this.formatFrameData()
	}
	, ready : function(){
		this.startTime = Math.floor(($(this.$el).position().left - this.timedata.namewidth + this.timedata.scrollleft) / this.timedata.framewidth) 
	}
}
</script>

