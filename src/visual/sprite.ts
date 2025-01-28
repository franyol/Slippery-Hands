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
	current: string;
	imgLoaded: boolean;
	dataLoaded: boolean;

	constructor(imgDir: string, dataDir: string) {
		this.image = new Image();
		this.data = { frames: new Map<string, FrameData>() };
		this.current = "";
		this.imgLoaded = false;
		this.dataLoaded = false;

		this.loadImage(imgDir);
		this.loadData(dataDir);
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

	setCurrentFrame(frameName: string): void {
		if (this.data.frames.has(frameName)) {
			this.current = frameName;
		}
	}

	getCurrentFrameData(): FrameData | undefined {
		return this.data.frames.get(this.current);
	}

	isReady(): boolean {
		return this.imgLoaded && this.dataLoaded
	}

	async waitUntilReady(): Promise<void> {
		while (!this.isReady()) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}
	}

	render(x: number, y: number, w: number, h: number) {
		const ctx = GameSingleton.getInstance().canvas.getContext('2d')
		const frame = this.getCurrentFrameData()?.frame
		if (frame && this.isReady()) {
			ctx.drawImage(this.image, frame.x, frame.y, frame.w, frame.h, x, y, w, h);
		}
	}
}
