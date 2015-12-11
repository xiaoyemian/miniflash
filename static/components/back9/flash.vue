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
	<div class="flashsetting">
		<div class="trackframe">
		</div>
	</div>

	<div class="tracks">
		<track v-ref:track v-for="(item_id, trackdata) in tracksdata" :focus="focus" :item_id="item_id" :trackdata="trackdata"></track>
	</div>
</div>

</template>


<script>
var track = require('back/track.vue')

return {
  components : {
		track : track
  }
	, props:['focus', 'tracksdata', 'flashstyle']
	, data : function(){

		return {
		}
	}
	, methods : {
	}
	, events : {
	}
}
</script>

