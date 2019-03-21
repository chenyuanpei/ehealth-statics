import React, {Component, PropTypes} from 'react'

export default class RankingList extends Component {
  state = {
    dragValve: 40,
    scrollValve: 40,
    translate: 0,//位移
    dragLoading: false,//是否在下拉刷新中
    scrollerLoading: false,//是否在加载更多中
    openDragLoading: true,//是否开启下拉刷新
    openScrollLoading: true,//是否开启下拉刷新
  }
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.setState(
        {
          translate: 0,
          openDragLoading: this.props.openDragLoading || true,//根据外面设置的开关改变自己的状态
          openScrollLoading: this.props.openScrollLoading || true
        }
    )
      this.initRefresh()
      this.initScroll()
  }

  initRefresh (defaults, options) {
    console.log("initRefresh")
    var self = this;//对象转存，防止闭包函数内无法访问
    var isTouchStart = false; // 是否已经触发下拉条件
    var isDragStart = false; // 是否已经开始下拉
    var startX, startY;        // 下拉方向，touchstart 时的点坐标
    var hasTouch = 'ontouchstart' in window;//判断是否是在移动端手机上
// 监听下拉加载，兼容电脑端
    if (self.state.openDragLoading) {
      self.refs.scroller.addEventListener('touchstart', touchStart, false);
      self.refs.scroller.addEventListener('touchmove', touchMove, false);
      self.refs.scroller.addEventListener('touchend', touchEnd, false);
      self.refs.scroller.addEventListener('mousedown', touchStart, false);
      self.refs.scroller.addEventListener('mousemove', touchMove, false);
      self.refs.scroller.addEventListener('mouseup', touchEnd, false);
    }

    function touchStart(event) {
      if (self.refs.scroller.scrollTop <= 0) {
        isTouchStart = true;
        startY = hasTouch ? event.changedTouches[0].pageY : event.pageY;
        startX = hasTouch ? event.changedTouches[0].pageX : event.pageX;
      }
    }

    function touchMove(event) {
      if (!isTouchStart) return;

      var distanceY = (hasTouch ? event.changedTouches[0].pageY : event.pageY) - startY;
      var distanceX = (hasTouch ? event.changedTouches[0].pageX : event.pageX) - startX;
      //如果X方向上的位移大于Y方向，则认为是左右滑动
      if (Math.abs(distanceX) > Math.abs(distanceY))return;
      distanceY = Math.abs(distanceY)
      console.log("y", distanceY)
      if (distanceY > 0) {
        self.setState({
          translate: Math.pow((hasTouch ? event.changedTouches[0].pageY : event.pageY) - startY, 0.85)
        });
      } else {
        if (self.state.translate !== 0) {
          self.setState({translate: 0});
          self.transformScroller(0, self.state.translate);
        }
      }


      if (distanceY > 0) {
        if (!isDragStart) {
          isDragStart = true;
        }
        if (self.state.translate <= self.state.dragValve) {// 下拉中，但还没到刷新阀值
        } else { // 下拉中，已经达到刷新阀值
        }
        self.transformScroller(0, self.state.translate);
      }
    }


    function touchEnd(event) {
      isDragStart = false;
      if (!isTouchStart) return;
      isTouchStart = false;
      console.log(self.state.translate, self.state.dragValve)
      if (self.state.translate <= self.state.dragValve) {
        self.transformScroller(0.3, 0);
      } else {
        self.setState({dragLoading: true});//设置在下拉刷新状态中
        self.transformScroller(0.1, self.state.dragValve);
        self.props.onLoadMore(self);//触发冲外面传进来的刷新回调函数
      }
    }

  }

  initScroll () {
    console.log("initScroll")
    var self = this;
    // 监听滚动加载
    if (this.state.openScrollLoading) {
      this.refs.scroller.addEventListener('scroll', scrolling, false);
    }

    function scrolling() {
      console.log("scrolling")
      if (self.state.scrollerLoading) return;
      var scrollerscrollHeight = self.refs.scroller.scrollHeight; // 容器滚动总高度
      var scrollerHeight = self.refs.scroller.getBoundingClientRect().height;// 容器滚动可见高度
      var scrollerTop = self.refs.scroller.scrollTop;//滚过的高度
      // 达到滚动加载阀值
      if (scrollerscrollHeight - scrollerHeight - scrollerTop <= self.state.scrollValve) {
        self.setState({scrollerLoading: true});
        self.props.onLoadMore(self);
      }
    }
  }

  transformScroller (time, translate) {
    this.setState({translate: translate});
    var elStyle = this.refs.scroller.style;
    elStyle.webkitTransition = elStyle.MozTransition = elStyle.transition = 'all ' + time + 's ease-in-out';
    elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = 'translate3d(0, ' + -translate + 'px, 0)';
  }

  dragLoadingDone () {
    this.setState({dragLoading: false});
    this.transformScroller(0.1, 0);
  }

  scrollLoadingDone () {
    this.setState({scrollerLoading: false});
  }

  componentWillReceiveProps (nextProps) {
    var self = this;
    if (this.state.dragLoading) {//如果之前是下拉刷新状态，恢复
      setTimeout(function () {
        self.dragLoadingDone();
      }, 1000);
    }
    if (this.state.scrollerLoading) {//如果之前是滚动加载状态，恢复
      setTimeout(function () {
        self.scrollLoadingDone();
      }, 1000);
    }

  }

  render () {
    const {myRankingData, rankingListData, organName, organId} = this.props
    require("../../styles/weight/RankingList.styl")
    return (
        <div className="ranking-layout" ref="scroller">

          <div className="ranking-mod my-ranking">
            <h2 className="title">您的排名</h2>
            {
              myRankingData.rank ? (
                  <div className="data has-data">
                    <div className="left">我</div>
                    <img src={myRankingData.headImgUrl} alt="头像" className="head left"/>
                    <div className="other left">
                      <p>{myRankingData.name}</p>
                      <p>第{myRankingData.rank}名</p>
                    </div>
                    <div className="right">{myRankingData.bodyScore} 分</div>
                  </div>
              ) : (
                  <div className="data no-data">
                    <p>由于数据不全，不能参与排名。</p>
                    <p>光脚上秤，即可获得全量数据。</p>
                  </div>
              )
            }
          </div>

          <div className="ranking-mod all-ranking">
            <h2 className="title">{organName}身材排名</h2>
            {
              rankingListData.length > 0 ?  (
                  <div>
                    {
                      rankingListData.map(function(item, key) {
                        return(
                            <div className={key == 0 ? 'item item1' : (key >= 9 ? 'item item2' : 'item')} key={key}>
                              <span className="num left">{key+1}</span>
                              <img src={item.headImgUrl} alt="头像" className="head left"/>
                              <span className="name left">{item.name}</span>
                              <span className="right">{item.bodyScore} 分</span>
                            </div>
                        )
                      })
                    }
                  </div>
              ) : ""
            }

          </div>
          {
            this.state.dragLoading ? (
                <div className="ranking-loading">
                  <span className="con"><span className="icon"></span>加载中</span>
                </div>
            ) : ""
          }

        </div>
    )
  }
}