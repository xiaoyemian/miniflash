<style>
.frame{

	.pr; .bgc(#333);
	&:before{ content:'';.pa;.h(100%);.w(1px);.bgc(#222);right:-1px;}

	.keyframe{
		.pa;
		.h(100%);

		&:before, &:after{ content:'';.pa;z-index:1; }
		&:before{
			left:-1px;.h(100%);.w(1px);.bgc(#222);
		}
		&:after{
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
<div class="frame" :class="[framedata.name, timedata.time == startTime + time ? 'focus' : '']" @click.stop="selectFrame" :style="{width:framedata.duration * timedata.framewidth + 'px'}">
	<div class="keyframe" @click.stop="selectKeyFrame" :style="{width:timedata.framewidth + 'px'}"></div>
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

			this.$nextTick(function(){
				this.$dispatch('focusTrack')
				this.$dispatch('setTime', this.time + this.startTime)	
			})

			if(this.keybroad.command && this.keybroad.alt){
				//清除关键帧 保留时长
				this.$dispatch('clearKeyFrame', this, true)
				return;
			}

			if(this.keybroad.command){
				this.$dispatch('splitKeyFrame', this)
				return;
			}
			
		}
		, selectKeyFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)

			this.$nextTick(function(){
				this.$dispatch('focusTrack')
				this.$dispatch('setTime', this.time + this.startTime)	
			})

			if(this.keybroad.command && this.keybroad.alt){
				//清除关键帧 不保留时长
				this.$dispatch('clearKeyFrame', this, false)
				return;
			}

			if(this.keybroad.command){
				//切换关键帧类型
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

