import { Game, GameSingleton } from '../game/game'

export class Cooldown {
    time: number
    current: number
    enabled: boolean = true
    game: Game = GameSingleton.getInstance()

    constructor(time: number, current: number = 0) {
        this.time = time
        this.current = current
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
            this.enabled = false
            return true
        }
        return false
    }
}
