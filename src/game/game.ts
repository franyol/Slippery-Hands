import { InputHandler } from "../input_handler/handler";
import { FSM } from "../states/fsm";

export class Game {
	canvas: HTMLCanvasElement
	uicanvas: HTMLCanvasElement
	dt: number = 0;
	fsm: FSM = new FSM
	inputHandler: InputHandler = new InputHandler
	width: number = 4000
	height: number = 4000
	camx: number = 0
	camy: number = 0
	_camsize: number = 50
	camw: number = 16 * this._camsize
	camh: number = 9 * this._camsize

	set camsize(value: number) {
		this._camsize = value
		this.camw = 16 * value
		this.camh = 9 * value
	}

	constructor() {
		this.canvas = document.getElementById('game-screen') as HTMLCanvasElement;
		this.uicanvas = document.getElementById('ui-layer') as HTMLCanvasElement
	}

	update() {
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.fsm.update()
	}


	render() {
		const ctx = this.canvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		ctx.save();

		ctx.setTransform(
			this.canvas.width / this.camw, 0, 0,
			this.canvas.height / this.camh,
			-this.camx * (this.canvas.width / this.camw),
			-this.camy * (this.canvas.height / this.camh)
		);

		ctx.fillStyle = 'yellow';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.fsm.render();

		ctx.restore();

		const scaleX = window.innerWidth / this.camw;
		const scaleY = window.innerHeight / this.camh;
		const scale = Math.min(scaleX, scaleY);

		const newWidth = this.camw * scale;
		const newHeight = this.camh * scale;

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
