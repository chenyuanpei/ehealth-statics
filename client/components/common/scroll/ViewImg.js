import React, {Component, PropTypes} from 'react'

export default class ViewImg extends Component {

  static propTypes = {
    instance: PropTypes.object,
  }

  render() {
    const {viewRef: [parent, ref], onLoad, ...rest} = this.props

    let _onLoad = ([...args]) => {
      const scrollView = parent.refs[ref]
      if (scrollView) {
        scrollView.update()
      }
      if (onLoad) {
        onLoad(args)
      }
    }

    return (
      <img {...rest} onLoad={_onLoad}/>
    )
  }
}
