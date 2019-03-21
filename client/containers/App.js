import React from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
// util
import {hideOptionMenu} from '../util/wxJs/wxApi'
// store
import store, {select} from '../store'
// actions
import {loginRequest} from '../actions/page/login'
// selectors
import {loginSelector} from '../selectors/data/login'
import {routingSelector} from '../selectors/routing'
import {accountMembersSelector} from '../selectors/data/member'

import {login} from '../util/login'

@immutableRenderDecorator
export default class App extends React.Component {

  state = {
    logged: false
  }

  componentDidMount() {
    hideOptionMenu()
    //this.newLogin()
    this.login()
  }

  componentWillReceiveProps(nextProps) {

    // console.log('pathname', pathname)
    // console.log('nextPathname', nextPathname)
  }
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[ 2]); return null;
  }
  login() {
    store.subscribe(() => {
      if (this.state.logged) {
        return
      }
      const login = select(loginSelector)
      const accountMember = select(accountMembersSelector)

      if (accountMember && login) {
        this.setState({
          logged: true
        })
      }
    })
    //const routing = routingSelector(store.getState())
    //const code = this.getQueryString('code') || routing.getIn(['query', 'code'])
    //const openId = this.getQueryString('openId') || routing.getIn(['query', 'openId'])

    // const code = routing.getIn(['query', 'code'])
    // const openId = routing.getIn(['query', 'openId'])
    //store.dispatch(loginRequest({code, openId}))
    store.dispatch(loginRequest())
  }

  newLogin(){
    let info = login()
    if(info.accessToken&&info.userId){
      this.setState({
        logged: true
      })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {location: {pathname}} = this.props
  //   const {location: {pathname: nextPathname}} = this.nexProps
  //   const {logged} = this.state
  //   const {logged: nextLogged} = nextState
  //
  //   if (logged !== nextLogged) {
  //     return true
  //   }
  //   console.log(this.props)
  //   return false
  // }

  render() {
    console.log('render App')
    if (!this.state.logged) {
      return <noscript/>
    }

    return this.props.children
    // return (
    //   <ReactCSSTransitionGroup
    //     component="div"
    //     transitionName="route"
    //     transitionEnterTimeout={500}
    //     transitionLeaveTimeout={500}
    //   >
    //     {React.cloneElement((
    //       <div className="routeBg">
    //         {this.props.children}
    //       </div>
    //     ), {
    //       key: this.props.location.pathname
    //     })}
    //   </ReactCSSTransitionGroup>
    // )
  }
}
