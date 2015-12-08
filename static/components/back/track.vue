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
<div class="track" :class="{focus : focus ? (focus.itemdata.item_id == trackdata.item_id) : false}">
	<div class="name">{{trackdata.item_id}}</div>
	<div class="frames">
		<%for(var i = 0 ; i<= 10000; i+= 100){%>
		<frameitem :framenumber="<%= i %>" :framedata="trackdata[i]"></frameitem>
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
	, props : ['focus', 'trackdata']
	, data : function(){
		return {
		}
	}
	, ready : function(){
		console.log(this.trackdata)
	}
}
</script>

