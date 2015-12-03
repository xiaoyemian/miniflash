<style lang="less" scoped>
@import "atom.less";
div{color:red;}
</style>

<template>
<div>{{ message }}</div>
</template>


<script>
require('vue')

var data2 = {
	message:'444'
}

var App = Vue.extend({
  template: template,
  data:function(){ 
		return data2
	}
})

Vue.component('app', App)

</script>

