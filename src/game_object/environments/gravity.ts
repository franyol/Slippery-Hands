import { GameSingleton } from "../../game/game";
import { Environment, HitBox } from "../base";

export class Gravity implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		const dt = GameSingleton.getInstance().dt
		this.objects.map((o) => {
			if (o.parent.yspeed < 80) {
				o.parent.yspeed += 100 * dt/100
			} else if (o.parent.yspeed >= 100) {
				o.parent.yspeed -= 100 * dt/100
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

export class GravitySingleton {
	private static instance: Gravity

	private constructor () {}

	static getInstance(): Gravity {
		if (!GravitySingleton.instance) {
			GravitySingleton.instance = new Gravity()
		}
		return GravitySingleton.instance
	}
}
