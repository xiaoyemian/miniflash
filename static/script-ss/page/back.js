Vue.config.debug = true

var app = require('back/app.vue')

var pages = require('data/pages')
var number = 2

for(var no in pages){
	var pagedata = pages[no]
	
	if(Array.isArray(pagedata.items)){
		var items = pagedata.items
//		pagedata.items = {}
		pagedata.tracks = {}

		for(var i in items){
			var item = items[i]
			var style = {}
			for(var j in item.style){
				style[j] = item.style[j]
			}

			pagedata.tracks[item.item_id] = {
				0 : {
					style : style 
					, type : 'keyframe'
				}
				, 3 : {
					style : style 
					, type : 'animateframe'
				}
			}

			item.style = {} 

//			pagedata.items[item.item_id] = item
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



