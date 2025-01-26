import { Block } from "../game_object/block";
import { State } from "./fsm";

export class TestState extends State {
	on_enter() {
		this.register(new Block())
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
