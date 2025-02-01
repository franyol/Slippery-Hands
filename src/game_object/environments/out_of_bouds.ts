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
		let outofbounds = true

		this.objects.map((obj) => {
			if (obj.x + obj.w > canvas.width) obj.parent.x = canvas.width - obj.w - obj._x;
			else if (obj.x < 0) obj.parent.x = -obj._x;
			if (obj.y + obj.h > canvas.height) obj.parent.y = canvas.height - obj.h - obj._y;
			else if (obj.y < 0) obj.parent.y = -obj._y;
			else outofbounds = false

			if (outofbounds) {
				obj.parent.x = 0
				obj.parent.y = 1500
			}
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
