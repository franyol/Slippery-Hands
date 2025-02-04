import { Game } from "../../game/game";
import { KeyState } from "../../input_handler/handler";
import { Sprite } from "../../visual/sprite";
import { GameObject, HitBox, Physics } from "../base";

const spritedir = '../../../static/assets/images/UI/'

export class Button implements GameObject {
	uuid: number = 0
	prio: number = -1
	game: Game

	hitbox: HitBox
	physics: Physics
	sprite: Sprite

	pressed: boolean = false
	touchIdx: number = -1
	keyState: KeyState = 'iddle'

	position: 'Bottom-Right' | 'Bottom-Left'

	x: number
	y: number

	placeholder: boolean

	constructor (game: Game, x: number, y: number, w: number, h: number, letter: 'A' | 'B', position: 'Bottom-Right' | 'Bottom-Left', placeholder: boolean = false) {
		this.placeholder = placeholder
		this.game = game
		this.position = position
		this.sprite = new Sprite(spritedir, 'Button-' + letter, true)
		this.physics = new Physics(1)
		this.x = x
		this.y = y

		this.hitbox = new HitBox(
			this.physics, 0, 0, w, h, 'ui', 0
		)

	}

	update() {
		if (this.placeholder) return

		const input = this.game.inputHandler
		const touches = input.touches

		this.physics.x =
			(this.position === 'Bottom-Left') ? 0 + this.x :
			(this.position === 'Bottom-Right') ? this.game.uicanvas.width - this.x :
			this.x

		this.physics.y =
			(this.position === 'Bottom-Left') ? this.game.uicanvas.height - this.y :
			(this.position === 'Bottom-Right') ? this.game.uicanvas.height - this.y :
			this.y

		if (this.touchIdx < 0) {
			for (const [id, touch] of Object.entries(touches)) {
				if (touch.state !== 'down' || touch.isbusy || !this.touched(touch.x, touch.y)) {
					return
				}
				this.touchIdx = id as unknown as number
				this.keyState = 'down'
				touch.isbusy = true
			}
		} else {
			const touch = input.getTouchState(this.touchIdx)
			if (touch.state === 'up') {
				this.keyState = 'up'
				this.touchIdx = -1
			} else if (!this.touched(touch.x, touch.y)) {
				delete touches[this.touchIdx]
				this.keyState = 'up'
				this.touchIdx = -1
				touch.isbusy = false
			}
		}
		this.pressed = this.keyState === 'down'
		this.sprite.setCurrentFrame(this.pressed ? 1 : 0)
	}

	touched(x: number, y: number) {
		const xoverlap = x >= this.hitbox.x && x <= this.hitbox.x + this.hitbox.w;
		const yoverlap = y >= this.hitbox.y && y <= this.hitbox.y + this.hitbox.h;

		return xoverlap && yoverlap
	}

	render() {
		if (this.placeholder) return

		if (this.hitbox) {
			this.sprite.render(
				this.hitbox.x,
				this.hitbox.y,
				this.hitbox.w,
				this.hitbox.h,
				false
			)
		}
	}
}
