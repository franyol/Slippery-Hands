import { Game, GameSingleton } from "../game/game";
import { GameObject, HitBox } from "./base";
import { CollidedSingleton } from "./environments/collisions";
import { InBoundsSingleton } from "./environments/out_of_bouds";

export class Block implements GameObject {
	uuid: number = 0
	prio: number = 0
	game: Game

	hitbox: HitBox

	move: boolean
	color: string

	constructor (x: number, y: number, w: number, h: number, move: boolean, color: string) {
		this.game = GameSingleton.getInstance()
		this.hitbox = { 
			x, y, w, h, 
			x_1: x, y_1: y,
			colliders: [], 
			visible: true, 
			type: (move) ? 'standard' : 'stop',
			layer: 0
		}
		this.color = color
		this.move = move

		InBoundsSingleton.getInstance().register(this.hitbox)
		CollidedSingleton.getInstance().register(this.hitbox)
	}

	update() {
		const input = this.game.inputHandler

		if (this.move) {

			this.hitbox.x_1 = this.hitbox.x
			this.hitbox.y_1 = this.hitbox.y

			const coords = input.getTouchCoords()
			let up, down, left, right

			up = input.getKeyState('ArrowUp') === 'down'
			if (coords) {
				console.log(coords)
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
			

			this.hitbox.y = (up) ? this.hitbox.y - 1 :
				(down) ? this.hitbox.y + 1 :
				this.hitbox.y
			this.hitbox.x = (right) ? this.hitbox.x + 1 :
				(left) ? this.hitbox.x - 1 :
				this.hitbox.x

		}
	}

	render() {
		const ctx = this.game.canvas.getContext('2d')
		ctx.fillStyle = this.color
		if (this.hitbox.visible)
			ctx.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.w, this.hitbox.h);
	}
}
