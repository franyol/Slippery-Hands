import { Game, GameSingleton } from "../game/game"

export class Cooldown {
	time: number
	current: number
	callback: () => void = () => {}
	enabled: boolean = true
	game: Game = GameSingleton.getInstance()

	constructor (callback: () => void, time: number, current: number = 0) {
		this.time = time
		this.current = current
		this.callback = callback
	}

	update() {
		if (this.enabled) {
			return
		}
		this.current += this.game.dt
		if (this.current >= this.time) {
			this.enabled = true
			this.current = 0
		}
	}

	request() {
		if (this.enabled) {
			this.callback()
			this.enabled = false
		}
	}
}
