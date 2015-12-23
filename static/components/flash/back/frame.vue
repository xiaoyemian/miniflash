<style>
.frame{
	.pr; .bgc(#333);
	&:before, &:after{ content:'';.pa;.h(100%);.w(1px);z-index:1;.bgc(#222);}
	&:before{
		left:0px;
	}
	&:after{
		right:-1px;
	}


	.keyframe{
		.pa;
		.h(100%);

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
	<div class="keyframe" @click.stop="setFrameName" :style="{width:timedata.framewidth + 'px'}"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'timedata', 'keybroad', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
		}
	}
	, methods : {
		selectFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('loadTrack', this.time + this.startTime)

			if(this.keybroad.command && this.keybroad.alt){
				//清除关键帧 保留时长
				this.$dispatch('clearKeyFrame', this, true)
				return;
			}
		}
		, setFrameName : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('loadTrack', this.time + this.startTime)

			if(this.keybroad.command && this.keybroad.alt){
				//清除关键帧 不保留时长
				this.$dispatch('clearKeyFrame', this, false)
				return;
			}

			if(this.keybroad.command){
				switch(this.framedata.name){
					case 'normal' :
						this.framedata.name = 'animate'
						break;

					case 'animate' :
						this.framedata.name = 'blank'
						break;

					case 'blank' :
						this.framedata.name = 'normal'
						break;

					default : 
						break;
				}
				return;
			}
		}
	}
	, created : function(){
		this.$dispatch('formatFrameData', this.framedata)
	}
	, ready : function(){
		this.startTime = Math.floor(($(this.$el).position().left - this.timedata.namewidth + this.timedata.scrollleft) / this.timedata.framewidth) 
	}
}
</script>

