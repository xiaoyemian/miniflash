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
<div class="track" v-if="trackdata" :class="{focus : focus.item_id == itemdata.item_id}" @click="setItemFocus">
	<div class="trackname">{{itemdata.item_id}}</div>
	<div class="trackframe">
		<%for(var i = 0 ; i<= framelength; i+= 100){%>
		<frameitem :frame_id="<%= i %>" :focus="focus" :itemdata="itemdata" :framedata="trackdata[<%= i %>] || {}"></frameitem>
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
	, props : ['focus', 'itemdata', 'trackdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		setItemFocus : function(){
			this.$dispatch('setItemFocus', this.itemdata.item_id)
		}
	}
	, ready : function(){
	}
}
</script>

