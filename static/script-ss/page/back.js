var app = require('app.vue')
var aaa = require('a.vue')

var child = Vue.component('child', {
  // 声明 prop
  props: ['msg'],
  // prop 可以在模板内部被使用，
  // 也可以类似 `this.msg` 这样来赋值
  template: '<span>{{msg}}</span>'
})



var vm = new Vue({
  el: 'body'
	,data:{
		message:'hello world'
		, name:555555555
		, user:{name:'xuhui'}
	}
  ,components: {
    app: app
    ,aaa:aaa 
		, child:child
  }
	,created: function(){
		console.log(this.user, this.name)
  }
})



console.log(vm)


