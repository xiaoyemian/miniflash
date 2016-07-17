<script>
return {
	props:['itemdata', 'ctx', 'timedata']
	, data:function(){
		var frameLength = this.itemdata.frames.length

		return {
			frameIndex : 0
			, frameLength : frameLength
			, time : 0
			, duration : null
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
		, draw : function(){

			if(this.time == 0){
				this.framedata = this.itemdata.frames[this.frameIndex]

				if(this.framedata.duration > 1 && this.frameIndex+1 < this.frameLength){
					this.enddata = this.itemdata.frames[this.frameIndex+1]

				}else{
					this.enddata = this.framedata 
				}

				this.duration = this.framedata.duration * this.timedata.scale
			}

			this.drawImage()

			if(this.time == this.duration){
				if(this.frameIndex < this.frameLength-1){
					this.frameIndex++
					this.time = 0
				}

			}else{
				this.time++
			}

		}
		, drawImage : function(){

			var resize = this.framedata.resize
			var transform = this.framedata.transform

			this.ctx.translate(resize.left + resize.width/2, resize.top + resize.height/2)
			this.ctx.rotate(transform.rotate.angle * Math.PI/180)

			this.ctx.drawImage(this.img, -resize.width/2, -resize.height/2, resize.width, resize.height)

			this.ctx.rotate(-transform.rotate.angle * Math.PI/180)
			this.ctx.translate(-(resize.left + resize.width/2), -(resize.top + resize.height/2))


		}

	}

	, created : function(){
		this.loadImage()
	}
	, ready : function(){
	}
}
</script>

