<style>
.frame{
	.pr; .bgc(#333);

	.keyframe{
		.h(100%);.pa;left:0px;
		box-sizing:border-box;
		&:before, &:after{ content:'';.pa;z-index:1; }
		&:before{
			top:50%;left:50%;.w(6px);.h(6px);.mt(-3px);.ml(-3px);.bgc(#000); .border-r(8px);
		}
	}

	&.normal{
		.bgc(#999);
	}
	&.animate{
		.bgc(#33B666);
	}

}
</style>

<template>
<div class="frame" :class="[framedata.name]" @click.stop="selectFrame" :style="{width:framedata.duration * timedata.frameWidth + 'px'}">
	<div class="keyframe" :style="{width:timedata.frameWidth + 'px'}"></div>
</div>
</template>


<script>

return {
	props : ['framedata', 'timedata', 'keybroad', 'formatdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		selectFrame : function(){
			this.$dispatch('selectFrame', this.time)
			this.$dispatch('setTime', this.time)

			var keybroad = this.keybroad
			if(keybroad.command){
				if(keybroad.alt){
					this.framedata.type = 'blankframe'

				}else{
					if(this.framedata.type == 'keyframe'){
						switch(this.framedata.name){
							case 'normal' : 
								this.framedata.name = 'animate'
								break;

							case 'animate' : 
								this.framedata.name = ''
								break;

							default : 
								this.framedata.name = 'normal'
								break;
						}

					}else{
						this.framedata.type = 'keyframe'
						this.framedata.name = 'normal'
					}
				}
			}
		}
		, formatFrameData : function(){
			var formatdata = this.formatdata
			var framedata = this.framedata

			if(!framedata.type)
				this.$set('framedata.type', 'blankframe')

			if(!framedata.name)
				this.$set('framedata.name', '')

			if(!framedata.resize)
				this.$set('framedata.resize', {})

			if(!framedata.transform)
				this.$set('framedata.transform', {})

			for(var i in formatdata.transform){
				if(!framedata.transform[i]){
					var data = {}
					for(var j in formatdata.transform[i].opts){
						var value = formatdata.transform[i].opts[j]
						data[value[0]] = value[2] || 0
					}
					this.$set('framedata.transform["'+i+'"]', data)
				}
			}

			for(var i in formatdata.resize){
				if(!framedata.resize[i]){
					this.$set('framedata.resize["'+i+'"]', 0)
				}
			}
		}
		, cleanFrameData : function(){
			this.$set('framedata.resize', {})
			this.$set('framedata.transform', {})
			this.formatFrameData()
		}
	}
	, events : {
	}
	, created : function(){
		var framedata = this.framedata
		this.formatFrameData()
	}
}
</script>

