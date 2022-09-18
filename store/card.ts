import createStore from "./createStore"

export type Card = {
	baseCurrency: string
	currencyList: string[]
}

type CardState = {
	cards: Card[]
	addCard: (payload: string) => void
	setCards: (payload: Card[]) => void
}
const useCardStore = createStore<CardState>((set) => ({
	cards: [],
	addCard: (payload) => set(addCard(payload)),
	setCards: (payload) => set(setCards(payload)),
}))

const addCard = (payload: string) => (state: CardState) => {
	state.cards.push({ baseCurrency: payload, currencyList: [] })
}
const setCards = (payload: Card[]) => (state: CardState) => {
	state.cards = payload
}

export default useCardStore
