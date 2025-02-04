import { Game } from "../../game/game";
import { KeyState } from "../../input_handler/handler";
import { Sprite } from "../../visual/sprite";
import { GameObject, HitBox, Physics } from "../base";
import { Button } from "./button";

const spritedir = '../../../static/assets/images/UI/'

type JoyState = {
	up: Button
	left: Button
	right: Button
	down: Button
}

export class Joystick implements GameObject {
	uuid: number = 0
	prio: number = -1
	game: Game

	hitbox: HitBox
	physics: Physics
	sprite: Sprite
	spritemove: Sprite

	pressed: boolean = false
	touchIdx: number = -1
	joyState: JoyState

	position: 'Bottom-Right' | 'Bottom-Left'

	x: number
	y: number

	initial: {x: number, y: number} = {x: 0, y: 0}
	current: {x: number, y: number} = {x: 0, y: 0}
	deadzone: number

	constructor(game: Game, x: number, y: number, w: number, h: number, position: 'Bottom-Right' | 'Bottom-Left', deadzone: number = 20) {
		this.deadzone = deadzone
		this.game = game
		this.position = position
		this.sprite = new Sprite(spritedir, 'Joystick', true)
		this.sprite.waitUntilReady()
		.then(() => {
			this.sprite.setCurrentFrame(1)
		})
		this.spritemove = new Sprite(spritedir, 'Joystick', true)
		this.spritemove.waitUntilReady()
		.then(() => {
			this.spritemove.setCurrentFrame(0)
		})
		this.physics = new Physics(1)
		this.x = x
		this.y = y

		this.hitbox = new HitBox(
			this.physics, 0, 0, w, h, 'ui', 0
		)

		this.joyState = {
			up: new Button(game, 0, 0, 0, 0, 'A', 'Bottom-Right', true),
			down: new Button(game, 0, 0, 0, 0, 'A', 'Bottom-Right', true),
			right: new Button(game, 0, 0, 0, 0, 'A', 'Bottom-Right', true),
			left: new Button(game, 0, 0, 0, 0, 'A', 'Bottom-Right', true)
		}
	}

	update() {
		const input = this.game.inputHandler
		const touches = input.touches

		const debug = Object.entries(touches)
		.map(([id, touch]) => `ID: ${id}, State: ${touch.state}, Busy: ${touch.isbusy}, X: ${touch.x}, Y: ${touch.y}`)
		.join('\n')

		this.game.debugText = 'DEBUG:\n'+debug

		this.physics.x =
			(this.position === 'Bottom-Left') ? 0 + this.x :
			(this.position === 'Bottom-Right') ? this.game.uicanvas.width - this.x :
			this.x

		this.physics.y =
			(this.position === 'Bottom-Left') ? this.game.uicanvas.height - this.y :
			(this.position === 'Bottom-Right') ? this.game.uicanvas.height - this.y :
			this.y
		if (!this.pressed) {
			this.initial.x = this.physics.x
			this.initial.y = this.physics.y
			this.current = {...this.initial}
		}		

		if (this.touchIdx < 0) {
			for (const [id, touch] of Object.entries(touches)) {
				if (touch.state !== 'down' || touch.isbusy || !this.touched(touch.x, touch.y)) {
					continue
				}
				this.touchIdx = id as unknown as number
				this.pressed = true
				touch.isbusy = true
				this.initial.x = touch.x - this.hitbox.w/2
				this.initial.y = touch.y - this.hitbox.h/2
				this.current = {...this.initial}
			}
		} else {
			const touch = input.getTouchState(this.touchIdx)
			if (touch.state === 'up') {
				this.pressed = false
				touch.isbusy = false
				this.touchIdx = -1
				Object.values(this.joyState).forEach((button) => {
					button.keyState = 'up'
				})
			} else {
				this.current.x = touch.x - this.hitbox.w/2
				this.current.y = touch.y - this.hitbox.h/2
				
				this.joyState.up.keyState = 
					this.handleMove(this.joyState.up.keyState, 
									this.current.y > this.initial.y + this.deadzone)
				this.joyState.down.keyState = 
					this.handleMove(this.joyState.down.keyState, 
									this.current.y < this.initial.y - this.deadzone)
				this.joyState.right.keyState = 
					this.handleMove(this.joyState.right.keyState, 
									this.current.x > this.initial.x + this.deadzone)
				this.joyState.left.keyState = 
					this.handleMove(this.joyState.left.keyState, 
									this.current.x < this.initial.x - this.deadzone)
			}
		}
	}

	handleMove(state: KeyState, condition: boolean): KeyState {
		if (condition) {
			return 'down'
		} else if (state === 'down') {
			return 'up'
		} else {
			return state
		}
	}

	touched(x: number, y: number) {
		const xoverlap = x >= this.hitbox.x && x <= this.hitbox.x + this.hitbox.w;
		const yoverlap = y >= this.hitbox.y && y <= this.hitbox.y + this.hitbox.h;

		return xoverlap && yoverlap
	}

	render() {
		if (!this.hitbox) {
			return
		}

		this.sprite.render(
			this.initial.x,
			this.initial.y,
			this.hitbox.w,
			this.hitbox.h,
			false
		)
		this.spritemove.render(
			this.current.x,
			this.current.y,
			this.hitbox.w,
			this.hitbox.h,
			false
		)
	}
}
