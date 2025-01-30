import { GameSingleton } from "../game/game";

type FrameData = {
	frame: {x: number, y: number, w: number, h: number},
	rotated: boolean,
	trimmed: boolean,
	spriteSourceSize: { w: number, h: number },
	duration: number
}

export class Sprite {
	image: HTMLImageElement;
	data: { frames: Map<string, FrameData> };
	current: number;
	imgLoaded: boolean;
	dataLoaded: boolean;
	dir: string;
	name: string;
	animations: Record<string, number[]> = {};
	curAnimation: string | undefined;
	animTime: number = 0;
	animIdx: number = 0;
	frameTime: number = 0;

	constructor(dir: string, name: string) {
		this.dir = dir;
		this.name = name
		this.image = new Image();
		this.data = { frames: new Map<string, FrameData>() };
		this.current = 0;
		this.imgLoaded = false;
		this.dataLoaded = false;

		this.loadImage(dir + name + '.png');
		this.loadData(dir + name + '.json');
	}

	private loadImage(imgDir: string): void {
		this.image.src = imgDir;
		this.image.onload = () => {
			this.imgLoaded = true;
		};
	}

	private async loadData(dataDir: string): Promise<void> {
		try {
			const response = await fetch(dataDir);
			const jsonData = await response.json();
			Object.entries(jsonData.frames).forEach(([key, value]) => {
				this.data.frames.set(key, value as FrameData);
			});
			this.dataLoaded = true
		} catch (error) {}
	}

	loadAnimations(animations: Record<string, number[]>)  {
		this.animations = animations
	}

	setCurrentFrame(frameNumber: number): void {
		const frameName = `${this.name} ${frameNumber}.aseprite`;
		if (this.data.frames.has(frameName)) {
			this.current = frameNumber;
		}
	}

	getCurrentFrameData(): FrameData | undefined {
		const frameName = `${this.name} ${this.current}.aseprite`;
		return this.data.frames.get(frameName);
	}

	isReady(): boolean {
		return this.imgLoaded && this.dataLoaded
	}

	async waitUntilReady(): Promise<void> {
		while (!this.isReady()) {
			await new Promise((resolve) => setTimeout(resolve, 10));
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
		this.current = this.animations[key][0]
	}

	update(): boolean {
		if (!this.isReady()){
			return
		}
		const game = GameSingleton.getInstance()
		this.animTime += game.dt
		this.frameTime += game.dt

		if (this.curAnimation) {
			const frameData = this.getCurrentFrameData()
			if (this.frameTime > frameData.duration) {
				this.frameTime = 0
				this.animIdx++;
				if (this.animIdx >= this.animations[this.curAnimation].length) {
					this.animIdx = 0
					//this.animTime = 0
					this.current = this.animations[this.curAnimation][this.animIdx]
					return true // Anim end
				}
				this.current = this.animations[this.curAnimation][this.animIdx]
			}
		}
		return false
	}

	render(
		x: number,
		y: number,
		w: number,
		h: number,
		flipHorizontal: boolean = false,
			flipVertical: boolean = false
	) {
		const ctx = GameSingleton.getInstance().canvas.getContext('2d');
		const frame = this.getCurrentFrameData()?.frame;

		if (frame && this.isReady()) {
			ctx.save(); // Save the current state of the canvas

			// Translate to the center of the image for proper flipping
			ctx.translate(x + w / 2, y + h / 2);

			// Apply flipping transformations
			ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);

			// Draw the image at its transformed position
			ctx.drawImage(
				this.image,
				frame.x,
				frame.y+1,
				frame.w,
				frame.h-1,
				-w / 2,
				-h / 2,
				w,
				h
			);

			ctx.restore(); // Restore the canvas state to avoid affecting other drawings
		}
	}
}
