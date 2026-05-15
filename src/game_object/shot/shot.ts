import { Game, GameSingleton } from '../../game/game'
import { Sprite } from '../../visual/sprite'
import { GameObject, HitBox, Physics } from '../base'

const spritedir = '../../../static/assets/images/shoot/'

export class Shot extends GameObject {
    uuid: number = 0
    prio: number = 0
    game: Game

    physics: Physics
    hitbox: HitBox
    printbox: HitBox
    sprite: Sprite

    headingLeft: boolean = false

    constructor(x: number, y: number, dest_x: number, dest_y: number) {
        super(0)

        this.game = GameSingleton.getInstance()
        this.sprite = new Sprite(spritedir, 'base')

        this.headingLeft = x > dest_x

        this.physics = new Physics({
            historyLen: 1,
            x,
            y,
            xfriction: 0,
            yfriction: 0,
            parent: this,
        })

        const length = Math.sqrt((dest_x - x) ** 2 + (dest_y - y) ** 2)

        this.printbox = new HitBox(this.physics, 0, 0, length, 32, 'line', 0)
        this.hitbox = new HitBox(
            this.physics,
            0,
            0,
            dest_x - x,
            dest_y - y,
            'line',
            0
        )

        this.sprite.loadAnimations({
            main: [0, 1, 2, 3, 4, 5, 6, 7],
        })

        this.sprite.setCurAnimation('main')
    }

    update() {
        if (this.sprite.update()) {
            // destroy this object on animation end
            this.game.fsm.getCurState().deregister(this)
        }
    }

    render() {
        if (this.printbox) {
            this.sprite.render(
                this.headingLeft
                    ? this.printbox.x - this.printbox.w
                    : this.printbox.x,
                this.printbox.y,
                this.printbox.w,
                this.printbox.h,
                this.headingLeft,
                false,
                (0 * Math.PI) / 180
            )
        }
    }
}
