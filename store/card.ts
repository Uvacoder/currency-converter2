import { Currency } from "currencies.json"
import { apiFetch } from "lib/api-fetch"
import createStore from "./createStore"
import { Option } from "./search"

export type CurrencyItem = {
	currency: Currency
	conversion: number
}
export type Card = {
	amount: string
	baseCurrency: Currency
	currencyList: CurrencyItem[]
	options: Option[]
	loading: boolean
	limit: number
}
type AddCurrencyPayload = {
	base: Currency
	newCurrency: Currency
}
type SetOptionsPayload = {
	base: Currency
	options: Option[]
}
type SetLoadingPayload = {
	index: number
	loading: boolean
}
type SetAmountPayload = {
	index: number
	amount: string
}
type AddCurrencyResult = {
	date: string
	amount: number
}

type CardState = {
	cards: Card[]
	addCard: (payload: Currency) => void
	addCurrency: (payload: AddCurrencyPayload) => void
	setCardOptions: (payload: SetOptionsPayload) => void
	setLoading: (payload: SetLoadingPayload) => void
	setAmount: (payload: SetAmountPayload) => void
}
const useCardStore = createStore<CardState>((set, get) => ({
	cards: [],
	addCard: (payload) => set(addCard(payload)),
	addCurrency: async (payload) => {
		const index = get().cards.findIndex(
			(c) => c.baseCurrency.code === payload.base.code
		)
		set(setLoading({ index, loading: true }))
		const { request } = await apiFetch()
		const { data } = await request.post("convertCurrency", {
			from: payload.base.code.toLocaleLowerCase(),
			to: payload.newCurrency.code.toLocaleLowerCase(),
		})
		set(addCurrency(payload, data))
		setTimeout(() => {
			set(setLoading({ index, loading: false }))
		}, 300)
	},
	setCardOptions: (payload) => set(setCardOptions(payload)),
	setLoading: (payload) => set(setLoading(payload)),
	setAmount: (payload) => set(setAmount(payload)),
}))

const addCard = (payload: Currency) => (state: CardState) => {
	state.cards.push({
		amount: "",
		baseCurrency: payload,
		currencyList: [],
		options: [],
		loading: false,
		limit: 6,
	})
}
const addCurrency =
	(payload: AddCurrencyPayload, data: AddCurrencyResult) =>
	(state: CardState) => {
		const cardIndex = state.cards.findIndex(
			(card) => card.baseCurrency.code === payload.base.code
		)
		const card = state.cards[cardIndex]
		if (card.currencyList.length < card.limit) {
			card.currencyList.push({
				currency: payload.newCurrency,
				conversion: data.amount,
			})
		}
	}
const setCardOptions = (payload: SetOptionsPayload) => (state: CardState) => {
	const cardIndex = state.cards.findIndex(
		(card) => card.baseCurrency.code === payload.base.code
	)
	state.cards[cardIndex].options = payload.options
}
const setLoading = (payload: SetLoadingPayload) => (state: CardState) => {
	state.cards[payload.index].loading = payload.loading
}
const setAmount = (payload: SetAmountPayload) => (state: CardState) => {
	state.cards[payload.index].amount = payload.amount
}

export default useCardStore
