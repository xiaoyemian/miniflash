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

<script>
return {
	props:['itemdata', 'printdata', 'timedata', 'cxt']
	, data:function(){
		return {
			framedata : null
			, enddata : null
			, frameindex : null
			, img : null
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
			this.img = img
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
	}
}
</script>

