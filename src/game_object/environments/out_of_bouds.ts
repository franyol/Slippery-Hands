import { GameSingleton } from "../../game/game";
import { Environment, HitBox } from "../base";

export class InBounds implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		const game = GameSingleton.getInstance()
		const canvas = game.canvas

		this.objects.map((obj) => {
			if (obj.x + obj.w > canvas.width) obj.x = canvas.width - obj.w;
			else if (obj.x < 0) obj.x = 0;
			if (obj.y + obj.h > canvas.height) obj.y = canvas.height - obj.h;
			else if (obj.y < 0) obj.y = 0;
		})
	}

	register(obj: HitBox) {
		this.objects.push(obj)
	}

	deregister(obj: HitBox): void {
		this.objects = this.objects.filter((o) => o !== obj);
	}
}

export class InBoundsSingleton {
	private static instance: InBounds

	private constructor () {}

	static getInstance(): InBounds {
		if (!InBoundsSingleton.instance) {
			InBoundsSingleton.instance = new InBounds()
		}
		return InBoundsSingleton.instance
	}
}
