<style>
.controls{
}

</style>


<template>

<div class="controls">
	<div id="addItem">addImage<input type="file" @change="changeImage"/></div>
</div>

</template>


<script>

return {
	props:['itemsdata']
	, data : function(){

		return {
		}
	}
	, methods : {
		changeImage : function(event){
			var mSelf = this
			var files = event.target.files
				,file

			if(!files || !files.length)
				return;

			file = files[0]
			console.log(file)	

			if(file.size > 1024 * 200) {
        alert('图片大小不能超过 200K!');
        return false;
      }

			var URL = window.URL || window.webkitURL
			var imgURL = URL.createObjectURL(file)

			var img = new Image()
			img.onload = function(){
				var itemdata = {
					original : {
						width : img.width
						, height : img.height
						, imageUrl : imgURL
					}
				}

				mSelf.addImage(itemdata)
			}
			img.src = imgURL
			
		}
		, addImage : function(itemdata){

			this.itemsdata.push(itemdata)

			this.$nextTick(function(){
				this.$dispatch('loadTime')
			})
		}
	}
}
</script>

