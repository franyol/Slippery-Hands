import { InputHandler } from "../input_handler/handler";
import { FSM } from "../states/fsm";

export class Game {
	canvas: HTMLCanvasElement
	uicanvas: HTMLCanvasElement
	dt: number = 0;
	fsm: FSM = new FSM
	inputHandler: InputHandler = new InputHandler
	width: number = 1080
	height: number = 720

	constructor() {
		this.canvas = document.getElementById('game-screen') as HTMLCanvasElement;
		this.uicanvas = document.getElementById('ui-layer') as HTMLCanvasElement
	}

	update() {
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.fsm.update()
	}

	render () {
		const ctx = this.canvas.getContext('2d')
		ctx.imageSmoothingEnabled = false
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		ctx.fillStyle = 'yellow'
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.fsm.render()

		const scaleX = window.innerWidth / this.width;
		const scaleY = window.innerHeight / this.height;
		const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

		const newWidth = this.width * scale;
		const newHeight = this.height * scale;

		// Center the canvas
		this.canvas.style.width = `${newWidth}px`;
		this.canvas.style.height = `${newHeight}px`;
		this.canvas.style.position = 'absolute';
		this.canvas.style.left = `${(window.innerWidth - newWidth) / 2}px`;
		this.canvas.style.top = `${(window.innerHeight - newHeight) / 2}px`;
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
