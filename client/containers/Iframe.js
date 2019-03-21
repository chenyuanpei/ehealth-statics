import React from 'react'
import {connect} from 'react-redux'
import setTitle from '../util/setTitle'
// import {loading} from '../util/loading'
class Iframe extends React.Component {

  componentDidMount() {
    // loading(true)
    const {title} = this.props
    if (title) {
      setTitle(title)
    }
  }

  render() {
    require('../styles/iframe.less')

    const {href} = this.props
    return (
      <object className="iframe" data={decodeURIComponent(href)}/>
    )
  }
}

export default connect(
  (state, props) => ({
    href: props.location.query.href,
    title: props.location.query.title,
  })
)(Iframe)
