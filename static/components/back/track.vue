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
<%
	var trackLength = 2000
		, frameStep = 100
 %>
<div class="track" @click.stop="selectItem" v-if="trackdata" :class="{focus : focus.item_id == itemdata.item_id}">
	<div class="trackname">{{itemdata.item_id}}</div>
	<div class="trackframe">
		<%for(var i = 0 ; i<= trackLength; i+= frameStep){%>
		<frameitem :frame_id="<%= i %>" :frame_step="<%= frameStep %>" :focus="focus" :item_id="itemdata.item_id" :trackdata="trackdata"></frameitem>
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
		selectItem : function(){
			this.$dispatch('setFocus', this.itemdata.item_id, this.itemdata.frame_id)
		}
	}
	, events : {
		addFrame : function(frame_id, style){
			frame_id = frame_id || 0 

			if(!style){
				style = {}
				var framedata = this.trackdata[this.itemdata.frame_id || 0]

				for(var i in framedata.style){
					style[i] = framedata.style[i]
				}
			}

			Vue.set(this.trackdata, frame_id, {style:style})
		}
	}
	, ready : function(){
		this.$dispatch('setFocus', this.itemdata.item_id)
		this.$dispatch('clearFocus')
	}
}
</script>

