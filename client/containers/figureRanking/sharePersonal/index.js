import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'

import {setWechatTitle} from '../../../util/common'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
  }

  componentDidMount(){
    const {init} = this.props;
    const {userId} = this.props.params
    let activityId = this.props.location.query.activityId
    init({userId, activityId});
  }

  componentWillUnmount() {
  }


  render(){
    require('../../../styles/figureRanking/sharePersonal.less')
    const {pictureInfo,currentUserRank,currentUserRankVote} = this.props
    let {rank,bodyScore,vote} = currentUserRank || {}
    let {name,headImgUrl,img} = pictureInfo || {}
    if(!rank){
      rank = 0
    }
    if(!bodyScore) {
      bodyScore = 0
    }
    if(!vote){
      vote = 0
    }
    let voteRank = 0
    if(currentUserRankVote&&currentUserRankVote.rank){
      voteRank = currentUserRankVote.rank
    }
    if(!img){
      img = require('../../../../static/images/figureRanking/img_default.png')
    }

    //if(name){
    //  setWechatTitle(name+'的主页')
    //}

    return (
      <div className="share-personal-page">
        <Title title="超级身材*排行榜"/>
        <img className="bg" src={img} />
        <img className="head-img" src={headImgUrl} />
        <div className="content">
          <div className="item">
            <div className="num">{rank}</div>
            <div className="text">身材排名</div>
          </div>
          <div className="item">
            <div className="num">{bodyScore}</div>
            <div className="text">身材打分</div>
          </div>
        </div>
        <div className="content">
          <div className="item">
            <div className="num">{voteRank}</div>
            <div className="text">人气排名</div>
          </div>
          <div className="item">
            <div className="num">{vote}</div>
            <div className="text">点赞数</div>
          </div>
        </div>
      </div>
    )
  }

})
