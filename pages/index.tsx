import { css, Theme } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import AddCurrencyCardButton from "components/AddCurrencyCardButton"
import CurrencyCard from "components/CurrencyCard"
import CurrencyForm, {
	SearchHandler,
	SelectHandler,
} from "components/CurrencyForm"
import { Currency } from "currencies.json"
import { apiFetch } from "lib/api-fetch"
import type { GetStaticProps, NextPage } from "next"
import useCardStore from "store/card"
import useSearchStore, { Option } from "store/search"

type Props = StaticProps & {}
const Home: NextPage<Props> = ({ currencies }) => {
	const { cards, addCard } = useCardStore()
	const { formDisplay, hideForm, formOptions, setFormOptions } =
		useSearchStore()
	const [formRef] = useAutoAnimate<HTMLLIElement>()
	const [listRef] = useAutoAnimate<HTMLUListElement>()

	const mainCurrencies = cards.map((card) => card.baseCurrency)
	const allOptions: Option[] = currencies.map(({ code, name }) => ({
		value: code.toLocaleLowerCase(),
		title: code,
		description: name,
	}))

	const handleSearch: SearchHandler = (_, { value }) => {
		if (!value) return setFormOptions([])
		const filteredOptions = allOptions.filter(
			(currency) =>
				!mainCurrencies.includes(currency.value) &&
				currency.title.includes(value.toLocaleUpperCase())
		)
		setFormOptions(filteredOptions)
	}

	const handleSelect: SelectHandler = (_, { result }) => {
		addCard(result.value)
		hideForm()
	}

	return (
		<div>
			<ul ref={listRef} css={containerStyles}>
				{cards.map((item, i) => (
					<CurrencyCard key={i} item={item} currencies={currencies} />
				))}
				{formDisplay ? (
					<li css={formStyles} ref={formRef}>
						<CurrencyForm
							options={formOptions}
							onSearch={handleSearch}
							onSelect={handleSelect}
						/>
					</li>
				) : (
					<AddCurrencyCardButton as="li" />
				)}
			</ul>
		</div>
	)
}

type StaticProps = {
	currencies: Currency[]
}
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const { request } = await apiFetch()
	const { data } = await request.get<StaticProps>("getCurrenciesList")
	return { props: { currencies: data.currencies } }
}

const containerStyles = css`
	display: flex;
	margin: 80px;
	padding: 40px;
	gap: 32px;
`
const formStyles = ({ colors, sizes }: Theme) => css`
	width: ${sizes.control.cardWidth};
	height: ${sizes.control.cardHeight};
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	border: 4px solid ${colors.control.cardBorder};
	background-color: ${colors.control.cardBg};
`

export default Home
