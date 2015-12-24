var app = require('demo/app.vue')
var aaa = require('demo/a.vue')

var child = Vue.component('child', {
  props: ['msg'],
  template: '<div>{{msg}}</div><aaa></aaa>'
  ,components: {
    aaa:aaa 
	}
})

var vm = new Vue({
  el: '#demo'
	,data:{
		message:'hello world'
		, name:555555555
		, user:'xuhui'
		, msg:222
	}
  ,components: {
    app: app
    ,aaa:aaa 
		, child:child
  }
	,created: function(){
		console.log(this)
  }
})



console.log(vm)

var items = [
	{ message: 'Foo' },
	{ message: 'Bar' }
]

var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: items 
  }
})

window.items = items
