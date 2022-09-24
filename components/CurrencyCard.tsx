import { css } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Currency } from "currencies.json"
import { Card } from "semantic-ui-react"
import useCardStore, { Card as Item } from "store/card"
import { Option } from "store/search"
import CardHeader from "./CardHeader"
import CurrencyForm, { SearchHandler, SelectHandler } from "./CurrencyForm"
import CurrencyItem from "./CurrencyItem"

type Props = {
	as?: keyof JSX.IntrinsicElements
	item: Item
	currencies: Currency[]
}
const CurrencyCard = ({ as, item, currencies }: Props) => {
	const [listRef] = useAutoAnimate<HTMLUListElement>()
	const { addCurrency, setCardOptions } = useCardStore()

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

	return (
		<Card as={as} css={cardStyles}>
			<Card.Content>
				<CardHeader
					currencyName={item.baseCurrency.name}
					currencyCode={item.baseCurrency.code}
				/>
				<CurrencyForm
					isLoading={item.loading}
					options={item.options}
					onSearch={handleSearch}
					onSelect={handleSelect}
				/>
				<ul css={listStyles} ref={listRef}>
					{item.currencyList.map((item, i) => (
						<CurrencyItem key={i} item={item} />
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
