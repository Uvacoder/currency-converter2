import { css } from "@emotion/react"
import { Label, Popup } from "semantic-ui-react"
import CurrencyFlag from "./CurrencyFlag"

type Props = {
	currencyName: string
	currencyCode: string
}
const CardHeader = ({ currencyName, currencyCode }: Props) => {
	return (
		<Label basic size="big" css={headingStyles}>
			<Popup
				content={currencyName}
				position="top center"
				trigger={
					<div css={popupStyles}>
						<CurrencyFlag currencyCode={currencyCode} css={flagStyles} />
						{currencyCode}
					</div>
				}
			/>
		</Label>
	)
}

const flagStyles = css`
	margin-top: 2px !important;
	vertical-align: top !important;
`
const headingStyles = css`
	position: absolute;
	text-align: center;
	top: -16px;
	left: 0;
	right: 0;
	width: 120px;
	padding: 0 !important;
	margin: 0 auto !important;
`
const popupStyles = css`
	padding: 12px;
`

export default CardHeader
