define("jqui/effect",function(t,e){var n=t("jquery"),r="ui-effects-",o=n;n.effects={effect:{}},function(t,e){function n(t,e,n){var r=l[e.type]||{};return null==t?n||!e.def?null:e.def:(t=r.floor?~~t:parseFloat(t),isNaN(t)?e.def:r.mod?(t+r.mod)%r.mod:0>t?0:r.max<t?r.max:t)}function r(e){var n=u(),r=n._rgba=[];return e=e.toLowerCase(),h(f,function(t,o){var a,i=o.re.exec(e),s=i&&o.parse(i),f=o.space||"rgba";return s?(a=n[f](s),n[c[f].cache]=a[c[f].cache],r=n._rgba=a._rgba,!1):void 0}),r.length?("0,0,0,0"===r.join()&&t.extend(r,a.transparent),n):a[e]}function o(t,e,n){return n=(n+1)%1,1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t}var a,i="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",s=/^([\-+])=\s*(\d+\.?\d*)/,f=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],u=t.Color=function(e,n,r,o){return new t.Color.fn.parse(e,n,r,o)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=u.support={},p=t("<p>")[0],h=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,h(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),u.fn=t.extend(u.prototype,{parse:function(o,i,s,f){if(o===e)return this._rgba=[null,null,null,null],this;(o.jquery||o.nodeType)&&(o=t(o).css(i),i=e);var l=this,d=t.type(o),p=this._rgba=[];return i!==e&&(o=[o,i,s,f],d="array"),"string"===d?this.parse(r(o)||a._default):"array"===d?(h(c.rgba.props,function(t,e){p[e.idx]=n(o[e.idx],e)}),this):"object"===d?(o instanceof u?h(c,function(t,e){o[e.cache]&&(l[e.cache]=o[e.cache].slice())}):h(c,function(e,r){var a=r.cache;h(r.props,function(t,e){if(!l[a]&&r.to){if("alpha"===t||null==o[t])return;l[a]=r.to(l._rgba)}l[a][e.idx]=n(o[t],e,!0)}),l[a]&&t.inArray(null,l[a].slice(0,3))<0&&(l[a][3]=1,r.from&&(l._rgba=r.from(l[a])))}),this):void 0},is:function(t){var e=u(t),n=!0,r=this;return h(c,function(t,o){var a,i=e[o.cache];return i&&(a=r[o.cache]||o.to&&o.to(r._rgba)||[],h(o.props,function(t,e){return null!=i[e.idx]?n=i[e.idx]===a[e.idx]:void 0})),n}),n},_space:function(){var t=[],e=this;return h(c,function(n,r){e[r.cache]&&t.push(n)}),t.pop()},transition:function(t,e){var r=u(t),o=r._space(),a=c[o],i=0===this.alpha()?u("transparent"):this,s=i[a.cache]||a.to(i._rgba),f=s.slice();return r=r[a.cache],h(a.props,function(t,o){var a=o.idx,i=s[a],u=r[a],c=l[o.type]||{};null!==u&&(null===i?f[a]=u:(c.mod&&(u-i>c.mod/2?i+=c.mod:i-u>c.mod/2&&(i-=c.mod)),f[a]=n((u-i)*e+i,o)))}),this[o](f)},blend:function(e){if(1===this._rgba[3])return this;var n=this._rgba.slice(),r=n.pop(),o=u(e)._rgba;return u(t.map(n,function(t,e){return(1-r)*o[e]+r*t}))},toRgbaString:function(){var e="rgba(",n=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===n[3]&&(n.pop(),e="rgb("),e+n.join()+")"},toHslaString:function(){var e="hsla(",n=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===n[3]&&(n.pop(),e="hsl("),e+n.join()+")"},toHexString:function(e){var n=this._rgba.slice(),r=n.pop();return e&&n.push(~~(255*r)),"#"+t.map(n,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),u.fn.parse.prototype=u.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,n,r=t[0]/255,o=t[1]/255,a=t[2]/255,i=t[3],s=Math.max(r,o,a),f=Math.min(r,o,a),u=s-f,c=s+f,l=.5*c;return e=f===s?0:r===s?60*(o-a)/u+360:o===s?60*(a-r)/u+120:60*(r-o)/u+240,n=0===u?0:.5>=l?u/c:u/(2-c),[Math.round(e)%360,n,l,null==i?1:i]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,n=t[1],r=t[2],a=t[3],i=.5>=r?r*(1+n):r+n-r*n,s=2*r-i;return[Math.round(255*o(s,i,e+1/3)),Math.round(255*o(s,i,e)),Math.round(255*o(s,i,e-1/3)),a]},h(c,function(r,o){var a=o.props,i=o.cache,f=o.to,c=o.from;u.fn[r]=function(r){if(f&&!this[i]&&(this[i]=f(this._rgba)),r===e)return this[i].slice();var o,s=t.type(r),l="array"===s||"object"===s?r:arguments,d=this[i].slice();return h(a,function(t,e){var r=l["object"===s?t:e.idx];null==r&&(r=d[e.idx]),d[e.idx]=n(r,e)}),c?(o=u(c(d)),o[i]=d,o):u(d)},h(a,function(e,n){u.fn[e]||(u.fn[e]=function(o){var a,i=t.type(o),f="alpha"===e?this._hsla?"hsla":"rgba":r,u=this[f](),c=u[n.idx];return"undefined"===i?c:("function"===i&&(o=o.call(this,c),i=t.type(o)),null==o&&n.empty?this:("string"===i&&(a=s.exec(o),a&&(o=c+parseFloat(a[2])*("+"===a[1]?1:-1))),u[n.idx]=o,this[f](u)))})})}),u.hook=function(e){var n=e.split(" ");h(n,function(e,n){t.cssHooks[n]={set:function(e,o){var a,i,s="";if("transparent"!==o&&("string"!==t.type(o)||(a=r(o)))){if(o=u(a||o),!d.rgba&&1!==o._rgba[3]){for(i="backgroundColor"===n?e.parentNode:e;(""===s||"transparent"===s)&&i&&i.style;)try{s=t.css(i,"backgroundColor"),i=i.parentNode}catch(f){}o=o.blend(s&&"transparent"!==s?s:"_default")}o=o.toRgbaString()}try{e.style[n]=o}catch(f){}}},t.fx.step[n]=function(e){e.colorInit||(e.start=u(e.elem,n),e.end=u(e.end),e.colorInit=!0),t.cssHooks[n].set(e.elem,e.start.transition(e.end,e.pos))}})},u.hook(i),t.cssHooks.borderColor={expand:function(t){var e={};return h(["Top","Right","Bottom","Left"],function(n,r){e["border"+r+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(o),function(){function t(t){var e,r,o=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(o&&o.length&&o[0]&&o[o[0]])for(r=o.length;r--;)e=o[r],"string"==typeof o[e]&&(a[n.camelCase(e)]=o[e]);else for(e in o)"string"==typeof o[e]&&(a[e]=o[e]);return a}function e(t,e){var r,o,i={};for(r in e)o=e[r],t[r]!==o&&(a[r]||(n.fx.step[r]||!isNaN(parseFloat(o)))&&(i[r]=o));return i}var r=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};n.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,e){n.fx.step[e]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(o.style(t.elem,e,t.end),t.setAttr=!0)}}),n.fn.addBack||(n.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),n.effects.animateClass=function(o,a,i,s){var f=n.speed(a,i,s);return this.queue(function(){var a,i=n(this),s=i.attr("class")||"",u=f.children?i.find("*").addBack():i;u=u.map(function(){var e=n(this);return{el:e,start:t(this)}}),a=function(){n.each(r,function(t,e){o[e]&&i[e+"Class"](o[e])})},a(),u=u.map(function(){return this.end=t(this.el[0]),this.diff=e(this.start,this.end),this}),i.attr("class",s),u=u.map(function(){var t=this,e=n.Deferred(),r=n.extend({},f,{queue:!1,complete:function(){e.resolve(t)}});return this.el.animate(this.diff,r),e.promise()}),n.when.apply(n,u.get()).done(function(){a(),n.each(arguments,function(){var t=this.el;n.each(this.diff,function(e){t.css(e,"")})}),f.complete.call(i[0])})})},n.fn.extend({addClass:function(t){return function(e,r,o,a){return r?n.effects.animateClass.call(this,{add:e},r,o,a):t.apply(this,arguments)}}(n.fn.addClass),removeClass:function(t){return function(e,r,o,a){return arguments.length>1?n.effects.animateClass.call(this,{remove:e},r,o,a):t.apply(this,arguments)}}(n.fn.removeClass),toggleClass:function(t){return function(e,r,o,a,i){return"boolean"==typeof r||void 0===r?o?n.effects.animateClass.call(this,r?{add:e}:{remove:e},o,a,i):t.apply(this,arguments):n.effects.animateClass.call(this,{toggle:e},r,o,a)}}(n.fn.toggleClass),switchClass:function(t,e,r,o,a){return n.effects.animateClass.call(this,{add:e,remove:t},r,o,a)}})}(),function(){function t(t,e,r,o){return n.isPlainObject(t)&&(e=t,t=t.effect),t={effect:t},null==e&&(e={}),n.isFunction(e)&&(o=e,r=null,e={}),("number"==typeof e||n.fx.speeds[e])&&(o=r,r=e,e={}),n.isFunction(r)&&(o=r,r=null),e&&n.extend(t,e),r=r||e.duration,t.duration=n.fx.off?0:"number"==typeof r?r:r in n.fx.speeds?n.fx.speeds[r]:n.fx.speeds._default,t.complete=o||e.complete,t}function e(t){return!t||"number"==typeof t||n.fx.speeds[t]?!0:"string"!=typeof t||n.effects.effect[t]?n.isFunction(t)?!0:"object"!=typeof t||t.effect?!1:!0:!0}n.extend(n.effects,{version:"1.11.4",save:function(t,e){for(var n=0;n<e.length;n++)null!==e[n]&&t.data(r+e[n],t[0].style[e[n]])},restore:function(t,e){var n,o;for(o=0;o<e.length;o++)null!==e[o]&&(n=t.data(r+e[o]),void 0===n&&(n=""),t.css(e[o],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var n,r;switch(t[0]){case"top":n=0;break;case"middle":n=.5;break;case"bottom":n=1;break;default:n=t[0]/e.height}switch(t[1]){case"left":r=0;break;case"center":r=.5;break;case"right":r=1;break;default:r=t[1]/e.width}return{x:r,y:n}},createWrapper:function(t){if(t.parent().is(".ui-effects-wrapper"))return t.parent();var e={width:t.outerWidth(!0),height:t.outerHeight(!0),"float":t.css("float")},r=n("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),o={width:t.width(),height:t.height()},a=document.activeElement;try{a.id}catch(i){a=document.body}return t.wrap(r),(t[0]===a||n.contains(t[0],a))&&n(a).focus(),r=t.parent(),"static"===t.css("position")?(r.css({position:"relative"}),t.css({position:"relative"})):(n.extend(e,{position:t.css("position"),zIndex:t.css("z-index")}),n.each(["top","left","bottom","right"],function(n,r){e[r]=t.css(r),isNaN(parseInt(e[r],10))&&(e[r]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(o),r.css(e).show()},removeWrapper:function(t){var e=document.activeElement;return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===e||n.contains(t[0],e))&&n(e).focus()),t},setTransition:function(t,e,r,o){return o=o||{},n.each(e,function(e,n){var a=t.cssUnit(n);a[0]>0&&(o[n]=a[0]*r+a[1])}),o}}),n.fn.extend({effect:function(){function e(t){function e(){n.isFunction(a)&&a.call(o[0]),n.isFunction(t)&&t()}var o=n(this),a=r.complete,s=r.mode;(o.is(":hidden")?"hide"===s:"show"===s)?(o[s](),e()):i.call(o[0],r,e)}var r=t.apply(this,arguments),o=r.mode,a=r.queue,i=n.effects.effect[r.effect];return n.fx.off||!i?o?this[o](r.duration,r.complete):this.each(function(){r.complete&&r.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(n){return function(r){if(e(r))return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="show",this.effect.call(this,o)}}(n.fn.show),hide:function(n){return function(r){if(e(r))return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="hide",this.effect.call(this,o)}}(n.fn.hide),toggle:function(n){return function(r){if(e(r)||"boolean"==typeof r)return n.apply(this,arguments);var o=t.apply(this,arguments);return o.mode="toggle",this.effect.call(this,o)}}(n.fn.toggle),cssUnit:function(t){var e=this.css(t),r=[];return n.each(["em","px","%","pt"],function(t,n){e.indexOf(n)>0&&(r=[parseFloat(e),n])}),r}})}(),function(){var t={};n.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,n){t[n]=function(t){return Math.pow(t,e+2)}}),n.extend(t,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,n=4;t<((e=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*e-2)/22-t,2)}}),n.each(t,function(t,e){n.easing["easeIn"+t]=e,n.easing["easeOut"+t]=function(t){return 1-e(1-t)},n.easing["easeInOut"+t]=function(t){return.5>t?e(2*t)/2:1-e(-2*t+2)/2}})}()}),define("jqui/effect-shake",function(t,e){t("jqui/effect");$.effects.effect.shake=function(t,e){var n,r=$(this),o=["position","top","bottom","left","right","height","width"],a=$.effects.setMode(r,t.mode||"effect"),i=t.direction||"left",s=t.distance||20,f=t.times||3,u=2*f+1,c=Math.round(t.duration/u),l="up"===i||"down"===i?"top":"left",d="up"===i||"left"===i,p={},h={},g={},m=r.queue(),b=m.length;for($.effects.save(r,o),r.show(),$.effects.createWrapper(r),p[l]=(d?"-=":"+=")+s,h[l]=(d?"+=":"-=")+2*s,g[l]=(d?"-=":"+=")+2*s,r.animate(p,c,t.easing),n=1;f>n;n++)r.animate(h,c,t.easing).animate(g,c,t.easing);r.animate(h,c,t.easing).animate(p,c/2,t.easing).queue(function(){"hide"===a&&r.hide(),$.effects.restore(r,o),$.effects.removeWrapper(r),e()}),b>1&&m.splice.apply(m,[1,0].concat(m.splice(b,u+1))),r.dequeue()}});
