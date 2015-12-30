</style>

<script>
return {
	props:['itemdata', 'timedata', 'ctx']
	, data:function(){
		var frameLength = this.itemdata.frames.length

		return {
			frameIndex : 0
			, frameLength : frameLength
			, time : 0
			, framedata : null
			, enddata : null
			, img : null
		}
	}
	, methods : {
		loadImage : function() {
			var mSelf = this
			var img = new Image()
			img.onload = function(){
				img.onload = null
				mSelf.$dispatch('loadedImage')	
			}
			img.src = this.itemdata.original.imageUrl
			this.img = img
		}
		, drawImage : function(){

			if(this.time == 0){
				this.framedata = this.itemdata.frames[this.frameIndex]

				if(this.framedata.duration > 1 && this.frameIndex+1 < this.frameLength){
					this.enddata = this.itemdata.frames[this.frameIndex+1]

				}else{
					this.enddata = this.framedata 
				}

			}

			var resize = this.framedata.resize
			this.ctx.drawImage(this.img, resize.left, resize.top, resize.width, resize.height)



			if(this.time == this.framedata.duration){
				if(this.frameIndex < this.frameLength-1){
					this.frameIndex++
					this.time = 0
				}

			}else{
				this.time++
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

