import { Game } from "../game/game"

export interface GameObject {
	uuid: number

	/**
	 * The priority decides which objects are rendered first
	 * in each frame (smaller first)
	 */
	prio: number
	game: Game
	
	update(): void
	render(): void
}

export interface Physics {
	xspeed: number
	yspeed: number
}

export type HitBox = {
	x: number
	y: number
	w: number
	h: number
	x_1: number
	y_1: number
	colliders: HitBox[]
	visible: boolean
	type: 'standard' | 'stop'
	layer: number
}

export interface Environment {
	objects: unknown[]

	update(): void
	register(obj: unknown): void
	deregister(obj: unknown): void
	clean(): void
}
