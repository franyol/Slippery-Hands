import { GameSingleton } from "../game/game";
import { Block } from "../game_object/block";
import { CameraFollowSingleton } from "../game_object/environments/cam_follow";
import { CollidedSingleton } from "../game_object/environments/collisions";
import { GravitySingleton } from "../game_object/environments/gravity";
import { InBoundsSingleton } from "../game_object/environments/out_of_bouds";
import { Player } from "../game_object/player/player";
import { State } from "./fsm";

export class TestState extends State {
	on_enter() {
		const game = GameSingleton.getInstance(); 
		const width = game.width
		const height = game.height

		this.environments.push(InBoundsSingleton.getInstance())
		this.environments.push(CollidedSingleton.getInstance())
		this.environments.push(GravitySingleton.getInstance())
		this.environments.push(CameraFollowSingleton.getInstance())

		this.register(new Player(0, 1500));

		// Starting platform
		this.register(new Block(0, 1800, 800, 100, false, 'blue'));

		// First obstacle (must jump)
		this.register(new Block(200, 1560, 80, 200, false, 'blue'));

		// Small gap for rolling
		this.register(new Block(400, 1600, 200, 100, false, 'blue'));
		this.register(new Block(700, 1600, 160, 100, false, 'blue'));

		// Higher platform (jump required)
		this.register(new Block(1000, 1500, 200, 100, false, 'blue'));

		// Series of platforms
		this.register(new Block(1300, 1400, 150, 40, false, 'blue'));
		this.register(new Block(1500, 1300, 150, 40, false, 'blue'));
		this.register(new Block(1700, 1200, 150, 40, false, 'blue'));
		this.register(new Block(1800, 1100, 150, 40, false, 'blue'));

		// Wide gap with small platform in between
		this.register(new Block(2000, 1000, 100, 40, false, 'blue'));
		this.register(new Block(2300, 1000, 100, 40, false, 'blue'));

		// Landing platform
		this.register(new Block(2600, 1400, 300, 100, false, 'blue'));

		// End section with an obstacle
		this.register(new Block(3000, 1300, 80, 200, false, 'blue'));
		this.register(new Block(3200, 1800, 500, 100, false, 'blue'));

	}
	on_exit() {
		this.clean()
	}

	update() {
		super.update()
	}

	render() {
		super.render()
	}
}
