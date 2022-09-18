import "@emotion/react"

declare module "@emotion/react" {
	export interface Theme {
		colors: {
			control: {
				cardBg: string
				cardBorder: string
				button: string
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
