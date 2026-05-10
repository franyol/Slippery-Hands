;(() => {
    'use strict'
    var t,
        e = function (t, e, i, n) {
            return new (i || (i = Promise))(function (s, o) {
                function r(t) {
                    try {
                        h(n.next(t))
                    } catch (t) {
                        o(t)
                    }
                }
                function a(t) {
                    try {
                        h(n.throw(t))
                    } catch (t) {
                        o(t)
                    }
                }
                function h(t) {
                    var e
                    t.done
                        ? s(t.value)
                        : ((e = t.value),
                          e instanceof i
                              ? e
                              : new i(function (t) {
                                    t(e)
                                })).then(r, a)
                }
                h((n = n.apply(t, e || [])).next())
            })
        },
        i = function (t, e) {
            var i,
                n,
                s,
                o = {
                    label: 0,
                    sent: function () {
                        if (1 & s[0]) throw s[1]
                        return s[1]
                    },
                    trys: [],
                    ops: [],
                },
                r = Object.create(
                    ('function' == typeof Iterator ? Iterator : Object)
                        .prototype
                )
            return (
                (r.next = a(0)),
                (r.throw = a(1)),
                (r.return = a(2)),
                'function' == typeof Symbol &&
                    (r[Symbol.iterator] = function () {
                        return this
                    }),
                r
            )
            function a(a) {
                return function (h) {
                    return (function (a) {
                        if (i)
                            throw new TypeError(
                                'Generator is already executing.'
                            )
                        for (; r && ((r = 0), a[0] && (o = 0)), o; )
                            try {
                                if (
                                    ((i = 1),
                                    n &&
                                        (s =
                                            2 & a[0]
                                                ? n.return
                                                : a[0]
                                                  ? n.throw ||
                                                    ((s = n.return) &&
                                                        s.call(n),
                                                    0)
                                                  : n.next) &&
                                        !(s = s.call(n, a[1])).done)
                                )
                                    return s
                                switch (
                                    ((n = 0),
                                    s && (a = [2 & a[0], s.value]),
                                    a[0])
                                ) {
                                    case 0:
                                    case 1:
                                        s = a
                                        break
                                    case 4:
                                        return (
                                            o.label++,
                                            { value: a[1], done: !1 }
                                        )
                                    case 5:
                                        ;(o.label++, (n = a[1]), (a = [0]))
                                        continue
                                    case 7:
                                        ;((a = o.ops.pop()), o.trys.pop())
                                        continue
                                    default:
                                        if (
                                            !(
                                                (s =
                                                    (s = o.trys).length > 0 &&
                                                    s[s.length - 1]) ||
                                                (6 !== a[0] && 2 !== a[0])
                                            )
                                        ) {
                                            o = 0
                                            continue
                                        }
                                        if (
                                            3 === a[0] &&
                                            (!s || (a[1] > s[0] && a[1] < s[3]))
                                        ) {
                                            o.label = a[1]
                                            break
                                        }
                                        if (6 === a[0] && o.label < s[1]) {
                                            ;((o.label = s[1]), (s = a))
                                            break
                                        }
                                        if (s && o.label < s[2]) {
                                            ;((o.label = s[2]), o.ops.push(a))
                                            break
                                        }
                                        ;(s[2] && o.ops.pop(), o.trys.pop())
                                        continue
                                }
                                a = e.call(t, o)
                            } catch (t) {
                                ;((a = [6, t]), (n = 0))
                            } finally {
                                i = s = 0
                            }
                        if (5 & a[0]) throw a[1]
                        return { value: a[0] ? a[1] : void 0, done: !0 }
                    })([a, h])
                }
            }
        },
        n = (function () {
            function t(e, i, n) {
                ;(void 0 === n && (n = !1),
                    (this.animations = {}),
                    (this.animTime = 0),
                    (this.animIdx = 0),
                    (this.frameTime = 0),
                    (this.frameIsEmpty = !1),
                    (this.ui = n),
                    (this.dir = e),
                    (this.name = i),
                    (this.image = new Image()),
                    (this.data = { frames: new Map() }),
                    (this.current = 0),
                    (this.imgLoaded = !1),
                    (this.dataLoaded = !1))
                var s = e + i + '.png'
                ;(s in t.loadedImages
                    ? ((this.image = t.loadedImages[s].image),
                      t.loadedImages[s].instances++,
                      (this.imgLoaded = !0))
                    : this.loadImage(s),
                    this.loadData(e + i + '.json'))
            }
            return (
                (t.prototype.loadImage = function (e) {
                    var i = this
                    ;((this.image.src = e),
                        (this.image.onload = function () {
                            ;((i.imgLoaded = !0),
                                e in t.loadedImages
                                    ? ((i.image = t.loadedImages[e].image),
                                      t.loadedImages[e].instances++)
                                    : (t.loadedImages[e] = {
                                          image: i.image,
                                          instances: 0,
                                      }))
                        }))
                }),
                (t.prototype.loadData = function (t) {
                    return e(this, void 0, void 0, function () {
                        var e,
                            n = this
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return (
                                        i.trys.push([0, 3, , 4]),
                                        [4, fetch(t)]
                                    )
                                case 1:
                                    return [4, i.sent().json()]
                                case 2:
                                    return (
                                        (e = i.sent()),
                                        Object.entries(e.frames).forEach(
                                            function (t) {
                                                var e = t[0],
                                                    i = t[1]
                                                n.data.frames.set(e, i)
                                            }
                                        ),
                                        (this.dataLoaded = !0),
                                        [3, 4]
                                    )
                                case 3:
                                    return (i.sent(), [3, 4])
                                case 4:
                                    return [2]
                            }
                        })
                    })
                }),
                (t.clean = function () {
                    Object.keys(t.loadedImages).forEach(function (e) {
                        t.loadedImages[e].instances <= 0 &&
                            delete t.loadedImages[e]
                    })
                }),
                (t.prototype.clean = function () {
                    t.loadedImages[this.dir + this.name + '.png'].instances--
                }),
                (t.prototype.loadAnimations = function (t) {
                    this.animations = t
                }),
                (t.prototype.setCurrentFrame = function (t) {
                    var e = ''.concat(this.name, ' ').concat(t, '.aseprite')
                    this.data.frames.has(e) && (this.current = t)
                }),
                (t.prototype.getCurrentFrameData = function () {
                    var t = ''
                        .concat(this.name, ' ')
                        .concat(this.current, '.aseprite')
                    return this.data.frames.get(t)
                }),
                (t.prototype.isReady = function () {
                    return this.imgLoaded && this.dataLoaded
                }),
                (t.prototype.waitUntilReady = function () {
                    return e(this, void 0, void 0, function () {
                        return i(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return this.isReady()
                                        ? [3, 2]
                                        : [
                                              4,
                                              new Promise(function (t) {
                                                  return setTimeout(t, 10)
                                              }),
                                          ]
                                case 1:
                                    return (t.sent(), [3, 0])
                                case 2:
                                    return [2]
                            }
                        })
                    })
                }),
                (t.prototype.setCurAnimation = function (t) {
                    t in this.animations &&
                        t !== this.curAnimation &&
                        ((this.curAnimation = t),
                        (this.animIdx = 0),
                        (this.animTime = 0),
                        (this.frameTime = 0),
                        (this.frameIsEmpty = void 0 === this.animations[t][0]),
                        (this.current = this.frameIsEmpty
                            ? this.current
                            : this.animations[t][0]))
                }),
                (t.prototype.update = function () {
                    if (!this.isReady()) return !1
                    if (this.frameIsEmpty) return !0
                    var t = b.getInstance()
                    if (
                        ((this.animTime += t.dt),
                        (this.frameTime += t.dt),
                        this.curAnimation)
                    ) {
                        var e = this.getCurrentFrameData()
                        if (this.frameTime > e.duration) {
                            if (
                                ((this.frameTime = 0),
                                this.animIdx++,
                                this.animIdx >=
                                    this.animations[this.curAnimation].length)
                            )
                                return (
                                    (this.animIdx = 0),
                                    (this.current =
                                        this.animations[this.curAnimation][
                                            this.animIdx
                                        ]),
                                    !0
                                )
                            this.current =
                                this.animations[this.curAnimation][this.animIdx]
                        }
                    }
                    return !1
                }),
                (t.prototype.render = function (t, e, i, n, s, o) {
                    var r
                    ;(void 0 === s && (s = !1), void 0 === o && (o = !1))
                    var a = this.ui
                            ? b.getInstance().uicanvas.getContext('2d')
                            : b.getInstance().canvas.getContext('2d'),
                        h =
                            null === (r = this.getCurrentFrameData()) ||
                            void 0 === r
                                ? void 0
                                : r.frame
                    h &&
                        this.isReady() &&
                        (a.save(),
                        a.translate(t + i / 2, e + n / 2),
                        a.scale(s ? -1 : 1, o ? -1 : 1),
                        a.drawImage(
                            this.image,
                            h.x,
                            h.y,
                            h.w,
                            h.h,
                            -i / 2,
                            -n / 2,
                            i,
                            n
                        ),
                        a.restore())
                }),
                (t.loadedImages = {}),
                t
            )
        })(),
        s = (function () {
            function t(t) {
                ;((this.prio = 0), (this.events = new Map()), (this.uuid = t))
            }
            return (
                (t.prototype.on = function (t, e) {
                    ;(this.events.has(t) || this.events.set(t, []),
                        this.events.get(t).push(e))
                }),
                (t.prototype.emit = function (t) {
                    for (var e = [], i = 1; i < arguments.length; i++)
                        e[i - 1] = arguments[i]
                    var n = this.events.get(t)
                    if (n)
                        for (var s = 0, o = n; s < o.length; s++)
                            o[s].apply(void 0, e)
                }),
                (t.prototype.off = function (t, e) {
                    var i = this.events.get(t)
                    i &&
                        this.events.set(
                            t,
                            i.filter(function (t) {
                                return t !== e
                            })
                        )
                }),
                t
            )
        })(),
        o = (function () {
            function t(t) {
                var e = t.historyLen,
                    i = t.x,
                    n = t.y,
                    s = t.xfriction,
                    o = t.yfriction,
                    r = t.parent
                ;((this._xspeed = []),
                    (this._yspeed = []),
                    (this._x = []),
                    (this._y = []),
                    (this.n = e))
                for (var a = 0; a < this.n; a++)
                    (this._xspeed.push(0),
                        this._yspeed.push(0),
                        this._x.push(0),
                        this._y.push(0))
                ;((this.xfriction = s),
                    (this.yfriction = o),
                    (this.x = i),
                    (this.y = n),
                    (this.parent = r))
            }
            return (
                (t.prototype.recordHistory = function () {
                    for (var t = 0; t < this.n - 1; t++)
                        ((this._x[t] = this._x[t + 1]),
                            (this._y[t] = this._y[t + 1]),
                            (this._xspeed[t] = this._xspeed[t + 1]),
                            (this._yspeed[t] = this._yspeed[t + 1]))
                }),
                (t.prototype.update = function () {
                    var t = b.getInstance().dt
                    if (
                        ((this.x += (this.xspeed * t) / 100),
                        (this.y += (this.yspeed * t) / 100),
                        0 !== this.xfriction)
                    ) {
                        var e = (this.xfriction * t) / 100
                        Math.abs(this.xspeed) < e
                            ? (this.xspeed = 0)
                            : (this.xspeed += this.xspeed > 0 ? -e : e)
                    }
                    0 !== this.yfriction &&
                        ((e = (this.yfriction * t) / 100),
                        Math.abs(this.yspeed) < e
                            ? (this.yspeed = 0)
                            : (this.yspeed += this.yspeed > 0 ? -e : e))
                }),
                Object.defineProperty(t.prototype, 'x', {
                    get: function () {
                        return this._x[this.n - 1]
                    },
                    set: function (t) {
                        this._x[this.n - 1] = t
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(t.prototype, 'xspeed', {
                    get: function () {
                        return this._xspeed[this.n - 1]
                    },
                    set: function (t) {
                        this._xspeed[this.n - 1] = t
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(t.prototype, 'y', {
                    get: function () {
                        return this._y[this.n - 1]
                    },
                    set: function (t) {
                        this._y[this.n - 1] = t
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(t.prototype, 'yspeed', {
                    get: function () {
                        return this._yspeed[this.n - 1]
                    },
                    set: function (t) {
                        this._yspeed[this.n - 1] = t
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                t
            )
        })(),
        r = (function () {
            function t(t, e, i, n, s, o, r) {
                ;(void 0 === o && (o = 'standard'),
                    void 0 === r && (r = 0),
                    (this.color = 'pink'),
                    (this.parent = t),
                    (this._x = e),
                    (this._y = i),
                    (this.w = n),
                    (this.h = s),
                    (this.colliders = []),
                    (this.type = o),
                    (this.layer = r))
            }
            return (
                Object.defineProperty(t.prototype, 'x', {
                    get: function () {
                        return this._x + this.parent.x
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(t.prototype, 'y', {
                    get: function () {
                        return this._y + this.parent.y
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                (t.prototype.getx = function (t) {
                    return t >= this.parent.n
                        ? this.x
                        : this._x + this.parent._x[this.parent.n - 1 - t]
                }),
                (t.prototype.gety = function (t) {
                    return t >= this.parent.n
                        ? this.y
                        : this._y + this.parent._y[this.parent.n - 1 - t]
                }),
                (t.prototype.render = function () {
                    var t = b.getInstance().canvas.getContext('2d')
                    ;((t.strokeStyle = this.color),
                        (t.lineWidth = 2),
                        t.strokeRect(this.x, this.y, this.w, this.h))
                }),
                t
            )
        })(),
        a =
            ((t = function (e, i) {
                return (
                    (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e
                            }) ||
                        function (t, e) {
                            for (var i in e)
                                Object.prototype.hasOwnProperty.call(e, i) &&
                                    (t[i] = e[i])
                        }),
                    t(e, i)
                )
            }),
            function (e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    )
                function n() {
                    this.constructor = e
                }
                ;(t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())))
            }),
        h = (function (t) {
            function e(e, i, s, a, h, c, u, p) {
                void 0 === p && (p = !1)
                var l = t.call(this, 0) || this
                return (
                    (l.uuid = 0),
                    (l.prio = -1),
                    (l.pressed = !1),
                    (l.touchIdx = null),
                    (l.keyState = 'iddle'),
                    (l.placeholder = p),
                    (l.game = e),
                    (l.position = u),
                    (l.sprite = new n(
                        '../../../static/assets/images/UI/',
                        'Button-' + c,
                        !0
                    )),
                    (l.physics = new o({
                        historyLen: 1,
                        x: i,
                        y: s,
                        xfriction: 0,
                        yfriction: 0,
                        parent: l,
                    })),
                    (l.x = i),
                    (l.y = s),
                    (l.hitbox = new r(l.physics, 0, 0, a, h, 'ui', 0)),
                    l
                )
            }
            return (
                a(e, t),
                (e.prototype.update = function () {
                    if (!this.placeholder) {
                        var t = this.game.inputHandler,
                            e = t.touches
                        if (
                            ((this.physics.x =
                                'Bottom-Left' === this.position
                                    ? 0 + this.x
                                    : 'Bottom-Right' === this.position
                                      ? this.game.uicanvas.width - this.x
                                      : this.x),
                            (this.physics.y =
                                'Bottom-Left' === this.position ||
                                'Bottom-Right' === this.position
                                    ? this.game.uicanvas.height - this.y
                                    : this.y),
                            null === this.touchIdx)
                        )
                            for (
                                var i = 0, n = Object.entries(e);
                                i < n.length;
                                i++
                            ) {
                                var s,
                                    o = n[i],
                                    r = o[0]
                                'down' === (s = o[1]).state &&
                                    !s.isbusy &&
                                    this.touched(s.x, s.y) &&
                                    ((this.touchIdx = r),
                                    (this.keyState = 'down'),
                                    (s.isbusy = !0))
                            }
                        else
                            'up' === (s = t.getTouchState(this.touchIdx)).state
                                ? ((this.keyState = 'up'),
                                  (this.touchIdx = null))
                                : this.touched(s.x, s.y) ||
                                  ((this.keyState = 'iddle'),
                                  (this.touchIdx = null),
                                  (s.isbusy = !1))
                        ;((this.pressed = 'down' === this.keyState),
                            this.sprite.setCurrentFrame(this.pressed ? 1 : 0))
                    }
                }),
                (e.prototype.touched = function (t, e) {
                    var i =
                            t >= this.hitbox.x &&
                            t <= this.hitbox.x + this.hitbox.w,
                        n =
                            e >= this.hitbox.y &&
                            e <= this.hitbox.y + this.hitbox.h
                    return i && n
                }),
                (e.prototype.render = function () {
                    this.placeholder ||
                        (this.hitbox &&
                            this.sprite.render(
                                this.hitbox.x,
                                this.hitbox.y,
                                this.hitbox.w,
                                this.hitbox.h,
                                !1
                            ))
                }),
                e
            )
        })(s),
        c = (function () {
            var t = function (e, i) {
                return (
                    (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e
                            }) ||
                        function (t, e) {
                            for (var i in e)
                                Object.prototype.hasOwnProperty.call(e, i) &&
                                    (t[i] = e[i])
                        }),
                    t(e, i)
                )
            }
            return function (e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    )
                function n() {
                    this.constructor = e
                }
                ;(t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())))
            }
        })(),
        u = function () {
            return (
                (u =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var s in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, s) &&
                                    (t[s] = e[s])
                        return t
                    }),
                u.apply(this, arguments)
            )
        },
        p = '../../../static/assets/images/UI/',
        l = (function (t) {
            function e(e, i, s, a, c, u, l) {
                void 0 === l && (l = 20)
                var d = t.call(this, 0) || this
                return (
                    (d.uuid = 0),
                    (d.prio = -1),
                    (d.pressed = !1),
                    (d.touchIdx = null),
                    (d.initial = { x: 0, y: 0 }),
                    (d.current = { x: 0, y: 0 }),
                    (d.deadzone = l),
                    (d.game = e),
                    (d.position = u),
                    (d.sprite = new n(p, 'Joystick', !0)),
                    d.sprite.waitUntilReady().then(function () {
                        d.sprite.setCurrentFrame(1)
                    }),
                    (d.spritemove = new n(p, 'Joystick', !0)),
                    d.spritemove.waitUntilReady().then(function () {
                        d.spritemove.setCurrentFrame(0)
                    }),
                    (d.physics = new o({
                        historyLen: 1,
                        x: i,
                        y: s,
                        xfriction: 0,
                        yfriction: 0,
                        parent: d,
                    })),
                    (d.x = i),
                    (d.y = s),
                    (d.hitbox = new r(d.physics, 0, 0, a, c, 'ui', 0)),
                    (d.joyState = {
                        up: new h(e, 0, 0, 0, 0, 'A', 'Bottom-Right', !0),
                        down: new h(e, 0, 0, 0, 0, 'A', 'Bottom-Right', !0),
                        right: new h(e, 0, 0, 0, 0, 'A', 'Bottom-Right', !0),
                        left: new h(e, 0, 0, 0, 0, 'A', 'Bottom-Right', !0),
                    }),
                    d
                )
            }
            return (
                c(e, t),
                (e.prototype.update = function () {
                    var t = this.game.inputHandler,
                        e = t.touches,
                        i = Object.entries(e)
                            .map(function (t) {
                                var e = t[0],
                                    i = t[1]
                                return 'ID: '
                                    .concat(e, ', State: ')
                                    .concat(i.state, ', Busy: ')
                                    .concat(i.isbusy, ', X: ')
                                    .concat(i.x, ', Y: ')
                                    .concat(i.y)
                            })
                            .join('\n')
                    if (
                        ((this.game.debugText = 'DEBUG:\n' + i),
                        (this.physics.x =
                            'Bottom-Left' === this.position
                                ? 0 + this.x
                                : 'Bottom-Right' === this.position
                                  ? this.game.uicanvas.width - this.x
                                  : this.x),
                        (this.physics.y =
                            'Bottom-Left' === this.position ||
                            'Bottom-Right' === this.position
                                ? this.game.uicanvas.height - this.y
                                : this.y),
                        this.pressed ||
                            ((this.initial.x = this.physics.x),
                            (this.initial.y = this.physics.y),
                            (this.current = u({}, this.initial))),
                        null === this.touchIdx)
                    )
                        for (
                            var n = 0, s = Object.entries(e);
                            n < s.length;
                            n++
                        ) {
                            var o,
                                r = s[n],
                                a = r[0]
                            'down' === (o = r[1]).state &&
                                !o.isbusy &&
                                this.touched(o.x, o.y) &&
                                ((this.touchIdx = a),
                                (this.pressed = !0),
                                (o.isbusy = !0),
                                (this.initial.x = o.x - this.hitbox.w / 2),
                                (this.initial.y = o.y - this.hitbox.h / 2),
                                (this.current = u({}, this.initial)))
                        }
                    else
                        'up' === (o = t.getTouchState(this.touchIdx)).state
                            ? ((this.pressed = !1),
                              (o.isbusy = !1),
                              (this.touchIdx = null),
                              Object.values(this.joyState).forEach(
                                  function (t) {
                                      t.keyState = 'up'
                                  }
                              ))
                            : ((this.current.x = o.x - this.hitbox.w / 2),
                              (this.current.y = o.y - this.hitbox.h / 2),
                              (this.joyState.up.keyState = this.handleMove(
                                  this.joyState.up.keyState,
                                  this.current.y >
                                      this.initial.y + this.deadzone
                              )),
                              (this.joyState.down.keyState = this.handleMove(
                                  this.joyState.down.keyState,
                                  this.current.y <
                                      this.initial.y - this.deadzone
                              )),
                              (this.joyState.right.keyState = this.handleMove(
                                  this.joyState.right.keyState,
                                  this.current.x >
                                      this.initial.x + this.deadzone
                              )),
                              (this.joyState.left.keyState = this.handleMove(
                                  this.joyState.left.keyState,
                                  this.current.x <
                                      this.initial.x - this.deadzone
                              )))
                }),
                (e.prototype.handleMove = function (t, e) {
                    return e ? 'down' : 'down' === t ? 'up' : t
                }),
                (e.prototype.touched = function (t, e) {
                    var i =
                            t >= this.hitbox.x &&
                            t <= this.hitbox.x + this.hitbox.w,
                        n =
                            e >= this.hitbox.y &&
                            e <= this.hitbox.y + this.hitbox.h
                    return i && n
                }),
                (e.prototype.render = function () {
                    this.hitbox &&
                        (this.sprite.render(
                            this.initial.x,
                            this.initial.y,
                            this.hitbox.w,
                            this.hitbox.h,
                            !1
                        ),
                        this.spritemove.render(
                            this.current.x,
                            this.current.y,
                            this.hitbox.w,
                            this.hitbox.h,
                            !1
                        ))
                }),
                e
            )
        })(s),
        d = function () {
            return (
                (d =
                    Object.assign ||
                    function (t) {
                        for (var e, i = 1, n = arguments.length; i < n; i++)
                            for (var s in (e = arguments[i]))
                                Object.prototype.hasOwnProperty.call(e, s) &&
                                    (t[s] = e[s])
                        return t
                    }),
                d.apply(this, arguments)
            )
        },
        f = (function () {
            function t(t) {
                ;((this.touches = {}),
                    (this.showVirtual = !1),
                    (this.game = t),
                    (this.keys = new Map()),
                    (this.keysReleased = new Map()),
                    (this.joysticks = {
                        left: new l(t, 110, 170, 100, 100, 'Bottom-Left'),
                    }),
                    (this.bindings = {
                        jump: {
                            keybinding: ' ',
                            virtual: new h(
                                t,
                                170,
                                200,
                                70,
                                70,
                                'A',
                                'Bottom-Right'
                            ),
                        },
                        roll: {
                            keybinding: 's',
                            virtual: new h(
                                t,
                                250,
                                120,
                                70,
                                70,
                                'B',
                                'Bottom-Right'
                            ),
                        },
                        left: {
                            keybinding: 'a',
                            virtual: this.joysticks.left.joyState.left,
                        },
                        right: {
                            keybinding: 'd',
                            virtual: this.joysticks.left.joyState.right,
                        },
                    }),
                    document.addEventListener(
                        'keydown',
                        this.keyDownHandler.bind(this)
                    ),
                    document.addEventListener(
                        'keyup',
                        this.keyUpHandler.bind(this)
                    ),
                    document.addEventListener(
                        'touchstart',
                        this.touchStartHandler.bind(this),
                        { passive: !1 }
                    ),
                    document.addEventListener(
                        'touchmove',
                        this.touchMoveHandler.bind(this),
                        { passive: !1 }
                    ),
                    document.addEventListener(
                        'touchend',
                        this.touchEndHandler.bind(this),
                        { passive: !1 }
                    ),
                    document.addEventListener(
                        'touchcancel',
                        this.touchEndHandler.bind(this),
                        { passive: !1 }
                    ))
            }
            return (
                (t.prototype.keyDownHandler = function (t) {
                    ;(this.keys.set(t.key, 'down'), (this.showVirtual = !1))
                }),
                (t.prototype.keyUpHandler = function (t) {
                    ;(this.keys.set(t.key, 'up'),
                        this.keysReleased.set(t.key, !0))
                }),
                (t.prototype.touchStartHandler = function (t) {
                    var e = this
                    ;(t.preventDefault(),
                        Array.from(t.changedTouches).forEach(function (t) {
                            e.touches[t.identifier] = {
                                isbusy: !1,
                                x: t.clientX,
                                y: t.clientY,
                                state: 'down',
                            }
                        }),
                        (this.showVirtual = !0))
                }),
                (t.prototype.touchMoveHandler = function (t) {
                    var e = this
                    ;(t.preventDefault(),
                        Array.from(t.changedTouches).forEach(function (t) {
                            e.touches[t.identifier] = d(
                                d({}, e.touches[t.identifier]),
                                { x: t.clientX, y: t.clientY }
                            )
                        }))
                }),
                (t.prototype.touchEndHandler = function (t) {
                    var e = this
                    ;(t.preventDefault(),
                        Array.from(t.changedTouches).forEach(function (t) {
                            e.touches[t.identifier].isbusy
                                ? (e.touches[t.identifier] = d(
                                      d({}, e.touches[t.identifier]),
                                      {
                                          x: t.clientX,
                                          y: t.clientY,
                                          state: 'up',
                                      }
                                  ))
                                : delete e.touches[t.identifier]
                        }))
                }),
                (t.prototype.getTouchState = function (t) {
                    var e = this.touches[t]
                    return ('up' === e.state && delete this.touches[t], e)
                }),
                (t.prototype.getKeyState = function (t) {
                    return this.keys.get(t) || 'iddle'
                }),
                (t.prototype.getBindingState = function (t) {
                    if (t in this.bindings) {
                        if (this.showVirtual)
                            return (e = this.bindings[t]).virtual.keyState
                        var e = this.bindings[t]
                        return this.getKeyState(e.keybinding)
                    }
                }),
                (t.prototype.getKeyOnce = function (t) {
                    if (!1 === this.keysReleased.get(t)) return 'iddle'
                    var e = this.getKeyState(t)
                    return ('down' === e && this.keysReleased.set(t, !1), e)
                }),
                (t.prototype.setKeyState = function (t, e) {
                    this.keys.set(t, e)
                }),
                t
            )
        })(),
        y = (function () {
            function t() {
                ;((this.objects = []),
                    (this.isObjsSorted = !0),
                    (this.environments = []))
            }
            return (
                (t.prototype.on_enter = function () {}),
                (t.prototype.on_exit = function () {}),
                (t.prototype.clean = function () {
                    ;((this.objects.length = 0),
                        this.environments.map(function (t) {
                            t.clean()
                        }),
                        (this.environments.length = 0))
                }),
                (t.prototype.update = function () {
                    for (var t = 0, e = this.objects; t < e.length; t++)
                        e[t].update()
                    for (var i = 0, n = this.environments; i < n.length; i++)
                        n[i].update()
                }),
                (t.prototype.render = function () {
                    this.isObjsSorted ||
                        (this.objects.sort(function (t, e) {
                            return t.prio - e.prio
                        }),
                        (this.isObjsSorted = !0))
                    for (var t = 0, e = this.objects; t < e.length; t++)
                        e[t].render()
                }),
                (t.prototype.register = function (t) {
                    ;(0 === t.uuid && (t.uuid = this.objects.length),
                        this.objects.push(t),
                        (this.isObjsSorted = !1))
                }),
                (t.prototype.deregister = function (t) {
                    this.objects =
                        'number' == typeof t
                            ? this.objects.filter(function (e) {
                                  return e.uuid !== t
                              })
                            : this.objects.filter(function (e) {
                                  return e !== t
                              })
                }),
                t
            )
        })(),
        g = (function () {
            function t() {
                this.states = []
            }
            return (
                (t.prototype.pushState = function (t) {
                    ;(t.on_enter(), this.states.push(t))
                }),
                (t.prototype.popState = function () {
                    this.states.length > 0 && this.states.pop().on_exit()
                }),
                (t.prototype.getCurState = function () {
                    return this.states[this.states.length - 1]
                }),
                (t.prototype.update = function () {
                    this.states.length > 0 &&
                        this.states[this.states.length - 1].update()
                }),
                (t.prototype.render = function () {
                    for (var t = 0, e = this.states; t < e.length; t++)
                        e[t].render()
                }),
                t
            )
        })(),
        m = (function () {
            function t() {
                ;((this.dt = 0),
                    (this.fsm = new g()),
                    (this.width = 4e3),
                    (this.height = 4e3),
                    (this.camx = 0),
                    (this.camy = 0),
                    (this._camsize = 50),
                    (this.camw = 16 * this._camsize),
                    (this.camh = 9 * this._camsize),
                    (this.debugText = ''),
                    (this.canvas = document.getElementById('game-screen')),
                    (this.uicanvas = document.getElementById('ui-layer')),
                    (this.inputHandler = new f(this)))
            }
            return (
                Object.defineProperty(t.prototype, 'camsize', {
                    set: function (t) {
                        ;((this._camsize = t),
                            (this.camw = 16 * t),
                            (this.camh = 9 * t))
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                (t.prototype.update = function () {
                    ;((this.canvas.width = this.width),
                        (this.canvas.height = this.height),
                        (this.uicanvas.width = window.innerWidth),
                        (this.uicanvas.height = window.innerHeight),
                        this.fsm.update(),
                        this.inputHandler.showVirtual &&
                            (Object.values(this.inputHandler.bindings).forEach(
                                function (t) {
                                    t.virtual.update()
                                }
                            ),
                            Object.values(this.inputHandler.joysticks).forEach(
                                function (t) {
                                    t.update()
                                }
                            )))
                }),
                (t.prototype.render = function () {
                    var t = this.canvas.getContext('2d'),
                        e = this.uicanvas.getContext('2d')
                    ;((t.imageSmoothingEnabled = !1),
                        (e.imageSmoothingEnabled = !1),
                        e.clearRect(
                            0,
                            0,
                            this.uicanvas.width,
                            this.uicanvas.height
                        ),
                        t.clearRect(
                            0,
                            0,
                            this.canvas.width,
                            this.canvas.height
                        ),
                        t.save(),
                        t.setTransform(
                            this.canvas.width / this.camw,
                            0,
                            0,
                            this.canvas.height / this.camh,
                            -this.camx * (this.canvas.width / this.camw),
                            -this.camy * (this.canvas.height / this.camh)
                        ),
                        (t.fillStyle = 'yellow'),
                        t.fillRect(0, 0, this.canvas.width, this.canvas.height),
                        this.fsm.render(),
                        t.restore(),
                        this.scale(
                            this.canvas,
                            window.innerWidth,
                            window.innerHeight,
                            this.camw,
                            this.camh
                        ),
                        '' !== this.debugText &&
                            ((e.font = '16px Arial'),
                            (e.fillStyle = 'red'),
                            this.debugText.split('\n').forEach(function (t, i) {
                                e.fillText(t, 10, 30 + 20 * i)
                            })),
                        this.inputHandler.showVirtual &&
                            (Object.values(this.inputHandler.bindings).forEach(
                                function (t) {
                                    t.virtual.render()
                                }
                            ),
                            Object.values(this.inputHandler.joysticks).forEach(
                                function (t) {
                                    t.render()
                                }
                            )))
                }),
                (t.prototype.scale = function (t, e, i, n, s) {
                    var o = e / n,
                        r = i / s,
                        a = Math.min(o, r),
                        h = n * a,
                        c = s * a
                    ;((t.style.width = ''.concat(h, 'px')),
                        (t.style.height = ''.concat(c, 'px')),
                        (t.style.position = 'absolute'),
                        (t.style.left = ''.concat((e - h) / 2, 'px')),
                        (t.style.top = ''.concat((i - c) / 2, 'px')))
                }),
                t
            )
        })(),
        b = (function () {
            function t() {}
            return (
                (t.getInstance = function () {
                    return (t.instance || (t.instance = new m()), t.instance)
                }),
                t
            )
        })(),
        x = (function () {
            function t() {
                this.objects = []
            }
            return (
                (t.prototype.clean = function () {
                    this.objects.length = 0
                }),
                (t.prototype.update = function () {
                    for (var t = 0; t < this.objects.length; t++)
                        for (var e = t + 1; e < this.objects.length; e++)
                            this.collided(this.objects[t], this.objects[e]) &&
                                (this.objects[t].colliders.push(
                                    this.objects[e]
                                ),
                                this.objects[e].colliders.push(this.objects[t]))
                    this.objects.map(function (t) {
                        switch (t.type) {
                            case 'stop':
                            case 'standard':
                            case 'virtual':
                                t.colliders.map(function (e) {
                                    if ('stop' === e.type) {
                                        var i = t.getx(1),
                                            n = t.gety(1),
                                            s = ''
                                        if (i + t.w <= e.x) s = 'right'
                                        else if (i >= e.x + e.w) s = 'left'
                                        else if (n + t.h <= e.y) s = 'bottom'
                                        else if (n >= e.y + e.h) s = 'top'
                                        else {
                                            var o = i + t.w - e.x,
                                                r = e.x + e.w - i,
                                                a = n + t.h - e.y,
                                                h = e.y + e.h - n,
                                                c = Math.min(o, r, a, h)
                                            s =
                                                c === o
                                                    ? 'right'
                                                    : c === r
                                                      ? 'left'
                                                      : c === a
                                                        ? 'bottom'
                                                        : 'top'
                                        }
                                        if ('virtual' != t.type)
                                            switch (s) {
                                                case 'right':
                                                    ;((t.parent.x =
                                                        e.x - t.w - t._x),
                                                        (t.parent.xspeed = 0))
                                                    break
                                                case 'left':
                                                    ;((t.parent.x =
                                                        e.x + e.w - t._x),
                                                        (t.parent.xspeed = 0))
                                                    break
                                                case 'top':
                                                    ;((t.parent.y =
                                                        e.y + e.h - t._y),
                                                        (t.parent.yspeed = 0))
                                                    break
                                                case 'bottom':
                                                    ;((t.parent.y =
                                                        e.y - t.h - t._y),
                                                        (t.parent.yspeed = 0))
                                            }
                                        t.parent.parent.emit('collision', s, t)
                                    }
                                })
                        }
                        t.colliders = []
                    })
                }),
                (t.prototype.collided = function (t, e) {
                    if (t.layer !== e.layer) return !1
                    var i = t.x < e.x + e.w && t.x + t.w > e.x,
                        n = t.y < e.y + e.h && t.y + t.h > e.y
                    return i && n
                }),
                (t.prototype.register = function (t) {
                    this.objects.push(t)
                }),
                (t.prototype.deregister = function (t) {
                    this.objects = this.objects.filter(function (e) {
                        return e !== t
                    })
                }),
                t
            )
        })(),
        w = (function () {
            function t() {}
            return (
                (t.getInstance = function () {
                    return (t.instance || (t.instance = new x()), t.instance)
                }),
                t
            )
        })(),
        v = (function () {
            var t = function (e, i) {
                return (
                    (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e
                            }) ||
                        function (t, e) {
                            for (var i in e)
                                Object.prototype.hasOwnProperty.call(e, i) &&
                                    (t[i] = e[i])
                        }),
                    t(e, i)
                )
            }
            return function (e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    )
                function n() {
                    this.constructor = e
                }
                ;(t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())))
            }
        })(),
        j = (function (t) {
            function e(e) {
                var i = e.x,
                    n = e.y,
                    s = e.w,
                    a = e.h,
                    h = e.moving,
                    c = e.color,
                    u = t.call(this, 0) || this
                return (
                    (u.uuid = 0),
                    (u.prio = 0),
                    (u.game = b.getInstance()),
                    (u.physics = new o({
                        historyLen: h ? 2 : 1,
                        x: i,
                        y: n,
                        xfriction: 0,
                        yfriction: 0,
                        parent: u,
                    })),
                    (u.physics.parent = u),
                    (u.physics.x = i),
                    (u.physics.y = n),
                    (u.hitbox = new r(
                        u.physics,
                        0,
                        0,
                        s,
                        a,
                        h ? 'standard' : 'stop',
                        0
                    )),
                    (u.hitbox.color = c),
                    (u.moving = h),
                    w.getInstance().register(u.hitbox),
                    u
                )
            }
            return (
                v(e, t),
                (e.prototype.update = function () {
                    var t,
                        e,
                        i,
                        n,
                        s = this.game.inputHandler
                    this.moving &&
                        (this.physics.recordHistory(),
                        (t = 'down' === s.getKeyState('ArrowUp')),
                        (e = 'down' === s.getKeyState('ArrowDown')),
                        (i = 'down' === s.getKeyState('ArrowLeft')),
                        (n = 'down' === s.getKeyState('ArrowRight')),
                        (this.physics.yspeed = t ? -25 : e ? 25 : 0),
                        (this.physics.xspeed = n ? 25 : i ? -25 : 0),
                        this.physics.update())
                }),
                (e.prototype.render = function () {
                    this.hitbox.render()
                }),
                e
            )
        })(s),
        k = (function () {
            function t() {
                this.objects = []
            }
            return (
                (t.prototype.clean = function () {
                    this.objects = []
                }),
                (t.prototype.update = function () {
                    var t = b.getInstance(),
                        e = this.objects[this.objects.length - 1]
                    ;((t.camx = e.x + e.w / 2 - t.camw / 2),
                        (t.camy = e.y + e.h / 2 - t.camh / 2))
                }),
                (t.prototype.register = function (t) {
                    this.objects.push(t)
                }),
                (t.prototype.deregister = function (t) {
                    this.objects = this.objects.filter(function (e) {
                        return e !== t
                    })
                }),
                t
            )
        })(),
        _ = (function () {
            function t() {}
            return (
                (t.getInstance = function () {
                    return (t.instance || (t.instance = new k()), t.instance)
                }),
                t
            )
        })(),
        I = (function () {
            function t() {
                this.objects = []
            }
            return (
                (t.prototype.clean = function () {
                    this.objects.length = 0
                }),
                (t.prototype.update = function () {
                    var t = b.getInstance().dt
                    this.objects.map(function (e) {
                        e.parent.yspeed < 80
                            ? (e.parent.yspeed += (100 * t) / 100)
                            : e.parent.yspeed >= 100 &&
                              (e.parent.yspeed -= (100 * t) / 100)
                    })
                }),
                (t.prototype.register = function (t) {
                    this.objects.push(t)
                }),
                (t.prototype.deregister = function (t) {
                    this.objects = this.objects.filter(function (e) {
                        return e !== t
                    })
                }),
                t
            )
        })(),
        S = (function () {
            function t() {}
            return (
                (t.getInstance = function () {
                    return (t.instance || (t.instance = new I()), t.instance)
                }),
                t
            )
        })(),
        O = (function () {
            function t() {
                this.objects = []
            }
            return (
                (t.prototype.clean = function () {
                    this.objects.length = 0
                }),
                (t.prototype.update = function () {
                    var t = b.getInstance().canvas,
                        e = !0
                    this.objects.map(function (i) {
                        ;(i.x + i.w > t.width
                            ? (i.parent.x = t.width - i.w - i._x)
                            : i.x < 0 && (i.parent.x = -i._x),
                            i.y + i.h > t.height
                                ? (i.parent.y = t.height - i.h - i._y)
                                : i.y < 0
                                  ? (i.parent.y = -i._y)
                                  : (e = !1),
                            e && ((i.parent.x = 0), (i.parent.y = 1500)))
                    })
                }),
                (t.prototype.register = function (t) {
                    this.objects.push(t)
                }),
                (t.prototype.deregister = function (t) {
                    this.objects = this.objects.filter(function (e) {
                        return e !== t
                    })
                }),
                t
            )
        })(),
        E = (function () {
            function t() {}
            return (
                (t.getInstance = function () {
                    return (t.instance || (t.instance = new O()), t.instance)
                }),
                t
            )
        })(),
        A = (function () {
            function t(t, e) {
                ;(void 0 === e && (e = 0),
                    (this.enabled = !1),
                    (this.game = b.getInstance()),
                    (this.time = t),
                    (this.current = e))
            }
            return (
                (t.prototype.update = function () {
                    this.enabled &&
                        ((this.current += this.game.dt),
                        this.current >= this.time &&
                            ((this.enabled = !1), this.restart_timer()))
                }),
                (t.prototype.request = function (t, e) {
                    return !0 === e && (t || this.enabled)
                        ? ((this.enabled = !1), this.restart_timer(), !0)
                        : (t && ((this.enabled = !0), this.restart_timer()), !1)
                }),
                (t.prototype.retain = function (t) {
                    return (
                        t && ((this.enabled = !0), this.restart_timer()),
                        t || this.enabled
                    )
                }),
                (t.prototype.restart_timer = function () {
                    this.current = 0
                }),
                t
            )
        })(),
        B = (function () {
            function t(t, e) {
                ;(void 0 === e && (e = 0),
                    (this.enabled = !0),
                    (this.game = b.getInstance()),
                    (this.time = t),
                    (this.current = e))
            }
            return (
                (t.prototype.update = function () {
                    this.enabled ||
                        ((this.current += this.game.dt),
                        this.current >= this.time &&
                            ((this.enabled = !0), (this.current = 0)))
                }),
                (t.prototype.request = function () {
                    return !!this.enabled && ((this.enabled = !1), !0)
                }),
                t
            )
        })(),
        C = (function () {
            function t() {
                ;((this.callback = function () {}), (this.enabled = !0))
            }
            return (
                (t.prototype.request = function (t) {
                    return t
                        ? !(!this.enabled || !t || ((this.enabled = !1), 0))
                        : ((this.enabled = !0), !1)
                }),
                t
            )
        })(),
        L = (function () {
            var t = function (e, i) {
                return (
                    (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e
                            }) ||
                        function (t, e) {
                            for (var i in e)
                                Object.prototype.hasOwnProperty.call(e, i) &&
                                    (t[i] = e[i])
                        }),
                    t(e, i)
                )
            }
            return function (e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    )
                function n() {
                    this.constructor = e
                }
                ;(t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())))
            }
        })(),
        T = (function (t) {
            function e(e, i) {
                var s = t.call(this, 0) || this
                return (
                    (s.uuid = 0),
                    (s.prio = 0),
                    (s.states = {
                        stand: !1,
                        idle: !1,
                        headingLeft: !1,
                        jumping: !1,
                        falling: !1,
                        headbumping: !1,
                        rolling: !1,
                        running: !1,
                        cantmove: !1,
                        onfloor: !1,
                        wallsliding: !1,
                        walljumping: !1,
                        duck: !1,
                        duckwalking: !1,
                        duckByCollision: !1,
                    }),
                    (s.jumpcount = 0),
                    (s.animationEndCallbacks = {}),
                    (s.animId = ''),
                    (s.runningspeed = 50),
                    (s.xacceleration = s.runningspeed / 3),
                    (s.duckspeed = 20),
                    (s.rollspeed = 70),
                    (s.jumpingForce = 210),
                    (s.idleTime = 5e3),
                    (s.walljumpimpulse = 210),
                    (s.game = b.getInstance()),
                    (s.sprite = new n(
                        '../../../static/assets/images/main-character/',
                        'main-character'
                    )),
                    (s.physics = new o({
                        historyLen: 2,
                        x: e,
                        y: i,
                        xfriction: 200,
                        yfriction: 0,
                        parent: s,
                    })),
                    (s.printbox = new r(
                        s.physics,
                        0,
                        0,
                        64,
                        64,
                        'standard',
                        0
                    )),
                    (s.hitbox = new r(s.physics, 13, 0, 38, 64, 'standard', 0)),
                    (s.standbox = new r(
                        s.physics,
                        13,
                        0,
                        38,
                        64,
                        'virtual',
                        0
                    )),
                    (s.animationQueue = []),
                    s.sprite.loadAnimations({
                        tostand: [5],
                        stand: [0, 1],
                        fromstand: [5],
                        toduck: [8],
                        duck: [33],
                        fromduck: [8],
                        duckwalk: [34, 35, 36, 35, 34, 37, 38, 37],
                        fromduckwalk: [],
                        wallsliding: [32],
                        toidle: [2],
                        fromidle: [2],
                        idle: [3, 4, 3, 4, 3, 4, 3],
                        tostilljump: [16],
                        stilljump: [17],
                        torunjump: [31],
                        runjump: [13],
                        falling: [18],
                        fromfalling: [],
                        bumpfalling: [19],
                        bumppain: [20, 21, 22, 21, 22, 23, 24, 23, 24, 22, 20],
                        runfalling: [13],
                        fromrunfalling: [],
                        toprepare: [5],
                        prepare: [6, 7],
                        fromprepare: [5],
                        torun: [8],
                        run: [9, 10, 11, 12, 13, 14, 15, 12],
                        fromrun: [8],
                        roll: [25, 26, 27, 28, 29, 30],
                        fromroll: [],
                    }),
                    s.sprite.setCurAnimation('stand'),
                    (s.cooldowns = {
                        rolling: new B(1200),
                        stopwalljump: new B(100),
                        regainwalljumpctl: new B(300),
                    }),
                    (s.buffers = { jump: new A(100), coyotetime: new A(50) }),
                    (s.pressOnce = { jump: new C(), roll: new C() }),
                    (s.animationEndCallbacks.roll = function () {
                        s.states.rolling = !1
                    }),
                    E.getInstance().register(s.hitbox),
                    w.getInstance().register(s.hitbox),
                    w.getInstance().register(s.standbox),
                    S.getInstance().register(s.hitbox),
                    _.getInstance().register(s.printbox),
                    s.on('collision', function (t, e) {
                        e !== s.standbox
                            ? 'bottom' === t &&
                              ((s.states.onfloor = !0), (s.states.jumping = !1))
                            : 'top' === t &&
                              (!0 === s.states.jumping
                                  ? (s.states.headbumping = !0)
                                  : (s.states.duckByCollision = !0))
                    }),
                    s.sprite.setCurAnimation('stand'),
                    s
                )
            }
            return (
                L(e, t),
                (e.prototype.update = function () {
                    var t = this.game.inputHandler
                    ;(this.physics.recordHistory(),
                        Object.values(this.cooldowns).forEach(function (t) {
                            t.update()
                        }),
                        Object.values(this.buffers).forEach(function (t) {
                            t.update()
                        }),
                        this.handleInputs(t),
                        this.handleAnimations(),
                        this.physics.update(),
                        (this.states.falling =
                            this.physics.yspeed > 0 && !this.states.onfloor),
                        (this.states.stand =
                            this.states.onfloor &&
                            !(
                                this.states.duck ||
                                this.states.running ||
                                this.states.jumping ||
                                this.states.rolling ||
                                this.states.walljumping ||
                                this.states.wallsliding
                            )),
                        this.states.stand || (this.states.idle = !1),
                        (this.states.onfloor = !1),
                        (this.states.duckByCollision = !1))
                }),
                (e.prototype.handleInputs = function (t) {
                    var e = { up: !1, roll: !1, down: !1, left: !1, right: !1 }
                    ;((e.up = this.pressOnce.jump.request(
                        'down' === t.getBindingState('jump')
                    )),
                        (e.down = 'down' === t.getBindingState('roll')),
                        (e.roll = this.pressOnce.roll.request(e.down)),
                        (e.left = 'down' === t.getBindingState('left')),
                        (e.right = 'down' === t.getBindingState('right')))
                    var i =
                            !1 === this.states.jumping &&
                            !0 ===
                                this.buffers.coyotetime.retain(
                                    this.states.onfloor
                                ),
                        n =
                            !0 === this.states.onfloor &&
                            !1 === this.states.running &&
                            !1 === this.states.rolling,
                        s =
                            !0 === this.states.running &&
                            !1 === this.states.duck,
                        o = this.states.rolling && this.states.headingLeft,
                        r = this.states.rolling && !this.states.headingLeft
                    if (
                        (this.buffers.jump.request(e.up, i) &&
                            ((this.physics.yspeed -= this.jumpingForce),
                            (this.states.jumping = !0),
                            (this.states.rolling = !1)),
                        (this.states.running = !1),
                        (this.states.duckwalking = !1),
                        (e.left || o) && !r)
                    ) {
                        ;(this.states.duck ||
                            this.states.rolling ||
                            (this.states.running = !0),
                            (this.states.duckwalking = this.states.duck),
                            (this.states.headingLeft = !0))
                        var a = this.states.duck
                            ? this.duckspeed
                            : this.states.rolling
                              ? this.rollspeed
                              : this.runningspeed
                        this.physics.xspeed > -a &&
                            (this.physics.xspeed -= this.xacceleration)
                    }
                    ;((!e.right && !r) ||
                        o ||
                        (this.states.duck ||
                            this.states.rolling ||
                            (this.states.running = !0),
                        (this.states.duckwalking = this.states.duck),
                        (this.states.headingLeft = !1),
                        (a = this.states.duck
                            ? this.duckspeed
                            : this.states.rolling
                              ? this.rollspeed
                              : this.runningspeed),
                        this.physics.xspeed < a &&
                            (this.physics.xspeed += this.xacceleration)),
                        this.states.running,
                        e.right || e.left,
                        e.down || this.states.duckByCollision
                            ? n &&
                              ((this.states.duck = !0),
                              (this.hitbox._y = 32),
                              (this.hitbox.h = 32))
                            : this.states.duckByCollision
                              ? (this.states.duckByCollision = !1)
                              : this.states.rolling ||
                                ((this.states.duck = !1),
                                (this.hitbox._y = 0),
                                (this.hitbox.h = 64)),
                        e.roll &&
                            s &&
                            this.cooldowns.rolling.request() &&
                            ((this.states.rolling = !0),
                            (this.hitbox._y = 32),
                            (this.hitbox.h = 32)))
                }),
                (e.prototype.handleAnimations = function () {
                    var t,
                        e,
                        i = this,
                        n = this.sprite.curAnimation,
                        s = !1,
                        o = !1,
                        r = function (t) {
                            var e,
                                n = t.id,
                                r = t.cancel,
                                a = t.animations,
                                h = t.repeat,
                                c = void 0 !== h && h
                            ;(n !== i.animId || c) &&
                                ((i.animId = n),
                                r &&
                                    (i.animationQueue.length > 0 && (s = !0),
                                    (o = !0),
                                    (i.animationQueue = [])),
                                s &&
                                    (a = a.filter(function (t) {
                                        return !t.startsWith('from')
                                    })),
                                (e = i.animationQueue).push.apply(e, a))
                        }
                    if (this.states.stand)
                        (this.states.idle ||
                            r({
                                id: 'prepare',
                                cancel: !0,
                                animations: [
                                    'from' + n,
                                    'toprepare',
                                    'prepare',
                                ],
                            }),
                            this.sprite.animTime > this.idleTime &&
                                (!1 === this.states.idle
                                    ? (r({
                                          id: 'stand',
                                          cancel: !0,
                                          animations: ['tostand', 'stand'],
                                      }),
                                      (this.states.idle = !0))
                                    : r({
                                          id: 'idle',
                                          cancel: !0,
                                          animations: ['idle', 'stand'],
                                          repeat: !0,
                                      })))
                    else if (this.states.rolling)
                        r({
                            id: 'roll',
                            cancel: !0,
                            animations: ['roll', 'fromroll'],
                        })
                    else if (this.states.duckwalking)
                        r({
                            id: 'duckwalk',
                            cancel: !0,
                            animations: ['duckwalk'],
                        })
                    else if (this.states.duck)
                        r({
                            id: 'duck',
                            cancel: !0,
                            animations: ['from' + n, 'duck'],
                        })
                    else if (this.states.falling)
                        this.states.running
                            ? r({
                                  id: 'rf',
                                  cancel: !0,
                                  animations: ['runfalling'],
                              })
                            : r({
                                  id: 'falling',
                                  cancel: !0,
                                  animations: ['falling'],
                              })
                    else if (this.states.jumping) {
                        var a = this.states.running
                            ? ['torunjump', 'runjump']
                            : ['tostilljump', 'stilljump']
                        r({
                            id: this.states.running ? 'runjump' : 'stilljump',
                            cancel: !0,
                            animations: a,
                        })
                    } else
                        this.states.running &&
                            r({
                                id: 'run',
                                cancel: !0,
                                animations: ['from' + n, 'torun', 'run'],
                            })
                    ;(this.sprite.update() || o) &&
                        (null ===
                            (e = (t = this.animationEndCallbacks)[
                                this.sprite.curAnimation
                            ]) ||
                            void 0 === e ||
                            e.call(t),
                        this.animationQueue.length > 0 &&
                            this.sprite.setCurAnimation(
                                this.animationQueue.shift()
                            ))
                }),
                (e.prototype.render = function () {
                    ;(this.printbox &&
                        this.sprite.render(
                            this.printbox.x,
                            this.printbox.y,
                            this.printbox.w,
                            this.printbox.h,
                            this.states.headingLeft
                        ),
                        this.hitbox.render())
                }),
                e
            )
        })(s),
        H = (function () {
            var t = function (e, i) {
                return (
                    (t =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e
                            }) ||
                        function (t, e) {
                            for (var i in e)
                                Object.prototype.hasOwnProperty.call(e, i) &&
                                    (t[i] = e[i])
                        }),
                    t(e, i)
                )
            }
            return function (e, i) {
                if ('function' != typeof i && null !== i)
                    throw new TypeError(
                        'Class extends value ' +
                            String(i) +
                            ' is not a constructor or null'
                    )
                function n() {
                    this.constructor = e
                }
                ;(t(e, i),
                    (e.prototype =
                        null === i
                            ? Object.create(i)
                            : ((n.prototype = i.prototype), new n())))
            }
        })(),
        R = (function (t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this
            }
            return (
                H(e, t),
                (e.prototype.on_enter = function () {
                    ;(this.environments.push(E.getInstance()),
                        this.environments.push(w.getInstance()),
                        this.environments.push(S.getInstance()),
                        this.environments.push(_.getInstance()),
                        this.register(new T(0, 1500)),
                        this.register(
                            new j({
                                x: 0,
                                y: 1800,
                                w: 800,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 200,
                                y: 1060,
                                w: 80,
                                h: 700,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 400,
                                y: 760,
                                w: 80,
                                h: 700,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 400,
                                y: 1600,
                                w: 200,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 700,
                                y: 1600,
                                w: 160,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 1e3,
                                y: 1500,
                                w: 200,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 1300,
                                y: 1400,
                                w: 150,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 1500,
                                y: 1300,
                                w: 150,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 1700,
                                y: 1200,
                                w: 150,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 1800,
                                y: 1100,
                                w: 150,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 2e3,
                                y: 1e3,
                                w: 100,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 2300,
                                y: 1e3,
                                w: 100,
                                h: 40,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 2600,
                                y: 1400,
                                w: 300,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 3e3,
                                y: 1300,
                                w: 80,
                                h: 200,
                                moving: !1,
                                color: 'blue',
                            })
                        ),
                        this.register(
                            new j({
                                x: 3200,
                                y: 1800,
                                w: 500,
                                h: 100,
                                moving: !1,
                                color: 'blue',
                            })
                        ))
                }),
                (e.prototype.on_exit = function () {
                    this.clean()
                }),
                (e.prototype.update = function () {
                    t.prototype.update.call(this)
                }),
                (e.prototype.render = function () {
                    t.prototype.render.call(this)
                }),
                e
            )
        })(y)
    window.addEventListener('load', function () {
        var t = b.getInstance()
        t.fsm.pushState(new R())
        var e = performance.now()
        requestAnimationFrame(function i(n) {
            ;((t.dt = n - e),
                (e = n),
                t.update(),
                t.render(),
                requestAnimationFrame(i))
        })
    })
})()
