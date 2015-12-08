<style>
body{
	.bgc(#393939);
	.f(12px);
	.hidden;
}
.headtop{
	z-index: 998;
	.f(14px);
	.l(26px);.h(26px);.pf;top:0px;left:0px;right:0px;.pl(4px);.pr(4px);
	.bgc(#535353);
	.fc(white);
}
</style>

<template>
<div class="headtop"></div>
<view :pagedata="pages[number]"></view>
</template>


<script>
var view = require('back/view.vue')

return {
  components: {
		view:view
  }
	, props:['pages','number']
	, created: function(){
  }
}
</script>

