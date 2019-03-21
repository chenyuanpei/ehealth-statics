//import React,{Component,PropTypes} from 'react'
//import Toast from './Toast'
//import PureRenderMixin from 'react-addons-pure-render-mixin'
//
//export default class Loadding extends Component {
//
//    static propTypes = {
//        show: PropTypes.bool.isRequired,
//    }
//    static defaultProps = {
//        show: false,
//        text: '数据加载中'
//    }
//
//    shouldComponentUpdate(nextProps, nextState) {
//        const {show,text} = this.props
//        const {show:nextShow,text:nextText} = nextProps
//
//        //console.log(show !== nextShow || text != nextText)
//        if (show !== nextShow || (show && text != nextText)) {
//            console.log(show, nextShow)
//            console.log(text, nextText)
//            return true
//        }
//
//        return false
//    }
//
//    render() {
//        const {show,text} = this.props;
//        return (
//            <Toast icon="loading" show={show} text={text}/>
//        )
//    }
//}
