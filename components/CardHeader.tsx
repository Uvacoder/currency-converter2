import { css } from "@emotion/react"
import { Flag, FlagNameValues, Label, Popup } from "semantic-ui-react"

type Props = {
	currencyName: string
	countryName: FlagNameValues
	currencyCode: string
}
const CardHeader = ({ currencyName, countryName, currencyCode }: Props) => {
	return (
		<Label basic size="big" css={headingStyles}>
			<Popup
				content={currencyName}
				position="top center"
				trigger={
					<div css={popupStyles}>
						<Flag name={countryName} css={flagStyles} />
						{currencyCode.toLocaleUpperCase()}
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
	top: -24px;
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
