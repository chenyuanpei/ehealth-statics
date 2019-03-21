import React, {Component, PropTypes} from 'react'
import ActionSheet from './ActionSheet'
import AvatarText from '../Avatar/AvatarText'
import {selectedTip} from '../../../const/member'

export default class BindRole extends Component {
  state = {
    show: this.props.show,
    bind: this.props.bind
  }

  componentWillUpdate(nextProps) {
    const {bind} = this.props
    const {bind: nextShow} = nextProps
    if (bind !== nextShow) {
      this.setState({
        bind: nextShow
      })
    }
  }

  render() {
    const {onClick, onHide, title, avList} = this.props
    const call = () => {
      onClick && onClick(this.state.item)
      this._hide()
    }
    let avListLength=0
    if(avList){
      avListLength = avList.length
    }
    return (
      <ActionSheet avListLength={avListLength} title={title} onCancel={onHide} show={this.state.show} onClick={call}>
        <div className="alvaBar">
          {this._renderItem()}
        </div>
      </ActionSheet>
    )
  }

  _renderItem() {
    const {avList} = this.props
    const {bind} = this.state
    return avList.map((item, idx) => {
      const {id, headImgurl, onClick} = item
      const key = id || idx
      const click = () => {
        this.setState({bind: bind !== key ? key : -1, item: bind !== key ? item : undefined})
        onClick && onClick(item)
      }
      const {sex, nickname} = item
      return <AvatarText key={key} sex={sex} name={nickname} src={headImgurl}
                         className={bind === key ? 'bRline' : ''}
                         tip={bind === key ? selectedTip : ''}
                         onClick={click}/>
    })
  }

  _hide() {
    const {onHide} = this.props
    onHide()
    this.setState({bind: -1, item: {}})
  }

  componentWillReceiveProps(nextProps) {
    const {show, bind, avList} = nextProps
    const item = avList.find((item) => item.id === bind)
    this.setState({
      show,
      bind,
      item,
      // item: nextProps.bind,
    })
  }
}
