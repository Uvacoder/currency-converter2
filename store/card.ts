import createStore from "./createStore"
import { Option } from "./search"

export type Card = {
	baseCurrency: string
	currencyList: string[]
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

type CardState = {
	cards: Card[]
	addCard: (payload: string) => void
	addCurrency: (payload: AddCurrencyPayload) => void
	setCardOptions: (payload: SetOptionsPayload) => void
}
const useCardStore = createStore<CardState>((set) => ({
	cards: [],
	addCard: (payload) => set(addCard(payload)),
	addCurrency: (payload) => set(addCurrency(payload)),
	setCardOptions: (payload) => set(setCardOptions(payload)),
}))

const addCard = (payload: string) => (state: CardState) => {
	state.cards.push({ baseCurrency: payload, currencyList: [], options: [] })
}
const addCurrency = (payload: AddCurrencyPayload) => (state: CardState) => {
	const cardIndex = state.cards.findIndex(
		(card) => card.baseCurrency === payload.base
	)
	state.cards[cardIndex].currencyList.push(payload.newCurrency)
}
const setCardOptions = (payload: SetOptionsPayload) => (state: CardState) => {
	const cardIndex = state.cards.findIndex(
		(card) => card.baseCurrency === payload.base
	)
	state.cards[cardIndex].options = payload.options
}

export default useCardStore
