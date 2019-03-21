import React,{Component,PropTypes} from 'react'
import classNames from 'classnames';
import Mask from 'react-weui/lib/components/mask'
// import {RowFlex,Col} from '../../frozenui/grid'
// import Fixed from '../../common/fixed/Fixed'

export default class ActionSheet extends Component {
  state = {
    init: false
  };
  static propTypes = {
    onClick: PropTypes.func,
    // title: PropTypes.string,
    show: PropTypes.bool.isRequired
  };

  static defaultProps = {
    // title: '',
    show: false
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const {show} = this.props
  //   const {show:nextShow} = nextProps
  //   if (show !== nextShow) {
  //     return true
  //   }
  //   const {init} = this.state
  //   const {init:nextInit} = nextState
  //   if (init !== nextInit) {
  //     return true
  //   }
  //   return false
  // }

  render() {

    const {show,children,onClick,onCancel,...others} = this.props;
    const {init} = this.state

    if (!init) {
      if (show) {
        setTimeout(()=>{
          this.setState({
            init: true
          })
        },0)
      } else {
        return <noscript/>
      }
    }

    const className = classNames({
      weui_actionsheet: true,
      weui_actionsheet_toggle: init && show
    });

    const {box} = this.refs
    const cn = children.props.className
    let he = document.getElementsByClassName(cn)[0]
    setTimeout(() => {
      box && (box.style.height = `${he && he.offsetHeight}px`)
    }, 80)

    const style = {
      position: 'fixed',
      // zIndex: '5000',
      width: 'inherit',
      // maxWidth: '300px',
      // maxHeight: '450px',
      height: 'inherit',
      top: '50%',
      left: '50%',
      webkitTransform: 'translate(-50%, -50%)',
      transform: 'translate(-50%, -50%)',
      // backgroundColor: '#FFFFFF',
      // textAlign: 'center',
      borderRadius: '3px',
      overflow: 'hidden'
    }

    require('weui/src/style/widget/weui_tips/weui_actionsheet.less');
    require('weui/src/style/widget/weui_tips/weui_mask.less');
    require('../../../styles/common/dialog/actionSheet.less');
    return (
        <div style={{display: init && show ? 'block' : 'none'}}>
          <Mask onClick={()=>{onCancel&&onCancel()}}/>
          <div ref='box' style={style} className={className} {...others}>{children}</div>
        </div>
    );
  }

};
