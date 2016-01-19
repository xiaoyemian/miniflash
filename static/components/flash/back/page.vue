<style>
.uploadBtn{
	.pr;.hidden;
	input{
		.opacity(0);
		.pa;left:0px;top:0px;
		.w(100%);.h(100%);
	}
}

@settingsWidth:240px;

.view, .settings{
	top:0px;
}

.view{
	.pa;right:0px;left:@settingsWidth;bottom:0px;
	box-sizing:border-box;

	.page{
		.pa; .bgc(#fff); left:50%; top:50%;
	}
}

.settings{
	overflow:auto;
	.pa;left:0px;.w(@settingsWidth);
	bottom:0px;
	z-index:10;
	box-sizing:border-box;

	.bgc(#333);
	border:1px solid #222;

}

.controlItem, .controlBlock{
	.hidden;
	padding:4px;
	.l(14px);

	span{.left;.mr(4px);.fc(#ccc);padding:2px 0px;}
	div{
		.left;
		padding:2px 4px;
		.ml(2px);.mr(2px);
		.border-r(2px);
		.fc(white);
		.cursor;
	}
	.animationBox{ .bgc(#0099FF); }
	.transitionBox{ .bgc(#33B666);}
	.normalBox{ .bgc(#999);}
	.blankBox{ .bgc(#333);}

	.focus{.none;}
}

.ui-resizable{
	&-se, &-e, &-s{.pa;z-index:90;}
	&-se{cursor:se-resize;}
	&-e{cursor:e-resize;}
	&-s{cursor:s-resize;}
}

</style>


<template>

<div class="view" @click="blurItem">
	<itemsetting :global="global"></itemsetting>
	<div class="page" :style="pagestyle">
		<item v-ref:item v-for="itemdata in global.pages[global.number].items" :itemdata="itemdata" :index="$index" :global="global" :printdata="printdata"></item>
	</div>
</div>


<div class="settings">
	<flash v-ref:flash :global="global"></flash>

	<settings :global="global"></settings>
</div>


</template>


<script>

var flash = require('flash/back/flash.vue')
var item = require('flash/back/item.vue')
var settings = require('flash/back/settings.vue')
var itemsetting = require('flash/back/settings/item.vue')

return {
  components : {
    item : item
		, flash : flash
		, settings : settings
		, itemsetting : itemsetting
  }
	, props:['global']
	, data : function(){

		return {
			printdata : {
				width : 0
				, height : 0
				, scale : 0
			}
			, pagestyle : {}
		}
	}
	, methods : {
		blurItem : function(){
			this.global.item && this.global.item.blurItem()
		}
		, resizePrint : function(printdata){
			for(var i in printdata){
				this.$set('printdata["'+i+'"]', printdata[i]||0)
			}
			this.updatePage()
		}
		, updatePage : function(){
			var printdata = this.printdata

			this.$set('pagestyle.width', printdata.width * printdata.scale + 'px')
			this.$set('pagestyle.height', printdata.height * printdata.scale + 'px')
			this.$set('pagestyle["margin-left"]', printdata.width * printdata.scale/-2 + 'px')
			this.$set('pagestyle["margin-top"]', printdata.height * printdata.scale/-2 + 'px')
    }
	}
	, events : {
		bindTrackItem : function(track){
			this.$broadcast('bindTrackItem', track)
		}
		, loadTime : function(){
			this.$broadcast('loadItemByTime', this.global.time)
		}
		, setTime : function(time){
			this.global.time = time
		}
		, changeImage : function(event, cbk){
			var mSelf = this
			var files = event.target.files
				, file

			if(!files || !files.length)
				return;

			file = files[0]

			if(file.size > 1024 * 200) {
        alert('图片大小不能超过 200K!');
        return false;
      }

			var URL = window.URL || window.webkitURL
			var imgURL = URL.createObjectURL(file)

			var img = new Image()
			img.onload = function(){
				var itemdata = {
					original : {
						width : img.width
						, height : img.height
						, imageUrl : imgURL
					}
				}

				cbk && cbk(itemdata)
			}
			img.src = imgURL
		}
	}
	, watch : {
		'global.time' : function(time){
			this.$broadcast('loadItemByTime', time)
		}
	}
	, created : function(){
		this.resizePrint({
			width : 640
			, height : 1136
			, scale : 0.4
		})
	}
}
</script>

