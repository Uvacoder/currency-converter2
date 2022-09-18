import createStore from "./createStore"

export type Option = {
	value: string
	title: string
	description: string
}

type SearchState = {
	formOptions: Option[]
	formDisplay: boolean
	setFormOptions: (payload: Option[]) => void
	showForm: () => void
	hideForm: () => void
}
const useSearchStore = createStore<SearchState>((set) => ({
	formOptions: [],
	formDisplay: false,
	setFormOptions: (payload) => set(setFormOptions(payload)),
	showForm: () => set(showForm),
	hideForm: () => set(hideForm),
}))

const setFormOptions = (payload: Option[]) => (state: SearchState) => {
	state.formOptions = payload
}
const showForm = (state: SearchState) => {
	state.formDisplay = true
}
const hideForm = (state: SearchState) => {
	state.formDisplay = false
}

export default useSearchStore
