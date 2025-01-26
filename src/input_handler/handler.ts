
type KeyState = 'up' | 'down' | 'iddle';

export class InputHandler {
	private keys: Map<string, KeyState>

	constructor() {
		this.keys = new Map<string, KeyState>()

		document.addEventListener('keydown', this.keyDownHandler.bind(this))
		document.addEventListener('keyup', this.keyUpHandler.bind(this))
	}

	private keyDownHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'down');
	}

	private keyUpHandler(event: KeyboardEvent): void {
		this.keys.set(event.key, 'up');
	}

	getKeyState(key: string): KeyState {
		return this.keys.get(key) || 'iddle'
	}
}
