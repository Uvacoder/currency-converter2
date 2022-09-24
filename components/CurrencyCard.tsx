import { css } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Currency } from "currencies.json"
import { Card } from "semantic-ui-react"
import useCardStore, { Card as Item } from "store/card"
import { Option } from "store/search"
import CardHeader from "./CardHeader"
import CurrencyAmount, { AmountChangeHandler } from "./CurrencyAmount"
import CurrencyForm, { SearchHandler, SelectHandler } from "./CurrencyForm"
import CurrencyItem from "./CurrencyItem"

type Props = {
	as?: keyof JSX.IntrinsicElements
	item: Item
	currencies: Currency[]
}
const CurrencyCard = ({ as, item, currencies }: Props) => {
	const [listRef] = useAutoAnimate<HTMLUListElement>()
	const { cards, addCurrency, setCardOptions, setAmount } = useCardStore()

	const allOptions: Option[] = currencies.map(({ code, name }) => ({
		value: code.toLocaleLowerCase(),
		title: code,
		description: name,
	}))

	const handleSearch: SearchHandler = (_, { value }) => {
		if (!value) return setCardOptions({ base: item.baseCurrency, options: [] })
		const filteredOptions = allOptions.filter(
			(option) =>
				item.baseCurrency.code !== option.value.toLocaleUpperCase() &&
				!item.currencyList.find(
					(item) => item.currency.code === option.value.toLocaleUpperCase()
				) &&
				(option.title.includes(value.toLocaleUpperCase()) ||
					option.description
						.toLocaleLowerCase()
						.includes(value.toLocaleLowerCase()))
		)
		setCardOptions({ base: item.baseCurrency, options: filteredOptions })
	}

	const handleSelect: SelectHandler = async (_, { result }) => {
		const newCurrency = currencies.find(
			(c) => result.value === c.code.toLocaleLowerCase()
		)
		if (newCurrency) {
			addCurrency({ base: item.baseCurrency, newCurrency })
		}
	}

	const handleAmountChange: AmountChangeHandler = (_, { value }) => {
		if (value === "" || /^[0-9\b\.]+$/.test(value)) {
			const index = cards.findIndex(
				(c) => c.baseCurrency.code === item.baseCurrency.code
			)
			setAmount({ index, amount: value })
		}
	}

	return (
		<Card as={as} css={cardStyles}>
			<Card.Content>
				<CardHeader
					currencyName={item.baseCurrency.name}
					currencyCode={item.baseCurrency.code}
				/>
				{!!item.currencyList.length && (
					<CurrencyAmount
						amount={item.amount}
						onAmountChange={handleAmountChange}
					/>
				)}
				<CurrencyForm
					isLoading={item.loading}
					options={item.options}
					onSearch={handleSearch}
					onSelect={handleSelect}
				/>
				<ul css={listStyles} ref={listRef}>
					{item.currencyList.map((currency, i) => (
						<CurrencyItem key={i} item={currency} multiplier={item.amount} />
					))}
				</ul>
			</Card.Content>
		</Card>
	)
}

const cardStyles = css`
	position: relative;
	padding-top: 4px !important;
	margin: 0 !important;
`
const listStyles = css`
	padding-left: 0;
`

export default CurrencyCard
