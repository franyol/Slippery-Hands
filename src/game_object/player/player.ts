import { Game, GameSingleton } from '../../game/game'
import { Buffered } from '../../input_handler/buffered'
import { Cooldown } from '../../input_handler/cooldown'
import { Timer } from '../../input_handler/timer'
import { InputHandler } from '../../input_handler/handler'
import { Once } from '../../input_handler/once'
import { Sprite } from '../../visual/sprite'
import { GameObject, HitBox, Physics } from '../base'
import { CameraFollowSingleton } from '../environments/cam_follow'
import { CollidedSingleton } from '../environments/collisions'
import { GravitySingleton } from '../environments/gravity'
import { InBoundsSingleton } from '../environments/out_of_bouds'

const spritedir = '../../../static/assets/images/main-character/'

export class Player extends GameObject {
    uuid: number = 0
    prio: number = 0
    game: Game

    physics: Physics
    hitbox: HitBox
    standbox: HitBox
    printbox: HitBox
    sprite: Sprite

    climbPlatformy: number
    climbPlatformx: number

    states = {
        stand: false,
        idle: false,
        headingLeft: false,
        jumping: false,
        falling: false,
        headbumping: false,
        rolling: false,
        running: false,
        cantmove: false,
        onfloor: false,
        wallsliding: false,
        walljumping: false,
        duck: false,
        duckwalking: false,
        duckByCollision: false,
        edgeclimbstart: false,
        edgeclimbend: false,
    }

    jumpcount: number = 0

    animationQueue: string[]
    animationEndCallbacks: Record<string, () => void> = {}
    animId: string = ''

    runningspeed: number = 400
    xacceleration: number = this.runningspeed / 5
    airxacceleration: number = this.runningspeed / 8
    duckspeed: number = 200
    rollspeed: number = 700
    jumpingForce: number = 2100
    idleTime: number = 5000
    walljumpimpulsey: number = 1800
    walljumpimpulsex: number = 800

    // Input
    cooldowns: Record<string, Cooldown>
    timers: Record<string, Timer>
    buffers: Record<string, Buffered>
    pressOnce: Record<string, Once>

