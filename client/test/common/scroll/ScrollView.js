import React, {Component, PropTypes} from 'react'

import ScrollView from '../../../components/common/scroll/ScrollView'
import ViewImg from '../../../components/common/scroll/ViewImg'

const genereateContext = () => {
  let arr = []
  for (var i = 0; i < 100; i++) {
    arr.push(<div key={i}>{'context' + i}</div>)
  }
  return arr
}

class ScrollViewTest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: null,
      imgSrc: null,
      hide: false
    }

    this.swiper = {}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: genereateContext(),
      })

      setTimeout(() => {
        this.setState({
          hide: true
        })
        setTimeout(() => {
          this.setState({
            imgSrc: 'http://img5.imgtn.bdimg.com/it/u=3029834604,2074451913&fm=21&gp=0.jpg'
          })
        }, 2000)
      }, 2000)
    }, 2000)
  }

  onImgLoad() {
    const {scrollView} = this.refs
    if (scrollView) {
      scrollView.update()
    }
  }

  render() {
    const {list, imgSrc, hide} = this.state

    return (
      <div style={{height: '100%'}}>
        <ScrollView ref="scrollView" onScrollEnd={() => console.log(1)} options={{}}>
          {imgSrc && <ViewImg
            viewRef={[this, 'scrollView']}
            src={'http://attach.bbs.miui.com/forum/201507/14/142855uh0azrhx8ro0hxlh.jpg'}/>}
          {list && list}
          <img onLoad={() => this.onImgLoad()} style={{display: hide ? 'none' : 'block'}}
               src="http://www.qqpk.cn/Article/UploadFiles/201405/20140507130710523.jpg"/>
          <div style={{height: 300, backgroundColor: 'blue'}}>
          </div>
          <div style={{height: 300, backgroundColor: 'red'}}>
          </div>
        </ScrollView>
      </div>
    )
  }
}

export default {
  name: 'ScrollView',
  component: <ScrollViewTest/>
}
