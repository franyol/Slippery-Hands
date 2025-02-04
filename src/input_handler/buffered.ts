import { Game, GameSingleton } from "../game/game";
import { KeyState } from "./handler";

export class Buffered {
	time: number
	current: number
	enabled: boolean = false
	game: Game = GameSingleton.getInstance()

	constructor (time: number, current: number = 0) {
		this.time = time
		this.current = current
	}

	update() {
		if (!this.enabled) {
			return
		}
		this.current += this.game.dt
		if (this.current >= this.time) {
			this.enabled = false
			this.current = 0
		}
	}

	request(current: boolean, condition: boolean): boolean {
		if (condition === true) {
			if (current || this.enabled) {
				this.enabled = false
				this.current = 0
				return true
			}
		}
		if (current) {
			this.enabled = true
			this.current = 0
		}
		return false
	}

	retain(current: boolean) {
		if (current) {
			this.enabled = true
			this.current = 0
		}

		return current || this.enabled
	}
}

