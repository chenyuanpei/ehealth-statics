import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import RankingItem from '../../../components/figureRanking/RankingItem'
import SelfRankingItem from '../../../components/figureRanking/SelfRankingItem'
import Alert from '../../../components/common/dialog/Alert'
import More from '../../../components/figureRanking/More'

// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    voteResult:false,
    recordsLoading:false,
    showMore:false,
  }

  state = {
    type:1,
    isFirstEntry:1,
    dateType:1,
    otherType:1,
    address:'',
    phone:'',
    name:'',
    showRule:0,
    showPrizeAlert:false,
    showPrizeText:'',
    alertEnd:false,
    activityId: '',
  }

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
  }

  componentDidMount(){
    const {userId} = this.props.params
    const {init} = this.props
    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#000000'
    let noScore = this.props.location.query.noScore
    let activityId = this.props.location.query.activityId
    this.setState({
      activityId
    })
    let prize = this.props.location.query.prize
    if(!noScore&&!prize){
      let temp = localStorage.getItem('isFirstEntry')
      if(temp!=1){
        this.setState({isFirstEntry:2})
      }
    }
    let type = this.props.location.query.type
    if(!type){
      type=1
      _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-today-figure', '', '']);
    }else{
      if(type==2){
        this.setState({dateType:2,otherType:1,type:type})
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-total-figure', '', '']);
      }else if(type==4){
        this.setState({dateType:2,otherType:2,type:type})
        _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-total-vote', '', '']);
      }
    }
    init({type,prize,userId,activityId})
  }

  componentWillUnmount() {
    this.props.clear()
    localStorage.removeItem('t')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
  }

  handleScroll() {
    let activityId = this.props.location.query.activityId
    let {getRankingList,recordsLoading,pageNo,rankingList} = this.props
    const {dateType,otherType,showRule} = this.state
    if(showRule==0){
      let tValue=localStorage.getItem('t')
      let t=tValue?tValue:0
      let p=window.scrollY
      if(rankingList&&rankingList.length>=30){
        if(t<=p){
          let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
          if(flag) {
            if (!recordsLoading) {
              let type = 1
              if(dateType==1&&otherType==1){
                type = 1
              }else if(dateType==2&&otherType==1){
                type = 2
              }else if(dateType==1&&otherType==2){
                type = 3
              }else if(dateType==2&&otherType==2){
                type = 4
              }
              setTimeout(a=>window.scrollTo(0, 9999999), 50)
              pageNo++
              getRankingList({type,pageNo,activityId})
            }
          }
        }
        setTimeout(()=>{
          localStorage.setItem('t',p)
        },0)
      }
    }
  }

  render(){
    require('../../../styles/figureRanking/rankingList.less')
    const {} = this.props

    //<ReactIScroll style={{position:"static"}}
    //              pullDown={false} pullUp={true}
    //              iScroll={iScroll} onScrollEnd={this.onScrollEnd}>
    //</ReactIScroll>

    return (
      <div className="ranking-list-page">
        <Title title="超级身材*排行榜"/>
        {this.renderAlertEnd()}
        {this.renderAlert()}
        {this.renderNoData()}
        {this.renderRule()}
        {this.renderRulePage()}
        {this.renderTheFirst()}
        {this.renderFirstEntry()}
        {this.renderPrize()}
        {this.renderPrizeSuccess()}
        {this.renderPrizeAlert()}
        <div className="bottom-div">
          {this.renderBtn1()}
          {this.renderBtn2()}
          {this.renderSelfRanking()}
          {this.renderRankingList()}
          {this.renderMore()}
        </div>
      </div>
    )
  }

  renderMore(){
    const {recordsLoading,showMore} = this.props
    return (
      <More recordsLoading={recordsLoading} showMore={showMore}/>
    )
  }

  renderAlert(){
    const {voteResult,alertHidden} = this.props
    return (
      <Alert show={voteResult} text="知道了" onClick={() => {alertHidden()}}>
        <div className="alert"><br/>您已经支持过1次，明天再来吧！<br/><br/></div>
      </Alert>
    )
  }

  renderAlertEnd(){
    const {checkExpire} = this.props
    const {alertEnd} = this.state
    let isAlertEnd = localStorage.getItem('isAlertEnd')

    if(isAlertEnd!=1&&checkExpire){
      this.state.alertEnd = true
    }
    return (
      <Alert show={alertEnd} text="知道了" onClick={() => {
        this.setState({alertEnd:false})
        localStorage.setItem('isAlertEnd',1)
      }}>
        <div className="alert"><br/>活动已结束，<br/>可在[总榜排名]查看排名情况。<br/><br/></div>
      </Alert>
    )
  }

  renderRule(){
    return (
      <div onClick={()=>{this.setState({showRule:1})}} className="rule">
        活动规则
      </div>
    )
  }

  renderTheFirst(){
    const {rankingList,pictureInfo} = this.props
    let {img} = pictureInfo || {}

    let headImgUrl,name=''
    if(rankingList&&rankingList.length>0){
      headImgUrl = rankingList[0].headImgUrl
      name = rankingList[0].name
    }

    if(!img){
      img = require('../../../../static/images/figureRanking/img_default.png')
    }

    return (
      <div className="top-div">
        <img className="bg" src={img} />
        <div style={{display:name?'block':'none'}}>
          <div className="first-div">
            <img className="head-img" src={headImgUrl} />
            <span className="name">【{name}】占领封面</span>
          </div>
        </div>
      </div>
    )
  }

  renderBtn1(){
    const {checkExpire} = this.props
    const {dateType,otherType} = this.state
    let type = this.props.location.query.type
    if(!type&&checkExpire){
      this.state.dateType = 2
      this.state.type = 2
    }
    return (
      <div className="btn1-div">
        <div onClick={()=>{
          if(!checkExpire){
            this.setState({dateType:1})
            this.changeType(1,otherType)
          }
        }} className={dateType==1?'item select':'item unselect'}>今日排名</div>
        <div onClick={()=>{
          this.setState({dateType:2})
          this.changeType(2,otherType)
        }} className={dateType==2?'item select':'item unselect'}>总榜排名</div>
      </div>
    )
  }

  renderBtn2(){
    const {dateType,otherType} = this.state
    return (
      <div className="btn2-div">
        <div onClick={()=>{
          this.setState({otherType:1})
          this.changeType(dateType,1)
        }} className={otherType==1?'item select':'item unselect'}>身材排名</div>
        <div onClick={()=>{
          this.setState({otherType:2})
          this.changeType(dateType,2)
        }} className={otherType==2?'item select':'item unselect'}>人气排名</div>
      </div>
    )
  }

  changeType(dateType,otherType){
    let {userId} = this.props.params
    let activityId = this.props.location.query.activityId
    const {changeRanking,account} = this.props
    let type = 1
    if(dateType==1&&otherType==1){
      type = 1
      _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-today-figure', '', '']);
    }else if(dateType==2&&otherType==1){
      type = 2
      _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-total-figure', '', '']);
    }else if(dateType==1&&otherType==2){
      type = 3
      _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-today-vote', '', '']);
    }else if(dateType==2&&otherType==2){
      type = 4
      _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-total-figure', '', '']);
    }
    this.setState({type})
    if(!userId){
      if(account)
        userId = account.userId
    }
    changeRanking({type,userId,activityId})
  }

  renderSelfRanking(){
    let {userId} = this.props.params
    const {currentUserRank,account} = this.props
    let activityId = this.props.location.query.activityId
    if(!userId){
      if(account)
        userId = account.userId
    }
    return (
      <SelfRankingItem {...currentUserRank} click={()=>{this.props.push(`figureRanking/personal/${userId}?activityId=${activityId}`)}} />
    )
  }

  renderRankingList(){
    const {type} = this.state
    const {rankingList} = this.props
    return (
      <div className="ranking-div">
        {
          rankingList&&rankingList.map(
            (rankingItem,index)=>(
              <RankingItem key={index} {...rankingItem}
                           type={type}
                           click={()=>{
                            this.props.push(`figureRanking/personal/${rankingItem.userId}?activityId=${this.state.activityId}`)
                           }}
                           voteClick={(e)=>{
                            e.stopPropagation()
                             this.voteClick(rankingItem.userId)
                             _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-vote-click', '', '']);
                           }} />
            )
          )
        }
      </div>
    )
  }

  voteClick(voteId){
    const {type} = this.state
    const {vote} = this.props
    let activityId = this.props.location.query.activityId
    if(type==1||type==3){
      vote({voteId:voteId,type,activityId})
    }
  }


  renderFirstEntry(){
    const {isFirstEntry} = this.state
    return (
      <div>
        <div className="page-bg" style={{display:isFirstEntry==1?'none':'block'}}></div>
        <div onClick={()=>{
          this.setState({isFirstEntry:1})
          localStorage.setItem('isFirstEntry',1)
        }} className="first-entry" style={{display:isFirstEntry==1?'none':'block'}}>
          <img className="img1" src={require('../../../../static/images/figureRanking/tips_home.png')} />
          <img className="img2" src={require('../../../../static/images/figureRanking/tips_likes.png')} />
        </div>
      </div>
    )
  }

  renderNoData(){
    const {account} = this.props
    const {id} = account || {}
    let noScore = this.props.location.query.noScore
    let deviceId = this.props.location.query.deviceId
    return (
      <div>
        <div className="page-bg" style={{display:noScore==1?'block':'none'}}></div>
        <div className="no-data" style={{display:noScore==1?'block':'none'}}>
          <div className="title">本次测量没有身材打分</div>
          <div>可能原因:</div>
          <div className="small-title">
            <img className="img" src={require('../../../../static/images/figureRanking/icon_info.png')} />
            <span className="text">没有完善个人资料？</span>
          </div>
          <div className="tips">点击按钮补充个人资料</div>

          <div className="btn" onClick={()=>{
            this.props.push(`organization/memberinfo/${deviceId}`)
          }}>个人资料</div>

          <div className="small-title">
            <img className="img" src={require('../../../../static/images/figureRanking/icon_step.png')} />
            <span className="text">没有光脚上秤？</span>
          </div>
          <div className="tips">光脚上秤才能获得身材分数哦！</div>

          <div className="small-title">
            <img className="img" src={require('../../../../static/images/figureRanking/icon_other.png')} />
            <span className="text">其他原因？</span>
          </div>
          <div className="tips">
            <div>·测量未完成就下秤，导致无法测量脂肪等数据</div>
            <div>·秤电量过低，无法完成测量</div>
          </div>
        </div>
      </div>
    )
  }

  renderPrize(){
    const {showPrize,closePrize} = this.props
    const {address,phone,name} = this.state

    let img
    if(showPrize==1){
      img = require('../../../../static/images/figureRanking/1-1.png')
    }else if(showPrize==2){
      img = require('../../../../static/images/figureRanking/2-1.jpg')
    }else if(showPrize==3){
      img = require('../../../../static/images/figureRanking/3-1.jpg')
    }

    let isClick = false
    if(address&&phone.length==11&&name){
      isClick = true
    }

    return (
      <div>
        <div className="page-bg" style={{display:showPrize==0?'none':'block'}}></div>
        <div className="prize" style={{display:showPrize==0?'none':'block'}}>
          <div className="close" onClick={()=>{closePrize()}}>╳</div>
          <div className="title-img"></div>
          <div className="info">
            <img className="img" src={img} />
            <div className="text">
              <span style={{display:showPrize==1?'block':'none'}}>ziva plus手环1台!</span>
              <span style={{display:showPrize==2?'block':'none'}}>ziva手环1台!</span>
              <span style={{display:showPrize==3?'block':'none'}}>MAMBO2手环1台!</span>
            </div>
          </div>
          <div className="tips">请填写收货信息以便我们邮寄奖品</div>
          <div className="item">
            <input onChange={(e)=>{
              this.setState({name:e.target.value})
            }} value={name} className="input" type="text" placeholder="收货人姓名" />
          </div>
          <div className="item">
            <input onChange={(e)=>{
              this.setState({phone:e.target.value})
            }} value={phone} className="input" type="text" maxLength="11" placeholder="联系电话" />
          </div>
          <div className="item">
            <input onChange={(e)=>{
              this.setState({address:e.target.value})
            }} value={address} className="input" type="text" placeholder="收货地址" />
          </div>
          <div onClick={()=>{
              this.commitPrizeInfo()
          }} className={'btn btn-ok'}>提交</div>
        </div>
      </div>
    )
  }

  renderPrizeAlert(){
    const {showPrizeAlert,showPrizeText} = this.state
    return (
      <Alert show={showPrizeAlert} text="知道了" onClick={() => {this.setState({showPrizeAlert:false})}}>
        <div className="alert"><br/>{showPrizeText}<br/><br/></div>
      </Alert>
    )
  }

  renderPrizeSuccess(){
    const {showPrizeTips,closePrizeTips} = this.props
    return (
      <div>
        <div onClick={()=>{
          closePrizeTips()
        }} className="page-bg" style={{display:showPrizeTips==0?'none':'block'}}></div>
        <div className="prize-success" style={{display:showPrizeTips==0?'none':'block'}}>
          <span style={{display:showPrizeTips==1?'block':'none'}}>提交成功!<br/>少年等着接收大奖吧!</span>
          <span style={{display:showPrizeTips==2?'block':'none'}}>您已经成功提交收货地址！<br/>耐心等待接收大奖吧!</span>
        </div>
      </div>
    )
  }

  commitPrizeInfo(){
    const {submit} = this.props
    const {address,phone,name,type} = this.state
    let activityId = this.props.location.query.activityId

    if(!name){
      this.setState({showPrizeAlert:true,showPrizeText:'收货人姓名不能为空'})
    }else if(!phone){
      this.setState({showPrizeAlert:true,showPrizeText:'联系电话不能为空'})
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
      this.setState({showPrizeAlert:true,showPrizeText:'联系电话格式错误'})
    }else if(!address){
      this.setState({showPrizeAlert:true,showPrizeText:'收货人地址不能为空'})
    }else{
      submit({address,phone,name,type,activityId})
    }
  }

  renderRulePage(){
    const {showRule} = this.state
    return (
      <div>
        <div className="page-bg" style={{display:showRule==0?'none':'block'}}></div>
        <div className="rule-page" style={{display:showRule==0?'none':'block'}}>
          <img onClick={()=>{
            this.setState({showRule:0})
          }} className="img" src={require('../../../../static/images/figureRanking/btn_close.png')} />
          <div>
            ★活动奖品：
            <br/>
            ziva plus手环、ziva手环、MAMBO2手环
            <br/><br/><br/>
            ★参与方式：
            <br/>
            1.扫码绑定体脂秤<br/>
            2.补充个人信息<br/>
            3.光脚上秤测量，即可收到测量推送、排行榜推送；<br/>
            4. [总榜排名-身材排名]前三名、[总榜排名-人气排名]前三名，均可依次获得 一等奖：ziva plus手环1台；二等奖：ziva手环1台；三等奖：MAMBO2手环1台
            <br/><br/><br/>
            ★奖品派发：
            <br/>
            1.获奖用户将在活动结束次日收到获奖通知；<br/>
            2.获奖用户收到获奖通知 5个工作日内没有提交收货信息即视为放弃；<br/>
            3.奖品将在活动结束后7个工作日内邮寄发放。
            <br/><br/><br/>
            ★活动细则：
            <br/>
            1.[今日排名-身材排名]规则<br/>
            身材打分从高到低排名；身材打分相同、理想状态指标数量从高到低排名；理想状态指标相同，完成身材打分时间先后排名。<br/>
            （当日多次上秤测量，取最新身材打分）<br/><br/>

            2.[今日排名-人气排名]规则<br/>
            点赞数从高到低排名；点赞数相同时，按点赞时间先后排名。<br/><br/>

            3.[总榜排名-身材排名]规则<br/>
            历史身材打分平均分从高到低排名；前者相同时，最新身材分数的理想状态指标数量从高到低排名。<br/><br/>

            4.[总榜排名-人气排名]规则<br/>
            点赞数从高到低排名；点赞数相同时，按点赞时间先后排名。
            <br/>
            <br/>
            一经查为作弊，则取消中奖资格。本次活动解释权归乐心所有。
          </div>
        </div>
      </div>
    )
  }

})
