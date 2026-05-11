import { Game, GameSingleton } from '../game/game'

export class Timer {
    time: number
    current: number
    enabled: boolean = false
    game: Game = GameSingleton.getInstance()
    callback: () => void

    constructor(time: number, callback: () => void, current: number = 0) {
        this.time = time
        this.current = current
        this.callback = callback
    }

    update() {
        if (!this.enabled) {
            return
        }
        this.current += this.game.dt
        if (this.current >= this.time) {
            this.enabled = false
            this.current = 0
            this.callback()
        }
    }

    clear() {
        this.enabled = false
        this.current = 0
    }

    start() {
        this.enabled = true
    }
}
