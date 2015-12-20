<style>
.frame{
	.pr; .bgc(#333);
	&:nth-child(5n+1){ .bgc(#383838); }
	&:before, &:after{
		content:'';.pa;z-index:1;
		.h(100%);.w(1px);.bgc(#222);.pa;
	}
	&:before{
		left:0px;
	}
	&:after{
		right:-1px;
	}

	.handel{
		&:before, &:after{ content:'';.pa;z-index:1; }
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		z-index:1;
	}

	&.blankframe{

	}

	&.keyframe{
		.handel{
			&:before{
				top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
			}
		}
	}

	&.normal{
		.handel{.bgc(#999);}
	}
	&.animate{
		.handel{.bgc(#33B666);}
	}

}
.track.focus{
	.frame.focus{
		.handel{
			border:1px solid red;
		}
		&.blankframe{
			.handel{
			}
		}
	}
	.frame{
		.handel{
		}
	}
}
</style>

<template>
<div class="frame" :class="[framedata.name, framedata.type, time == timedata.time ? 'focus' : '']" @click.stop="selectFrame" :style="{width:timedata.framewidth + 'px'}">
	<div class="handel"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'time', 'timedata', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
			this.$dispatch('selectFrame', this.time)
			this.$dispatch('setTime', this.time)

			this.$dispatch('loadTrack')
		}
		, formatFrameData : function(){
			var formatdata = this.formatdata
			var framedata = this.framedata

			if(!framedata.type)
				this.$set('framedata.type', 'blankframe')

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
	, events : {
	}
	, created : function(){
		var framedata = this.framedata
		this.formatFrameData()
	}
}
</script>

