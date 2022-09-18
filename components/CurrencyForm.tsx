import { css } from "@emotion/react"
import { Currency } from "currencies.json"
import React from "react"
import {
	Card,
	Flag,
	FlagNameValues,
	Search,
	SearchProps,
	SearchResultData,
	SearchResultProps,
} from "semantic-ui-react"
import useCardStore from "store/card"
import useSearchStore, { Option } from "store/search"

type SearchHandler = (
	event: React.MouseEvent<HTMLElement, MouseEvent>,
	props: SearchProps
) => void
type SelectHandler = (
	event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	props: SearchResultData
) => void

type Props = {
	currencies: Currency[]
}
const CurrencyForm = ({ currencies }: Props) => {
	const { cards, addCard } = useCardStore()
	const { hideForm, options, setOptions } = useSearchStore()
	const mainCurrencies = cards.map((card) => card.baseCurrency)
	const allOptions: Option[] = currencies.map(({ code, name }) => ({
		value: code.toLocaleLowerCase(),
		title: code,
		description: name,
	}))

	const handleSearch: SearchHandler = (_, { value }) => {
		if (!value) return setOptions([])
		const filteredOptions = allOptions.filter(
			(currency) =>
				!mainCurrencies.includes(currency.title) &&
				currency.title.includes(value.toLocaleUpperCase())
		)
		setOptions(filteredOptions)
	}

	const handleSelect: SelectHandler = (_, { result }) => {
		addCard(result.value)
		hideForm()
	}

	const resultRenderer = ({ title, description }: SearchResultProps) => (
		<p>
			<Flag name={title.slice(0, 2).toLocaleLowerCase() as FlagNameValues} />
			{title} - {description}
		</p>
	)

	return (
		<Card css={cardStyles}>
			<Card.Content>
				<p>Select base currency:</p>
				<Search
					fluid
					results={options}
					placeholder="Search..."
					onSearchChange={handleSearch}
					onResultSelect={handleSelect}
					resultRenderer={resultRenderer}
					css={searchStyles}
				/>
			</Card.Content>
		</Card>
	)
}

const cardStyles = css`
	padding: 8px;
`
const searchStyles = css`
	& > .input {
		width: 100%;
	}
`

export default CurrencyForm
