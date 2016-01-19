Vue.config.debug = true

var app = require('flash/back/app.vue')

//var pages = require('data/pages')

var pageConfigStr = localStorage.getItem("pageConfig")
var pages = [JSON.parse(pageConfigStr)]
/*
*/

var vm = new Vue({
  el: 'body'
	, data : {
		pages : pages
	}
  , components : {
		app : app
  }
})

window.vm = vm
window.pages = pages



