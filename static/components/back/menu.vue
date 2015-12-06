<style>
.menu{
	.bgc(#535353);
}
</style>

<template>
<div class="menu">
	<div v-for="(key, value) in size"><label for="settings-{{key}}">{{key}}</label>:<input id="settings-{{key}}" placeholder="{{key}}" value="{{value}}"/></div>
</div>
</template>


<script>

return {
	props : ['focus']
	, data : function(){

		if(this.focus){

			var item = this.focus

			return {
				size : {
					width : item.style['width'] + '%'
					, 'padding-top' : item.style['padding-top'] + '%' 
				}
				, position : {
					top : item.style['top'] + '%'
					, left : item.style['left'] + '%'
				}
				, background : {
					'background-image' : 'url("' + item.background.image + '")' 
				}
				, scale : item.scale
				, cr : item.cr 
				, biz : item.biz 
			}

		}else{
			return {
				background : {} 
				, size : {}
				, position : {}
			}

		}
	}
	, created: function(){
		
  }
}
</script>

