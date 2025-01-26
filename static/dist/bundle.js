(()=>{"use strict";var t,e=function(){function t(){this.objects=[],this.isObjsSorted=!0,this.environments=[]}return t.prototype.on_enter=function(){},t.prototype.on_exit=function(){},t.prototype.clean=function(){this.objects.length=0,this.environments.length=0},t.prototype.update=function(){for(var t=0,e=this.objects;t<e.length;t++)e[t].update();for(var n=0,o=this.environments;n<o.length;n++)o[n].update()},t.prototype.render=function(){this.isObjsSorted||(this.objects.sort((function(t,e){return t.prio-e.prio})),this.isObjsSorted=!0);for(var t=0,e=this.objects;t<e.length;t++)e[t].render()},t.prototype.register=function(t){0===t.uuid&&(t.uuid=this.objects.length),this.objects.push(t),this.isObjsSorted=!1},t.prototype.deregister=function(t){this.objects="number"==typeof t?this.objects.filter((function(e){return e.uuid!==t})):this.objects.filter((function(e){return e!==t}))},t}(),n=function(){function t(){this.states=[]}return t.prototype.pushState=function(t){t.on_enter(),this.states.push(t)},t.prototype.popState=function(){this.states.length>0&&this.states.pop().on_exit()},t.prototype.getCurState=function(){return this.states[this.states.length-1]},t.prototype.update=function(){this.states.length>0&&this.states[this.states.length-1].update()},t.prototype.render=function(){for(var t=0,e=this.states;t<e.length;t++)e[t].render()},t}(),o=function(){function t(){this.fsm=new n,this.canvas=document.getElementById("game-screen"),this.dt=0}return t.prototype.update=function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.fsm.update()},t.prototype.render=function(){var t=this.canvas.getContext("2d");t.clearRect(0,0,this.canvas.width,this.canvas.height),t.fillStyle="black",t.fillRect(0,0,this.canvas.width,this.canvas.height),this.fsm.render()},t}(),i=function(){function t(){}return t.getInstance=function(){return t.instance||(t.instance=new o),t.instance},t}(),s=function(){function t(){this.uuid=0,this.prio=0,this.game=i.getInstance(),this.x=0,this.y=0}return t.prototype.update=function(){this.x=this.x>this.game.canvas.width?this.x=0:this.x+1},t.prototype.render=function(){var t=this.game.canvas.getContext("2d");t.fillStyle="#ff0000",t.fillRect(this.x,this.y,50,50)},t}(),r=(t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.on_enter=function(){this.register(new s)},e.prototype.on_exit=function(){this.clean()},e.prototype.update=function(){t.prototype.update.call(this)},e.prototype.render=function(){t.prototype.render.call(this)},e}(e);window.addEventListener("load",(function(){var t=i.getInstance();t.fsm.pushState(new c);var e=performance.now();requestAnimationFrame((function n(o){t.dt=o-e,e=o,t.update(),t.render(),requestAnimationFrame(n)}))}))})();