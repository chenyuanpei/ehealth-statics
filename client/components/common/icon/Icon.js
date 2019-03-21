import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

export default class Icon extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
  }

  static defaultProps = {
    value: 'success',
  }

  constructor(props) {
    super(props)

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    const {value, className, ...others} = this.props
    const cls = classNames({
      ['weui_icon_' + value]: true,
      [className]: className
    })

    if (value === 'loading') {
      return (
        <div className="weui_loading">
          {
            [...Array(12)].map((x, i) => {
              return (
                <div key={i} className={`weui_loading_leaf weui_loading_leaf_${i}`}></div>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <i {...others} className={cls}/>
      )
    }
  }
}
