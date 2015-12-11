<style>
.track{
	.l(24px);
	.fc(#ccc);
	.hidden;
	border-bottom:1px solid #222;

	.trackname{
		.left;.w(140px);
		.h(100%);
	}
	.trackframe{
		.ml(140px);
		display:-webkit-box;
	}
	&.focus{
	}

	.frame{
		.w(12px); .h(24px);
		border-left:1px solid #222;

		&:nth-last-child(1){
			border-right:1px solid #222;
		}

	}

	.ui-state-highlight{
		.w(12px);.h(24px);.bgc(#222);
		border-left:1px solid #222;

		&:nth-last-child(1){
			border-right:1px solid #222;
		}
	}


}

</style>

<template>
<div class="track" @click.stop="selectItem" v-if="trackdata" :class="{focus : focus.item_id == item_id}">
	<div class="trackname">{{item_id}}</div>
	<div class="trackframe" v-el:trackframe>
		<frameitem v-for="index in tracklength/framestep" :framedata="trackdata[index]" :frame_id="index" :focus="focus" :item_id="item_id" :index="$index"></frameitem>
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
			tracklength : 4000
			, framestep : 100
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('setFocus', this.item_id)
		}
	}
	, events : {
		addFrame : function(frame_id, style){
			frame_id = frame_id|0 + ''

			if(!style){
				style = {
					type : 'blank'
				}
				var framedata = this.trackdata[this.focus[this.item_id] || 0]

				for(var i in framedata.style){
					style[i] = framedata.style[i]
				}
			}

			Vue.set(this.trackdata, frame_id, {style:style})
		}
		, deleteFrame : function(frame_id){
			frame_id = frame_id|0 + ''
			Vue.delete(mSelf.trackdata, '0')

			//mSelf.$children[2].$remove()
			console.log(this)
		}
	}
	, ready : function(){
		var mSelf = this
		var frame_id = '0'
		this.$dispatch('updataItemStyle', this.trackdata[frame_id].style, this.item_id)
		this.$dispatch('setCurrent', this.item_id, frame_id)

		var $trackframe = $(this.$els.trackframe)
		$trackframe.sortable({
			start : function(event, opts){
				mSelf.selectItem()
			}
			, stop : function(){
			}
			, axis: "x"
			, cursor: 'crosshair'
			, placeholder: 'ui-state-highlight'
		})
		$trackframe.disableSelection()

	}
}
</script>

