import { Block } from "../game_object/block";
import { CollidedSingleton } from "../game_object/environments/collisions";
import { InBoundsSingleton } from "../game_object/environments/out_of_bouds";
import { State } from "./fsm";

export class TestState extends State {
	on_enter() {
		const width = window.innerWidth
		const height = window.innerHeight

		this.environments.push(InBoundsSingleton.getInstance())
		this.environments.push(CollidedSingleton.getInstance())

		this.register(new Block(width/2, height/2, 50, 40, true, 'red'))
		this.register(new Block(width/4, height/2+40, width/2, 40, false, 'blue'))
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
