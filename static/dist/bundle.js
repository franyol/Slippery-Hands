(()=>{"use strict";var t,e=function(){function t(){this.showVirtual=!1,this.keys=new Map,this.keysReleased=new Map,this.touchCoords=null,document.addEventListener("keydown",this.keyDownHandler.bind(this)),document.addEventListener("keyup",this.keyUpHandler.bind(this)),document.addEventListener("touchstart",this.touchStartHandler.bind(this)),document.addEventListener("touchmove",this.touchMoveHandler.bind(this)),document.addEventListener("touchend",this.touchEndHandler.bind(this))}return t.prototype.keyDownHandler=function(t){this.keys.set(t.key,"down")},t.prototype.keyUpHandler=function(t){this.keys.set(t.key,"up"),this.keysReleased.set(t.key,!0)},t.prototype.touchStartHandler=function(t){var e=t.touches[0];this.touchCoords={x:e.clientX,y:e.clientY}},t.prototype.touchMoveHandler=function(t){var e=t.touches[0];this.touchCoords={x:e.clientX,y:e.clientY}},t.prototype.touchEndHandler=function(t){this.touchCoords=null},t.prototype.getKeyState=function(t){return this.keys.get(t)||"iddle"},t.prototype.getKeyOnce=function(t){if(!1===this.keysReleased.get(t))return"iddle";var e=this.getKeyState(t);return"down"===e&&this.keysReleased.set(t,!1),e},t.prototype.setKeyState=function(t,e){this.keys.set(t,e)},t.prototype.getTouchCoords=function(){return this.touchCoords},t}(),i=function(){function t(){this.objects=[],this.isObjsSorted=!0,this.environments=[]}return t.prototype.on_enter=function(){},t.prototype.on_exit=function(){},t.prototype.clean=function(){this.objects.length=0,this.environments.map((function(t){t.clean()})),this.environments.length=0},t.prototype.update=function(){for(var t=0,e=this.objects;t<e.length;t++)e[t].update();for(var i=0,n=this.environments;i<n.length;i++)n[i].update()},t.prototype.render=function(){this.isObjsSorted||(this.objects.sort((function(t,e){return t.prio-e.prio})),this.isObjsSorted=!0);for(var t=0,e=this.objects;t<e.length;t++)e[t].render()},t.prototype.register=function(t){0===t.uuid&&(t.uuid=this.objects.length),this.objects.push(t),this.isObjsSorted=!1},t.prototype.deregister=function(t){this.objects="number"==typeof t?this.objects.filter((function(e){return e.uuid!==t})):this.objects.filter((function(e){return e!==t}))},t}(),n=function(){function t(){this.states=[]}return t.prototype.pushState=function(t){t.on_enter(),this.states.push(t)},t.prototype.popState=function(){this.states.length>0&&this.states.pop().on_exit()},t.prototype.getCurState=function(){return this.states[this.states.length-1]},t.prototype.update=function(){this.states.length>0&&this.states[this.states.length-1].update()},t.prototype.render=function(){for(var t=0,e=this.states;t<e.length;t++)e[t].render()},t}(),s=function(){function t(){this.dt=0,this.fsm=new n,this.inputHandler=new e,this.width=4e3,this.height=4e3,this.camx=0,this.camy=0,this._camsize=50,this.camw=16*this._camsize,this.camh=9*this._camsize,this.canvas=document.getElementById("game-screen"),this.uicanvas=document.getElementById("ui-layer")}return Object.defineProperty(t.prototype,"camsize",{set:function(t){this._camsize=t,this.camw=16*t,this.camh=9*t},enumerable:!1,configurable:!0}),t.prototype.update=function(){this.canvas.width=this.width,this.canvas.height=this.height,this.fsm.update()},t.prototype.render=function(){var t=this.canvas.getContext("2d");t.imageSmoothingEnabled=!1,t.clearRect(0,0,this.canvas.width,this.canvas.height),t.save(),t.setTransform(this.canvas.width/this.camw,0,0,this.canvas.height/this.camh,-this.camx*(this.canvas.width/this.camw),-this.camy*(this.canvas.height/this.camh)),t.fillStyle="yellow",t.fillRect(0,0,this.canvas.width,this.canvas.height),this.fsm.render(),t.restore();var e=window.innerWidth/this.camw,i=window.innerHeight/this.camh,n=Math.min(e,i),s=this.camw*n,r=this.camh*n;this.canvas.style.width="".concat(s,"px"),this.canvas.style.height="".concat(r,"px"),this.canvas.style.position="absolute",this.canvas.style.left="".concat((window.innerWidth-s)/2,"px"),this.canvas.style.top="".concat((window.innerHeight-r)/2,"px")},t}(),r=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new s),t.instance},t}(),o=function(){function t(t){this._xspeed=[],this._yspeed=[],this._x=[],this._y=[],this.n=t;for(var e=0;e<this.n;e++)this._xspeed.push(0),this._yspeed.push(0),this._x.push(0),this._y.push(0)}return t.prototype.recordHistory=function(){for(var t=0;t<this.n-1;t++)this._x[t]=this._x[t+1],this._y[t]=this._y[t+1],this._xspeed[t]=this._xspeed[t+1],this._yspeed[t]=this._yspeed[t+1]},t.prototype.update=function(){var t=r.getInstance().dt;this.x+=this.xspeed*t/100,this.y+=this.yspeed*t/100},Object.defineProperty(t.prototype,"x",{get:function(){return this._x[this.n-1]},set:function(t){this._x[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"xspeed",{get:function(){return this._xspeed[this.n-1]},set:function(t){this._xspeed[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y[this.n-1]},set:function(t){this._y[this.n-1]=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"yspeed",{get:function(){return this._yspeed[this.n-1]},set:function(t){this._yspeed[this.n-1]=t},enumerable:!1,configurable:!0}),t}(),h=function(){function t(t,e,i,n,s,r,o){void 0===r&&(r="standard"),void 0===o&&(o=0),this.color="pink",this.parent=t,this._x=e,this._y=i,this.w=n,this.h=s,this.colliders=[],this.type=r,this.layer=o}return Object.defineProperty(t.prototype,"x",{get:function(){return this._x+this.parent.x},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y+this.parent.y},enumerable:!1,configurable:!0}),t.prototype.getx=function(t){return t>=this.parent.n?this.x:this._x+this.parent._x[this.parent.n-1-t]},t.prototype.gety=function(t){return t>=this.parent.n?this.y:this._y+this.parent._y[this.parent.n-1-t]},t.prototype.render=function(){var t=r.getInstance().canvas.getContext("2d");t.strokeStyle=this.color,t.lineWidth=2,t.strokeRect(this.x,this.y,this.w,this.h)},t}(),a=function(){function t(t,e,i){void 0===i&&(i=0),this.callback=function(){},this.enabled=!0,this.game=r.getInstance(),this.time=e,this.current=i,this.callback=t}return t.prototype.update=function(){this.enabled||(this.current+=this.game.dt,this.current>=this.time&&(this.enabled=!0,this.current=0))},t.prototype.request=function(){this.enabled&&(this.callback(),this.enabled=!1)},t}(),c=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){for(var t=0;t<this.objects.length;t++)this.objects[t].colliders=[];for(t=0;t<this.objects.length;t++)for(var e=t+1;e<this.objects.length;e++)this.collided(this.objects[t],this.objects[e])&&(this.objects[t].colliders.push(this.objects[e]),this.objects[e].colliders.push(this.objects[t]));this.objects.map((function(t){switch(t.type){case"stop":case"standard":t.colliders.map((function(e){if("stop"===e.type){var i=t.getx(1),n=t.gety(1);i+t.w<=e.x?(t.parent.x=e.x-t.w-t._x,t.parent.xspeed=0):i>=e.x+e.w?(t.parent.x=e.x+e.w-t._x,t.parent.xspeed=0):n+t.h<=e.y?(t.parent.y=e.y-t.h-t._y,t.parent.yspeed=0):n>=e.y+e.h?(t.parent.y=e.y+e.h-t._y,t.parent.yspeed=0):(console.log("x_1: ".concat(i," x_2: ").concat(t.w," y_1: ").concat(n)),console.log(e))}}))}}))},t.prototype.collided=function(t,e){if(t.layer!==e.layer)return!1;var i=t.x<e.x+e.w&&t.x+t.w>e.x,n=t.y<e.y+e.h&&t.y+t.h>e.y;return i&&n},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),u=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new c),t.instance},t}(),p=function(){function t(t,e,i,n,s,a){this.uuid=0,this.prio=0,this.game=r.getInstance(),this.physics=new o(s?2:1),this.physics.x=t,this.physics.y=e,this.hitbox=new h(this.physics,0,0,i,n,s?"standard":"stop",0),this.hitbox.color=a,this.move=s,u.getInstance().register(this.hitbox)}return t.prototype.update=function(){var t=this.game.inputHandler;if(this.move){this.physics.recordHistory();var e=t.getTouchCoords(),i=void 0,n=void 0,s=void 0,r=void 0;i="down"===t.getKeyState("ArrowUp"),e?(console.log(e),i=e.y<this.game.canvas.height/4,n=e.y>3*this.game.canvas.height/4,s=e.x<this.game.canvas.width/4,r=e.x>3*this.game.canvas.width/4):(i="down"===t.getKeyState("ArrowUp"),n="down"===t.getKeyState("ArrowDown"),s="down"===t.getKeyState("ArrowLeft"),r="down"===t.getKeyState("ArrowRight")),this.physics.yspeed=i?-25:n?25:0,this.physics.xspeed=r?25:s?-25:0,this.physics.update()}},t.prototype.render=function(){this.hitbox.render()},t}(),d=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects=[]},t.prototype.update=function(){var t=r.getInstance(),e=this.objects[this.objects.length-1];t.camx=e.x+e.w/2-t.camw/2,t.camy=e.y+e.h/2-t.camh/2},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),l=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new d),t.instance},t}(),f=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=r.getInstance().dt;this.objects.map((function(e){e.parent.yspeed<80?e.parent.yspeed+=100*t/100:e.parent.yspeed>=100&&(e.parent.yspeed-=100*t/100)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),y=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new f),t.instance},t}(),m=function(){function t(){this.objects=[]}return t.prototype.clean=function(){this.objects.length=0},t.prototype.update=function(){var t=r.getInstance().canvas,e=!0;this.objects.map((function(i){i.x+i.w>t.width?i.parent.x=t.width-i.w-i._x:i.x<0&&(i.parent.x=-i._x),i.y+i.h>t.height?i.parent.y=t.height-i.h-i._y:i.y<0?i.parent.y=-i._y:e=!1,e&&(i.parent.x=0,i.parent.y=1500)}))},t.prototype.register=function(t){this.objects.push(t)},t.prototype.deregister=function(t){this.objects=this.objects.filter((function(e){return e!==t}))},t}(),g=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new m),t.instance},t}(),b=function(t,e,i,n){return new(i||(i=Promise))((function(s,r){function o(t){try{a(n.next(t))}catch(t){r(t)}}function h(t){try{a(n.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,h)}a((n=n.apply(t,e||[])).next())}))},w=function(t,e){var i,n,s,r={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]},o=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return o.next=h(0),o.throw=h(1),o.return=h(2),"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function h(h){return function(a){return function(h){if(i)throw new TypeError("Generator is already executing.");for(;o&&(o=0,h[0]&&(r=0)),r;)try{if(i=1,n&&(s=2&h[0]?n.return:h[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,h[1])).done)return s;switch(n=0,s&&(h=[2&h[0],s.value]),h[0]){case 0:case 1:s=h;break;case 4:return r.label++,{value:h[1],done:!1};case 5:r.label++,n=h[1],h=[0];continue;case 7:h=r.ops.pop(),r.trys.pop();continue;default:if(!((s=(s=r.trys).length>0&&s[s.length-1])||6!==h[0]&&2!==h[0])){r=0;continue}if(3===h[0]&&(!s||h[1]>s[0]&&h[1]<s[3])){r.label=h[1];break}if(6===h[0]&&r.label<s[1]){r.label=s[1],s=h;break}if(s&&r.label<s[2]){r.label=s[2],r.ops.push(h);break}s[2]&&r.ops.pop(),r.trys.pop();continue}h=e.call(t,r)}catch(t){h=[6,t],n=0}finally{i=s=0}if(5&h[0])throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}([h,a])}}},v=function(){function t(t,e){this.animations={},this.animTime=0,this.animIdx=0,this.frameTime=0,this.dir=t,this.name=e,this.image=new Image,this.data={frames:new Map},this.current=0,this.imgLoaded=!1,this.dataLoaded=!1,this.loadImage(t+e+".png"),this.loadData(t+e+".json")}return t.prototype.loadImage=function(t){var e=this;this.image.src=t,this.image.onload=function(){e.imgLoaded=!0}},t.prototype.loadData=function(t){return b(this,void 0,void 0,(function(){var e,i=this;return w(this,(function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),[4,fetch(t)];case 1:return[4,n.sent().json()];case 2:return e=n.sent(),Object.entries(e.frames).forEach((function(t){var e=t[0],n=t[1];i.data.frames.set(e,n)})),this.dataLoaded=!0,[3,4];case 3:return n.sent(),[3,4];case 4:return[2]}}))}))},t.prototype.loadAnimations=function(t){this.animations=t},t.prototype.setCurrentFrame=function(t){var e="".concat(this.name," ").concat(t,".aseprite");this.data.frames.has(e)&&(this.current=t)},t.prototype.getCurrentFrameData=function(){var t="".concat(this.name," ").concat(this.current,".aseprite");return this.data.frames.get(t)},t.prototype.isReady=function(){return this.imgLoaded&&this.dataLoaded},t.prototype.waitUntilReady=function(){return b(this,void 0,void 0,(function(){return w(this,(function(t){switch(t.label){case 0:return this.isReady()?[3,2]:[4,new Promise((function(t){return setTimeout(t,10)}))];case 1:return t.sent(),[3,0];case 2:return[2]}}))}))},t.prototype.setCurAnimation=function(t){t in this.animations&&t!==this.curAnimation&&(this.curAnimation=t,this.animIdx=0,this.animTime=0,this.frameTime=0,this.current=this.animations[t][0])},t.prototype.update=function(){if(this.isReady()){var t=r.getInstance();if(this.animTime+=t.dt,this.frameTime+=t.dt,this.curAnimation){var e=this.getCurrentFrameData();if(this.frameTime>e.duration){if(this.frameTime=0,this.animIdx++,this.animIdx>=this.animations[this.curAnimation].length)return this.animIdx=0,this.current=this.animations[this.curAnimation][this.animIdx],!0;this.current=this.animations[this.curAnimation][this.animIdx]}}return!1}},t.prototype.render=function(t,e,i,n,s,o){var h;void 0===s&&(s=!1),void 0===o&&(o=!1);var a=r.getInstance().canvas.getContext("2d"),c=null===(h=this.getCurrentFrameData())||void 0===h?void 0:h.frame;c&&this.isReady()&&(a.save(),a.translate(t+i/2,e+n/2),a.scale(s?-1:1,o?-1:1),a.drawImage(this.image,c.x,c.y,c.w,c.h,-i/2,-n/2,i,n),a.restore())},t}(),x=function(){function t(t,e){var i=this;this.uuid=0,this.prio=0,this.headingLeft=!1,this.jumping=!1,this.falling=!1,this.headbumping=!1,this.rolling=!1,this.running=!1,this.cantmove=!1,this.onfloor=!1,this.runningspeed=40,this.rollspeed=60,this.jumpingForce=210,this.iddleTime=5e3,this.game=r.getInstance(),this.sprite=new v("../../../static/assets/images/main-character/","main-character"),this.physics=new o(2),this.physics.x=t,this.physics.y=e,this.printbox=new h(this.physics,0,0,64,64,"standard",0),this.hitbox=new h(this.physics,7,0,50,64,"standard",0),this.sprite.loadAnimations({stand:[0,1],toiddle:[2],fromiddle:[2],iddle:[3,4,3,4,3,4,3],tostand:[5],tostilljump:[16],stilljump:[17],torunjump:[31],runjump:[13],falling:[18],bumpfalling:[19],bumppain:[20,21,22,21,22,23,24,23,24,22,20],runfalling:[13],toprepare:[5],prepare:[6,7],torun:[8],roll:[25,26,27,28,29,30],run:[9,10,11,12,13,14,15,12]}),this.sprite.setCurAnimation("stand"),this.cooldowns={rolling:new a((function(){i.rolling=!0,i.sprite.setCurAnimation("roll"),i.hitbox._y=32,i.hitbox.h=32,i.headbumping=!1}),1200)},g.getInstance().register(this.hitbox),u.getInstance().register(this.hitbox),y.getInstance().register(this.hitbox),l.getInstance().register(this.printbox)}return t.prototype.update=function(){var t=this,e=this.game.inputHandler;this.physics.recordHistory(),Object.values(this.cooldowns).forEach((function(t){t.update()}));var i,n,s,r,o=e.getTouchCoords();o?(i=o.y<window.innerHeight/4,n=o.y>3*window.innerHeight/4,s=o.x<window.innerWidth/4,r=o.x>3*window.innerWidth/4):(i="down"===e.getKeyOnce("ArrowUp"),n="down"===e.getKeyState("ArrowDown"),s="down"===e.getKeyState("ArrowLeft"),r="down"===e.getKeyState("ArrowRight")),this.physics.xspeed=0,this.running=!1,this.rolling&&!this.cantmove?this.physics.xspeed=this.headingLeft?-this.rollspeed:this.rollspeed:s&&!this.cantmove?(this.physics.xspeed-=this.runningspeed,this.headingLeft=!0,this.running=!0):r&&!this.cantmove&&(this.physics.xspeed+=this.runningspeed,this.headingLeft=!1,this.running=!0),!n||!this.running||this.cantmove||this.headbumping||this.jumping&&!this.falling||this.cooldowns.rolling.request(),this.onfloor=!1,this.hitbox.colliders.map((function(e){e.y>=t.physics.y+t.hitbox.h?t.onfloor=!0:e.y+e.h<=t.hitbox.y&&"stop"===e.type&&!t.rolling&&(t.headbumping=!0)})),i&&!this.cantmove&&!this.headbumping&&this.onfloor?(this.physics.yspeed-=this.jumpingForce,this.jumping=!0,this.rolling=!1,this.hitbox._y=0,this.hitbox.h=64):this.onfloor?this.jumping=!1:this.jumping=!0,this.headbumping&&(this.cantmove=!0,this.sprite.setCurAnimation("bumppain")),this.falling=this.jumping&&this.physics.yspeed>0,this.handleAnimations(),this.physics.update()},t.prototype.handleAnimations=function(){if(this.running||this.jumping||this.rolling?!this.running||this.jumping||this.rolling||["run","torun"].includes(this.sprite.curAnimation)?this.jumping&&(this.falling&&!this.rolling?this.headbumping?["bumpfalling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("bumpfalling"):this.running?["runfalling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("runfalling"):["falling"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("falling"):this.rolling||(this.running?["runjump","torunjump"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("torunjump"):["stilljump","tostilljump"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("tostilljump"))):this.sprite.setCurAnimation("torun"):this.sprite.animTime>this.iddleTime?this.sprite.setCurAnimation("prepare"===this.sprite.curAnimation?"tostand":"toiddle"):["prepare","toprepare","stand","tostand","toiddle","iddle","fromiddle","bumppain","roll"].includes(this.sprite.curAnimation)||this.sprite.setCurAnimation("prepare"),this.sprite.update())switch(this.sprite.curAnimation){case"roll":this.sprite.setCurAnimation("prepare"),this.rolling=!1,this.hitbox._y=0,this.hitbox.h=64;break;case"toprepare":this.sprite.setCurAnimation("prepare");break;case"tostand":case"fromiddle":this.sprite.setCurAnimation("stand");break;case"iddle":this.sprite.setCurAnimation("fromiddle");break;case"torun":this.sprite.setCurAnimation("run");break;case"toiddle":this.sprite.setCurAnimation("iddle");break;case"tostilljump":this.sprite.setCurAnimation("stilljump");break;case"tosrunjump":this.sprite.setCurAnimation("runjump");break;case"bumppain":this.headbumping=!1,this.cantmove=!1,this.sprite.setCurAnimation("stand")}},t.prototype.render=function(){this.printbox&&this.sprite.render(this.printbox.x,this.printbox.y,this.printbox.w,this.printbox.h,this.headingLeft),this.hitbox.render()},t}(),j=(t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)},function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}),_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return j(e,t),e.prototype.on_enter=function(){var t=r.getInstance();t.width,t.height,this.environments.push(g.getInstance()),this.environments.push(u.getInstance()),this.environments.push(y.getInstance()),this.environments.push(l.getInstance()),this.register(new x(0,1500)),this.register(new p(0,1800,800,100,!1,"blue")),this.register(new p(200,1560,80,200,!1,"blue")),this.register(new p(400,1600,200,100,!1,"blue")),this.register(new p(700,1600,160,100,!1,"blue")),this.register(new p(1e3,1500,200,100,!1,"blue")),this.register(new p(1300,1400,150,40,!1,"blue")),this.register(new p(1500,1300,150,40,!1,"blue")),this.register(new p(1700,1200,150,40,!1,"blue")),this.register(new p(1800,1100,150,40,!1,"blue")),this.register(new p(2e3,1e3,100,40,!1,"blue")),this.register(new p(2300,1e3,100,40,!1,"blue")),this.register(new p(2600,1400,300,100,!1,"blue")),this.register(new p(3e3,1300,80,200,!1,"blue")),this.register(new p(3200,1800,500,100,!1,"blue"))},e.prototype.on_exit=function(){this.clean()},e.prototype.update=function(){t.prototype.update.call(this)},e.prototype.render=function(){t.prototype.render.call(this)},e}(i);window.addEventListener("load",(function(){var t=r.getInstance();t.fsm.pushState(new _);var e=performance.now();requestAnimationFrame((function i(n){t.dt=n-e,e=n,t.update(),t.render(),requestAnimationFrame(i)}))}))})();