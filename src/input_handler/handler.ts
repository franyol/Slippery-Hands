import { Game } from "../game/game";
import { Button } from "../game_object/ui/button";
import { Joystick } from "../game_object/ui/joystick";

export type KeyState = 'up' | 'down' | 'iddle';

export type TouchState = {
	isbusy: boolean
	state: KeyState
	x: number
	y: number
}

export type ButtonBinding = {
	keybinding: string
	virtual: Button
}

export class InputHandler {
	private keys: Map<string, KeyState>;
	private keysReleased: Map<string, boolean>;
	touches: Record<number, TouchState> = {}
	showVirtual: boolean = false
	bindings: Record<string, ButtonBinding>
	joysticks: Record<string, Joystick>
	game: Game

	constructor(game: Game) {
		this.game = game
		this.keys = new Map<string, KeyState>();
		this.keysReleased = new Map<string, boolean>();

		this.joysticks = {
			'left': new Joystick(game, 110, 170, 100, 100, 'Bottom-Left')
		}

		this.bindings = {
			'jump': {keybinding: ' ', virtual: new Button(game, 170, 200, 70, 70, 'A', 'Bottom-Right')},
			'roll': {keybinding: 's', virtual: new Button(game, 250, 120, 70, 70, 'B', 'Bottom-Right')},
			'left': {keybinding: 'a', virtual: this.joysticks['left'].joyState.left},
			'right': {keybinding: 'd', virtual: this.joysticks['left'].joyState.right},
		}

		// Add keyboard event listeners
		document.addEventListener('keydown', this.keyDownHandler.bind(this));
		document.addEventListener('keyup', this.keyUpHandler.bind(this));

		// Add touch event listeners
		document.addEventListener('touchstart', this.touchStartHandler.bind(this), { passive: false });
		document.addEventListener('touchmove', this.touchMoveHandler.bind(this), { passive: false });
		document.addEventListener('touchend', this.touchEndHandler.bind(this), { passive: false });
		document.addEventListener('touchcancel', this.touchEndHandler.bind(this), { passive: false });
	}

	private keyDownHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'down');
		this.showVirtual = false
	}

	private keyUpHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'up');
		this.keysReleased.set(event.key, true);
	}

	private touchStartHandler(event: TouchEvent): void {
		event.preventDefault()
		const touches = Array.from(event.changedTouches)
		touches.forEach((touch) => {
			this.touches[touch.identifier] = {
				isbusy: false,
				x: touch.clientX, 
				y: touch.clientY, 
				state: 'down'
			}
		})
		this.showVirtual = true
	}

	private touchMoveHandler(event: TouchEvent): void {
		event.preventDefault()
		const touches = Array.from(event.changedTouches)
		touches.forEach((touch) => {
			this.touches[touch.identifier] = {
				...this.touches[touch.identifier],
				x: touch.clientX, 
				y: touch.clientY, 
			}
		})
	}

	private touchEndHandler(event: TouchEvent): void {
		event.preventDefault()
		const touches = Array.from(event.changedTouches)
		touches.forEach((touch) => {
			if (!this.touches[touch.identifier].isbusy) {
				delete this.touches[touch.identifier]
				return
			}
			this.touches[touch.identifier] = {
				...this.touches[touch.identifier],
				x: touch.clientX, 
				y: touch.clientY, 
				state: 'up'
			}
		})
	}

	getTouchState(id: number): TouchState {
		const response = this.touches[id]
		if (response.state === 'up') {
			delete this.touches[id]
		}

		return response
	}

	getKeyState(key: string): KeyState {
		return this.keys.get(key) || 'iddle';
	}

	getBindingState(key: string): KeyState {
		if (!(key in this.bindings)) {
			return
		}
		if (this.showVirtual) {
			const binding = this.bindings[key]
			const button = binding.virtual
			return button.keyState
		} else {
			const binding = this.bindings[key]
			return this.getKeyState(binding.keybinding)
		}
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
}
