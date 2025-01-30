import { GameSingleton } from "../../game/game";
import { Environment, HitBox } from "../base";

export class CameraFollow implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects = []
	}

	update() {
		const game = GameSingleton.getInstance()
		const obj = this.objects[this.objects.length-1]

		game.camx = obj.x + obj.w/2 - game.camw/2
		game.camy = obj.y + obj.h/2 - game.camh/2
	}

	register(obj: HitBox) {
		this.objects.push(obj)
	}

	deregister(obj: HitBox): void {
		this.objects = this.objects.filter((o) => o !== obj);
	}
}

export class CameraFollowSingleton {
	private static instance: CameraFollow

	private constructor () {}

	static getInstance(): CameraFollow {
		if (!CameraFollowSingleton.instance) {
			CameraFollowSingleton.instance = new CameraFollow()
		}
		return CameraFollowSingleton.instance
	}
}
