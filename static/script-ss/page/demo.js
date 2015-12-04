var app = require('demo/app.vue')
var aaa = require('demo/a.vue')

var child = Vue.component('child', {
  props: ['msg'],
  template: '<div>{{msg}}</div>'
})

var vm = new Vue({
  el: 'body'
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


