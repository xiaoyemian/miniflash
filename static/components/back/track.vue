<style>
.track{
	.h(24px);.l(24px);
	.fc(#ccc);
	.name{.left;.w(160px);}
	.frames{.ml(160px);}
	.focus{
	}
}
</style>

<template>
<div class="track" :class="{focus : focusitem ? (focusitem.itemdata.item_id == trackdata.item_id) : false}">
	<div class="name">{{trackdata.item_id}}</div>
	<div class="frames">
		<% var framelength = 6000; %>
		<%for(var i = 0 ; i<= framelength; i+= 100){%>
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

