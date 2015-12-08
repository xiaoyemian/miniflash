<style>
.track, .trackbar{
	.l(24px);
	.fc(#ccc);
	.hidden;
	.mt(-1px);
	border-bottom:1px solid #222;

	.trackname{
		.left;.w(140px);
		.h(100%);
	}
	.trackframe{
		.ml(140px);
	}
	.focus{

	}
}
.trackbar{
	.bgc(#3a3a3a);
	.frame{.bgnone;border-color:#3a3a3a;}
}
</style>

<template>
<%
	var framelength = 4000;
%>
<div v-if="trackdata" class="track" :class="{focus : focusitem ? (focusitem.itemdata.item_id == trackdata.item_id) : false}">

	<div class="trackname">{{trackdata.item_id}}</div>

	<div class="trackframe">
		<%for(var i = 0 ; i<= framelength; i+= 100){%>

		<frameitem :framenumber="<%= i %>" :framedata="trackdata.frames[<%= i %>]" :focusitem="focusitem"></frameitem>

		<%}%>
	</div>
</div>

<% if(0){ %>
<div v-else class="trackbar">
	<div class="trackname">item_id</div>
	<div class="trackframe">
		<%for(var i = 0 ; i<= framelength; i+= 100){%>
		<div class="frame"><%if(i % 500 == 0){%><%= i %><%}%></div>
		<%}%>
	</div>
</div>
<%}%>

</template>

<script>
var frame = require('back/frame.vue')

return {
  components : {
    frameitem : frame
	}
	, props : ['focusitem', 'trackdata']
	, data : function(){
		console.log(this.trackdata)
		return {
		}
	}
	, ready : function(){
	}
}
</script>

