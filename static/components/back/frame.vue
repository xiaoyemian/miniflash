<style>
.frame{
	.pr; .bgc(#333);
	&:nth-child(5n+1){ .bgc(#383838); }

	&:before, &:after{ content:'';.pa;z-index:1; }

	.handel{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
//		.opacity(40); 
	}

	&.blankframe{

	}

	&.keyframe{
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.normal{
		.handel{.bgc(#999);}
	}
	&.animate{
		.handel{.bgc(#33B666);}
		//.handel{.bgc(#5CADD6);}
	}

}
.track.focus{
	.frame.focus{
		.handel{
			//border:1px solid red;
			//.opacity(100);
		}
		&.blankframe{
			.handel{
			}
		}
	}
	.frame{
		.handel{
	//		.opacity(100);
		}
	}
}
</style>

<template>
<div class="frame" :class="[framedata.name, framedata.type, time == timedata.time ? 'focus' : '']" @click.stop="selectFrame" :style="{width:timedata.framewidth-1 + 'px'}">
	<div class="handel"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'time', 'timedata', 'keybroad', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
			this.$dispatch('selectFrame', this.time)
			this.$dispatch('loadTime', this.time)

			var keybroad = this.keybroad
			if(keybroad.command){
				if(this.framedata.type == 'keyframe'){
					if(this.framedata.name == 'animate'){
						this.framedata.name = 'normal'
					}else{
						this.framedata.name = 'animate'
					}

				}else{
					this.framedata.type = 'keyframe'
					this.framedata.name = 'normal'
				}
			}

			this.$dispatch('loadTrack')
		}
	}
	, events : {
	}
	, created : function(){
		var framedata = this.framedata
		
		if(!framedata.type)
			this.$set('framedata.type', 'blankframe')

		if(!framedata.name)
			this.$set('framedata.name', '')

		if(!framedata.resize){
			this.$set('framedata.resize', {})
		}

		if(!framedata.transform)
			this.$set('framedata.transform', {})

		this.$dispatch('formatTransform', this.framedata)
			console.log(this.framedata)
	}
}
</script>

