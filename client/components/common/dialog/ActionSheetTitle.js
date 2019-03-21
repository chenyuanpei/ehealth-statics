import React,{Component,PropTypes} from 'react'
import classNames from 'classnames';
import Mask from 'react-weui/lib/components/mask'
import {RowFlex,Col} from '../../frozenui/grid'
import Fixed from '../../common/fixed/Fixed'

export default class ActionSheet extends Component {
    state = {
        init: false
    };
    static propTypes = {
        onClick: PropTypes.func,
        title: PropTypes.string,
        show: PropTypes.bool.isRequired
    };

    static defaultProps = {
        title: '',
        show: false
    };

    shouldComponentUpdate(nextProps, nextState) {
        const {show} = this.props
        const {show:nextShow} = nextProps
        if (show !== nextShow) {
            return true
        }
        const {init} = this.state
        const {init:nextInit} = nextState
        if (init !== nextInit) {
            return true
        }
        return false
    }

    render() {

        const {show,children,title,onClick,onCancel,...others} = this.props;
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
        require('weui/src/style/widget/weui_tips/weui_actionsheet.less');
        require('weui/src/style/widget/weui_tips/weui_mask.less');
        require('../../../styles/common/dialog/actionSheet.less');
        return (
            <div>
                <Mask style={{display: init && show ? 'block' : 'none'}} onClick={()=>{onCancel&&onCancel()}}/>
                <div className={className}>
                    <RowFlex className="weui_actionsheet_menu">
                        <div onClick={()=>{onCancel&&onCancel()}}>取消</div>
                        <Col className="title">{title}</Col>
                        <div onClick={()=>{onClick&&onClick()}}>确定</div>
                    </RowFlex>
                    <div style={{borderTop:'1px solid #cccccc'}} {...others}>{children}</div>
                </div>
            </div>
        );
    }

};
