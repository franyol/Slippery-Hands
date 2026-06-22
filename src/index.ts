import { GameSingleton } from './game/game'
import { TestState } from './states/test'

window.addEventListener('load', () => {
    const game = GameSingleton.getInstance()
    game.fsm.pushState(new TestState())

    let previousTime = performance.now()
    let accumulator = 0
    const FIXED_STEP = 16.67 // ms

    function animate(currentTime: number) {
        let frame = currentTime - previousTime
        previousTime = currentTime

        frame = Math.min(frame, 250)
        accumulator += frame

        while (accumulator >= FIXED_STEP) {
            game.dt = FIXED_STEP
            game.update()
            accumulator -= FIXED_STEP
        }

        game.render()

        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
})
