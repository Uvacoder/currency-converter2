import { css } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Currency } from "currencies.json"
import { Card, Popup } from "semantic-ui-react"
import useCardStore, { Card as Item } from "store/card"
import { Option } from "store/search"
import CardHeader from "./CardHeader"
import CurrencyFlag from "./CurrencyFlag"
import CurrencyForm, { SearchHandler, SelectHandler } from "./CurrencyForm"

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
			(currency) =>
				item.baseCurrency.code !== currency.value.toLocaleUpperCase() &&
				!item.currencyList.find(
					(item) => item.currency.code === currency.value.toLocaleUpperCase()
				) &&
				currency.title.includes(value.toLocaleUpperCase())
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
						<Popup
							key={i}
							content={item.currency.name}
							position="top center"
							trigger={
								<Card as="li">
									<Card.Content>
										<Card.Description css={itemStyles}>
											<CurrencyFlag currencyCode={item.currency.code} />
											{item.currency.code}{" "}
											<span css={codeStyles}>{item.currency.symbol}</span>
											<span css={amountStyles}>
												{item.conversion.toFixed(2)}
											</span>
										</Card.Description>
									</Card.Content>
								</Card>
							}
						/>
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

export default CurrencyCard
