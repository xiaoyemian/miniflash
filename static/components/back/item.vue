<style>
.item{
	.pa;
	background-size:100% 100%;
	background-repeat:no-repeat;
	&.focus{
		.handel{
			.pa;
			.w(100%);.h(100%);
			.ml(-1px);.mt(-1px);
			border:1px solid #5CADD6;
		
			.aspectRatioBtn{
				.pa;left:50%;top:50%;.ml(-5px);.mt(-5px);.w(9px);.h(9px);.bgc(#fff);.cursor;
				border:1px solid #222;
				.border-r(8px);
				.opacity(80);

				&:before, &:after{ content:'';.pa;z-index:1; }
				&:before{
					top:0px;left:0px;.w(9px);.h(4px);
					border-bottom:1px solid #222;
				}
				&:after{
					top:0px;left:0px;.w(4px);.h(9px);
					border-right:1px solid #222;
				}
			}
		}
		.ui-resizable{
			&-se, &-e, &-s{
				border:1px solid #222;
				.bgc(#fff);
				.opacity(80);
				.w(10px);.h(10px);
			}
			&-se{ 
				bottom:-6px;right:-6px;
				.border-r(8px);
			}
			&-e, &-s{
				.border-r(3px);
			}
			&-e{
				top:50%;right:-6px;.mt(-5px);
			}
			&-s{ 
				left:50%;bottom:-6px;.ml(-5px);
			}
		}

	}
}
</style>

<template>
<div class="item" @click.stop="selectItem" :class="[framedata && framedata.type, focus_item && focus_item.itemdata.item_id == itemdata.item_id ? 'focus' : '']" :style="[originalstyle, framestyle]">
	<div class="handel">
		<div @click.stop="aspectRatio" class="aspectRatioBtn"></div>
	</div>
</div>
</template>


<script>

return {
	props:['focus_item', 'itemdata', 'index', 'printdata', 'formatdata']
	, data:function(){
		return {
			framedata : null
			, originalstyle : {}
			, framestyle : {} 
		}
	}
	, methods : {
		selectItem : function(){
			this.$dispatch('selectItem', this)
		}
		, setFocusItem : function(){
			this.$dispatch('setFocusItem', this)
		}
		, formatItem : function(){
			var itemdata = this.itemdata
			var type = 'item'

			if(!itemdata.original){
				var original = {
					width : 640 * itemdata.style['width']/100
					, height : 640 * itemdata.style['padding-top']/100
				}
				this.$set('itemdata.original', original)
			}

			if(itemdata.background && itemdata.background.image){
				itemdata.original.imageUrl = itemdata.background.image
				type = 'image'
			}
			this.resetItemId(type)

			if(!itemdata.frames){
				var framedata = {
					type : 'keyframe'
					, transform : {}
					, resize : {
						width : 640 * itemdata.style['width']/100
						, height : 640 * itemdata.style['padding-top']/100
						, left : 640 * itemdata.style['left']/100
						, top : 1136 * itemdata.style['top']/100
					}
				}

				this.$set('itemdata.frames', {0:framedata})
			}

			delete itemdata.style
			delete itemdata.background
			delete itemdata.scale
		}
		, loadItemOriginal : function(){
			var style = this.itemdata.original

			this.originalstyle = {
				width : style.width * this.printdata.scale + 'px'
				, height : style.height * this.printdata.scale + 'px'
				, 'background-image' : 'url("' + style.imageUrl + '")'
			}
		}
		, loadItemStyle : function(){
			var format = this.formatdata
			var framedata = this.framedata
			var transformList = []

			this.framestyle = {}

			for(var i in framedata.resize){
				var unit = format.resize[i].unit || ''
				var value = framedata.resize[i] || 0
				
				if(unit == 'px'){
					value *= this.printdata.scale
				}
				this.framestyle[i] = value + unit 
			}

			for(var i in framedata.transform){
				var transform = framedata.transform[i]
				var opts = format.transform[i].opts
				var arr = []
				for(var j in opts){
					var opt = opts[j]
					var unit = opt[1] || ''
					var value = transform[opt[0]] || 0
					if(unit == 'px'){
						value *= this.printdata.scale
					}
					arr.push(value + unit)
				}
				transformList.push(i + '(' + arr.join(',') + ')')
			}

			this.framestyle.transform = transformList.join(' ')

		}
		, resetItemId : function(type){
			this.itemdata.item_id = type + '|' + (this.index+1) + '|' 
														+ (new Date()).valueOf() 
														+ Math.floor(Math.random()*10000) 
														+ Math.floor(Math.random()*100)
		}
		, aspectRatio : function(){
		}
	}
	, events : {
		loadItemByTrack : function(track){
			if(track.item_id != this.itemdata.item_id)
				return;

			this.framedata = track.focus_frame.framedata

			if(this.framedata.type == 'blankframe'){
				var resize = {}
				var transform = {}

				for(var i = track.focus_frame.time; i >= 0; i--){
					var framedata = track.frameslist[i]

					if(framedata.type && framedata.type != 'blankframe'){

						for(var i in framedata.resize){
							resize[i] = framedata.resize[i]
						}

						for(var i in framedata.transform){
							transform[i] = {}
							for(var j in framedata.transform[i]){
								transform[i][j] = framedata.transform[i][j]
							}
						}

						break;
					}
				}

				this.$set('framedata.resize', resize)
				this.$set('framedata.transform', transform)
			}

			this.loadItemStyle()
		}
		, focusItemById : function(item_id){
			if(item_id == this.itemdata.item_id){
				this.setFocusItem()
			}
		}
		, loadItemStyle : function(){
			this.loadItemStyle()
		}
	}
	, ready : function(){
		var mSelf = this
		var $item = $(this.$el)

		$item.draggable({
			start : function(event, ui){
				mSelf.selectItem()
				mSelf.framedata.type = 'keyframe'
			}
			, drag : function(event, ui){
				var resize = mSelf.framedata.resize
				resize.left = ui.position.left / mSelf.printdata.scale
				resize.top = ui.position.top / mSelf.printdata.scale
			}
			, stop : function(event, ui){
				mSelf.loadItemStyle()
			}
			, cursor: "move"
			, containment : "document"
			, scroll : false
			, snap : '.page'
			, snapTolerance : '4'
		})
	
		$item.resizable({
			start : function(event, ui){
				mSelf.selectItem()
				mSelf.framedata.type = 'keyframe'
			}
			, resize : function(event, ui){
				var resize = mSelf.framedata.resize
				resize.width = ui.size.width / mSelf.printdata.scale
				resize.height = ui.size.height / mSelf.printdata.scale
			}
			, stop : function(event, ui){
				mSelf.loadItemStyle()
			}
		})
	}
	, created : function(){
		this.formatItem()
		this.loadItemOriginal()
	}
}
</script>

