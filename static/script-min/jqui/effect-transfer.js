define("jqui/effect",function(t,e){var n=t("jquery"),r="ui-effects-",o=n;n.effects={effect:{}},function(t,e){function n(t,e,n){var r=l[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function r(e){var n=u(),r=n._rgba=[];return e=e.toLowerCase(),h(f,function(t,o){var i,a=o.re.exec(e),s=a&&o.parse(a),f=o.space||"rgba";return s?(i=n[f](s),n[c[f].cache]=i[c[f].cache],r=n._rgba=i._rgba,!1):void 0}),r.length?("0,0,0,0"===r.join()&&t.extend(r,i.transparent),n):i[e]}function o(t,e,n){return n=(n+1)%1,1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t}var i,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,f=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],u=t.Color=function(e,n,r,o){return new t.Color.fn.parse(e,n,r,o)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=u.support={},p=t("<p>")[0],h=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,h(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),u.fn=t.extend(u.prototype,{parse:function(o,a,s,f){if(o===e)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=t(o).css(a),a=e);var l=this,d=t.type(o),p=this._rgba=[];return a!==e&&(o=[o,a,s,f],d="array"),"string"===d?this.parse(r(o)||i._default):"array"===d?(h(c.rgba.props,function(t,e){p[e.idx]=n(o[e.idx],e)}),this):"object"===d?(o instanceof u?h(c,function(t,e){o[e.cache]&&(l[e.cache]=o[e.cache].slice())}):h(c,function(e,r){var i=r.cache;h(r.props,function(t,e){if(!l[i]&&r.to){if("alpha"===t||null==o[t])return;l[i]=r.to(l._rgba)}l[i][e.idx]=n(o[t],e,!0)}),l[i]&&t.inArray(null,l[i].slice(0,3))<0&&(l[i][3]=1,r.from&&(l._rgba=r.from(l[i])))}),this):void 0},is:function(t){var e=u(t),n=!0,r=this;return h(c,function(t,o){var i,a=e[o.cache];return a&&(i=r[o.cache]||o.to&&o.to(r._rgba)||[],h(o.props,function(t,e){return null!=a[e.idx]?n=a[e.idx]===i[e.idx]:void 0})),n}),n},_space:function(){var t=[],e=this;return h(c,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var r=u(t),o=r._space(),i=c[o],a=0===this.alpha()?u("transparent"):this,s=a[i.cache]||i.to(a._rgba),f=s.slice();return r=r[i.cache],h(i.props,function(t,o){var i=o.idx,a=s[i],u=r[i],c=l[o.type]||{};null!==u&&(null===a?f[i]=u:(c.mod&&(u-a>c.mod/2?a+=c.mod:a-u>c.mod/2&&(a-=c.mod)),f[i]=n((u-a)*e+a,o)))}),this[o](f)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),o=u(e)._rgba;return u(t.map(n,function(t,e){return(1-r)*o[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,o=t[1]/255,i=t[2]/255,a=t[3],s=Math.max(r,o,i),f=Math.min(r,o,i),u=s-f,c=s+f,l=.5*c;return e=f===s?0:r===s?60*(o-i)/u+360:o===s?60*(i-r)/u+120:60*(r-o)/u+240,n=0===u?0:.5>=l?u/c:u/(2-c),[Math.round(e)%360,n,l,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],i=t[3],a=.5>=r?r*(1+n):r+n-r*n,s=2*r-a;return[Math.round(255*o(s,a,e+1/3)),Math.round(255*o(s,a,e)),Math.round(255*o(s,a,e-1/3)),i]},h(c,function(r,o){var i=o.props,a=o.cache,f=o.to,c=o.from;u.fn[r]=function(r){if(f&&!this[a]&&(this[a]=f(this._rgba)),r===e)return this[a].slice();var o,s=t.type(r),l="array"===s||"object"===s?r:arguments,d=this[a].slice();return h(i,function(t,e){var r=l["object"===s?t:e.idx];null==r&&(r=d[e.idx]),d[e.idx]=n(r,e)}),c?(o=u(c(d)),o[a]=d,o):u(d)},h(i,function(e,n){u.fn[e]||(u.fn[e]=function(o){var i,a=t.type(o),f="alpha"===e?this._hsla?"hsla":"rgba":r,u=this[f](),c=u[n.idx];return"undefined"===a?c:("function"===a&&(o=o.call(this,c),a=t.type(o)),null==o&&n.empty?this:("string"===a&&(i=s.exec(o),i&&(o=c+parseFloat(i[2])*("+"===i[1]?1:-1))),u[n.idx]=o,this[f](u)))})})}),u.hook=function(e){var n=e.split(" ");h(n,function(e,n){t.cssHooks[n]={set:function(e,o){var i,a,s="";if("transparent"!==o&&("string"!==t.type(o)||(i=r(o)))){if(o=u(i||o),!d.rgba&&1!==o._rgba[3]){for(a="backgroundColor"===n?e.parentNode:e;(""===s||"transparent"===s)&&a&&a.style;)try{s=t.css(a,"backgroundColor"),a=a.parentNode}catch(f){}o=o.blend(s&&"transparent"!==s?s:"_default")}o=o.toRgbaString()}try{e.style[n]=o}catch(f){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=u(e.elem,n),e.end=u(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},u.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return h(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},i=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(o),function(){function t(t){var e,r,o=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,i={};if(o&&o.length&&o[0]&&o[o[0]])for(r=o.length;r--;)e=o[r],"string"==typeof o[e]&&(i[n.camelCase(e)]=o[e]);else for(e in o)"string"==typeof o[e]&&(i[e]=o[e]);return i}function e(t,e){var r,o,a={};for(r in e)o=e[r],t[r]!==o&&(i[r]||(n.fx.step[r]||!isNaN(parseFloat(o)))&&(a[r]=o));return a}var r=["add","remove","toggle"],i={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};n.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,e){n.fx.step[e]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(o.style(t.elem,e,t.end),t.setAttr=!0)}}),n.fn.addBack||(n.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),n.effects.animateClass=function(o,i,a,s){var f=n.speed(i,a,s);return this.queue(function(){var i,a=n(this),s=a.attr("class")||"",u=f.children?a.find("*").addBack():a;u=u.map(function(){var e=n(this);return{el:e,start:t(this)}}),i=function(){n.each(r,function(t,e){o[e]&&a[e+"Class"](o[e])})},i(),u=u.map(function(){return this.end=t(this.el[0]),this.diff=e(this.start,this.end),this}),a.attr("class",s),u=u.map(function(){var t=this,e=n.Deferred(),r=n.extend({},f,{queue:!1,complete:function(){e.resolve(t)}});return this.el.animate(this.diff,r),e.promise()}),n.when.apply(n,u.get()).done(function(){i(),n.each(arguments,function(){var t=this.el;n.each(this.diff,function(e){t.css(e,"")})}),f.complete.call(a[0])})})},n.fn.extend({addClass:function(t){return function(e,r,o,i){return r?n.effects.animateClass.call(this,{add:e},r,o,i):t.apply(this,arguments)}}(n.fn.addClass),removeClass:function(t){return function(e,r,o,i){return arguments.length>1?n.effects.animateClass.call(this,{remove:e},r,o,i):t.apply(this,arguments)}}(n.fn.removeClass),toggleClass:function(t){return function(e,r,o,i,a){return"boolean"==typeof r||void 0===r?o?n.effects.animateClass.call(this,r?{add:e}:{remove:e},o,i,a):t.apply(this,arguments):n.effects.animateClass.call(this,{toggle:e},r,o,i)}}(n.fn.toggleClass),switchClass:function(t,e,r,o,i){return n.effects.animateClass.call(this,{add:e,remove:t},r,o,i)}})}(),function(){function t(t,e,r,o){return n.isPlainObject(t)&&(e=t,t=t.effect),t={effect:t},null==e&&(e={}),n.isFunction(e)&&(o=e,r=null,e={}),("number"==typeof e||n.fx.speeds[e])&&(o=r,r=e,e={}),n.isFunction(r)&&(o=r,r=null),e&&n.extend(t,e),r=r||e.duration,t.duration=n.fx.off?0:"number"==typeof r?r:r in n.fx.speeds?n.fx.speeds[r]:n.fx.speeds._default,t.complete=o||e.complete,t}function e(t){return!t||"number"==typeof t||n.fx.speeds[t]?!0:"string"!=typeof t||n.effects.effect[t]?n.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}n.extend(n.effects,{version:"1.11.4",save:function(t,e){for(var n=0;n<e.length;n++)null!==e[n]&&t.data(r+e[n],t[0].style[e[n]])},restore:function(t,e){var n,o;for(o=0;o<e.length;o++)null!==e[o]&&(n=t.data(r+e[o]),void 0===n&&(n=""),t.css(e[o],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var e={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=n("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),o={width:t.width(),height:t.height()},i=document.activeElement;try{i.id}catch(a){i=document.body}return t.wrap(r),(t[0]===i||n.contains(t[0],i))&&n(i).focus(),r=t.parent(),"static"===t.css("position")?(r.css({position:"relative"}),t.css({position:"relative"})):(n.extend(e,{position:t.css("position"),zIndex:t.css("z-index")}),n.each(["top","left","bottom","right"],function(n,r){e[r]=t.css(r),isNaN(parseInt(e[r],10))&&(e[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(o),r.css(e).show()},removeWrapper:function(t){var e=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===e||n.contains(t[0],e))&&n(e).focus()),t},setTransition:function(t,e,r,o){return o=o||{},n.each(e,function(e,n){var i=t.cssUnit(n);i[0]>0&&(o[n]=i[0]*r+i[1])}),o}}),n.fn.extend({effect:function(){function e(t){function e(){n.isFunction(i)&&i.call(o[0]),n.isFunction(t)&&t()}var o=n(this),i=r.complete,s=r.mode;(o.is(":hidden")?"hide"===s:"show"===s)?(o[s](),e()):a.call(o[0],r,e)}var r=t.apply(this,arguments),o=r.mode,i=r.queue,a=n.effects.effect[r.effect];return n.fx.off||!a?o?this[o](r.duration,r.complete):this.each(function(){r.complete&&r.complete.call(this)}):i===!1?this.each(e):this.queue(i||"fx",e)},show:function(n){return function(r){if(e(r))return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="show",this.effect.call(this,o)}}(n.fn.show),hide:function(n){return function(r){if(e(r))return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="hide",this.effect.call(this,o)}}(n.fn.hide),toggle:function(n){return function(r){if(e(r)||"boolean"==typeof r)return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="toggle",this.effect.call(this,o)}}(n.fn.toggle),cssUnit:function(t){var e=this.css(t),r=[];return n.each(["em","px","%","pt"],function(t,n){e.indexOf(n)>0&&(r=[parseFloat(e),n])}),r}})}(),function(){var t={};n.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),n.extend(t,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),n.each(t,function(t,e){n.easing["easeIn"+t]=e,n.easing["easeOut"+t]=function(t){return 1-e(1-t)},n.easing["easeInOut"+t]=function(t){return.5>t?e(2*t)/2:1-e(-2*t+2)/2}})}()}),define("jqui/effect-transfer",function(t,e){t("jqui/effect");$.effects.effect.transfer=function(t,e){var n=$(this),r=$(t.to),o="fixed"===r.css("position"),i=$("body"),a=o?i.scrollTop():0,s=o?i.scrollLeft():0,f=r.offset(),u={top:f.top-a,left:f.left-s,height:r.innerHeight(),width:r.innerWidth()},c=n.offset(),l=$("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({top:c.top-a,left:c.left-s,height:n.innerHeight(),width:n.innerWidth(),position:o?"fixed":"absolute"}).animate(u,t.duration,t.easing,function(){l.remove(),e()})}});
