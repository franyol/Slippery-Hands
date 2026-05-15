import { Environment, HitBox } from '../base'

function lineLineIntersection(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

    if (denominator === 0) return null // parallel

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator

    const u = -(((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator)

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
        }
    }

    return null
}

export function checkLineCollision(a: HitBox, b: HitBox) {
    if (a.type !== 'line') {
        return { collided: false }
    }

    const ax1 = a.x
    const ay1 = a.y
    const ax2 = a.w
    const ay2 = a.h

    // line vs line
    if (b.type === 'line') {
        const hit = lineLineIntersection(ax1, ay1, ax2, ay2, b.x, b.y, b.w, b.h)

        if (!hit) {
            return { collided: false }
        }

        return {
            collided: true,
            coord: hit,
        }
    }

    // line vs box
    const left = {
        x1: b.x,
        y1: b.y,
        x2: b.x,
        y2: b.y + b.h,
        side: 'left' as const,
    }

    const right = {
        x1: b.x + b.w,
        y1: b.y,
        x2: b.x + b.w,
        y2: b.y + b.h,
        side: 'right' as const,
    }

    const top = {
        x1: b.x,
        y1: b.y,
        x2: b.x + b.w,
        y2: b.y,
        side: 'top' as const,
    }

    const bottom = {
        x1: b.x,
        y1: b.y + b.h,
        x2: b.x + b.w,
        y2: b.y + b.h,
        side: 'bottom' as const,
    }

    const sides = [left, right, top, bottom]

    let closestHit: {
        side: string
        coord: { x: number; y: number }
        dist: number
    } | null = null

    for (const side of sides) {
        const hit = lineLineIntersection(
            ax1,
            ay1,
            ax2,
            ay2,
            side.x1,
            side.y1,
            side.x2,
            side.y2
        )

        if (!hit) continue

        // distance from line start to collision point
        const dx = hit.x - ax1
        const dy = hit.y - ay1
        const dist = dx * dx + dy * dy // squared distance

        if (!closestHit || dist < closestHit.dist) {
            closestHit = {
                side: side.side,
                coord: hit,
                dist,
            }
        }
    }

    if (closestHit) {
        return {
            collided: true,
            side: closestHit.side,
            coord: closestHit.coord,
        }
    }

    return { collided: false }
}

export class Collided implements Environment {
    objects: HitBox[] = []

    clean() {
        this.objects.length = 0
    }

    update() {
        // check collistions
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.objects[i].type === 'line') {
                    const res = checkLineCollision(
                        this.objects[i],
                        this.objects[j]
                    )
                    if (res.collided) {
                        this.objects[i].colliders.push(this.objects[j])
                        this.objects[j].colliders.push(this.objects[i])
                        this.objects[j].parent.parent.emit(
                            'collision',
                            res.side,
                            this.objects[j],
                            this.objects[i],
                            res.coord
                        )
                        this.objects[i].parent.parent.emit(
                            'collision',
                            res.side,
                            this.objects[i],
                            this.objects[j],
                            res.coord
                        )
                    }
                } else if (this.objects[j].type === 'line') {
                    const res = checkLineCollision(
                        this.objects[j],
                        this.objects[i]
                    )
                    if (res.collided) {
                        this.objects[i].colliders.push(this.objects[j])
                        this.objects[j].colliders.push(this.objects[i])
                        this.objects[j].parent.parent.emit(
                            'collision',
                            res.side,
                            this.objects[j],
                            this.objects[i],
                            res.coord
                        )
                        this.objects[i].parent.parent.emit(
                            'collision',
                            res.side,
                            this.objects[i],
                            this.objects[j],
                            res.coord
                        )
                    }
                } else {
                    if (this.collided(this.objects[i], this.objects[j])) {
                        this.objects[i].colliders.push(this.objects[j])
                        this.objects[j].colliders.push(this.objects[i])
                    }
                }
            }
        }
        // do something with each colider
        this.objects.map((hb) => {
            switch (hb.type) {
                case 'stop':
                case 'standard':
                case 'virtual':
                    hb.colliders.map((collider) => {
                        const x_1 = hb.getx(1)
                        const y_1 = hb.gety(1)
                        let side = ''
                        if (x_1 + hb.w <= collider.x) {
                            side = 'right'
                        } else if (x_1 >= collider.x + collider.w) {
                            side = 'left'
                        } else if (y_1 + hb.h <= collider.y) {
                            side = 'bottom'
                        } else if (y_1 >= collider.y + collider.h) {
                            side = 'top'
                        } else {
                            // overlap case
                            const overlapLeft = x_1 + hb.w - collider.x
                            const overlapRight = collider.x + collider.w - x_1
                            const overlapTop = y_1 + hb.h - collider.y
                            const overlapBottom = collider.y + collider.h - y_1
                            const minOverlap = Math.min(
                                overlapLeft,
                                overlapRight,
                                overlapTop,
                                overlapBottom
                            )

                            if (minOverlap === overlapLeft) {
                                side = 'right'
                            } else if (minOverlap === overlapRight) {
                                side = 'left'
                            } else if (minOverlap === overlapTop) {
                                side = 'bottom'
                            } else {
                                side = 'top'
                            }
                        }
                        if (hb.type !== 'virtual' && collider.type === 'stop') {
                            switch (side) {
                                case 'right':
                                    hb.parent.x = collider.x - hb.w - hb._x
                                    hb.parent.xspeed = 0
                                    break
                                case 'left':
                                    hb.parent.x =
                                        collider.x + collider.w - hb._x
                                    hb.parent.xspeed = 0
                                    break
                                case 'top':
                                    hb.parent.y =
                                        collider.y + collider.h - hb._y
                                    hb.parent.yspeed = 0
                                    break
                                case 'bottom':
                                    hb.parent.y = collider.y - hb.h - hb._y
                                    hb.parent.yspeed = 0
                                    break
                                default:
                                    break
                            }
                        }
                        hb.parent.parent.emit('collision', side, hb, collider)
                    })
                    break
                default:
                    break
            }
            hb.colliders = []
        })
    }

    collided(a: HitBox, b: HitBox) {
        if (a.layer !== b.layer) return false

        const xOverlap = a.x < b.x + b.w && a.x + a.w > b.x
        const yOverlap = a.y < b.y + b.h && a.y + a.h > b.y

        return xOverlap && yOverlap
    }

    register(obj: HitBox) {
        this.objects.push(obj)
    }

    deregister(obj: HitBox): void {
        this.objects = this.objects.filter((o) => o !== obj)
    }
}

export class CollidedSingleton {
    private static instance: Collided

    private constructor() {}

    static getInstance(): Collided {
        if (!CollidedSingleton.instance) {
            CollidedSingleton.instance = new Collided()
        }
        return CollidedSingleton.instance
    }
}
