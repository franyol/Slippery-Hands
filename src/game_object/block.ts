import { Game, GameSingleton } from "../game/game";
import { GameObject, HitBox, Physics } from "./base";
import { CollidedSingleton } from "./environments/collisions";

export class Block implements GameObject {
	uuid: number = 0
	prio: number = 0
	game: Game

	hitbox: HitBox
	physics: Physics

	move: boolean

	constructor (x: number, y: number, w: number, h: number, move: boolean, color: string) {
		this.game = GameSingleton.getInstance()
		this.physics = new Physics((move) ? 2 : 1)
		this.physics.x = x
		this.physics.y = y
		this.hitbox = new HitBox(
			this.physics, 0, 0, w, h, (move) ? 'standard' : 'stop', 0
		)
		this.hitbox.color = color
		this.move = move

		//InBoundsSingleton.getInstance().register(this.hitbox)
		CollidedSingleton.getInstance().register(this.hitbox)
	}

	update() {
		const input = this.game.inputHandler

		if (this.move) {

			this.physics.recordHistory()

			let up, down, left, right

			up = input.getKeyState('ArrowUp') === 'down'
			down = input.getKeyState('ArrowDown') === 'down'
			left = input.getKeyState('ArrowLeft') === 'down'
			right = input.getKeyState('ArrowRight') === 'down'
			

			this.physics.yspeed = (up) ? -25 : (down) ? 25 : 0
			this.physics.xspeed = (right) ? 25 :(left) ? -25 : 0

			this.physics.update()
		}
	}

	render() {
		this.hitbox.render()
	}
}
