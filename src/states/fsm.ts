import { Environment, GameObject } from "../game_object/base"

export class State {
	objects: GameObject[] = []
	isObjsSorted: boolean = true
	environments: Environment[] = []

	on_enter() {}
	on_exit() {}

	clean() {
		this.objects.length = 0
		this.environments.map((env) => {
			env.clean()
		})
		this.environments.length = 0
	}

	update() {
		for (const obj of this.objects) {
			obj.update()
		}
		for (const env of this.environments) {
			env.update()
		}
	}

	render() {
		if (!this.isObjsSorted) {
			this.objects.sort((a, b) => a.prio - b.prio)
			this.isObjsSorted = true
		}
		for (const obj of this.objects)  {
			obj.render()
		}
	}

	register(obj: GameObject) {
		if (obj.uuid === 0) obj.uuid = this.objects.length
		this.objects.push(obj)
		this.isObjsSorted = false
	}

	/**
	 * Deregister using reference or UUID
	 */
	deregister(obj: GameObject | number) {
		if (typeof obj === 'number') {
			this.objects = this.objects.filter((o) => o.uuid !== obj);
		} else {
			this.objects = this.objects.filter((o) => o !== obj);
		}
	}
}

export class FSM {
	states: State[] = []

	pushState(state: State) {
		state.on_enter()
		this.states.push(state)
	}
	popState() {
		if (this.states.length > 0) {
			this.states.pop().on_exit()
		}
	}

	getCurState(): State {
		return this.states[this.states.length - 1]
	}

	update() {
		if (this.states.length > 0)
			this.states[this.states.length - 1].update()
	}

	render() {
		for (const state of this.states) {
			state.render()
		}
	}
}
