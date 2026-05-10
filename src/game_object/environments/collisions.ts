import { Environment, HitBox } from '../base'

export class Collided implements Environment {
    objects: HitBox[] = []

    clean() {
        this.objects.length = 0
    }

    update() {
        // check collistions
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                if (this.collided(this.objects[i], this.objects[j])) {
                    this.objects[i].colliders.push(this.objects[j])
                    this.objects[j].colliders.push(this.objects[i])
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
                        if (collider.type !== 'stop') return
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
                        if (hb.type != 'virtual') {
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
                        hb.parent.parent.emit('collision', side, hb)
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
