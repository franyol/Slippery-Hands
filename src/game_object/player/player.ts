import { Game, GameSingleton } from "../../game/game";
import { Sprite } from "../../visual/sprite";
import { GameObject, HitBox, Physics } from "../base";
import { CollidedSingleton } from "../environments/collisions";
import { GravitySingleton } from "../environments/gravity";
import { InBoundsSingleton } from "../environments/out_of_bouds";

const spritedir = '../../../static/assets/images/main-character/'

export class Player implements GameObject {
	uuid: number = 0
	prio: number = 0
	game: Game

	physics: Physics
	hitbox: HitBox
	sprite: Sprite

	headingLeft: boolean = false

	runningspeed: number = 40
	jumpingForce: number = 180

	constructor (x: number, y: number) {
		this.game = GameSingleton.getInstance()
		this.sprite = new Sprite(spritedir, 'main-character')
		this.physics = new Physics(2)
		this.physics.x = x
		this.physics.y = y
		this.hitbox = new HitBox(
			this.physics, 0, 0, 100, 100, 'standard', 0
		)
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

		InBoundsSingleton.getInstance().register(this.hitbox)
		CollidedSingleton.getInstance().register(this.hitbox)
		GravitySingleton.getInstance().register(this.hitbox)
	}

	update() {
		const input = this.game.inputHandler

		this.physics.recordHistory()

		const coords = input.getTouchCoords()
		let up, down, left, right

		if (coords) {
			up = coords.y < window.innerHeight/4
			down = coords.y > window.innerHeight*3/4
			left = coords.x < window.innerWidth/4
			right = coords.x > window.innerWidth*3/4
		} else {
			up = input.getKeyOnce('ArrowUp') === 'down'
			down = input.getKeyState('ArrowDown') === 'down'
			left = input.getKeyState('ArrowLeft') === 'down'
			right = input.getKeyState('ArrowRight') === 'down'
		}

		this.physics.xspeed = 0
		if (left) {
			this.physics.xspeed -= this.runningspeed
			this.headingLeft = true
		} else if (right) {
			this.physics.xspeed += this.runningspeed
			this.headingLeft = false
		}

		this.hitbox.colliders.map((collider) => {
			if (collider.y >= this.physics.y + this.hitbox.h)
				if (up) {
					this.physics.yspeed -= this.jumpingForce
				}
		})

		// Trigger animations by condition
		if (this.physics.xspeed === 0 && 
			!['stand', 'tostand'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('tostand')
		} else if (this.physics.xspeed !== 0 &&
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

		this.physics.update()
	}

	render() {
		if (this.hitbox) {
			this.sprite.render(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h, this.headingLeft)
		}
	}
}
