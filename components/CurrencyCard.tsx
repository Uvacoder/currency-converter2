import { css } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Currency } from "currencies.json"
import { Card, Flag, FlagNameValues, Label } from "semantic-ui-react"
import useCardStore, { Card as Item, CurrencyItem } from "store/card"
import { Option } from "store/search"
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
				item.baseCurrency !== currency.value &&
				!item.currencyList.find((c) => c.code === currency.value) &&
				currency.title.includes(value.toLocaleUpperCase())
		)
		setCardOptions({ base: item.baseCurrency, options: filteredOptions })
	}

	const handleSelect: SelectHandler = async (_, { result }) => {
		addCurrency({ base: item.baseCurrency, newCurrency: result.value })
	}

	const getCurrency = (item: CurrencyItem) =>
		currencies.find((c) => c.code.toLocaleLowerCase() === item.code)

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
				<ul css={listStyles} ref={listRef}>
					{item.currencyList.map((c, i) => (
						<Card as="li" key={i}>
							<Card.Content>
								<Card.Description css={itemStyles}>
									<Flag name={c.code.slice(0, 2) as FlagNameValues} />
									{c.code.toLocaleUpperCase()}{" "}
									<span css={codeStyles}>{getCurrency(c)?.symbol}</span>
									<span css={amountStyles}>{c.conversion.toFixed(2)}</span>
								</Card.Description>
							</Card.Content>
						</Card>
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
