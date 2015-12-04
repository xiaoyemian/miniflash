var app = require('back/app.vue')

Vue.config.debug = true

var vm = new Vue({
  el: 'body'
	,data:{
	}
  ,components: {
		app:app
  }
})

console.log(vm)


