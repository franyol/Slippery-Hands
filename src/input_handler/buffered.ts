import { Game, GameSingleton } from '../game/game'
import { KeyState } from './handler'

export class Buffered {
    time: number
    current: number
    enabled: boolean = false
    game: Game = GameSingleton.getInstance()

    constructor(time: number, current: number = 0) {
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
            this.restart_timer()
        }
    }

    request(current: boolean, condition: boolean): boolean {
        if (condition === true) {
            if (current || this.enabled) {
                this.enabled = false
                this.restart_timer()
                return true
            }
        }
        if (current) {
            this.enabled = true
            this.restart_timer()
        }
        return false
    }

    retain(current: boolean) {
        if (current) {
            this.enabled = true
            this.restart_timer()
        }

        return current || this.enabled
    }

    restart_timer() {
        this.current = 0
    }
}
