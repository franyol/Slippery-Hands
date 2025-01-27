type KeyState = 'up' | 'down' | 'iddle';

export class InputHandler {
	private keys: Map<string, KeyState>;
	private touchCoords: { x: number; y: number } | null;

	constructor() {
		this.keys = new Map<string, KeyState>();
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
	}

	private touchStartHandler(event: TouchEvent): void {
		const touch = event.touches[0];
		this.touchCoords = { x: touch.clientX, y: touch.clientY };
	}

	private touchMoveHandler(event: TouchEvent): void {
		const touch = event.touches[0];
		this.touchCoords = { x: touch.clientX, y: touch.clientY };
	}

	private touchEndHandler(event: TouchEvent): void {
		this.touchCoords = null; // Reset coordinates on touch end
	}

	getKeyState(key: string): KeyState {
		return this.keys.get(key) || 'iddle';
	}

	getTouchCoords(): { x: number; y: number } | null {
		return this.touchCoords;
	}
}
