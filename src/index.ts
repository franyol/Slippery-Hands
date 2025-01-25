import { Game } from './game/game'

window.addEventListener("load", () => {
	const canvas = document.getElementById('game-screen') as HTMLCanvasElement;
	const game = new Game(canvas);

	let previousTime = performance.now();
	function animate(currentTime: number) {
		game.dt = currentTime - previousTime;
		previousTime = currentTime;

		game.update();
		game.render();
		requestAnimationFrame(animate);
	}
	requestAnimationFrame(animate);
});
