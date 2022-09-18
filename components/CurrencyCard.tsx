import { css } from "@emotion/react"
import { Currency } from "currencies.json"
import { Card, Flag, FlagNameValues, Label } from "semantic-ui-react"
import useCardStore, { Card as Item } from "store/card"
import { Option } from "store/search"
import CurrencyForm, { SearchHandler, SelectHandler } from "./CurrencyForm"

type Props = {
	as?: keyof JSX.IntrinsicElements
	item: Item
	currencies: Currency[]
}
const CurrencyCard = ({ as, item, currencies }: Props) => {
	const { setCardOptions } = useCardStore()

	const allOptions: Option[] = currencies.map(({ code, name }) => ({
		value: code.toLocaleLowerCase(),
		title: code,
		description: name,
	}))

	const handleSearch: SearchHandler = (_, { value }) => {
		if (!value) return setCardOptions({ base: item.baseCurrency, options: [] })
		const filteredOptions = allOptions.filter(
			(currency) =>
				item.baseCurrency !== currency.value &&
				currency.title.includes(value.toLocaleUpperCase())
		)
		setCardOptions({ base: item.baseCurrency, options: filteredOptions })
	}

	const handleSelect: SelectHandler = () => {}

	return (
		<Card as={as} css={cardStyles}>
			<Card.Content>
				<Label basic size="big" css={headingStyles}>
					<Flag
						name={item.baseCurrency.slice(0, 2) as FlagNameValues}
						css={flagStyles}
					/>
					{item.baseCurrency.toLocaleUpperCase()}
				</Label>
				<CurrencyForm
					options={item.options}
					onSearch={handleSearch}
					onSelect={handleSelect}
				/>
			</Card.Content>
		</Card>
	)
}

const cardStyles = css`
	position: relative;
	padding-top: 4px !important;
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
