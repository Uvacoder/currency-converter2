import { css } from "@emotion/react"
import React, { useState } from "react"
import {
	Card,
	Flag,
	FlagNameValues,
	Search,
	SearchProps,
	SearchResultData,
	SearchResultProps,
} from "semantic-ui-react"
import { Option } from "store/search"

export type SearchHandler = (
	event: React.MouseEvent<HTMLElement, MouseEvent>,
	props: SearchProps
) => void
export type SelectHandler = (
	event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	props: SearchResultData
) => void

type Props = {
	options: Option[]
	onSearch: SearchHandler
	onSelect: SelectHandler
}
const CurrencyForm = ({ options, onSearch, onSelect }: Props) => {
	const [inputValue, setInputValue] = useState("")

	const handleSearch: SearchHandler = (event, props) => {
		if (!props.value) return setInputValue("")
		setInputValue(props.value)
		onSearch(event, props)
	}

	const handleSelect: SelectHandler = (event, props) => {
		onSelect(event, props)
		setInputValue("")
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
					value={inputValue}
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
