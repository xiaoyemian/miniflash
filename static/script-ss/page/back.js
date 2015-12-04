var view = require('back/view.vue')
var menu = require('back/menu.vue')

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

var app = new Vue({
  el: 'body'
	,data:{
		pages:pages
		,number:number
	}
  ,components: {
		view:view
		,menu:menu
  }
})

console.log(app)

