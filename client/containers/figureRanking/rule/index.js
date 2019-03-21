import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'

export default class extends Component{
  componentDidMount(){
  }

  componentWillUnmount() {
  }

  render(){
    require('../../../styles/figureRanking/rule.less')

    return (
      <div className="rule-page">
        <Title title="活动规则" />
        <div>
          获奖规则
          <br/>
          [总榜排名-身材排名]、[总榜排名-人气排名]前三名用户将获得超级大奖！
          <br/><br/>
          详细规则
          <br/>
          需完善个人资料，光脚上秤已获得身材分数,没有分数，不具备参赛资格
          <br/><br/>
          [今日排名-身材排名]规则<br/>
          *按身材打分从高到低进行排名。<br/>
          *如遇身材分数相同。则对比达到理想状态指标数目，理想状态指标越多，则排名靠前。<br/>
          *当日多次上秤测量，则取最新身材打分。<br/>
          <br/><br/>
          [今日排名-人气排名]规则<br/>
          *[人气排名]规则：按照点赞数进行排名。<br/>
          *如点赞名次相同。率先完成点赞的用户排名靠前。<br/>
          <br/><br/>
          [总榜排名-身材排名]规则<br/>
          *历史身材打分的平均分进行从高到低进行排名；<br/>
          *如遇身材分数相同。则对比达到理想状态指标数目，理想状态指标越多，则排名靠前。<br/>
          <br/><br/>
          [总榜排名-人气排名]规则<br/>
          *按点赞总数从高到低排名。<br/>
          *如点赞名次相同。率先完成点赞的用户排名靠前。
        </div>
      </div>
    )
  }


}
