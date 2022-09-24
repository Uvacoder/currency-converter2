import "@emotion/react"

declare module "@emotion/react" {
	export interface Theme {
		colors: {
			control: {
				cardBg: string
				cardBorder: string
				button: string
			}
			text: {
				disabled: string
			}
		}
		sizes: {
			control: {
				cardWidth: string
				cardHeight: string
			}
		}
	}
}
