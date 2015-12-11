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
		<track v-ref:track v-for="trackdata in flashdata" :trackdata="trackdata" :item_id="$key" :focustrack="focustrack"></track>
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
			focustrack : null
		}
	}
	, methods : {
	}
	, events : {
		setFocusTrack : function(track){
			this.$set('focustrack', track)
		}
	}
}
</script>

