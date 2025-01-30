import { Game, GameSingleton } from "../../game/game";
import { Sprite } from "../../visual/sprite";
import { GameObject, HitBox, Physics } from "../base";
import { CameraFollowSingleton } from "../environments/cam_follow";
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
	printbox: HitBox
	sprite: Sprite

	headingLeft: boolean = false

	runningspeed: number = 40
	jumpingForce: number = 210
	iddleTime: number = 5000

	constructor (x: number, y: number) {
		this.game = GameSingleton.getInstance()
		this.sprite = new Sprite(spritedir, 'main-character')
		this.physics = new Physics(2)
		this.physics.x = x
		this.physics.y = y
		this.printbox = new HitBox(
			this.physics, 0, 0, 64, 64, 'standard', 0
		)
		this.hitbox = new HitBox(
			this.physics, 7, 0, 50, 64, 'standard', 0
		)
		this.sprite.loadAnimations({
			'stand': [0, 1],
			'toiddle': [2],
			'iddle': [3, 4, 3, 4, 3, 4, 3],
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
		CameraFollowSingleton.getInstance().register(this.printbox)
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

		this.handleAnimations()

		this.physics.update()
	}

	handleAnimations() {
		// Trigger animations by condition
		if (this.physics.xspeed === 0) {
			if (this.sprite.animTime > this.iddleTime) {
				this.sprite.setCurAnimation((this.sprite.curAnimation === 'prepare') ? 'tostand' : 'toiddle')
			} else if (!['prepare', 'toprepare', 'stand', 'tostand', 'toiddle', 'iddle'].includes(this.sprite.curAnimation)) {
				this.sprite.setCurAnimation('prepare')	
			}
		} else if (this.physics.xspeed !== 0 &&
			!['run', 'torun'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('torun')
		}

		// Trigger animations automatically
		if (this.sprite.update()) {
			switch(this.sprite.curAnimation) {
				case 'toprepare':
					this.sprite.setCurAnimation('prepare')
					break;
				case 'tostand':
				case 'iddle':
					this.sprite.setCurAnimation('stand')
					break;
				case 'torun':
					this.sprite.setCurAnimation('run')
					break;
				case 'toiddle':
					this.sprite.setCurAnimation('iddle')
					break;
			}
		}
	}

	render() {
		if (this.printbox) {
			this.sprite.render(this.printbox.x, this.printbox.y, this.printbox.w, this.printbox.h, this.headingLeft)
		}
	}
}