    constructor(x: number, y: number) {
        super(0)

        this.game = GameSingleton.getInstance()
        this.sprite = new Sprite(spritedir, 'main-character')
        this.physics = new Physics({
            historyLen: 2,
            x,
            y,
            xfriction: 15,
            yfriction: 0,
            parent: this,
        })
        this.printbox = new HitBox(this.physics, 0, 0, 64, 64, 'standard', 0)
        this.hitbox = new HitBox(this.physics, 13, 0, 38, 64, 'standard', 0)
        this.standbox = new HitBox(this.physics, 13, 0, 38, 64, 'virtual', 0)
        this.animationQueue = []
        this.sprite.loadAnimations({
            tostand: [5],
            stand: [0, 1],
            fromstand: [5],
            toduck: [8],
            duck: [33],
            fromduck: [8],
            duckwalk: [34, 35, 36, 35, 34, 37, 38, 37],
            fromduckwalk: [],
            wallsliding: [32],
            fromwallsliding: [],
            toidle: [2],
            fromidle: [2],
            idle: [3, 4, 3, 4, 3, 4, 3],
            tostilljump: [16],
            stilljump: [17],
            torunjump: [31],
            runjump: [13],
            falling: [18],
            fromfalling: [],
            bumpfalling: [19],
            bumppain: [20, 21, 22, 21, 22, 23, 24, 23, 24, 22, 20],
            frombumppain: [],
            runfalling: [13],
            fromrunfalling: [],
            toprepare: [5],
            prepare: [6, 7],
            fromprepare: [5],
            torun: [8],
            run: [9, 10, 11, 12, 13, 14, 15, 12],
            fromrun: [8],
            roll: [25, 26, 27, 28, 29, 30],
            fromroll: [],
            edgeclimbstart: [66, 67, 68],
            edgeclimbend: [69, 70],
            fromedgeclimbend: [],
        })
        this.sprite.setCurAnimation('stand')

        this.cooldowns = {
            rolling: new Cooldown(1200),
            bumppain: new Cooldown(500),
            stopwalljump: new Cooldown(100),
            regainwalljumpctl: new Cooldown(300),
        }
        this.buffers = {
            jump: new Buffered(100),
            coyotetime: new Buffered(50),
        }
        this.pressOnce = {
            jump: new Once(),
            roll: new Once(),
        }
        this.timers = {
            clearwalljumping: new Timer(200, () => {
                this.states.walljumping = false
            }),
        }

        // Control states on animation end
        this.animationEndCallbacks['roll'] = () => {
            this.states.rolling = false
            this.states.duckByCollision = true
        }
        this.animationEndCallbacks['bumppain'] = () => {
            this.states.headbumping = false
            this.states.cantmove = false
        }
        this.animationEndCallbacks['edgeclimbstart'] = () => {
            this.states.edgeclimbstart = false
            this.states.edgeclimbend = true
            // TP to top of the platform
            this.physics.y = this.climbPlatformy - 70
            this.physics.x += this.states.headingLeft ? -8 : 8
            this.hitbox._y = 32
            this.hitbox.h = 32
            CollidedSingleton.getInstance().register(this.hitbox)
        }
        this.animationEndCallbacks['edgeclimbend'] = () => {
            this.states.edgeclimbend = false
            this.states.cantmove = false
            this.hitbox._y = 0
            this.hitbox.h = 64
        }

        InBoundsSingleton.getInstance().register(this.hitbox)
        CollidedSingleton.getInstance().register(this.hitbox)
        CollidedSingleton.getInstance().register(this.standbox)
        GravitySingleton.getInstance().register(this.hitbox)
        CameraFollowSingleton.getInstance().register(this.printbox)

        this.on('collision', (side: string, hb: HitBox, collider: HitBox) => {
            if (hb === this.standbox) {
                if (side === 'top') {
                    if (!this.states.jumping) this.states.duckByCollision = true
                }
                return
            } else if (hb === this.hitbox) {
                switch (side) {
                    case 'top':
                        if (this.states.jumping === true) {
                            this.states.headbumping = true
                            this.states.cantmove = true
                            this.states.falling = true
                            this.states.jumping = false
                            this.cooldowns['bumppain'].request()
                        } else {
                            this.states.duckByCollision = true
                        }
                        break
                    case 'bottom':
                        this.states.onfloor = true
                        this.states.jumping = false
                        break
                    case 'left':
                    case 'right':
                        if (collider.type === 'stop' && this.states.falling) {
                            if (
                                this.hitbox.y + this.hitbox.h / 2 <
                                collider.y
                            ) {
                                this.states.edgeclimbstart = true
                                this.states.cantmove = true
                                this.climbPlatformy = collider.y
                                this.climbPlatformx = collider.x
                                if (this.states.headingLeft) {
                                    this.climbPlatformx =
                                        collider.x + collider.w
                                } else {
                                    this.climbPlatformx =
                                        collider.x - this.printbox.w
                                }
                                CollidedSingleton.getInstance().deregister(
                                    this.hitbox
                                )
                            } else {
                                this.states.wallsliding = true
                                this.states.headingLeft =
                                    !this.states.headingLeft
                                if (this.states.walljumping) {
                                    this.states.walljumping = false
                                    this.timers['clearwalljumping'].clear()
                                }
                            }
                        }
                        break
                }
            }
        })

        this.sprite.setCurAnimation('stand')
    }

    update() {
        const inputHandler = this.game.inputHandler

        // Record position history
        this.physics.recordHistory()
        // Cooldowns handle cooldown times
        Object.values(this.cooldowns).forEach((cd) => {
            cd.update()
        })
        // Buffers handle input buffers (react time after an input)
        Object.values(this.buffers).forEach((bf) => {
            bf.update()
        })
        // Schedule something to happen N time after timer set
        Object.values(this.timers).forEach((tm) => {
            tm.update()
        })

        this.handleInputs(inputHandler)

        this.handleAnimations()

        if (this.states.wallsliding) {
            this.physics.yfriction = 150
        } else {
            this.physics.yfriction = 0
        }

        this.physics.update()

        // Force position on edgeclimb
        if (this.states.edgeclimbstart) {
            this.physics.y = this.climbPlatformy - 36
            this.physics.x = this.states.headingLeft
                ? this.climbPlatformx - 25
                : this.climbPlatformx + 25
        }

        // States reset
        this.states.falling = this.physics.yspeed >= 0 && !this.states.onfloor
        this.states.stand =
            this.states.onfloor &&
            !(
                this.states.duck ||
                this.states.running ||
                this.states.jumping ||
                this.states.rolling ||
                this.states.headbumping ||
                this.states.walljumping ||
                this.states.wallsliding ||
                this.states.edgeclimbstart ||
                this.states.edgeclimbend
            )
        if (!this.states.stand) this.states.idle = false
        this.states.onfloor = false
        this.states.duckByCollision = false
        this.states.wallsliding = false
        /* Early headbump end
        if (this.states.headbumping && this.cooldowns['bumppain'].request()) {
            this.states.cantmove = false
        }
        */
    }

