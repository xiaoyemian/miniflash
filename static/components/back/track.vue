<style>
.track, .trackbar{
	.l(24px);
	.fc(#ccc);
	.hidden;
	.mt(-1px);
	border-bottom:1px solid #222;
	border-top:1px solid #222;

	.trackname{
		.left;.w(140px);
		.h(100%);
	}
	.trackframe{
		.opacity(96);
		
		.ml(140px);
	}
	&.focus{
		.bgc(#f69);
	}
}
</style>

<template>
<% var framelength = 2000; %>
<div class="track" v-if="trackdata" :class="{focus : focus.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe">
		<%for(var i = 0 ; i<= framelength; i+= 100){%>
		<frameitem :frame_id="<%= i %>" :focus="focus" :item_id="item_id" :framedata="trackdata[<%= i %>] || {}"></frameitem>
		<%}%>
	</div>
</div>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focus', 'item_id', 'trackdata']
	, data : function(){
		return {
		}
	}
	, methods : {
	}
	, ready : function(){
			this.$dispatch('updateItemByFrame', this.item_id, 0)
	}
}
</script>

