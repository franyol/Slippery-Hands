import { Environment, HitBox } from "../base";

export class Collided implements Environment {
	objects: HitBox[] = []

	clean() {
		this.objects.length = 0
	}

	update() {
		for (let i = 0; i < this.objects.length; i++) {
			this.objects[i].colliders = [];
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
					if (hb.getx(1)+hb.w <= collider.x) {
						hb.parent.x = collider.x - hb.w
						hb.parent.xspeed = 0
					} else if (hb.getx(1) >= collider.x+collider.w) {
						hb.parent.x = collider.x+collider.w
						hb.parent.xspeed = 0
					} else if (hb.gety(1)+hb.h <= collider.y) {
						hb.parent.y = collider.y - hb.h
						hb.parent.yspeed = 0
					} else if (hb.gety(1) >= collider.y+collider.h) {
						hb.parent.y = collider.y+collider.h
						hb.parent.yspeed = 0
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
