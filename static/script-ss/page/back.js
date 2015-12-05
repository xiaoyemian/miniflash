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
var number = 0

var vm = new Vue({
  el: 'body'
	,data:{
		pages:pages
		,number:number
	}
  ,components: {
		app:app
  }
})

console.log(vm)

