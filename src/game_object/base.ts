import { Game, GameSingleton } from '../game/game'

type EventCallback = (...args: any[]) => void

export abstract class GameObject {
    uuid: number
    prio: number = 0
    game!: Game

    private events: Map<string, EventCallback[]> = new Map()

    constructor(uuid: number) {
        this.uuid = uuid
    }

    on(event: string, callback: EventCallback): void {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }

        this.events.get(event)!.push(callback)
    }

    emit(event: string, ...args: any[]): void {
        const callbacks = this.events.get(event)

        if (!callbacks) return

        for (const cb of callbacks) {
            cb(...args)
        }
    }

    off(event: string, callback: EventCallback): void {
        const callbacks = this.events.get(event)

        if (!callbacks) return

        this.events.set(
            event,
            callbacks.filter((cb) => cb !== callback)
        )
    }

    abstract update(): void
    abstract render(): void
}

export class Physics {
    _xspeed: number[] = []
    _yspeed: number[] = []
    xfriction: number
    yfriction: number
    _x: number[] = []
    _y: number[] = []
    n: number
    parent: GameObject

    constructor({
        historyLen,
        x,
        y,
        xfriction,
        yfriction,
        parent,
    }: {
        historyLen: number
        x: number
        y: number
        xfriction: number
        yfriction: number
        parent: GameObject
    }) {
        this.n = historyLen
        for (let i = 0; i < this.n; i++) {
            this._xspeed.push(0)
            this._yspeed.push(0)
            this._x.push(0)
            this._y.push(0)
        }
        this.xfriction = xfriction
        this.yfriction = yfriction
        this.x = x
        this.y = y
        this.parent = parent
    }

    recordHistory() {
        for (let i = 0; i < this.n - 1; i++) {
            this._x[i] = this._x[i + 1]
            this._y[i] = this._y[i + 1]
            this._xspeed[i] = this._xspeed[i + 1]
            this._yspeed[i] = this._yspeed[i + 1]
        }
    }

    update() {
        const dt = GameSingleton.getInstance().dt
        this.x += (this.xspeed * dt) / 100
        this.y += (this.yspeed * dt) / 100

        if (this.xfriction !== 0) {
            const f = (this.xfriction * dt) / 100
            if (Math.abs(this.xspeed) < f) {
                this.xspeed = 0
            } else {
                this.xspeed += this.xspeed > 0 ? -f : f
            }
        }
        if (this.yfriction !== 0) {
            const f = (this.yfriction * dt) / 100
            if (Math.abs(this.yspeed) < f) {
                this.yspeed = 0
            } else {
                this.yspeed += this.yspeed > 0 ? -f : f
            }
        }
    }

    get x(): number {
        return this._x[this.n - 1]
    }

    set x(value: number) {
        this._x[this.n - 1] = value
    }

    get xspeed(): number {
        return this._xspeed[this.n - 1]
    }

    set xspeed(value: number) {
        this._xspeed[this.n - 1] = value
    }

    get y(): number {
        return this._y[this.n - 1]
    }

    set y(value: number) {
        this._y[this.n - 1] = value
    }

    get yspeed(): number {
        return this._yspeed[this.n - 1]
    }

    set yspeed(value: number) {
        this._yspeed[this.n - 1] = value
    }
}

export type HitBoxTypes = 'standard' | 'stop' | 'ui' | 'virtual'

export class HitBox {
    parent: Physics
    _x: number
    _y: number
    w: number
    h: number
    colliders: HitBox[]
    type: HitBoxTypes
    layer: number
    color: string = 'pink'

    /**
     *	x and y are relative to the parent position
     */
    constructor(
        parent: Physics,
        x: number,
        y: number,
        w: number,
        h: number,
        type: HitBoxTypes = 'standard',
        layer: number = 0
    ) {
        this.parent = parent
        this._x = x
        this._y = y
        this.w = w
        this.h = h
        this.colliders = []
        this.type = type
        this.layer = layer
    }

    get x(): number {
        return this._x + this.parent.x
    }

    get y(): number {
        return this._y + this.parent.y
    }

    getx(n: number): number {
        if (n >= this.parent.n) {
            return this.x
        }
        return this._x + this.parent._x[this.parent.n - 1 - n]
    }

    gety(n: number): number {
        if (n >= this.parent.n) {
            return this.y
        }
        return this._y + this.parent._y[this.parent.n - 1 - n]
    }

    render() {
        const ctx = GameSingleton.getInstance().canvas.getContext('2d')
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, this.w, this.h)
    }
}

export interface Environment {
    objects: unknown[]

    update(): void
    register(obj: unknown): void
    deregister(obj: unknown): void
    clean(): void
}
