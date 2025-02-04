(()=>{"use strict";var t,e=function(t,e,i,n){return new(i||(i=Promise))((function(s,r){function o(t){try{a(n.next(t))}catch(t){r(t)}}function h(t){try{a(n.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,h)}a((n=n.apply(t,e||[])).next())}))},i=function(t,e){var i,n,s,r={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},o=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return o.next=h(0),o.throw=h(1),o.return=h(2),"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function h(h){return function(a){return function(h){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,h[0]&&(r=0)),r;)try{if(i=1,n&&(s=2&h[0]?n.return:h[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,h[1])).done)return s;switch(n=0,s&&(h=[2&h[0],s.value]),h[0]){case 0:case 1:s=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,n=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(!((s=(s=r.trys).length>0&&s[s.length-1])||6!==h[0]&&2!==h[0])){r=0;continue}if(3===h[0]&&(!s||h[1]>s[0]&&h[1]<s[3])){r.label=h[1];break}if(6===h[0]&&r.label<s[1]){r.label=s[1],s=h;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(h);break}s[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(t){h=[6,t],n=0}finally{i=s=0}if(5&h[0])throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}([h,a])}}},n=function(){function t(e,i,n){void 0===n&&(n=!1),this.animations={},this.animTime=0,this.animIdx=0,this.frameTime=0,this.ui=n,this.dir=e,this.name=i,this.image=new Image,this.data={frames:new Map},this.current=0,this.imgLoaded=!1,this.dataLoaded=!1;var s=e+i+".png";s in t.loadedImages?(this.image=t.loadedImages[s].image,t.loadedImages[s].instances++,this.imgLoaded=!0):this.loadImage(s),this.loadData(e+i+".json")}return t.prototype.loadImage=function(e){var i=this;this.image.src=e,this.image.onload=function(){i.imgLoaded=!0,e in t.loadedImages?(i.image=t.loadedImages[e].image,t.loadedImages[e].instances++):t.loadedImages[e]={image:i.image,instances:0}}},t.prototype.loadData=function(t){return e(this,void 0,void 0,(function(){var e,n=this;return i(this,(function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),[4,fetch(t)];case 1:return[4,i.sent().json()];case 2:return e=i.sent(),Object.entries(e.frames).forEach((function(t){var e=t[0],i=t[1];n.data.frames.set(e,i)})),this.dataLoaded=!0,[3,4];case 3:return i.sent(),[3,4];case 4:return[2]}}))}))},t.clean=function(){Object.keys(t.loadedImages).forEach((function(e){t.loadedImages[e].instances<=0&&delete t.loadedImages[e]}))},t.prototype.clean=function(){t.loadedImages[this.dir+this.name+".png"].instances--},t.prototype.loadAnimations=function(t){this.animations=t},t.prototype.setCurrentFrame=function(t){var e="".concat(this.name," ").concat(t,".aseprite");this.data.frames.has(e)&&(this.current=t)},t.prototype.getCurrentFrameData=function(){var t="".concat(this.name," ").concat(this.current,".aseprite");return this.data.frames.get(t)},t.prototype.isReady=function(){return this.imgLoaded&&this.dataLoaded},t.prototype.waitUntilReady=function(){return e(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return this.isReady()?[3,2]:[4,new Promise((function(t){return setTimeout(t,10)}))];case 1:return t.sent(),[3,0];case 2:return[2]}}))}))},t.prototype.setCurAnimation=function(t){t in this.animations&&t!==this.curAnimation&&(this.curAnimation=t,this.animIdx=0,this.animTime=0,this.frameTime=0,this.current=this.animations[t][0])},t.prototype.update=function(){if(this.isReady()){var t=p.getInstance();if(this.animTime+=t.dt,this.frameTime+=t.dt,this.curAnimation){var e=this.getCurrentFrameData();if(this.frameTime>e.duration){if(this.frameTime=0,this.animIdx++,this.animIdx>=this.animations[this.curAnimation].length)return this.animIdx=0,this.current=this.animations[this.curAnimation][this.animIdx],!0;this.current=this.animations[this.curAnimation][this.animIdx]}}return!1}},t.prototype.render=function(t,e,i,n,s,r){var o;void 0===s&&(s=!1),void 0===r&&(r=!1);var h=this.ui?p.getInstance().uicanvas.getContext("2d"):p.getInstance().canvas.getContext("2d"),a=null===(o=this.getCurrentFrameData())||void 0===o?void 0:o.frame;a&&this.isReady()&&(h.save(),h.translate(t+i/2,e+n/2),h.scale(s?-1:1,r?-1:1),h.drawImage(this.image,a.x,a.y,a.w,a.h,-i/2,-n/2,i,n),h.restore())},t.loadedImages={},t}(),s=function(){function t(t){this._xspeed=[],this._yspeed=[],this._x=[],this._y=[],this.n=t;for(var e=0;e<this.n;e++)this._xspeed.push(0),this._yspeed.push(0),this._x.push(0),this._y.push(0)}return t.prototype.recordHistory=function(){for(var t=0;t<this.n-1;t++)this._x[t]=this._x[t+1],this._y[t]=this._y[t+1],this._xspeed[t]=this._xspeed[t+1],this._yspeed[t]=this._yspeed[t+1]},t.prototype.update=function(){var t=p.getInstance().dt;this.x+=this.xspeed*t/100,this.y+=this.yspeed*t/100},Object.defineProperty(t.prototype,"x",{get:function(){return this._x[this.n-1]},set:function(t){this._x[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"xspeed",{get:function(){return this._xspeed[this.n-1]},set:function(t){this._xspeed[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y[this.n-1]},set:function(t){this._y[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"yspeed",{get:function(){return this._yspeed[this.n-1]},set:function(t){this._yspeed[this.n-1]=t},enumerable:!1,configurable:!0}),t}(),r=function(){function t(t,e,i,n,s,r,o){void 0===r&&(r="standard"),void 0===o&&(o=0),this.color="pink",this.parent=t,this._x=e,this._y=i,this.w=n,this.h=s,this.colliders=[],this.type=r,this.layer=o}return Object.defineProperty(t.prototype,"x",{get:function(){return this._x+this.parent.x},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y+this.parent.y},enumerable:!1,configurable:!0}),t.prototype.getx=function(t){return t>=this.parent.n?this.x:this._x+this.parent._x[this.parent.n-1-t]},t.prototype.gety=function(t){return t>=this.parent.n?this.y:this._y+this.parent._y[this.parent.n-1-t]},t.prototype.render=function(){var t=p.getInstance().canvas.getContext("2d");t.strokeStyle=this.color,t.lineWidth=2,t.strokeRect(this.x,this.y,this.w,this.h)},t}(),o=function(){function t(t,e,i,o,h,a){this.uuid=0,this.prio=-1,this.pressed=!1,this.touchIdx=-1,this.keyState="iddle",this.game=t,this.sprite=new n("../../../static/assets/images/UI/","Button-"+a,!0),this.physics=new s(1),this.physics.x=e,this.physics.y=i,this.hitbox=new r(this.physics,0,0,o,h,"ui",0)}return t.prototype.update=function(){var t=this.game.inputHandler,e=t.touches;if(this.touchIdx<0)for(var i=0,n=Object.entries(e);i<n.length;i++){var s,r=n[i],o=r[0];if("down"!==(s=r[1]).state||!this.touched(s.x,s.y))return;this.touchIdx=o,this.keyState="down"}else"up"===(s=t.getTouchState(this.touchIdx)).state?(this.keyState="up",this.touchIdx=-1):this.touched(s.x,s.y)||(delete e[this.touchIdx],this.keyState="up",this.touchIdx=-1);this.pressed="down"===this.keyState,this.sprite.setCurrentFrame(this.pressed?1:0)},t.prototype.touched=function(t,e){var i=t>=this.hitbox.x&&t<=this.hitbox.x+this.hitbox.w,n=e>=this.hitbox.y&&e<=this.hitbox.y+this.hitbox.h;return i&&n},t.prototype.render=function(){this.hitbox&&this.sprite.render(this.hitbox.x,this.hitbox.y,this.hitbox.w,this.hitbox.h,!1)},t}(),h=function(){function t(t){this.touches={},this.showVirtual=!1,this.game=t,this.keys=new Map,this.keysReleased=new Map,this.bindings={jump:{keybinding:"ArrowUp",virtual:new o(t,100,100,50,50,"A")}},document.addEventListener("keydown",this.keyDownHandler.bind(this)),document.addEventListener("keyup",this.keyUpHandler.bind(this)),document.addEventListener("touchstart",this.touchStartHandler.bind(this),{passive:!1}),document.addEventListener("touchmove",this.touchMoveHandler.bind(this),{passive:!1}),document.addEventListener("touchend",this.touchEndHandler.bind(this),{passive:!1}),document.addEventListener("touchcancel",this.touchEndHandler.bind(this),{passive:!1})}return t.prototype.keyDownHandler=function(t){this.keys.set(t.key,"down"),this.showVirtual=!1},t.prototype.keyUpHandler=function(t){this.keys.set(t.key,"up"),this.keysReleased.set(t.key,!0)},t.prototype.touchStartHandler=function(t){var e=this;t.preventDefault(),Array.from(t.touches).forEach((function(t){e.touches[t.identifier]={x:t.clientX,y:t.clientY,state:"down"}})),this.showVirtual=!0},t.prototype.touchMoveHandler=function(t){var e=this;t.preventDefault(),Array.from(t.changedTouches).forEach((function(t){e.touches[t.identifier]={x:t.clientX,y:t.clientY,state:"down"}}))},t.prototype.touchEndHandler=function(t){var e=this;t.preventDefault(),Array.from(t.changedTouches).forEach((function(t){e.touches[t.identifier]={x:t.clientX,y:t.clientY,state:"up"}}))},t.prototype.getTouchState=function(t){var e=this.touches[t];return"up"===e.state&&delete this.touches[t],e},t.prototype.getKeyState=function(t){return this.keys.get(t)||"iddle"},t.prototype.getBindingState=function(t){if(t in this.bindings){if(this.showVirtual)return(e=this.bindings[t]).virtual.keyState;var e=this.bindings[t];return this.getKeyState(e.keybinding)}},t.prototype.getKeyOnce=function(t){if(!1===this.keysReleased.get(t))return"iddle";var e=this.getKeyState(t);return"down"===e&&this.keysReleased.set(t,!1),e},t.prototype.setKeyState=function(t,e){this.keys.set(t,e)},t}(),a=function(){function t(){this.objects=[],this.isObjsSorted=!0,this.environments=[]}return t.prototype.on_enter=function(){},t.prototype.on_exit=function(){},t.prototype.clean=function(){this.objects.length=0,this.environments.map((function(t){t.clean()})),this.environments.length=0},t.prototype.update=function(){for(var t=0,e=this.objects;t<e.length;t++)e[t].update();for(var i=0,n=this.environments;i<n.length;i++)n[i].update()},t.prototype.render=function(){this.isObjsSorted||(this.objects.sort((function(t,e){return t.prio-e.prio})),this.isObjsSorted=!0);for(var t=0,e=this.objects;t<e.length;t++)e[t].render()},t.prototype.register=function(t){0===t.uuid&&(t.uuid=this.objects.length),this.objects.push(t),this.isObjsSorted=!1},t.prototype.deregister=function(t){this.objects="number"==typeof t?this.objects.filter((function(e){return e.uuid!==t})):this.objects.filter((function(e){return e!==t}))},t}(),c=function(){function t(){this.states=[]}return t.prototype.pushState=function(t){t.on_enter(),this.states.push(t)},t.prototype.popState=function(){this.states.length>0&&this.states.pop().on_exit()},t.prototype.getCurState=function(){return this.states[this.states.length-1]},t.prototype.update=function(){this.states.length>0&&this.states[this.states.length-1].update()},t.prototype.render=function(){for(var t=0,e=this.states;t<e.length;t++)e[t].render()},t}(),u=function(){function t(){this.dt=0,this.fsm=new c,this.width=4e3,this.height=4e3,this.camx=0,this.camy=0,this._camsize=50,this.camw=16*this._camsize,this.camh=9*this._camsize,this.canvas=document.getElementById("game-screen"),this.uicanvas=document.getElementById("ui-layer"),this.inputHandler=new h(this)}return Object.defineProperty(t.prototype,"camsize",{set:function(t){this._camsize=t,this.camw=16*t,this.camh=9*t},enumerable:!1,configurable:!0}),t.prototype.update=function(){this.canvas.width=this.width,this.canvas.height=this.height,this.uicanvas.width=window.innerWidth,this.uicanvas.height=window.innerHeight,this.fsm.update(),this.inputHandler.showVirtual&&Object.values(this.inputHandler.bindings).forEach((function(t){t.virtual.update()}))},t.prototype.render=function(){var t=this.canvas.getContext("2d"),e=this.uicanvas.getContext("2d");t.imageSmoothingEnabled=!1,e.imageSmoothingEnabled=!1,e.clearRect(0,0,this.uicanvas.width,this.uicanvas.height),t.clearRect(0,0,this.canvas.width,this.canvas.height),t.save(),t.setTransform(this.canvas.width/this.camw,0,0,this.canvas.height/this.camh,-this.camx*(this.canvas.width/this.camw),-this.camy*(this.canvas.height/this.camh)),t.fillStyle="yellow",t.fillRect(0,0,this.canvas.width,this.canvas.height),this.fsm.render(),t.restore();var i=window.innerWidth/this.camw,n=window.innerHeight/this.camh,s=Math.min(i,n),r=this.camw*s,o=this.camh*s;this.canvas.style.width="".concat(r,"px"),this.canvas.style.height="".concat(o,"px"),this.canvas.style.position="absolute",this.canvas.style.left="".concat((window.innerWidth-r)/2,"px"),this.canvas.style.top="".concat((window.innerHeight-o)/2,"px"),this.inputHandler.showVirtual&&Object.values(this.inputHandler.bindings).forEach((function(t){t.virtual.render()}))},t}(),p=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new u),t.instance},t}(),d=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){for(var t=0;t<this.objects.length;t++)this.objects[t].colliders=[];for(t=0;t<this.objects.length;t++)for(var e=t+1;e<this.objects.length;e++)this.collided(this.objects[t],this.objects[e])&&(this.objects[t].colliders.push(this.objects[e]),this.objects[e].colliders.push(this.objects[t]));this.objects.map((function(t){switch(t.type){case"stop":case"standard":t.colliders.map((function(e){if("stop"===e.type){var i=t.getx(1),n=t.gety(1);i+t.w<=e.x?(t.parent.x=e.x-t.w-t._x,t.parent.xspeed=0):i>=e.x+e.w?(t.parent.x=e.x+e.w-t._x,t.parent.xspeed=0):n+t.h<=e.y?(t.parent.y=e.y-t.h-t._y,t.parent.yspeed=0):n>=e.y+e.h?(t.parent.y=e.y+e.h-t._y,t.parent.yspeed=0):(console.log("x_1: ".concat(i," x_2: ").concat(t.w," y_1: ").concat(n)),console.log(e))}}))}}))},t.prototype.collided=function(t,e){if(t.layer!==e.layer)return!1;var i=t.x<e.x+e.w&&t.x+t.w>e.x,n=t.y<e.y+e.h&&t.y+t.h>e.y;return i&&n},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),l=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new d),t.instance},t}(),f=function(){function t(t,e,i,n,o,h){this.uuid=0,this.prio=0,this.game=p.getInstance(),this.physics=new s(o?2:1),this.physics.x=t,this.physics.y=e,this.hitbox=new r(this.physics,0,0,i,n,o?"standard":"stop",0),this.hitbox.color=h,this.move=o,l.getInstance().register(this.hitbox)}return t.prototype.update=function(){var t,e,i,n,s=this.game.inputHandler;this.move&&(this.physics.recordHistory(),t="down"===s.getKeyState("ArrowUp"),e="down"===s.getKeyState("ArrowDown"),i="down"===s.getKeyState("ArrowLeft"),n="down"===s.getKeyState("ArrowRight"),this.physics.yspeed=t?-25:e?25:0,this.physics.xspeed=n?25:i?-25:0,this.physics.update())},t.prototype.render=function(){this.hitbox.render()},t}(),y=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects=[]},t.prototype.update=function(){var t=p.getInstance(),e=this.objects[this.objects.length-1];t.camx=e.x+e.w/2-t.camw/2,t.camy=e.y+e.h/2-t.camh/2},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),m=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new y),t.instance},t}(),g=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=p.getInstance().dt;this.objects.map((function(e){e.parent.yspeed<80?e.parent.yspeed+=100*t/100:e.parent.yspeed>=100&&(e.parent.yspeed-=100*t/100)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),b=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new g),t.instance},t}(),w=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=p.getInstance().canvas,e=!0;this.objects.map((function(i){i.x+i.w>t.width?i.parent.x=t.width-i.w-i._x:i.x<0&&(i.parent.x=-i._x),i.y+i.h>t.height?i.parent.y=t.height-i.h-i._y:i.y<0?i.parent.y=-i._y:e=!1,e&&(i.parent.x=0,i.parent.y=1500)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),x=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new w),t.instance},t}(),v=function(){function t(t,e){void 0===e&&(e=0),this.enabled=!1,this.game=p.getInstance(),this.time=t,this.current=e}return t.prototype.update=function(){this.enabled&&(this.current+=this.game.dt,this.current>=this.time&&(this.enabled=!1,this.current=0))},t.prototype.request=function(t,e){return!0===e&&(t||this.enabled)?(this.enabled=!1,this.current=0,!0):(t&&(this.enabled=!0,this.current=0),!1)},t.prototype.retain=function(t){return t&&(this.enabled=!0,this.current=0),t||this.enabled},t}(),j=function(){function t(t,e,i){void 0===i&&(i=0),this.callback=function(){},this.enabled=!0,this.game=p.getInstance(),this.time=e,this.current=i,this.callback=t}return t.prototype.update=function(){this.enabled||(this.current+=this.game.dt,this.current>=this.time&&(this.enabled=!0,this.current=0))},t.prototype.request=function(){this.enabled&&(this.callback(),this.enabled=!1)},t}(),_=function(){function t(){this.callback=function(){},this.enabled=!0}return t.prototype.request=function(t){return t?this.enabled&&t:(this.enabled=!0,!1)},t}(),I=function(){function t(t,e){var i=this;this.uuid=0,this.prio=0,this.headingLeft=!1,this.jumping=!1,this.falling=!1,this.headbumping=!1,this.rolling=!1,this.running=!1,this.cantmove=!1,this.onfloor=!1,this.jumpcount=0,this.runningspeed=40,this.rollspeed=60,this.jumpingForce=210,this.iddleTime=5e3,this.game=p.getInstance(),this.sprite=new n("../../../static/assets/images/main-character/","main-character"),this.physics=new s(2),this.physics.x=t,this.physics.y=e,this.printbox=new r(this.physics,0,0,64,64,"standard",0),this.hitbox=new r(this.physics,7,0,50,64,"standard",0),this.sprite.loadAnimations({stand:[0,1],toiddle:[2],fromiddle:[2],iddle:[3,4,3,4,3,4,3],tostand:[5],tostilljump:[16],stilljump:[17],torunjump:[31],runjump:[13],falling:[18],bumpfalling:[19],bumppain:[20,21,22,21,22,23,24,23,24,22,20],runfalling:[13],toprepare:[5],prepare:[6,7],torun:[8],roll:[25,26,27,28,29,30],run:[9,10,11,12,13,14,15,12]}),this.sprite.setCurAnimation("stand"),this.cooldowns={rolling:new j((function(){i.rolling=!0,i.sprite.setCurAnimation("roll"),i.hitbox._y=32,i.hitbox.h=32,i.headbumping=!1}),1200)},this.buffers={jump:new v(100),coyotetime:new v(50)},this.pressOnce={jump:new _},x.getInstance().register(this.hitbox),l.getInstance().register(this.hitbox),b.getInstance().register(this.hitbox),m.getInstance().register(this.printbox)}return t.prototype.update=function(){var t,e,i,n,s=this,r=this.game.inputHandler;this.physics.recordHistory(),Object.values(this.cooldowns).forEach((function(t){t.update()})),Object.values(this.buffers).forEach((function(t){t.update()})),t=this.pressOnce.jump.request("down"===r.getBindingState("jump")),e="down"===r.getKeyState("ArrowDown"),i="down"===r.getKeyState("ArrowLeft"),n="down"===r.getKeyState("ArrowRight"),this.physics.xspeed=0,this.running=!1,this.rolling&&!this.cantmove?this.physics.xspeed=this.headingLeft?-this.rollspeed:this.rollspeed:i&&!this.cantmove?(this.physics.xspeed-=this.runningspeed,this.headingLeft=!0,this.running=!0):n&&!this.cantmove&&(this.physics.xspeed+=this.runningspeed,this.headingLeft=!1,this.running=!0),!e||!this.running||this.cantmove||this.headbumping||this.jumping&&!this.falling||this.cooldowns.rolling.request(),this.onfloor=!1,this.hitbox.colliders.map((function(t){t.y>=s.physics.y+s.hitbox.h?s.onfloor=!0:t.y+t.h<=s.hitbox.y&&"stop"===t.type&&!s.rolling&&(s.headbumping=!0)})),this.buffers.jump.request(t,!this.cantmove&&!this.headbumping&&this.jumpcount<1&&this.buffers.coyotetime.retain(this.onfloor))?(this.physics.yspeed=-this.jumpingForce,this.jumpcount++,this.jumping=!0,this.rolling=!1,this.hitbox._y=0,this.hitbox.h=64):this.onfloor&&(this.jumping=!1,this.jumpcount=0),this.headbumping&&(this.cantmove=!0,this.sprite.setCurAnimation("bumppain"),this.hitbox._y=32,this.hitbox.h=32),this.falling=this.physics.yspeed>0&&!this.onfloor,this.handleAnimations(),this.physics.update()},t.prototype.handleAnimations=function(){if(this.running||this.jumping||this.rolling||this.falling?!this.running||this.jumping||this.rolling||this.falling||["run","torun"].includes(this.sprite.curAnimation)?this.jumping&&!this.falling?this.rolling||(this.running?["runjump","torunjump"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("torunjump"):["stilljump","tostilljump"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("tostilljump")):this.falling&&!this.rolling&&(this.headbumping?["bumpfalling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("bumpfalling"):this.running?["runfalling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("runfalling"):["falling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("falling")):this.sprite.setCurAnimation("torun"):this.sprite.animTime>this.iddleTime?this.sprite.setCurAnimation("prepare"===this.sprite.curAnimation?"tostand":"toiddle"):["prepare","toprepare","stand","tostand","toiddle","iddle","fromiddle","bumppain","roll"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("prepare"),this.sprite.update())switch(this.sprite.curAnimation){case"roll":this.sprite.setCurAnimation("prepare"),this.rolling=!1,this.hitbox._y=0,this.hitbox.h=64;break;case"toprepare":this.sprite.setCurAnimation("prepare");break;case"tostand":case"fromiddle":this.sprite.setCurAnimation("stand");break;case"iddle":this.sprite.setCurAnimation("fromiddle");break;case"torun":this.sprite.setCurAnimation("run");break;case"toiddle":this.sprite.setCurAnimation("iddle");break;case"tostilljump":this.sprite.setCurAnimation("stilljump");break;case"tosrunjump":this.sprite.setCurAnimation("runjump");break;case"bumppain":this.headbumping=!1,this.cantmove=!1,this.hitbox._y=0,this.hitbox.h=64,this.sprite.setCurAnimation("stand")}},t.prototype.render=function(){this.printbox&&this.sprite.render(this.printbox.x,this.printbox.y,this.printbox.w,this.printbox.h,this.headingLeft),this.hitbox.render()},t}(),A=(t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)},function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}),k=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return A(e,t),e.prototype.on_enter=function(){var t=p.getInstance();t.width,t.height,this.environments.push(x.getInstance()),this.environments.push(l.getInstance()),this.environments.push(b.getInstance()),this.environments.push(m.getInstance()),this.register(new I(0,1500)),this.register(new f(0,1800,800,100,!1,"blue")),this.register(new f(200,1560,80,200,!1,"blue")),this.register(new f(400,1600,200,100,!1,"blue")),this.register(new f(700,1600,160,100,!1,"blue")),this.register(new f(1e3,1500,200,100,!1,"blue")),this.register(new f(1300,1400,150,40,!1,"blue")),this.register(new f(1500,1300,150,40,!1,"blue")),this.register(new f(1700,1200,150,40,!1,"blue")),this.register(new f(1800,1100,150,40,!1,"blue")),this.register(new f(2e3,1e3,100,40,!1,"blue")),this.register(new f(2300,1e3,100,40,!1,"blue")),this.register(new f(2600,1400,300,100,!1,"blue")),this.register(new f(3e3,1300,80,200,!1,"blue")),this.register(new f(3200,1800,500,100,!1,"blue"))},e.prototype.on_exit=function(){this.clean()},e.prototype.update=function(){t.prototype.update.call(this)},e.prototype.render=function(){t.prototype.render.call(this)},e}(a);window.addEventListener("load",(function(){var t=p.getInstance();t.fsm.pushState(new k);var e=performance.now();requestAnimationFrame((function i(n){t.dt=n-e,e=n,t.update(),t.render(),requestAnimationFrame(i)}))}))})();