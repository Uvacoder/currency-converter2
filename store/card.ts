import { apiFetch } from "lib/api-fetch"
import createStore from "./createStore"
import { Option } from "./search"

export type CurrencyItem = {
	code: string
	conversion: number
}
export type Card = {
	baseCurrency: string
	currencyList: CurrencyItem[]
	options: Option[]
}
type AddCurrencyPayload = {
	base: string
	newCurrency: string
}
type SetOptionsPayload = {
	base: string
	options: Option[]
}
type AddCurrencyResult = {
	date: string
	amount: number
}

type CardState = {
	cards: Card[]
	addCard: (payload: string) => void
	addCurrency: (payload: AddCurrencyPayload) => void
	setCardOptions: (payload: SetOptionsPayload) => void
}
const useCardStore = createStore<CardState>((set) => ({
	cards: [],
	addCard: (payload) => set(addCard(payload)),
	addCurrency: async (payload) => {
		const { request } = await apiFetch()
		const { data } = await request.post("convertCurrency", {
			from: payload.base,
			to: payload.newCurrency,
		})
		set(addCurrency(payload, data))
	},
	setCardOptions: (payload) => set(setCardOptions(payload)),
}))

const addCard = (payload: string) => (state: CardState) => {
	state.cards.push({ baseCurrency: payload, currencyList: [], options: [] })
}
const addCurrency =
	(payload: AddCurrencyPayload, data: AddCurrencyResult) =>
	(state: CardState) => {
		const cardIndex = state.cards.findIndex(
			(card) => card.baseCurrency === payload.base
		)
		state.cards[cardIndex].currencyList.push({
			code: payload.newCurrency,
			conversion: data.amount,
		})
	}
const setCardOptions = (payload: SetOptionsPayload) => (state: CardState) => {
	const cardIndex = state.cards.findIndex(
		(card) => card.baseCurrency === payload.base
	)
	state.cards[cardIndex].options = payload.options
}

export default useCardStore
