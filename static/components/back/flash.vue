<style>
.flash{
	z-index:900;
	.pa;left:0px;right:0px;bottom:0px;
	.bgc(#333);

	.tracks{
		overflow:auto;
		.h(100%);
	}
	border:1px solid #222;
	.ui-resizable{
		&-s{ left:0px;right:-0px;bottom:-6px;.h(6px);.bgc(#222);}
	}

}

</style>


<template>
<div class="flash" :style="flashstyle">
	<div class="tracks">
		<track v-ref:track v-for="trackdata in flashdata" :trackdata="trackdata" :item_id="$key" :focus_track="focus_track"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['flashdata', 'flashstyle']
	, data : function(){

		return {
			focus_track : null
		}
	}
	, methods : {
		setTime : function(frame_id){
      this.$broadcast('setTime', frame_id)
		}
	}
	, events : {
		setFocusTrack : function(track){
			this.$set('focus_track', track)

			this.$dispatch('focusItem', this.focus_track)
		}
	}
	, ready : function(){
		this.setTime(0)
	}
}
</script>

