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
    const {type,voteClick,voted,click,userId,name,headImgUrl,bodyScore,vote,rank} = this.props
    require('../../styles/figureRanking/rankingItem.less')

    let heartImg
    if(type==1||type==3){
      if(voted){
        heartImg = require('../../../static/images/figureRanking/heart_red.png')
      }else{
        heartImg = require('../../../static/images/figureRanking/heart.png')
      }
    }else{
      heartImg = require('../../../static/images/figureRanking/heart_white.png')
    }

    return (
      <div>
        <div className="ranking-item" onClick={click}>
          <span className="num">{rank}</span>
          <img className="head-img" src={headImgUrl} />
          <span className="name">{name}</span>
          <span className="score">{bodyScore}分</span>
          <img className="heart-img" onClick={voteClick}
               src={heartImg} />
          <span className="heart-num">{vote}</span>
        </div>
      </div>
    )
  }
}
