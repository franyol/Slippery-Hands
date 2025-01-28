import { Game, GameSingleton } from "../../game/game";
import { Sprite } from "../../visual/sprite";
import { GameObject, HitBox } from "../base";
import { CollidedSingleton } from "../environments/collisions";
import { GravitySingleton } from "../environments/gravity";
import { InBoundsSingleton } from "../environments/out_of_bouds";

const spritedir = '../../../static/assets/images/main-character/'

export class Player implements GameObject {
	uuid: number = 0
	prio: number = 0
	game: Game

	xspeed: number = 0
	yspeed: number = 0

	hitbox: HitBox
	sprite: Sprite

	headingLeft: boolean = false

	constructor (x: number, y: number) {
		this.game = GameSingleton.getInstance()
		this.sprite = new Sprite(spritedir, 'main-character')
		this.sprite.loadAnimations({
			'stand': [0, 1],
			'toiddle': [2],
			'iddle': [3, 4],
			'tostand': [5],
			'toprepare': [5],
			'prepare': [6, 7],
			'torun': [8],
			'run': [9, 10, 11, 12, 13, 14, 15, 12]
		})
		this.sprite.setCurAnimation('stand')

		this.hitbox = { 
			x, y, w: 100, h: 100, 
			x_1: x, y_1: y,
			colliders: [], 
			visible: true, 
			type: 'standard',
			layer: 0
		}

		InBoundsSingleton.getInstance().register(this.hitbox)
		CollidedSingleton.getInstance().register(this.hitbox)
		GravitySingleton.getInstance().register(this)
	}

	update() {
		const input = this.game.inputHandler

		this.hitbox.x_1 = this.hitbox.x
		this.hitbox.y_1 = this.hitbox.y

		const coords = input.getTouchCoords()
		let up, down, left, right

		if (coords) {
			up = coords.y < this.game.canvas.height/4
			down = coords.y > this.game.canvas.height*3/4
			left = coords.x < this.game.canvas.width/4
			right = coords.x > this.game.canvas.width*3/4
		} else {
			up = input.getKeyState('ArrowUp') === 'down'
			down = input.getKeyState('ArrowDown') === 'down'
			left = input.getKeyState('ArrowLeft') === 'down'
			right = input.getKeyState('ArrowRight') === 'down'
		}

		this.xspeed = 0
		if (left) {
			this.xspeed -= 2
			this.headingLeft = true
		} else if (right) {
			this.xspeed += 2
			this.headingLeft = false
		}

		// Trigger animations by condition
		if (this.xspeed === 0 && 
			!['stand', 'tostand'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('tostand')
		} else if (this.xspeed !== 0 &&
			!['run', 'torun'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('torun')
		}

		// Trigger animations automatically
		if (this.sprite.update()) {
			switch(this.sprite.curAnimation) {
				case 'tostand':
					this.sprite.setCurAnimation('stand')
				break;
				case 'torun':
					this.sprite.setCurAnimation('run')
				break;
			}
		}

		this.hitbox.x += this.xspeed
		this.hitbox.y += this.yspeed
	}

	render() {
		if (this.hitbox) {
			this.sprite.render(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h, this.headingLeft)
		}
	}
}
