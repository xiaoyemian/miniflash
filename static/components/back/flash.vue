<style>
.flash{
	z-index:900;
	.pa;left:0px;right:0px;bottom:0px;
	.bgc(#333);

	.pb(20px);

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
		<track v-ref:track v-for="trackdata in tracksdata" :trackdata="trackdata" :item_id="$key" :focus_track="focus_track"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['tracksdata', 'flashstyle']
	, data : function(){

		return {
			focus_track : null
		}
	}
	, methods : {
		setTime : function(time){
      this.$broadcast('setTime', time)
		}
	}
	, events : {
		setFocusTrack : function(track, doFocusItem){
			this.$set('focus_track', track)

			if(doFocusItem)
				this.$dispatch('focusItemByFrame', this.focus_track)
		}
	}
	, ready : function(){
		this.setTime(0)
	}
}
</script>

