import React, {Component, PropTypes} from 'react'
export default class RankingItem extends Component {
  static propTypes = {
  }
  static defaultProps = {
    userId:'',
    headImgUrl:null,
    name:'',
    bodyScore:0,
    vote:0,
    rank:0,
  }
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillUnmount() {
  }


  render() {
    const {click,userId,name,headImgUrl,bodyScore,vote,rank} = this.props
    require('../../styles/figureRanking/selfRankingItem.less')
    return (
      <div>
        <div onClick={click} className="self-ranking-item">
          <img className="head-img" src={headImgUrl} />
          <div>
            <div className="name">{name}</div>
            <div className="rank">第{rank}名</div>
          </div>
          <span className="score">{bodyScore}分</span>
          <img className="heart-img" src={require('../../../static/images/figureRanking/heart_white.png')} />
          <span className="heart-num">{vote}</span>
        </div>
      </div>
    )
  }
}
