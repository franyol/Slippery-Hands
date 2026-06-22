import { ASSET_BASE } from '../../config/config'
import { Game, GameSingleton } from '../../game/game'
import { Sprite } from '../../visual/sprite'
import { GameObject, HitBox, Physics } from '../base'
import { CollidedSingleton } from '../environments/collisions'
import { GravitySingleton } from '../environments/gravity'
import { InBoundsSingleton } from '../environments/out_of_bouds'

const spritedir = `${ASSET_BASE}/images/gun/`

export class Gun extends GameObject {
    uuid: number = 0
    prio: number = 0
    game: Game

    physics: Physics
    hitbox: HitBox
    printbox: HitBox
    sprite: Sprite

    headingLeft: boolean = false
    angle: number = 0

    constructor(x: number, y: number, xspeed: number, yspeed: number) {
        super(0)

        this.game = GameSingleton.getInstance()
        this.sprite = new Sprite(spritedir, 'gun')

        this.physics = new Physics({
            historyLen: 2,
            x,
            y,
            xfriction: 500,
            yfriction: 5000,
            parent: this,
        })
        this.physics.xspeed = xspeed
        this.physics.yspeed = yspeed

        this.printbox = new HitBox(this.physics, 0, 0, 32, 32, 'standard', 0)
        this.hitbox = new HitBox(this.physics, 0, 0, 32, 32, 'standard', 0)

        this.sprite.loadAnimations('gun', {
            main: [0],
        })

        this.sprite.setCurAnimation('main')

        this.on(
            'collision',
            (
                side: string,
                hb: HitBox,
                collider: HitBox,
                coord?: { x: number; y: number }
            ) => {
                if (collider.type === 'stop') {
                    switch (side) {
                        case 'top':
                        case 'bottom':
                            this.physics.yspeed -=
                                this.physics._yspeed[this.physics.n - 2]
                            break
                        case 'left':
                        case 'right':
                            this.physics.xspeed -=
                                this.physics._xspeed[this.physics.n - 2]
                            break
                    }
                } else if (
                    collider.type === 'standard' &&
                    collider.parent.parent.uuid === 64
                ) {
                    // Using uuid 64 to identify player objects
                    collider.parent.parent.emit('grab_gun', this)
                }
            }
        )

        InBoundsSingleton.getInstance().register(this.hitbox)
        CollidedSingleton.getInstance().register(this.hitbox)
        GravitySingleton.getInstance().register(this.hitbox)
    }

    destroy() {
        CollidedSingleton.getInstance().deregister(this.hitbox)
        GravitySingleton.getInstance().deregister(this.hitbox)
        this.game.fsm.getCurState().deregister(this)
    }

    update() {
        this.physics.update()
        this.sprite.update()
    }

    render() {
        if (this.printbox) {
            this.hitbox.render()
            this.sprite.render({
                x: this.printbox.x,
                y: this.printbox.y,
                w: this.printbox.w,
                h: this.printbox.h,
                flipHorizontal: this.headingLeft,
                rotate_rad: this.angle,
            })
        }
    }
}
