export class Game {
	canvas: HTMLCanvasElement;
	dt: number;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.dt = 0;
	}

	update() {
		console.log(`dt: ${this.dt}`)
	}

	render () {
		;
	}
}
