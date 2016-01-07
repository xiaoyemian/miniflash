<style>
.frame{

	.pr; .bgc(#333);
	&:before{ content:'';.pa;.h(100%);.w(1px);.bgc(#222);right:0px;}

	.keyframe{
		.left;.pr;
		.h(100%);
		z-index:3;

		&:before, &:after{ content:'';.pa;z-index:1; }
		&:before{
			left:-1px;.h(100%);.w(1px);.bgc(#222);
		}
		&:after{
			top:50%;left:6px;.w(4px);.h(4px);.mt(-2px);.ml(-2px);.bgc(#000); .border-r(8px);
		}
	}

	&.normal{
		.bgc(#999);
	}
	&.transition{
		.bgc(#33B666);
	}

	&.infinite{
		&:after{ content:'无限循环';.pa;.w(100%);.c;.fc(#222);left:0px;}

		&+.next{
			.opacity(10);
		}
	}
}
</style>

<template>
<div class="frame" :class="[framedata['iteration-count'] == 'infinite' ? 'infinite' : '', framedata.name, timedata.time == startTime + time ? 'focus' : '', timedata.time < startTime + time ? 'next' : '']" @click.stop="selectFrame">
	<div class="keyframe" v-for="keyframe in framedata.keyframes" @click.stop="selectKeyFrame" :style="{width:timedata.framewidth + 'px', 'margin-right':(keyframe.duration-1) * timedata.framewidth + 'px'}"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'timedata', 'keybroad', 'index']
	, data : function(){
		return {
			startTime : 0
			, time : 0
			, keyframe : null
		}
	}
	, methods : {
		selectFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('focusTrackByFrame', this)

			if(this.keybroad.command){
				if(this.keybroad.alt){
					//清除关键帧 不保留时长
					this.$dispatch('clearKeyFrame', this, false)

				}else{
					this.$dispatch('splitKeyFrame', this)
				}

			}else{
				this.$dispatch('setTime', this.time + this.startTime)	
			}

		}
		, selectKeyFrame : function(event){
			this.time = Math.floor(event.offsetX / this.timedata.framewidth)
			this.$dispatch('focusTrackByFrame', this)

			if(this.keybroad.command){
				if(this.keybroad.alt){
					//清除关键帧 保留时长
					this.$dispatch('clearKeyFrame', this, true)

				}else{
					//切换关键帧类型
					switch(this.framedata.name){
						case 'normal' :
							this.framedata.name = 'transition'
							break;

						case 'transition' :
							this.framedata.name = 'blank'
							break;

						case 'blank' :
							this.framedata.name = 'normal'
							break;

						default : 
							break;
					}
				}

			}else{
				this.$dispatch('setTime', this.time + this.startTime)	
			}
		}
	}
	, events : {
		setStartTime : function(){
			this.startTime = Math.floor(($(this.$el).position().left + this.timedata.scrollleft) / this.timedata.framewidth) 
		}
	}
	, watch : {
		'framedata.duration' : function(){
			console.log(arguments)
			this.framedata.duration -= 0
			this.$nextTick(function(){
				this.$parent.$broadcast('setStartTime')
				this.$dispatch('loadTime')
			})
		}
	}
	, created : function(){
		this.$dispatch('formatFrameData', this.framedata)
		console.log(this.framedata)
		console.log(this.framedata.duration)
	}
	, ready : function(){
		this.$emit('setStartTime')
	}
}
</script>

