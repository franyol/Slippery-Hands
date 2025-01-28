import { GameSingleton } from "../../game/game";
import { Environment, Physics } from "../base";

export class Gravity implements Environment {
	objects: Physics[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		const game = GameSingleton.getInstance()
		this.objects.map((o) => {
			if (o.yspeed < 5) {
				o.yspeed += 15 * (game.dt/1000)
			} else if (o.yspeed > 7) {
				o.yspeed -= 15 * (game.dt/1000)
			}
		})
	}

	register(obj: Physics) {
		this.objects.push(obj)
	}

	deregister(obj: Physics): void {
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
