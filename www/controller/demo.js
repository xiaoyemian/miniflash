return {
	'index' : function(args, mods){
		console.log('=======index', args)

/*
		if(args == 'a') mods['demo'].call(this)
*/

		var php = {
			info:'/weixin/Weixin_running_assort_activity?name=luhan'
		}

		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['demo/index']
			this.render('demo/index', data);
		})

	}
	,'demo' : function(args, mods){
		console.log('=======demo', args)

	}
}
