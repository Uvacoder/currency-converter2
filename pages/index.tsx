import { Currency } from "currencies.json"
import { apiFetch } from "lib/api-fetch"
import type { GetStaticProps, NextPage } from "next"

type Props = StaticProps & {}
const Home: NextPage<Props> = ({ currencies }) => {
	return <div></div>
}

type StaticProps = {
	currencies: Currency[]
}
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	const { request } = await apiFetch()
	const { data } = await request.get<StaticProps>("getCurrenciesList")
	return { props: { currencies: data.currencies } }
}

export default Home