    handleInputs(inputHandler: InputHandler) {
        // Handle inputs
        const inputs = {
            up: false,
            roll: false,
            down: false,
            left: false,
            right: false,
        }

        inputs.up = this.pressOnce['jump'].request(
            inputHandler.getBindingState('jump') === 'down'
        )
        inputs.down = inputHandler.getBindingState('roll') === 'down'
        inputs.roll = this.pressOnce['roll'].request(inputs.down)
        inputs.left = inputHandler.getBindingState('left') === 'down'
        inputs.right = inputHandler.getBindingState('right') === 'down'

        const can_jump =
            this.states.wallsliding === true ||
            (this.states.cantmove === false &&
                this.states.jumping === false &&
                this.states.duckByCollision === false &&
                // retain onfloor some time before not flooring
                this.buffers['coyotetime'].retain(this.states.onfloor) === true)
        const can_duck =
            this.states.cantmove === false &&
            this.states.onfloor === true &&
            this.states.running === false &&
            this.states.rolling === false
        const can_roll =
            this.states.cantmove === false &&
            this.states.running === true &&
            this.states.wallsliding === false &&
            this.states.duck === false
        const can_move = this.states.cantmove === false
        const rolling_left = this.states.rolling && this.states.headingLeft
        let walljumping_left =
            this.states.walljumping && this.states.headingLeft
        const rolling_right = this.states.rolling && !this.states.headingLeft
        let walljumping_right =
            this.states.walljumping && !this.states.headingLeft

        // **************** JUMPING *********************
        if (this.buffers['jump'].request(inputs.up, can_jump)) {
            this.physics.yspeed -= this.states.wallsliding
                ? this.walljumpimpulsey
                : this.jumpingForce

            // WALLJUMPING ***************************
            if (this.states.wallsliding) {
                if (this.states.headingLeft) {
                    this.physics.xspeed -= this.walljumpimpulsex
                    this.states.headingLeft = false
                    walljumping_left = true
                } else {
                    this.physics.xspeed += this.walljumpimpulsex
                    this.states.headingLeft = true
                    walljumping_right = true
                }
                this.states.walljumping = true
                this.timers['clearwalljumping'].start()
                this.physics.yfriction = 0
                this.states.wallsliding = false
            }
            // WALLJUMPING ***************************

            this.states.jumping = true
            this.states.rolling = false
        }

        // **************** RUN *********************
        this.states.running = false
        this.states.duckwalking = false
        if (
            (inputs.left || rolling_left || walljumping_left) &&
            can_move &&
            !walljumping_right &&
            !rolling_right
        ) {
            if (!this.states.duck && !this.states.rolling)
                this.states.running = true
            this.states.duckwalking = this.states.duck
            this.states.headingLeft = true

            const speed = this.states.duck
                ? this.duckspeed
                : this.states.rolling
                  ? this.rollspeed
                  : this.runningspeed
            if (this.physics.xspeed > -speed)
                this.physics.xspeed -= this.states.onfloor
                    ? this.xacceleration
                    : this.airxacceleration
        } else if (
            (inputs.right || rolling_right || walljumping_right) &&
            can_move
        ) {
            if (!this.states.duck && !this.states.rolling)
                this.states.running = true
            this.states.duckwalking = this.states.duck
            this.states.headingLeft = false

            const speed = this.states.duck
                ? this.duckspeed
                : this.states.rolling
                  ? this.rollspeed
                  : this.runningspeed
            if (this.physics.xspeed < speed)
                this.physics.xspeed += this.states.onfloor
                    ? this.xacceleration
                    : this.airxacceleration
        }

        this.states.running == !(inputs.right || inputs.left)

        // **************** ROLL AND DUCK *********************
        if (inputs.down || this.states.duckByCollision) {
            if (can_duck) {
                this.states.duck = true
                this.hitbox._y = 32
                this.hitbox.h = 32
            }
        } else if (this.states.duckByCollision) {
            // If collision on top, forces ducking
            // Lower the state to check the collision again
            this.states.duckByCollision = false
        } else if (!this.states.rolling && !this.states.edgeclimbend) {
            // Stand up
            this.states.duck = false
            this.hitbox._y = 0
            this.hitbox.h = 64
        }

        if (inputs.roll && can_roll && this.cooldowns['rolling'].request()) {
            this.states.rolling = true
            this.hitbox._y = 32
            this.hitbox.h = 32
        }
    }

