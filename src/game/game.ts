import { InputHandler } from "../input_handler/handler";
import { FSM } from "../states/fsm";

export class Game {
	canvas: HTMLCanvasElement
	uicanvas: HTMLCanvasElement
	dt: number = 0;
	fsm: FSM = new FSM
	inputHandler: InputHandler
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
		this.inputHandler = new InputHandler(this)
	}

	update() {
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.uicanvas.width = window.innerWidth
		this.uicanvas.height = window.innerHeight
		this.fsm.update()

		// UI
		if (this.inputHandler.showVirtual) {
			Object.values(this.inputHandler.bindings).forEach((binding) => {
				binding.virtual.update()
			})
			Object.values(this.inputHandler.joysticks).forEach((joy) => {
				joy.update()
			})
		}
	}


	render() {
		const ctx = this.canvas.getContext('2d');
		const ctxui = this.uicanvas.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctxui.imageSmoothingEnabled = false;
		ctxui.clearRect(0, 0, this.uicanvas.width, this.uicanvas.height);
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

		this.scale(this.canvas, 
				   window.innerWidth, window.innerHeight,
				   this.camw, this.camh)

		// UI
		if (this.inputHandler.showVirtual) {
			Object.values(this.inputHandler.bindings).forEach((binding) => {
				binding.virtual.render()
			})
			Object.values(this.inputHandler.joysticks).forEach((joy) => {
				joy.render()
			})
		}
	}

	scale(canvas: HTMLCanvasElement, targetW: number, targetH: number, sourceW: number, sourceH: number) {
		const scaleX = targetW / sourceW;
		const scaleY = targetH / sourceH;
		const scale = Math.min(scaleX, scaleY);

		const newWidth = sourceW * scale;
		const newHeight = sourceH * scale;

		canvas.style.width = `${newWidth}px`;
		canvas.style.height = `${newHeight}px`;
		canvas.style.position = 'absolute';
		canvas.style.left = `${(targetW - newWidth) / 2}px`;
		canvas.style.top = `${(targetH - newHeight) / 2}px`;
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
