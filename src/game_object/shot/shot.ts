import { ASSET_BASE } from '../../config/config'
import { Game, GameSingleton } from '../../game/game'
import { Sprite } from '../../visual/sprite'
import { GameObject, HitBox, Physics } from '../base'
import { CollidedSingleton } from '../environments/collisions'

const spritedir = `${ASSET_BASE}/images/shoot/`

export class Shot extends GameObject {
  uuid: number = 0
  prio: number = 0
  game: Game

  physics: Physics
  hitbox: HitBox
  printbox: HitBox
  sprite: Sprite

  nearest: number = 500
  nearestSide: string = ''

  headingLeft: boolean = false
  angle: number = 0
  nearestCoord: { x: number; y: number }

  constructor(x: number, y: number, dest_x: number, dest_y: number) {
    super(0)

    this.game = GameSingleton.getInstance()
    this.sprite = new Sprite(spritedir, 'base')

    this.headingLeft = x > dest_x

    this.angle = Math.atan2(dest_y - y, dest_x - x)

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
    this.hitbox = new HitBox(this.physics, 0, 16, dest_x, dest_y, 'line', 0)

    this.sprite.loadAnimations('shot', {
      main: [0, 1, 2, 3, 4, 5, 6, 7],
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
        const dist = Math.sqrt(
          (hb.x - coord.x) ** 2 + (hb.y - coord.y) ** 2
        )

        if (dist < this.nearest) {
          this.printbox.w = dist
          this.nearest = dist
          this.nearestSide = side
          this.nearestCoord = coord
        }
      }
    )

    const collided = CollidedSingleton.getInstance()
    collided.register(this.hitbox)
    collided.update()
    collided.deregister(this.hitbox)
  }

  update() {
    if (
      (this.headingLeft && this.nearestSide === 'left') ||
      (!this.headingLeft && this.nearestSide === 'right')
    ) {
      this.printbox.w = 0
    }

    /* For visual render test mode
    if (this.nearestCoord) {
        this.hitbox.w = this.nearestCoord.x - this.hitbox.x
        this.hitbox.h = this.nearestCoord.y - this.hitbox.y
        console.log(this.nearestCoord)
    }
    */

    if (this.sprite.update()) {
      // destroy this object on animation end
      this.game.fsm.getCurState().deregister(this)
    }
  }

  render() {
    if (this.printbox) {
      this.sprite.render({
        x: this.printbox.x,
        y: this.printbox.y,
        w: this.printbox.w,
        h: this.printbox.h,
        //flipHorizontal: this.headingLeft,
        rotate_rad: this.angle,
        pivotx: 0,
        pivoty: this.printbox.h / 2,
      })
    }
  }
}
