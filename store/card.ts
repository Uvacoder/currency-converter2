import createStore from "./createStore"
import { Option } from "./search"

export type Card = {
	baseCurrency: string
	currencyList: string[]
	options: Option[]
}
type SetOptionsPayload = {
	base: string
	options: Option[]
}

type CardState = {
	cards: Card[]
	addCard: (payload: string) => void
	setCardOptions: (payload: SetOptionsPayload) => void
}
const useCardStore = createStore<CardState>((set) => ({
	cards: [],
	addCard: (payload) => set(addCard(payload)),
	setCardOptions: (payload) => set(setCardOptions(payload)),
}))

const addCard = (payload: string) => (state: CardState) => {
	state.cards.push({ baseCurrency: payload, currencyList: [], options: [] })
}
const setCardOptions = (payload: SetOptionsPayload) => (state: CardState) => {
	const cardIndex = state.cards.findIndex(
		(card) => card.baseCurrency === payload.base
	)
	state.cards[cardIndex].options = payload.options
}

export default useCardStore
