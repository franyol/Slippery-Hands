import { GameSingleton } from '../game/game'

type FrameData = {
    frame: { x: number; y: number; w: number; h: number }
    rotated: boolean
    trimmed: boolean
    spriteSourceSize: { w: number; h: number }
    duration: number
}

type ImageRegister = {
    image: HTMLImageElement
    instances: number
}

type RenderOptions = {
    x: number
    y: number
    w: number
    h: number

    flipHorizontal?: boolean
    flipVertical?: boolean

    rotate_rad?: number

    pivotx?: number
    pivoty?: number
}

export class Sprite {
    static loadedImages: Record<string, ImageRegister> = {}
    image: HTMLImageElement
    data: { frames: Map<string, FrameData> }
    current: number
    imgLoaded: boolean
    dataLoaded: boolean
    dir: string
    name: string
    animations: Record<string, number[]> = {}
    curAnimation: string | undefined
    animTime: number = 0
    animIdx: number = 0
    frameTime: number = 0
    ui: boolean

    frameIsEmpty: boolean = false

    constructor(dir: string, name: string, ui: boolean = false) {
        this.ui = ui
        this.dir = dir
        this.name = name
        this.image = new Image()
        this.data = { frames: new Map<string, FrameData>() }
        this.current = 0
        this.imgLoaded = false
        this.dataLoaded = false

        const imgDir = dir + name + '.png'
        if (imgDir in Sprite.loadedImages) {
            this.image = Sprite.loadedImages[imgDir].image
            Sprite.loadedImages[imgDir].instances++
            this.imgLoaded = true
        } else {
            this.loadImage(imgDir)
        }

        this.loadData(dir + name + '.json')
    }

    private loadImage(imgDir: string): void {
        this.image.src = imgDir

        if (imgDir in Sprite.loadedImages) {
            this.image = Sprite.loadedImages[imgDir].image
            Sprite.loadedImages[imgDir].instances++
            return
        }
        this.image.onload = () => {
            this.imgLoaded = true
            Sprite.loadedImages[imgDir] = {
                image: this.image,
                instances: 0,
            }
        }
    }

    private async loadData(dataDir: string): Promise<void> {
        try {
            const response = await fetch(dataDir)
            const jsonData = await response.json()
            Object.entries(jsonData.frames).forEach(([key, value]) => {
                this.data.frames.set(key, value as FrameData)
            })
            this.dataLoaded = true
        } catch (error) {}
    }

    static clean() {
        Object.keys(Sprite.loadedImages).forEach((key) => {
            const register = Sprite.loadedImages[key]

            if (register.instances <= 0) {
                delete Sprite.loadedImages[key]
            }
        })
    }

    clean() {
        Sprite.loadedImages[this.dir + this.name + '.png'].instances--
    }

    loadAnimations(animations: Record<string, number[]>) {
        this.animations = animations
    }

    setCurrentFrame(frameNumber: number): void {
        const frameName = `${this.name} ${frameNumber}.aseprite`
        if (this.data.frames.has(frameName)) {
            this.current = frameNumber
        }
    }

    getCurrentFrameData(): FrameData | undefined {
        const frameName = `${this.name} ${this.current}.aseprite`
        return this.data.frames.get(frameName)
    }

    isReady(): boolean {
        return this.imgLoaded && this.dataLoaded
    }

    async waitUntilReady(): Promise<void> {
        while (!this.isReady()) {
            await new Promise((resolve) => setTimeout(resolve, 10))
        }
    }

    setCurAnimation(key: string) {
        if (!(key in this.animations) || key === this.curAnimation) {
            return
        }
        this.curAnimation = key
        this.animIdx = 0
        this.animTime = 0
        this.frameTime = 0

        this.frameIsEmpty = this.animations[key][0] === undefined
        this.current = this.frameIsEmpty
            ? this.current
            : this.animations[key][0]
    }

    update(): boolean {
        if (!this.isReady()) {
            return false
        }
        if (this.frameIsEmpty) {
            return true
        }
        const game = GameSingleton.getInstance()
        this.animTime += game.dt
        this.frameTime += game.dt

        if (this.curAnimation) {
            const frameData = this.getCurrentFrameData()
            if (this.frameTime > frameData.duration) {
                this.frameTime = 0
                this.animIdx++
                if (this.animIdx >= this.animations[this.curAnimation].length) {
                    this.animIdx = 0
                    //this.animTime = 0
                    this.current =
                        this.animations[this.curAnimation][this.animIdx]
                    return true // Anim end
                }
                this.current = this.animations[this.curAnimation][this.animIdx]
            }
        }
        return false
    }

    render({
        x,
        y,
        w,
        h,
        flipHorizontal = false,
        flipVertical = false,
        rotate_rad,

        pivotx,
        pivoty,
    }: RenderOptions) {
        const ctx = this.ui
            ? GameSingleton.getInstance().uicanvas.getContext('2d')
            : GameSingleton.getInstance().canvas.getContext('2d')
        const frame = this.getCurrentFrameData()?.frame

        if (frame && this.isReady()) {
            ctx.save() // Save the current state of the canvas

            if (pivoty === undefined) pivoty = h / 2
            if (pivotx === undefined) pivotx = w / 2

            ctx.translate(x + pivotx, y + pivoty)

            // Apply rotation
            if (rotate_rad) ctx.rotate(rotate_rad)

            // Apply flipping transformations
            ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1)

            // Draw the image at its transformed position
            ctx.drawImage(
                this.image,
                frame.x,
                frame.y,
                frame.w,
                frame.h,
                -pivotx,
                -pivoty,
                w,
                h
            )

            ctx.restore() // Restore the canvas state to avoid affecting other drawings
        }
    }
}
