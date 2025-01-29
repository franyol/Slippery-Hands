import { Block } from "../game_object/block";
import { CollidedSingleton } from "../game_object/environments/collisions";
import { GravitySingleton } from "../game_object/environments/gravity";
import { InBoundsSingleton } from "../game_object/environments/out_of_bouds";
import { Player } from "../game_object/player/player";
import { State } from "./fsm";

export class TestState extends State {
	on_enter() {
		const width = window.innerWidth
		const height = window.innerHeight

		this.environments.push(InBoundsSingleton.getInstance())
		this.environments.push(CollidedSingleton.getInstance())
		this.environments.push(GravitySingleton.getInstance())

		this.register(new Player(width/2, 0))
		//this.register(new Block(width/2, height/2, 40, 40, true, 'red'))
		this.register(new Block(width/4, height*3/5, width/2, 40, false, 'blue'))
		this.register(new Block(width/4, height*4/5+100, width, 10, false, 'green'))
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
