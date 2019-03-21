import React from 'react'
import Provider from 'react-redux/lib/components/Provider'
import syncHistoryWithStore from 'react-router-redux/lib/sync'
// import configSocket from './util/socket'

import history from './router/history'
import store from './store'
import router from './router'

// components
import PubSubToast from './components/common/toast/PubSubToast'
import Orientation from './components/common/orientation/Orientation'
// import App from './containers/App'

const syncHistory = syncHistoryWithStore(history, store, {
  selectLocationState (state) {
    return state.get('routing').toJS()
  }
})

export default class Root extends React.Component {

  render() {
    console.log('render Root')
    return (
      <div>
        <Orientation/>
        <PubSubToast/>
        <Provider store={store}>
          {/* <App store={store}> */}
          {router(syncHistory)}
          {/* </App> */}
        </Provider>
      </div>
    )
  }
}
