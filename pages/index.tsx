import { css } from "@emotion/react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import AddCurrencyCardButton from "components/AddCurrencyCardButton"
import CurrencyForm from "components/CurrencyForm"
import { Currency } from "currencies.json"
import { apiFetch } from "lib/api-fetch"
import type { GetStaticProps, NextPage } from "next"
import useSearchStore from "store/search"

type Props = StaticProps & {}
const Home: NextPage<Props> = ({ currencies }) => {
	const { formDisplay } = useSearchStore()
	const [listRef] = useAutoAnimate<HTMLUListElement>()

	return (
		<div>
			<ul ref={listRef} css={containerStyles}>
				{formDisplay ? (
					<CurrencyForm currencies={currencies} />
				) : (
			<AddCurrencyCardButton />
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
export default Home
