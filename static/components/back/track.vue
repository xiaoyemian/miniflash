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
<div v-if="trackdata" @click="setFocus" class="track">

	<div class="trackname">{{trackdata.item_id}}</div>

	<div class="trackframe">
		<%for(var i = 0 ; i<= framelength; i+= 100){%>

		<frameitem :framenumber="<%= i %>" :itemdata="itemdata" :framedata="trackdata.frames[<%= i %>]" :focus_id="focus_id"></frameitem>

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
	, props : ['itemdata', 'focus_id', 'trackdata']
	, data : function(){
		console.log(this.trackdata, this.itemdata)
		return {
		}
	}
	, methods : {
		setFocus : function(){
			console.log(this)
		}
	}
	, ready : function(){
	}
}
</script>

