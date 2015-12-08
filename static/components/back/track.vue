<style>
.track{
	.h(24px);.l(24px);
	.fc(#ccc);
	.trackname{.left;.w(160px);}
	.trackframe{.ml(160px);}
	.focus{
	}
}
</style>

<template>
<div class="track" :class="{focus : focusitem ? (focusitem.itemdata.item_id == trackdata.item_id) : false}">

	<div class="trackname">{{trackdata.item_id}}</div>

	<div class="trackframe">
		<% var framelength = 6000; 
		for(var i = 0 ; i<= framelength; i+= 100){%>

		<frameitem :framenumber="<%= i %>" :framedata="trackdata.frames[<%=i%>]"></frameitem>

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

