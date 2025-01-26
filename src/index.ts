import { GameSingleton } from "./game/game";
import { TestState } from "./states/test";

window.addEventListener("load", () => {
	const game = GameSingleton.getInstance()
	game.fsm.pushState(new TestState())

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
