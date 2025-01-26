import { Game, GameSingleton } from "../game/game";
import { GameObject } from "./base";

export class Block implements GameObject {
	uuid: number = 0
	prio: number = 0
	game: Game

	x: number
	y: number

	constructor () {
		this.game = GameSingleton.getInstance()
		this.x = 0
		this.y = 0
	}

	update() {
		this.x = (this.x > this.game.canvas.width) ? this.x = 0 : this.x + 1
	}

	render() {
		const ctx = this.game.canvas.getContext('2d')
		ctx.fillStyle = '#ff0000'
		ctx.fillRect(this.x, this.y, 50, 50);
	}
}
