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
	jumping: boolean = false
	falling: boolean = false
	headbumping: boolean = false
	rolling: boolean = false
	running: boolean = false
	cantmove: boolean = false

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
			'fromiddle': [2],
			'iddle': [3, 4, 3, 4, 3, 4, 3],
			'tostand': [5],
			'tostilljump': [16],
			'stilljump': [17],
			'torunjump': [31],
			'runjump': [13],
			'falling': [18],
			'bumpfalling': [19],
			'bumppain': [20, 21, 22, 21, 22, 23, 24, 23, 24, 22, 20],
			'runfalling': [13],
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
		this.running = false
		if (left && !this.cantmove) {
			this.physics.xspeed -= this.runningspeed
			this.headingLeft = true
			this.running = true
		} else if (right && !this.cantmove) {
			this.physics.xspeed += this.runningspeed
			this.headingLeft = false
			this.running = true
		}

		this.hitbox.colliders.map((collider) => {
			if (collider.y >= this.physics.y + this.hitbox.h) {
				if (up && !this.cantmove && !this.headbumping) {
					this.physics.yspeed -= this.jumpingForce
					this.jumping = true
				} else {
					this.jumping = false
				}
				if (this.headbumping) {
					this.cantmove = true
					this.sprite.setCurAnimation('bumppain')
				}
			} else if (collider.y + collider.h <= this.hitbox.y && collider.type === 'stop') {
				this.headbumping = true
			}
		})
		this.falling = this.jumping && this.physics.yspeed > 0

		this.handleAnimations()

		this.physics.update()
	}

	handleAnimations() {
		// Trigger animations by condition
		if (!this.running && !this.jumping) {
			if (this.sprite.animTime > this.iddleTime) {
				this.sprite.setCurAnimation((this.sprite.curAnimation === 'prepare') ? 'tostand' : 'toiddle')
			} else if (!['prepare', 'toprepare', 'stand', 'tostand', 'toiddle', 'iddle', 'fromiddle', 'bumppain'].includes(this.sprite.curAnimation)) {
				this.sprite.setCurAnimation('prepare')	
			}
		} else if (this.running && !this.jumping &&
			!['run', 'torun'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('torun')
		} else if (this.jumping) {
			if (this.falling) {
				if (this.headbumping) {
					if (!['bumpfalling'].includes(this.sprite.curAnimation))
					this.sprite.setCurAnimation('bumpfalling')
				} else if (!this.running) {
					if (!['falling'].includes(this.sprite.curAnimation))
					this.sprite.setCurAnimation('falling')
				} else {
					if (!['runfalling'].includes(this.sprite.curAnimation))
					this.sprite.setCurAnimation('runfalling')
				}
			} else {
				if (!this.running) {
					if (!['stilljump', 'tostilljump'].includes(this.sprite.curAnimation))
					this.sprite.setCurAnimation('tostilljump')
				} else {
					if (!['runjump', 'torunjump'].includes(this.sprite.curAnimation))
					this.sprite.setCurAnimation('torunjump')
				}
			}
		}

		// Trigger animations automatically
		if (this.sprite.update()) {
			switch(this.sprite.curAnimation) {
				case 'toprepare':
					this.sprite.setCurAnimation('prepare')
					break;
				case 'tostand':
					this.sprite.setCurAnimation('stand')
					break;
				case 'iddle':
					this.sprite.setCurAnimation('fromiddle')
					break;
				case 'fromiddle':
					this.sprite.setCurAnimation('stand')
					break;
				case 'torun':
					this.sprite.setCurAnimation('run')
					break;
				case 'toiddle':
					this.sprite.setCurAnimation('iddle')
					break;
				case 'tostilljump':
					this.sprite.setCurAnimation('stilljump')
					break;
				case 'tosrunjump':
					this.sprite.setCurAnimation('runjump')
					break;
				case 'bumppain':
					this.headbumping = false
					this.cantmove = false
					this.sprite.setCurAnimation('stand')
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
