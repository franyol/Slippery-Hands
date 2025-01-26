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

export interface Environment {
	uuid: number
	objects: GameObject[]

	update(): void
	register(obj: GameObject): void
	deregister(obj: GameObject | number): void
}
