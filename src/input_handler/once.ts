export class Once {
	callback: () => void = () => {}
	enabled: boolean = true

	request(pressed: boolean) {
		if (!pressed) {
			this.enabled = true
			return false
		} else if (this.enabled && pressed) {
			this.enabled = false
			return true
		}
		return false
	}
}
