import { Game, GameSingleton } from "../game/game";
import { GameObject, HitBox } from "./base";
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
		this.hitbox = { x, y, w, h, visible: true }
		this.color = color
		this.move = move

		InBoundsSingleton.getInstance().register(this.hitbox)
	}

	update() {
		const input = this.game.inputHandler

		if (this.move) {
			this.hitbox.y = (input.getKeyState('ArrowUp') === 'down') ? this.hitbox.y - 1 :
				(input.getKeyState('ArrowDown') === 'down') ? this.hitbox.y + 1 :
				this.hitbox.y
			this.hitbox.x = (input.getKeyState('ArrowRight') === 'down') ? this.hitbox.x + 1 :
				(input.getKeyState('ArrowLeft') === 'down') ? this.hitbox.x - 1 :
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
