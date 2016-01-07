Vue.config.debug = true

var app = require('flash/back/app.vue')

var pages = require('data/pages')

/*
var pageConfigStr = localStorage.getItem("pageConfig")
var pages = [JSON.parse(pageConfigStr)]
*/

var number = 2

var vm = new Vue({
  el: 'body'
	, data : {
		pages : pages
		, number : number
	}
  , components : {
		app : app
  }
})

window.vm = vm
window.pages = pages



