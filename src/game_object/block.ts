import { Game, GameSingleton } from '../game/game'
import { GameObject, HitBox, Physics } from './base'
import { CollidedSingleton } from './environments/collisions'

export class Block extends GameObject {
    uuid: number = 0
    prio: number = 0
    game: Game

    hitbox: HitBox
    physics: Physics

    moving: boolean

    constructor({
        x,
        y,
        w,
        h,
        moving,
        color,
    }: {
        x: number
        y: number
        w: number
        h: number
        moving: boolean
        color: string
    }) {
        super(0)
        this.game = GameSingleton.getInstance()
        this.physics = new Physics({
            historyLen: moving ? 2 : 1,
            x,
            y,
            xfriction: 0,
            yfriction: 0,
            parent: this,
        })
        this.physics.parent = this
        this.physics.x = x
        this.physics.y = y
        this.hitbox = new HitBox(
            this.physics,
            0,
            0,
            w,
            h,
            moving ? 'standard' : 'stop',
            0
        )
        this.hitbox.color = color
        this.moving = moving

        //InBoundsSingleton.getInstance().register(this.hitbox)
        CollidedSingleton.getInstance().register(this.hitbox)
    }

    update() {
        const input = this.game.inputHandler

        if (this.moving) {
            this.physics.recordHistory()

            let up, down, left, right

            up = input.getKeyState('ArrowUp') === 'down'
            down = input.getKeyState('ArrowDown') === 'down'
            left = input.getKeyState('ArrowLeft') === 'down'
            right = input.getKeyState('ArrowRight') === 'down'

            this.physics.yspeed = up ? -25 : down ? 25 : 0
            this.physics.xspeed = right ? 25 : left ? -25 : 0

            this.physics.update()
        }
    }

    render() {
        this.hitbox.render()
    }
}
