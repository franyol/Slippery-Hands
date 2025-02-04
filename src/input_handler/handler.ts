import { GameSingleton } from "../game/game";
import { GameObject } from "../game_object/base";

export type KeyState = 'up' | 'down' | 'iddle';

export class Button {
	keybinding: string
	virtual: GameObject
}

export class Joystick {
	keybindings: string[]
	virtual: GameObject
}

export class InputHandler {
	private keys: Map<string, KeyState>;
	private keysReleased: Map<string, boolean>;
	private touchCoords: { x: number; y: number } | null;
	showVirtual: boolean = false

	constructor() {
		this.keys = new Map<string, KeyState>();
		this.keysReleased = new Map<string, boolean>();
		this.touchCoords = null;

		// Add keyboard event listeners
		document.addEventListener('keydown', this.keyDownHandler.bind(this));
		document.addEventListener('keyup', this.keyUpHandler.bind(this));

		// Add touch event listeners
		document.addEventListener('touchstart', this.touchStartHandler.bind(this));
		document.addEventListener('touchmove', this.touchMoveHandler.bind(this));
		document.addEventListener('touchend', this.touchEndHandler.bind(this));
	}

	private keyDownHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'down');
	}

	private keyUpHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'up');
		this.keysReleased.set(event.key, true);
	}

	private touchStartHandler(event: TouchEvent): void {
		const touch = event.touches[0];
		this.touchCoords = { x: touch.clientX, y: touch.clientY };
	}

	private touchMoveHandler(event: TouchEvent): void {
		const touch = event.touches[0];
		this.touchCoords = { x: touch.clientX, y: touch.clientY };
	}

	private touchEndHandler(_event: TouchEvent): void {
		this.touchCoords = null; // Reset coordinates on touch end
	}

	getKeyState(key: string): KeyState {
		return this.keys.get(key) || 'iddle';
	}

	getKeyOnce(key: string): KeyState {
		if (this.keysReleased.get(key) === false) {
			return 'iddle'
		}
		const state = this.getKeyState(key)
		if (state === 'down') {
			this.keysReleased.set(key, false);
		}
		return state
	}

	setKeyState(key: string, state: KeyState) {
		this.keys.set(key, state)
	}

	getTouchCoords(): { x: number; y: number } | null {
		return this.touchCoords;
	}
}
