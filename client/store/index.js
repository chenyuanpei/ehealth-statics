import configureStore from './configureStore'

const store = configureStore()

export const select = (selector) => selector(store.getState())

export default store
