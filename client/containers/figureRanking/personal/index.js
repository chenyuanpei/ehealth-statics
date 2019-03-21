import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import ScoreItem from '../../../components/figureRanking/ScoreItem'
import More from '../../../components/figureRanking/More'

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
    recordsLoading:false,
    showMore:false,
  }

  state = {
    type:1,
    isFirstPersonalEntry:1,
  }

  constructor(props) {
    super(props)
    this.handleScroll=this.handleScroll.bind(this)
    this.uploadImage=this.uploadImage.bind(this)
  }

  componentDidMount(){
    const {init} = this.props
    const {userId} = this.props.params
    let activityId = this.props.location.query.activityId
    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background='#000000'

    init({userId,pageNo:1,activityId});
    localStorage.setItem('showPrizeTips',2)
  }

  componentWillUnmount() {
    this.props.clear()
    this.props.clearPersonalPictureInfo()
    localStorage.removeItem('t')
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('body')[0].style.background=''
  }

  handleScroll() {
    let {getHistoryList,recordsLoading,pageNo,historyList} = this.props
    let activityId = this.props.location.query.activityId
    const {userId} = this.props.params
    let tValue=localStorage.getItem('t')
    let t=tValue?tValue:0
    let p=window.scrollY
    if(rankingList&&rankingList.length>=30){
      if(t<p){
        let flag = (window.scrollY+screen.height+50)>document.body.scrollHeight
        if(flag) {
          if (!recordsLoading) {
            setTimeout(a=>window.scrollTo(0, 9999999), 50)
            pageNo++
            getHistoryList({userId,pageNo,activityId})
          }
        }
      }
      setTimeout(()=>{
        localStorage.setItem('t',p)
      },0)
    }
  }


  render(){
    require('../../../styles/figureRanking/personal.less')
    const {pictureInfo} = this.props;
    const {name} = pictureInfo || {}

    if(name){
      setWechatTitle(name+'的主页')
    }


    return (
      <div className="personal-page">
        {this.renderUpload()}
        <div className="bottom-div">
          {this.renderHead()}
          {this.renderScoreList()}
          {this.renderMore()}
        </div>
        {this.renderFirstEntry()}
      </div>
    )
  }

  renderFirstEntry(){
    const {isFirstPersonalEntry} = this.state
    let userStatus = this.checkUser()
    let temp = localStorage.getItem('isFirstPersonalEntry')
    if(userStatus&&temp!=1){
      this.state.isFirstPersonalEntry = 2
    }
    return (
      <div>
        <div className="page-bg" style={{display:isFirstPersonalEntry==1?'none':'block'}}></div>
        <div onClick={()=>{
          this.setState({isFirstPersonalEntry:1})
          localStorage.setItem('isFirstPersonalEntry',1)
        }} className="first-entry" style={{display:isFirstPersonalEntry==1?'none':'block'}}>
          <img className="img" src={require('../../../../static/images/figureRanking/tips_upload.png')} />
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

  checkUser(){
    const {userId} = this.props.params
    const {account} = this.props
    if(account&&userId==account.userId){
      return true
    }
    return false
  }

  renderUpload(){
    const {pictureInfo,loaded} = this.props
    let {img,status} = pictureInfo || {}

    if(!img){
      img = require('../../../../static/images/figureRanking/img_default.png')
    }
    let userStatus = this.checkUser()

    return (
      <div className="top-div">
        <img className="bg" src={img} />
        <div style={{display:userStatus?'block':'none'}}>
          <div style={{display:status==3?'block':'none'}}>
            <div className="bg-tips" style={{background:'#f66723'}}>
              <img className="img" src={require('../../../../static/images/figureRanking/icon_alarm.png')} />
              <div className="text">你的封面涉嫌违规，请重新上传。</div>
            </div>
          </div>
          <div style={{display:status==1?'block':'none'}}>
            <div className="bg-tips" style={{background:'#4990e2'}}>
              <img className="img" src={require('../../../../static/images/figureRanking/icon_check.png')} />
              <div className="text">照片正在审核中...</div>
            </div>
          </div>
          <div onClick={()=>{this.uploadImage()}} className="upload-btn">
            <img className="img" src={require('../../../../static/images/figureRanking/icon_upload.png')} />
            <div className="text">上传健身照</div>
          </div>
        </div>
      </div>
    )
  }

  renderHead(){
    const {historyList,pictureInfo} = this.props
    let {headImgUrl} = pictureInfo || {}

    let userStatus = this.checkUser()
    let score = 0
    if(historyList&&historyList.length>0){
      score = historyList[0].bodyScore
    }
    return (
      <div className="head-div">
        <img style={{marginBottom:userStatus?'0':'0.5rem'}} className="head-img" src={headImgUrl} />
        <div style={{display:userStatus?'block':'none'}}>
          <div className="score">{score}<span className="unit">分</span></div>
          <div className="tips">您的身材打分</div>
        </div>
      </div>
    )
  }

  renderScoreList(){
    const {historyList,account} = this.props
    const {id} = account || {}
    let userStatus = this.checkUser()
    return (
      <div>
        <div className="score-title">
          <div className="date">日期</div>
          <div className="score">得分</div>
          <div className="num">支持人数</div>
        </div>
        {
          historyList&&historyList.map(
            (historyItem,index)=>(
              <ScoreItem click={()=>{
                if(userStatus){
                  this.props.push(`weight/${id}/history/${historyItem.weightId}`)
                }
              }} key={index} {...historyItem} />
            )
          )
        }

      </div>
    )
  }


  uploadImage(){
    const {userId} = this.props.params
    const {uploadImg} = this.props
    uploadImg({userId})
    _hmt.push(['_trackEvent', 'health-figure-ranking', 'health-figure-ranking-upload-click', '', '']);
  }


})
