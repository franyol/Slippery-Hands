import { Game, GameSingleton } from "../../game/game";
import { Buffered } from "../../input_handler/buffered";
import { Cooldown } from "../../input_handler/cooldown";
import { Once } from "../../input_handler/once";
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
	onfloor: boolean = false

	jumpcount: number = 0

	runningspeed: number = 40
	rollspeed: number = 60
	jumpingForce: number = 210
	iddleTime: number = 5000

	// Input
	cooldowns: Record<string, Cooldown>
	buffers: Record<string, Buffered>
	pressOnce: Record<string, Once>

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
			'roll': [25, 26, 27, 28, 29, 30],
			'run': [9, 10, 11, 12, 13, 14, 15, 12]
		})
		this.sprite.setCurAnimation('stand')
		this.cooldowns = {
			'rolling': new Cooldown(() => {
				this.rolling = true
				this.sprite.setCurAnimation('roll');
				this.hitbox._y = 32
				this.hitbox.h = 32
				this.headbumping = false
			}, 1200)
		}
		this.buffers = {
			'jump': new Buffered(100),
			'coyotetime': new Buffered(50),
		}
		this.pressOnce = {
			'jump': new Once()
		}

		InBoundsSingleton.getInstance().register(this.hitbox)
		CollidedSingleton.getInstance().register(this.hitbox)
		GravitySingleton.getInstance().register(this.hitbox)
		CameraFollowSingleton.getInstance().register(this.printbox)
	}

	update() {
		const input = this.game.inputHandler

		this.physics.recordHistory()
		Object.values(this.cooldowns).forEach((cd) => {
			cd.update();
		});
		Object.values(this.buffers).forEach((bf) => {
			bf.update();
		});

		let up, down, left, right

		up = this.pressOnce['jump'].request(input.getBindingState('jump') === 'down')
		down = input.getBindingState('roll') === 'down'
		left = input.getBindingState('left') === 'down'
		right = input.getBindingState('right') === 'down'

		this.physics.xspeed = 0
		this.running = false
		if (this.rolling && !this.cantmove) {
			this.physics.xspeed = (this.headingLeft) ? -this.rollspeed : this.rollspeed
		} else if (left && !this.cantmove) {
			this.physics.xspeed -= this.runningspeed
			this.headingLeft = true
			this.running = true
		} else if (right && !this.cantmove) {
			this.physics.xspeed += this.runningspeed
			this.headingLeft = false
			this.running = true
		}

		if (down && this.running && !this.cantmove && !this.headbumping && !(this.jumping && !this.falling)) {
			this.cooldowns['rolling'].request()
		}

		this.onfloor = false
		this.hitbox.colliders.map((collider) => {
			if (collider.y >= this.physics.y + this.hitbox.h) {
				this.onfloor = true
			} else if (collider.y + collider.h <= this.hitbox.y && collider.type === 'stop' && !this.rolling) {
				this.headbumping = true
			}
		})

		if (this.buffers['jump'].request(up, !this.cantmove && !this.headbumping && this.jumpcount < 1 && this.buffers['coyotetime'].retain(this.onfloor))) {
			this.physics.yspeed = -this.jumpingForce
			this.jumpcount++
			this.jumping = true
			this.rolling = false
			this.hitbox._y = 0
			this.hitbox.h = 64
		} else if (this.onfloor) {
			this.jumping = false
			this.jumpcount = 0
		}

		if (this.headbumping) {
			this.cantmove = true
			this.sprite.setCurAnimation('bumppain')
			this.hitbox._y = 32
			this.hitbox.h = 32
		}
		this.falling = this.physics.yspeed > 0 && !this.onfloor

		this.handleAnimations()

		this.physics.update()
	}

	handleAnimations() {
		// Trigger animations by condition
		if (!this.running && !this.jumping && !this.rolling && !this.falling) {
			if (this.sprite.animTime > this.iddleTime) {
				this.sprite.setCurAnimation((this.sprite.curAnimation === 'prepare') ? 'tostand' : 'toiddle')
			} else if (!['prepare', 'toprepare', 'stand', 'tostand', 'toiddle', 'iddle', 'fromiddle', 'bumppain', 'roll'].includes(this.sprite.curAnimation)) {
				this.sprite.setCurAnimation('prepare')	
			}
		} else if (this.running && !this.jumping && !this.rolling && !this.falling &&
			!['run', 'torun'].includes(this.sprite.curAnimation)) {
			this.sprite.setCurAnimation('torun')
		} else if (this.jumping && !this.falling) {
			if (!this.rolling) {
				if (!this.running) {
					if (!['stilljump', 'tostilljump'].includes(this.sprite.curAnimation))
						this.sprite.setCurAnimation('tostilljump')
				} else {
					if (!['runjump', 'torunjump'].includes(this.sprite.curAnimation))
						this.sprite.setCurAnimation('torunjump')
				}
			}
		} else if (this.falling && !this.rolling) {
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
			} 

		// Trigger animations automatically
		if (this.sprite.update()) {
			switch(this.sprite.curAnimation) {
				case 'roll':
					this.sprite.setCurAnimation('prepare')
					this.rolling = false
					this.hitbox._y = 0
					this.hitbox.h = 64
					break;
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
					this.hitbox._y = 0
					this.hitbox.h = 64
					this.sprite.setCurAnimation('stand')
					break;
			}
		}
	}

	render() {
		if (this.printbox) {
			this.sprite.render(this.printbox.x, this.printbox.y, this.printbox.w, this.printbox.h, this.headingLeft)
		}
		this.hitbox.render()
	}
}
