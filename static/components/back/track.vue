<style>
.track{
	.l(24px);
	.fc(#ccc);
	.hidden;
	.mt(-1px);
	border-bottom:1px solid #222;

	.trackname{
		.left;.w(160px);
		.h(100%);
	}
	.trackframe{
		.ml(160px);
	}
	.focus{

	}
}
</style>

<template>
<div class="track" :class="{focus : focusitem ? (focusitem.itemdata.item_id == trackdata.item_id) : false}">

	<div class="trackname">{{trackdata.item_id}}</div>

	<div class="trackframe">
		<% var framelength = 8000; 
		for(var i = 0 ; i<= framelength; i+= 100){%>

		<frameitem :framenumber="<%= i %>" :framedata="trackdata.frames[<%= i %>]" :focusitem="focusitem"></frameitem>

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
	, props : ['focusitem', 'trackdata']
	, data : function(){
		console.log(this.trackdata.frames)
		return {
		}
	}
	, ready : function(){
	}
}
</script>

