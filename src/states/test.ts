import { GameSingleton } from '../game/game'
import { Block } from '../game_object/block'
import { CameraFollowSingleton } from '../game_object/environments/cam_follow'
import { CollidedSingleton } from '../game_object/environments/collisions'
import { GravitySingleton } from '../game_object/environments/gravity'
import { InBoundsSingleton } from '../game_object/environments/out_of_bouds'
import { Player } from '../game_object/player/player'
import { State } from './fsm'

export class TestState extends State {
    on_enter() {
        this.environments.push(InBoundsSingleton.getInstance())
        this.environments.push(CollidedSingleton.getInstance())
        this.environments.push(GravitySingleton.getInstance())
        this.environments.push(CameraFollowSingleton.getInstance())

        this.register(new Player(0, 1500))

        // Starting platform
        this.register(
            new Block({
                x: 0,
                y: 1800,
                w: 800,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )

        this.register(
            new Block({
                x: 200,
                y: 1060,
                w: 80,
                h: 700,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 400,
                y: 760,
                w: 80,
                h: 700,
                moving: false,
                color: 'blue',
            })
        )

        this.register(
            new Block({
                x: 400,
                y: 1580,
                w: 200,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 700,
                y: 1600,
                w: 160,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )

        // Higher platform (jump required)
        this.register(
            new Block({
                x: 1000,
                y: 1500,
                w: 200,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )

        // Series of platforms
        this.register(
            new Block({
                x: 1300,
                y: 1400,
                w: 150,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 1500,
                y: 1300,
                w: 150,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 1700,
                y: 1200,
                w: 150,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 1800,
                y: 1100,
                w: 150,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )

        // Wide gap with small platform in between
        this.register(
            new Block({
                x: 2000,
                y: 1000,
                w: 100,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 2300,
                y: 1000,
                w: 100,
                h: 40,
                moving: false,
                color: 'blue',
            })
        )

        // Landing platform
        this.register(
            new Block({
                x: 2600,
                y: 1400,
                w: 300,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )

        // End section with an obstacle
        this.register(
            new Block({
                x: 3000,
                y: 1300,
                w: 80,
                h: 200,
                moving: false,
                color: 'blue',
            })
        )
        this.register(
            new Block({
                x: 3200,
                y: 1800,
                w: 500,
                h: 100,
                moving: false,
                color: 'blue',
            })
        )
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
