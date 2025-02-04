import { Game, GameSingleton } from "../../game/game";
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

	constructor (game: Game, x: number, y: number, w: number, h: number, letter: 'A' | 'B') {
		this.game = game
		this.sprite = new Sprite(spritedir, 'Button-' + letter, true)
		this.physics = new Physics(1)
		this.physics.x = x
		this.physics.y = y

		this.hitbox = new HitBox(
			this.physics, 0, 0, w, h, 'ui', 0
		)

	}

	update() {
		const input = this.game.inputHandler
		const touches = input.touches

		if (this.touchIdx < 0) {
			for (const [id, touch] of Object.entries(touches)) {
				if (touch.state !== 'down' || !this.touched(touch.x, touch.y)) {
					return
				}
				this.touchIdx = id as unknown as number
				this.keyState = 'down'
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
