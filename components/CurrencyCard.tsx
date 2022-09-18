import { css } from "@emotion/react"
import { Card, Container, Flag, FlagNameValues, Label } from "semantic-ui-react"
import { Card as CurrencyCard } from "store/card"

type Props = {
	as?: keyof JSX.IntrinsicElements
	item: CurrencyCard
}
const CurrencyCard = ({ as, item }: Props) => {
	return (
		<Card as={as} css={cardStyles}>
			<Container>
				<Label basic size="big" css={headingStyles}>
					<Flag
						name={item.baseCurrency.slice(0, 2) as FlagNameValues}
						css={flagStyles}
					/>
					{item.baseCurrency.toLocaleUpperCase()}
				</Label>
			</Container>
		</Card>
	)
}

const cardStyles = css`
	position: relative;
	margin: 0 !important;
`
const flagStyles = css`
	margin-top: 2px !important;
	vertical-align: top !important;
`
const headingStyles = css`
	position: absolute;
	text-align: center;
	top: -20px;
	left: 0;
	right: 0;
	width: 120px;
	margin: 0 auto !important;
`

export default CurrencyCard
