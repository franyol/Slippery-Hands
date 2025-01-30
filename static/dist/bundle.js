(()=>{"use strict";var t,e=function(){function t(){this.keys=new Map,this.keysReleased=new Map,this.touchCoords=null,document.addEventListener("keydown",this.keyDownHandler.bind(this)),document.addEventListener("keyup",this.keyUpHandler.bind(this)),document.addEventListener("touchstart",this.touchStartHandler.bind(this)),document.addEventListener("touchmove",this.touchMoveHandler.bind(this)),document.addEventListener("touchend",this.touchEndHandler.bind(this))}return t.prototype.keyDownHandler=function(t){this.keys.set(t.key,"down")},t.prototype.keyUpHandler=function(t){this.keys.set(t.key,"up"),this.keysReleased.set(t.key,!0)},t.prototype.touchStartHandler=function(t){var e=t.touches[0];this.touchCoords={x:e.clientX,y:e.clientY}},t.prototype.touchMoveHandler=function(t){var e=t.touches[0];this.touchCoords={x:e.clientX,y:e.clientY}},t.prototype.touchEndHandler=function(t){this.touchCoords=null},t.prototype.getKeyState=function(t){return this.keys.get(t)||"iddle"},t.prototype.getKeyOnce=function(t){if(!1===this.keysReleased.get(t))return"iddle";var e=this.getKeyState(t);return"down"===e&&this.keysReleased.set(t,!1),e},t.prototype.setKeyState=function(t,e){this.keys.set(t,e)},t.prototype.getTouchCoords=function(){return this.touchCoords},t}(),n=function(){function t(){this.objects=[],this.isObjsSorted=!0,this.environments=[]}return t.prototype.on_enter=function(){},t.prototype.on_exit=function(){},t.prototype.clean=function(){this.objects.length=0,this.environments.map((function(t){t.clean()})),this.environments.length=0},t.prototype.update=function(){for(var t=0,e=this.objects;t<e.length;t++)e[t].update();for(var n=0,i=this.environments;n<i.length;n++)i[n].update()},t.prototype.render=function(){this.isObjsSorted||(this.objects.sort((function(t,e){return t.prio-e.prio})),this.isObjsSorted=!0);for(var t=0,e=this.objects;t<e.length;t++)e[t].render()},t.prototype.register=function(t){0===t.uuid&&(t.uuid=this.objects.length),this.objects.push(t),this.isObjsSorted=!1},t.prototype.deregister=function(t){this.objects="number"==typeof t?this.objects.filter((function(e){return e.uuid!==t})):this.objects.filter((function(e){return e!==t}))},t}(),i=function(){function t(){this.states=[]}return t.prototype.pushState=function(t){t.on_enter(),this.states.push(t)},t.prototype.popState=function(){this.states.length>0&&this.states.pop().on_exit()},t.prototype.getCurState=function(){return this.states[this.states.length-1]},t.prototype.update=function(){this.states.length>0&&this.states[this.states.length-1].update()},t.prototype.render=function(){for(var t=0,e=this.states;t<e.length;t++)e[t].render()},t}(),s=function(){function t(){this.dt=0,this.fsm=new i,this.inputHandler=new e,this.width=1080,this.height=720,this.camx=0,this.camy=0,this.camw=540,this.camh=360,this.canvas=document.getElementById("game-screen"),this.uicanvas=document.getElementById("ui-layer")}return t.prototype.update=function(){this.canvas.width=this.width,this.canvas.height=this.height,this.fsm.update()},t.prototype.render=function(){var t=this.canvas.getContext("2d");t.imageSmoothingEnabled=!1,t.clearRect(0,0,this.canvas.width,this.canvas.height),t.save(),t.setTransform(this.canvas.width/this.camw,0,0,this.canvas.height/this.camh,-this.camx*(this.canvas.width/this.camw),-this.camy*(this.canvas.height/this.camh)),t.fillStyle="yellow",t.fillRect(0,0,this.canvas.width,this.canvas.height),this.fsm.render(),t.restore();var e=window.innerWidth/this.camw,n=window.innerHeight/this.camh,i=Math.min(e,n),s=this.camw*i,r=this.camh*i;this.canvas.style.width="".concat(s,"px"),this.canvas.style.height="".concat(r,"px"),this.canvas.style.position="absolute",this.canvas.style.left="".concat((window.innerWidth-s)/2,"px"),this.canvas.style.top="".concat((window.innerHeight-r)/2,"px")},t}(),r=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new s),t.instance},t}(),o=function(){function t(t){this._xspeed=[],this._yspeed=[],this._x=[],this._y=[],this.n=t;for(var e=0;e<this.n;e++)this._xspeed.push(0),this._yspeed.push(0),this._x.push(0),this._y.push(0)}return t.prototype.recordHistory=function(){for(var t=0;t<this.n-1;t++)this._x[t]=this._x[t+1],this._y[t]=this._y[t+1],this._xspeed[t]=this._xspeed[t+1],this._yspeed[t]=this._yspeed[t+1]},t.prototype.update=function(){var t=r.getInstance().dt;this.x+=this.xspeed*t/100,this.y+=this.yspeed*t/100},Object.defineProperty(t.prototype,"x",{get:function(){return this._x[this.n-1]},set:function(t){this._x[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"xspeed",{get:function(){return this._xspeed[this.n-1]},set:function(t){this._xspeed[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y[this.n-1]},set:function(t){this._y[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"yspeed",{get:function(){return this._yspeed[this.n-1]},set:function(t){this._yspeed[this.n-1]=t},enumerable:!1,configurable:!0}),t}(),a=function(){function t(t,e,n,i,s,r,o){void 0===r&&(r="standard"),void 0===o&&(o=0),this.color="pink",this.parent=t,this._x=e,this._y=n,this.w=i,this.h=s,this.colliders=[],this.type=r,this.layer=o}return Object.defineProperty(t.prototype,"x",{get:function(){return this._x+this.parent.x},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y+this.parent.y},enumerable:!1,configurable:!0}),t.prototype.getx=function(t){return t>=this.parent.n?this.x:this._x+this.parent._x[this.parent.n-1-t]},t.prototype.gety=function(t){return t>=this.parent.n?this.y:this._y+this.parent._y[this.parent.n-1-t]},t.prototype.render=function(){var t=r.getInstance().canvas.getContext("2d");t.strokeStyle=this.color,t.lineWidth=2,t.strokeRect(this.x,this.y,this.w,this.h)},t}(),h=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){for(var t=0;t<this.objects.length;t++)this.objects[t].colliders=[];for(t=0;t<this.objects.length;t++)for(var e=t+1;e<this.objects.length;e++)this.collided(this.objects[t],this.objects[e])&&(this.objects[t].colliders.push(this.objects[e]),this.objects[e].colliders.push(this.objects[t]));this.objects.map((function(t){switch(t.type){case"stop":case"standard":t.colliders.map((function(e){if("stop"===e.type){var n=t.getx(1),i=t.gety(1);n+t.w<=e.x?(t.parent.x=e.x-t.w-t._x,t.parent.xspeed=0):n>=e.x+e.w?(t.parent.x=e.x+e.w-t._x,t.parent.xspeed=0):i+t.h<=e.y?(t.parent.y=e.y-t.h-t._y,t.parent.yspeed=0):i>=e.y+e.h?(t.parent.y=e.y+e.h-t._y,t.parent.yspeed=0):(console.log("x_1: ".concat(n," x_2: ").concat(t.w," y_1: ").concat(i)),console.log(e))}}))}}))},t.prototype.collided=function(t,e){if(t.layer!==e.layer)return!1;var n=t.x<e.x+e.w&&t.x+t.w>e.x,i=t.y<e.y+e.h&&t.y+t.h>e.y;return n&&i},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),c=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new h),t.instance},t}(),u=function(){function t(t,e,n,i,s,h){this.uuid=0,this.prio=0,this.game=r.getInstance(),this.physics=new o(s?2:1),this.physics.x=t,this.physics.y=e,this.hitbox=new a(this.physics,0,0,n,i,s?"standard":"stop",0),this.hitbox.color=h,this.move=s,c.getInstance().register(this.hitbox)}return t.prototype.update=function(){var t=this.game.inputHandler;if(this.move){this.physics.recordHistory();var e=t.getTouchCoords(),n=void 0,i=void 0,s=void 0,r=void 0;n="down"===t.getKeyState("ArrowUp"),e?(console.log(e),n=e.y<this.game.canvas.height/4,i=e.y>3*this.game.canvas.height/4,s=e.x<this.game.canvas.width/4,r=e.x>3*this.game.canvas.width/4):(n="down"===t.getKeyState("ArrowUp"),i="down"===t.getKeyState("ArrowDown"),s="down"===t.getKeyState("ArrowLeft"),r="down"===t.getKeyState("ArrowRight")),this.physics.yspeed=n?-25:i?25:0,this.physics.xspeed=r?25:s?-25:0,this.physics.update()}},t.prototype.render=function(){this.hitbox.render()},t}(),p=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects=[]},t.prototype.update=function(){var t=r.getInstance(),e=this.objects[this.objects.length-1];t.camx=e.x+e.w/2-t.camw/2,t.camy=e.y+e.h/2-t.camh/2},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),d=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new p),t.instance},t}(),y=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=r.getInstance().dt;this.objects.map((function(e){e.parent.yspeed<80?e.parent.yspeed+=100*t/100:e.parent.yspeed>=100&&(e.parent.yspeed-=100*t/100)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),f=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new y),t.instance},t}(),l=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=r.getInstance().canvas;this.objects.map((function(e){e.x+e.w>t.width?e.parent.x=t.width-e.w-e._x:e.x<0&&(e.parent.x=-e._x),e.y+e.h>t.height?e.parent.y=t.height-e.h-e._y:e.y<0&&(e.parent.y=-e._y)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),g=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new l),t.instance},t}(),m=function(t,e,n,i){return new(n||(n=Promise))((function(s,r){function o(t){try{h(i.next(t))}catch(t){r(t)}}function a(t){try{h(i.throw(t))}catch(t){r(t)}}function h(t){var e;t.done?s(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(o,a)}h((i=i.apply(t,e||[])).next())}))},w=function(t,e){var n,i,s,r={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},o=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return o.next=a(0),o.throw=a(1),o.return=a(2),"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(h){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(r=0)),r;)try{if(n=1,i&&(s=2&a[0]?i.return:a[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,a[1])).done)return s;switch(i=0,s&&(a=[2&a[0],s.value]),a[0]){case 0:case 1:s=a;break;case 4:return r.label++,{value:a[1],done:!1};case 5:r.label++,i=a[1],a=[0];continue;case 7:a=r.ops.pop(),r.trys.pop();continue;default:if(!((s=(s=r.trys).length>0&&s[s.length-1])||6!==a[0]&&2!==a[0])){r=0;continue}if(3===a[0]&&(!s||a[1]>s[0]&&a[1]<s[3])){r.label=a[1];break}if(6===a[0]&&r.label<s[1]){r.label=s[1],s=a;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(a);break}s[2]&&r.ops.pop(),r.trys.pop();continue}a=e.call(t,r)}catch(t){a=[6,t],i=0}finally{n=s=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,h])}}},b=function(){function t(t,e){this.animations={},this.animTime=0,this.animIdx=0,this.frameTime=0,this.dir=t,this.name=e,this.image=new Image,this.data={frames:new Map},this.current=0,this.imgLoaded=!1,this.dataLoaded=!1,this.loadImage(t+e+".png"),this.loadData(t+e+".json")}return t.prototype.loadImage=function(t){var e=this;this.image.src=t,this.image.onload=function(){e.imgLoaded=!0}},t.prototype.loadData=function(t){return m(this,void 0,void 0,(function(){var e,n=this;return w(this,(function(i){switch(i.label){case 0:return i.trys.push([0,3,,4]),[4,fetch(t)];case 1:return[4,i.sent().json()];case 2:return e=i.sent(),Object.entries(e.frames).forEach((function(t){var e=t[0],i=t[1];n.data.frames.set(e,i)})),this.dataLoaded=!0,[3,4];case 3:return i.sent(),[3,4];case 4:return[2]}}))}))},t.prototype.loadAnimations=function(t){this.animations=t},t.prototype.setCurrentFrame=function(t){var e="".concat(this.name," ").concat(t,".aseprite");this.data.frames.has(e)&&(this.current=t)},t.prototype.getCurrentFrameData=function(){var t="".concat(this.name," ").concat(this.current,".aseprite");return this.data.frames.get(t)},t.prototype.isReady=function(){return this.imgLoaded&&this.dataLoaded},t.prototype.waitUntilReady=function(){return m(this,void 0,void 0,(function(){return w(this,(function(t){switch(t.label){case 0:return this.isReady()?[3,2]:[4,new Promise((function(t){return setTimeout(t,10)}))];case 1:return t.sent(),[3,0];case 2:return[2]}}))}))},t.prototype.setCurAnimation=function(t){t in this.animations&&t!==this.curAnimation&&(this.curAnimation=t,this.animIdx=0,this.animTime=0,this.frameTime=0,this.current=this.animations[t][0])},t.prototype.update=function(){if(this.isReady()){var t=r.getInstance();if(this.animTime+=t.dt,this.frameTime+=t.dt,this.curAnimation){var e=this.getCurrentFrameData();if(this.frameTime>e.duration){if(this.frameTime=0,this.animIdx++,this.animIdx>=this.animations[this.curAnimation].length)return this.animIdx=0,this.current=this.animations[this.curAnimation][this.animIdx],!0;this.current=this.animations[this.curAnimation][this.animIdx]}}return!1}},t.prototype.render=function(t,e,n,i,s,o){var a;void 0===s&&(s=!1),void 0===o&&(o=!1);var h=r.getInstance().canvas.getContext("2d"),c=null===(a=this.getCurrentFrameData())||void 0===a?void 0:a.frame;c&&this.isReady()&&(h.save(),h.translate(t+n/2,e+i/2),h.scale(s?-1:1,o?-1:1),h.drawImage(this.image,c.x,c.y+1,c.w,c.h-1,-n/2,-i/2,n,i),h.restore())},t}(),x=function(){function t(t,e){this.uuid=0,this.prio=0,this.headingLeft=!1,this.runningspeed=40,this.jumpingForce=210,this.iddleTime=5e3,this.game=r.getInstance(),this.sprite=new b("../../../static/assets/images/main-character/","main-character"),this.physics=new o(2),this.physics.x=t,this.physics.y=e,this.printbox=new a(this.physics,0,0,64,64,"standard",0),this.hitbox=new a(this.physics,7,0,50,64,"standard",0),this.sprite.loadAnimations({stand:[0,1],toiddle:[2],iddle:[3,4,3,4,3,4,3],tostand:[5],toprepare:[5],prepare:[6,7],torun:[8],run:[9,10,11,12,13,14,15,12]}),this.sprite.setCurAnimation("stand"),g.getInstance().register(this.hitbox),c.getInstance().register(this.hitbox),f.getInstance().register(this.hitbox),d.getInstance().register(this.printbox)}return t.prototype.update=function(){var t=this,e=this.game.inputHandler;this.physics.recordHistory();var n,i,s,r=e.getTouchCoords();r?(n=r.y<window.innerHeight/4,r.y,window.innerHeight,i=r.x<window.innerWidth/4,s=r.x>3*window.innerWidth/4):(n="down"===e.getKeyOnce("ArrowUp"),e.getKeyState("ArrowDown"),i="down"===e.getKeyState("ArrowLeft"),s="down"===e.getKeyState("ArrowRight")),this.physics.xspeed=0,i?(this.physics.xspeed-=this.runningspeed,this.headingLeft=!0):s&&(this.physics.xspeed+=this.runningspeed,this.headingLeft=!1),this.hitbox.colliders.map((function(e){e.y>=t.physics.y+t.hitbox.h&&n&&(t.physics.yspeed-=t.jumpingForce)})),this.handleAnimations(),this.physics.update()},t.prototype.handleAnimations=function(){if(0===this.physics.xspeed?this.sprite.animTime>this.iddleTime?this.sprite.setCurAnimation("prepare"===this.sprite.curAnimation?"tostand":"toiddle"):["prepare","toprepare","stand","tostand","toiddle","iddle"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("prepare"):0===this.physics.xspeed||["run","torun"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("torun"),this.sprite.update())switch(this.sprite.curAnimation){case"toprepare":this.sprite.setCurAnimation("prepare");break;case"tostand":case"iddle":this.sprite.setCurAnimation("stand");break;case"torun":this.sprite.setCurAnimation("run");break;case"toiddle":this.sprite.setCurAnimation("iddle")}},t.prototype.render=function(){this.printbox&&this.sprite.render(this.printbox.x,this.printbox.y,this.printbox.w,this.printbox.h,this.headingLeft)},t}(),v=(t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}),j=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return v(e,t),e.prototype.on_enter=function(){var t=r.getInstance(),e=t.width,n=t.height;this.environments.push(g.getInstance()),this.environments.push(c.getInstance()),this.environments.push(f.getInstance()),this.environments.push(d.getInstance()),this.register(new x(e/2,0)),this.register(new u(e/4+200,3*n/5-40,40,40,!1,"red")),this.register(new u(e/4,3*n/5,e/2,40,!1,"blue")),this.register(new u(e/4-60,3*n/5+90,40,40,!1,"red")),this.register(new u(0,4*n/5+100,e,10,!1,"green"))},e.prototype.on_exit=function(){this.clean()},e.prototype.update=function(){t.prototype.update.call(this)},e.prototype.render=function(){t.prototype.render.call(this)},e}(n);window.addEventListener("load",(function(){var t=r.getInstance();t.fsm.pushState(new j);var e=performance.now();requestAnimationFrame((function n(i){t.dt=i-e,e=i,t.update(),t.render(),requestAnimationFrame(n)}))}))})();