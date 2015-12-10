<style>
.track, .trackbar{
	.l(24px);
	.fc(#ccc);
	.hidden;
	border-bottom:1px solid #222;

	.trackname{
		.left;.w(140px);
		.h(100%);
	}
	.trackframe{
		.ml(140px);
		display:-webkit-box;
	}
	&.focus{
	}
}
</style>

<template>
<div class="track" @click.stop="selectItem" v-if="trackdata" :class="{focus : focus.item_id == itemdata.item_id}">
	<div class="trackname">{{itemdata.item_id}}</div>
	<div class="trackframe">
		<frameitem v-for="index in tracklength/framestep" :frame_id="index*framestep" :focus="focus" :item_id="itemdata.item_id" :trackdata="trackdata" :index="$index"></frameitem>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focus', 'itemdata', 'trackdata']
	, data : function(){
		return {
			tracklength : 4000
			, framestep : 100
		}
	}
	, methods : {
		selectItem : function(){
			console.log(this.focus[this.itemdata.item_id])
			this.$dispatch('setFocus', this.itemdata.item_id)
		}
	}
	, events : {
		addFrame : function(frame_id, style){
			frame_id = frame_id || 0 

			if(!style){
				style = {}
				var framedata = this.trackdata[this.focus[this.itemdata.item_id] || 0]

				for(var i in framedata.style){
					style[i] = framedata.style[i]
				}
			}

			Vue.set(this.trackdata, frame_id, {style:style})
		}
	}
	, ready : function(){
		this.$dispatch('updataItemStyle', this.trackdata[0].style, this.itemdata.item_id)
	}
}
</script>

