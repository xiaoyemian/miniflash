define("demo/a.vue",function(e,a){e("loadStyle")("comp-demo-a","");var n=function(){return{data:function(){return{msg:"component!"}},props:["user","name"],created:function(){}}}();return n.template="\n<div>user:{{user}},name:{{name}},message:{{message}},msg:{{msg}}</div>\n",Vue.component("comp-demo-a",n)}),define("loadStyle",function(e,a){return function(e,a){if(a){var n=document.createElement("style");n.type="text/css",n.id=e,n.styleSheet?n.styleSheet.cssText=a:n.appendChild(document.createTextNode(a)),document.getElementsByTagName("head")[0].appendChild(n)}}}),define("demo/app.vue",function(e,a){e("loadStyle")("comp-demo-app",".comp-demo-app div{color:red}");var n=function(){var a=e("demo/a.vue");return{data:function(){return{message:"444444444444444444",name:"22222222222"}},props:["user"],components:{aaa:a},created:function(){}}}();return n.template='\n<input v-model="name">\n<div>user:{{user}},name:{{name}},message:{{ message }}</div>\n<aaa v-ref:bbb :user="user" :name="name"></aaa>\n',Vue.component("comp-demo-app",n)}),define("page/demo/vue",function(e,a){var n=e("demo/app.vue"),o=e("demo/a.vue"),t=Vue.component("child",{props:["msg"],template:"<div>{{msg}}</div><aaa></aaa>",components:{aaa:o}}),m=new Vue({el:"#demo",data:{message:"hello world",name:555555555,user:"xuhui",msg:222},components:{app:n,aaa:o,child:t},created:function(){console.log(this)}});console.log(m);var s=[{message:"Foo"},{message:"Bar"}];new Vue({el:"#example-2",data:{parentMessage:"Parent",items:s}});window.items=s});
