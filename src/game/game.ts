import { FSM } from "../states/fsm";

export class Game {
	canvas: HTMLCanvasElement
	dt: number;
	fsm: FSM = new FSM

	constructor() {
		this.canvas = document.getElementById('game-screen') as HTMLCanvasElement;
		this.dt = 0;
	}

	update() {
		this.canvas.width = window.innerWidth
		this.canvas.height = window.innerHeight
		this.fsm.update()
	}

	render () {
		const ctx = this.canvas.getContext('2d')
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.fsm.render()
	}
}

export class GameSingleton {
	private static instance: Game

	private constructor() {}

	public static getInstance(): Game {
		if(!GameSingleton.instance) {
			GameSingleton.instance = new Game()
		}
		return GameSingleton.instance
	}
}
