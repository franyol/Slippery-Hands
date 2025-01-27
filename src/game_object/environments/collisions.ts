import { Environment, HitBox } from "../base";

export class Collided implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].colliders.length = 0;
		}
		for (let i = 0; i < this.objects.length; i++) {
			for (let j = i + 1; j < this.objects.length; j++) {
				if (this.collided(this.objects[i], this.objects[j])) {
					this.objects[i].colliders.push(this.objects[j])
					this.objects[j].colliders.push(this.objects[i])
				}
			}
		}
		this.objects.map((hb) => {
			switch (hb.type) {
				case 'stop':
				case 'standard':
					hb.colliders.map((collider) => {
					if (collider.type !== 'stop') return
					if (hb.x_1+hb.w <= collider.x) {
						hb.x = collider.x - hb.w
					} else if (hb.x_1 >= collider.x+collider.w) {
						hb.x = collider.x+collider.w
					} else if (hb.y_1+hb.h <= collider.y) {
						hb.y = collider.y - hb.h
					} else if (hb.y_1 >= collider.y+collider.h) {
						hb.y = collider.y+collider.h
					}
				})
					break;
				default:
					break;
			}
		})
	}

	collided(a: HitBox, b: HitBox) {
		if (a.layer !== b.layer) return false
		return ((a.x >= b.x && a.x <= b.x+b.w || a.x+a.w <= b.x+b.w && a.x+a.w >= b.x)
				&&
				(a.y >= b.y && a.y <= b.y+b.h || a.y+a.h <= b.y+b.h && a.y+a.h >= b.y))
	}

	register(obj: HitBox) {
		this.objects.push(obj)
	}

	deregister(obj: HitBox): void {
		this.objects = this.objects.filter((o) => o !== obj);
	}
}

export class CollidedSingleton {
	private static instance: Collided

	private constructor () {}

	static getInstance(): Collided {
		if (!CollidedSingleton.instance) {
			CollidedSingleton.instance = new Collided()
		}
		return CollidedSingleton.instance
	}
}
