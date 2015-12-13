Vue.config.debug = true

var app = require('back/app.vue')

var pages = require('data/pages')
var number = 2

for(var no in pages){
	var pagedata = pages[no]
	
	if(Array.isArray(pagedata.items)){
		var items = pagedata.items
		var itemsnew = {}

		for(var i in items){
			var item = items[i]
			item.tracks = {} 

			var key = [0,5,9, 10]
			for(var k in key){
				var style = {}

				for(var j in item.style){
					style[j] = item.style[j]
				}

				item.tracks[key[k]+''] = {
					style : style 
					, type : 'keyframe'
				}
			}

			itemsnew[item.item_id] = item
		}
		pagedata.items = itemsnew

		//console.log(pagedata)
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



