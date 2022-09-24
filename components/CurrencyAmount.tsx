import { css } from "@emotion/react"
import { Card, Input, InputOnChangeData } from "semantic-ui-react"

export type AmountChangeHandler = (
	event: React.ChangeEvent<HTMLInputElement>,
	data: InputOnChangeData
) => void
type Props = {
	amount: string
	onAmountChange: AmountChangeHandler
}
const CurrencyAmount = ({ amount, onAmountChange }: Props) => {
	return (
		<Card css={cardStyles}>
			<Card.Content>
				<p>Amount to be converted:</p>
				<Input
					type="number"
					min={0}
					css={inputStyles}
					value={amount}
					onChange={onAmountChange}
				/>
			</Card.Content>
		</Card>
	)
}

const cardStyles = css`
	padding: 8px;
`
const inputStyles = css`
	width: 100%;
`

export default CurrencyAmount
