import createStore from "./createStore"

export type Option = {
	value: string
	title: string
	description: string
}

type SearchState = {
	options: Option[]
	formDisplay: boolean
	setOptions: (payload: Option[]) => void
	showForm: () => void
	hideForm: () => void
}
const useSearchStore = createStore<SearchState>((set) => ({
	options: [],
	formDisplay: false,
	setOptions: (payload) => set(setOptions(payload)),
	showForm: () => set(showForm),
	hideForm: () => set(hideForm),
}))

const setOptions = (payload: Option[]) => (state: SearchState) => {
	state.options = payload
}
const showForm = (state: SearchState) => {
	state.formDisplay = true
}
const hideForm = (state: SearchState) => {
	state.formDisplay = false
}

export default useSearchStore
