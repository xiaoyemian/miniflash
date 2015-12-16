<style>
.frame{
	.pr; .bgc(#333);

	&:nth-child(5n+1){ .bgc(#383838); }

	&:before, &:after{ content:'';.pa;z-index:1; }

	.handel{
		.pa;top:0px;left:0px;right:0px;bottom:0px;
		.opacity(60); 
	}

	&.blankkeyframe, &.keyframe{
		.handel{ .bgc(#5CD685); }
		&.focus{
			.handel{
			}
		}
	}

	&.keyframe{
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.animateframe{
		.handel{.bgc(#5CADD6);}
	}

	&.focus{
		.handel{
//			border:1px solid #f69; 
//			.bgc(red);
		}
	}

}
.track.focus{
	.frame.focus{
		.handel{
			.bgc(red);
		}
	}
	.frame{
		.handel{
			.opacity(100);
		}
	}
}
</style>

<template>
<div class="frame" :class="[framedata.type, focus_frame == time ? 'focus' : '']" @click.stop="selectFrame" :style="{width:timedata.framewidth-1 + 'px'}">
	<div class="handel"></div>
</div>
</template>


<script>

return {
	props : ['focus_frame', 'framedata', 'time', 'timedata']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
			console.log(this.time)
			this.$dispatch('selectFrame', this.time)
			this.$dispatch('loadTime', this.time)
		}
	}
	, events : {
	}
	, ready : function(){

	}
}
</script>