    handleAnimations() {
        // Trigger animations by condition
        const curAni = this.sprite.curAnimation
        let animationWasCancelled = false
        let skipRestOfAnimation = false

        const cancelAnimation = () => {
            if (this.animationQueue.length > 0) {
                animationWasCancelled = true
            }
            skipRestOfAnimation = true
            this.animationQueue = []
        }
        const queueAnimations = ({
            id,
            cancel,
            animations,
            repeat = false,
        }: {
            id: string
            cancel: boolean
            animations: string[]
            repeat?: boolean
        }) => {
            if (id !== this.animId || repeat) {
                this.animId = id

                if (cancel) {
                    cancelAnimation()
                }

                if (animationWasCancelled) {
                    animations = animations.filter(
                        (name) => !name.startsWith('from')
                    )
                }

                this.animationQueue.push(...animations)
            }
        }

        if (this.states.stand) {
            if (!this.states.idle) {
                queueAnimations({
                    id: 'prepare',
                    cancel: true,
                    animations: ['from' + curAni, 'toprepare', 'prepare'],
                })
            }
            if (this.sprite.animTime > this.idleTime) {
                if (this.states.idle === false) {
                    queueAnimations({
                        id: 'stand',
                        cancel: true,
                        animations: ['tostand', 'stand'],
                    })
                    this.states.idle = true
                } else {
                    queueAnimations({
                        id: 'idle',
                        cancel: true,
                        animations: ['idle', 'stand'],
                        repeat: true,
                    })
                }
            }
        } else if (this.states.edgeclimbstart || this.states.edgeclimbend) {
            queueAnimations({
                id: 'edgeclimbstart',
                cancel: true,
                animations: ['edgeclimbstart', 'edgeclimbend'],
            })
        } else if (this.states.headbumping) {
            if (!this.states.onfloor && !(curAni === 'bumppain')) {
                queueAnimations({
                    id: 'headbump',
                    cancel: true,
                    animations: ['bumpfalling'],
                })
            } else {
                queueAnimations({
                    id: 'bumppain',
                    cancel: true,
                    animations: ['bumppain'],
                })
            }
        } else if (this.states.rolling) {
            queueAnimations({
                id: 'roll',
                cancel: true,
                animations: ['roll', 'fromroll'],
            })
        } else if (this.states.duckwalking) {
            queueAnimations({
                id: 'duckwalk',
                cancel: true,
                animations: ['duckwalk'],
            })
        } else if (this.states.duck) {
            queueAnimations({
                id: 'duck',
                cancel: true,
                animations: ['from' + curAni, 'duck'],
            })
        } else if (this.states.wallsliding) {
            queueAnimations({
                id: 'wallsliding',
                cancel: true,
                animations: ['wallsliding'],
            })
        } else if (this.states.falling) {
            if (this.states.running) {
                queueAnimations({
                    id: 'rf',
                    cancel: true,
                    animations: ['runfalling'],
                })
            } else {
                queueAnimations({
                    id: 'falling',
                    cancel: true,
                    animations: ['falling'],
                })
            }
        } else if (this.states.jumping) {
            const animations = this.states.running
                ? ['torunjump', 'runjump']
                : ['tostilljump', 'stilljump']
            const id = this.states.running ? 'runjump' : 'stilljump'
            queueAnimations({
                id,
                cancel: true,
                animations,
            })
        } else if (this.states.running) {
            queueAnimations({
                id: 'run',
                cancel: true,
                animations: ['from' + curAni, 'torun', 'run'],
            })
        }

        // returns true when last animation ends
        const animationIsFinished = this.sprite.update()

        if (animationIsFinished || skipRestOfAnimation) {
            // callback on end of animations
            this.animationEndCallbacks[this.sprite.curAnimation]?.()
            // select next animation
            if (this.animationQueue.length > 0) {
                this.sprite.setCurAnimation(this.animationQueue.shift())
            }
        }
    }

    render() {
        if (this.printbox) {
            this.sprite.render(
                this.printbox.x,
                this.printbox.y,
                this.printbox.w,
                this.printbox.h,
                this.states.headingLeft
            )
        }
        this.hitbox.render()
    }
}
