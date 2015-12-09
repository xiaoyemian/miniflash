Vue.config.debug = true

var app = require('back/app.vue')

var pages = require('data/pages')
var number = 0

for(var no in pages){
	var pagedata = pages[no]
	
	if(Array.isArray(pagedata.items)){
		var items = pagedata.items
		pagedata.items = {}
		pagedata.track = {}

		for(var i in items){
			var item = items[i]

			pagedata.track[item.item_id] = {
				0 : {
					style : item.style 
					, type : ''
				}
			}

			item.style = {} 

			pagedata.items[item.item_id] = item
		}
	}
}


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



