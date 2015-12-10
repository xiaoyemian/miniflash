<style>
.tracksetting{
	z-index:900;
	.pa;left:0px;right:0px;top:0px;
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
<div class="tracksetting" :style="tracksettingstyle">
	<div class="tracks">
		<track v-for="(item_id, trackdata) in tracksdata" :focus="focus" :item_id="item_id" :trackdata="trackdata"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['focus', 'tracksdata', 'tracksettingstyle']
	, data : function(){

		return {
		}
	}
	, methods : {
	}
	, events : {
	}
	, ready : function(){
		var mSelf = this

		$(this.$el).resizable({
			start : function(event, opts){
			}
			, resize : function(event, opts){
			}
			, stop : function(event, opts){
				mSelf.$dispatch('updateFlash', opts.size.height)
			}
			, maxHeight: 250
			, minHeight: 75
			, grid: [ 0, 25 ]
		})
	}
}
</script>

