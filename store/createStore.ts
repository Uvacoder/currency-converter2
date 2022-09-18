import create, { StateCreator, StoreMutatorIdentifier } from "zustand"
import { immer } from "zustand/middleware/immer"

type Immer = [StoreMutatorIdentifier, never]
type State<T> = StateCreator<T, [...[], Immer], []>

const createStore = <T>(state: State<T>) => create<T, [Immer]>(immer(state))

export default createStore
