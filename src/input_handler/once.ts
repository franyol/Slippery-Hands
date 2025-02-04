export class Once {
	callback: () => void = () => {}
	enabled: boolean = true

	request(pressed: boolean) {
		if (!pressed) {
			this.enabled = true
			return false
		} else {
			this.enabled = false
			return this.enabled && pressed
		}
	}
}
