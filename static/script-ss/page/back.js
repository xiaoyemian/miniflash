var app = require('back/app.vue')

Vue.config.debug = true

var pages = [
	{
		items: [
			{ message: '1111' },
			{ message: '2222' }
		]
	},{
		items: [
			{ message: '3333' },
			{ message: '4444' }
		]
	}	
]

var vm = new Vue({
  el: 'body'
	,data:{
		page:pages[0]
	}
  ,components: {
		app:app
  }
})

console.log(vm)

