import { ThemeProvider } from "@emotion/react"
import { AppProps } from "next/app"
import Head from "next/head"
import "semantic-ui-css/semantic.min.css"

export default function App(props: AppProps) {
	const { Component, pageProps } = props

	return (
		<>
			<Head>
				<title>Currency Converter</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

const theme = {
	colors: {
		control: {
			cardBg: "#f8f8f8",
			cardBorder: "#d3d3d3",
			button: "#c0c0c0",
		},
	},
}
