import { Environment, HitBox } from "../base";

export class Gravity implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		this.objects.map((o) => {
			if (o.parent.yspeed < 60) {
				o.parent.yspeed += 10 
			} else if (o.parent.yspeed > 70) {
				o.parent.yspeed -= 10
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
