<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	.none;

	&.animate, &.normal{
		.block;
	}
}
</style>

<template>
<style>
{{
'.' + itemdata.item_id + '{'
+'width:' + itemdata.original.width * printdata.scale + 'px' + ';'
+'height:' + itemdata.original.height * printdata.scale + 'px' + ';'
+'background-image:' + 'url("' + itemdata.original.imageUrl + '")' + ';'
+ '}'
}}
</style>

<style v-if="framedata && enddata">
{{
'.' + itemdata.item_id + '{'
+ '-webkit-animation:' + itemdata.item_id + frameindex + ' ' + framedata.duration * timedata.step + 'ms ' + framedata['timing-function'] + ' 0ms ' + framedata['iteration-count'] + ' normal;'
+ '-webkit-animation-fill-mode:both;'
+ '}'
}}

{{
'@-webkit-keyframes ' + itemdata.item_id + frameindex + '{'
	+ 'from {'
		+'width:' + framedata.resize.width * printdata.scale + 'px' + ';'
		+'height:' + framedata.resize.height * printdata.scale + 'px' + ';'
		+'top:' + framedata.resize.top * printdata.scale + 'px' + ';'
		+'left:' + framedata.resize.left * printdata.scale + 'px' + ';'
		+'transform:'
			+ 'rotate(' + framedata.transform.rotate.angle + 'deg)'
			+ ' skew(' + framedata.transform.skew['x-angle'] + 'deg,' + framedata.transform.skew['y-angle'] + 'deg)'
			+ ';'
	+ '}'
	+ 'to {'
		+'width:' + enddata.resize.width * printdata.scale + 'px' + ';'
		+'height:' + enddata.resize.height * printdata.scale + 'px' + ';'
		+'top:' + enddata.resize.top * printdata.scale + 'px' + ';'
		+'left:' + enddata.resize.left * printdata.scale + 'px' + ';'
		+'transform:'
			+ 'rotate(' + enddata.transform.rotate.angle + 'deg)'
			+ ' skew(' + enddata.transform.skew['x-angle'] + 'deg,' + enddata.transform.skew['y-angle'] + 'deg)'
			+ ';'
	+ '}'
+ '}'
}} 
</style>

<div class="item" v-el:item :class="[itemdata.item_id, framedata && framedata.name]">
</div>
</template>

<script>

return {
	props:['itemdata', 'printdata', 'timedata']
	, data:function(){
		return {
			framedata : null
			, enddata : null
			, frameindex : null
		}
	}
	, methods : {
		loadImage : function(cbk) {
			var mSelf = this
			var img = new Image()
			img.onload = function(){
				img.onload = null
				mSelf.$dispatch('loadedImage')	
			}
			img.src = this.itemdata.original.imageUrl
		}
	}
	, events : {
		startFrame : function(){
			this.frameindex = 0
		}
	}
	, watch : {
		'frameindex' : function(index){
			var len = this.itemdata.frames.length
			if(index >= len)
				return;

			this.framedata = this.itemdata.frames[index] 

			if(this.framedata.duration > 1 && index+1 < len){
				this.enddata = this.itemdata.frames[index+1]

			}else{
				this.enddata = this.framedata 
			}
		}
	}
	, created : function(){
		this.loadImage()
	}
	, ready : function(){
		var mSelf = this
		$(this.$els.item)
			.on('webkitAnimationEnd', function(){
				mSelf.frameindex++;
			})
	}
}
</script>

