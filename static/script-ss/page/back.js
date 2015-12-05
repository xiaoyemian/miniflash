Vue.config.debug = true

var app = require('back/app.vue')

var pages = require('data/pages')
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
console.log(pages)


