import { css } from "@emotion/react"
import { Card, Popup } from "semantic-ui-react"
import { CurrencyItem } from "store/card"
import CurrencyFlag from "./CurrencyFlag"

type Props = {
	item: CurrencyItem
}
const CurrencyItem = ({ item }: Props) => {
	return (
		<Popup
			content={item.currency.name}
			position="top center"
			trigger={
				<Card as="li">
					<Card.Content>
						<Card.Description css={itemStyles}>
							<CurrencyFlag currencyCode={item.currency.code} />
							{item.currency.code}{" "}
							<span css={codeStyles}>{item.currency.symbol}</span>
							<span css={amountStyles}>{item.conversion.toFixed(2)}</span>
						</Card.Description>
					</Card.Content>
				</Card>
			}
		/>
	)
}

const itemStyles = css`
	display: grid;
	align-items: center;
	grid-template-columns: 24px 40px auto 1fr;
`
const codeStyles = css`
	font-size: 20px;
	font-weight: bold;
	padding-bottom: 2px;
`
const amountStyles = css`
	text-align: right;
	font-size: 16px;
	font-weight: bold;
`

export default CurrencyItem
