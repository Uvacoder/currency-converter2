import { css } from "@emotion/react"
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
					onSearchChange={onSearch}
					onResultSelect={onSelect}
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
