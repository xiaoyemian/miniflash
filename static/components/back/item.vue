<style scoped>
.item{
	.pa;
	background-size:100%;
}
</style>

<template>
<div class="item" item_id="{{item_id}}" :style="[background, style]"></div>
</template>


<script>
return {
	props:['item']
	, data:function(){
		var item_id = this.item.item_id
			, style = this.item.style
			, background = this.item.background
			, biz = this.item.cr 
			, scale = this.item.scale

		return {
			item_id : item_id
			, background : {
				'background-image' : 'url("' + background.image + '")' 
			}
			, style : {
				top : style['top'] + '%'
				, left : style['left'] + '%'
				, width : style['width'] + '%'
				, 'padding-top' : style['padding-top'] + '%' 
			}
		}
	}
	, created:function(){
		console.log(this)
	}
}
</script>

