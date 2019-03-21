import React,{Component,PropTypes} from 'react'
//import 'swiper/src/less/swiper.less'
import Member from './Member'

let SwiperClass
if (process.browser) {
    SwiperClass = require('swiper')
}

const containerStyle = {
    width: '100%',
    height: '100%'
}


export default class SlideMember extends Component {

    componentDidMount() {
        const {swiperContainer,swiperPagination} = this.refs

        const options = {
            pagination: swiperPagination,
            onSlideChangeEnd: (swiper)=>this.onSlideChangeEnd(swiper)
        }

        this.swiper = new SwiperClass(swiperContainer, options);
    }

    onSlideChangeEnd(swiper) {
        const {onChange,members} = this.props
        const {activeIndex} = swiper

        onChange(members[activeIndex]);

    }

    renderList() {
        const {members} = this.props

        return members.map((member, index)=>(
            <div key={index} className="swiper-slide">
                <Member {...member}/>
            </div>
        ))
    }


    render() {

        require('swiper/src/less/swiper.less')

        return (
            <div className="swiper-container" style={containerStyle} ref="swiperContainer">
                <div className="swiper-wrapper">
                    {this.renderList()}
                </div>
                { /*Add Pagination*/  }
                <div className="swiper-pagination" ref="swiperPagination"></div>
            </div>
        )

    }
}


SlideMember.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape(Member.propTypes)).isRequired,
    onChange: PropTypes.func.isRequired,
}
