import React, {Component} from 'react'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import {debug} from '../../util/common'
import {measureActivity} from '../../config'

// const
import {CREATE_MEMBER_ID} from '../../const/member'
// components
import Members from '../../components/home/Members'
import HomeTab from '../../components/home/HomeTab'
import Menu from '../../components/home/Menu'
import Title from '../../components/common/title/Title'
// pubsub
import {TOPIC_PUSH_ADD_SOMETHING_CLICK,TOPIC_HOME_MEMBER_INVITATION_CLICK} from '../../components/home/records/topic'
import {
  TOPIC_ADD_MEMBER,
  TOPIC_HOME_MEMBER_HEADIMG_CLICK
} from '../../components/home/Member'
// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  debug(selectors),
  actions
)(
  class extends Component {
    static defaultProps = {
      moreInfo: {}
    }
    constructor(props) {
      super(props)
      this.onMemberChange = this.onMemberChange.bind(this)

    }
    state = {
      showMenu:true
    }
    componentDidMount() {
      const {init, push, params: {id: memberId}, location: {query: {mergeId}}} = this.props

      init({memberId,mergeId})

      // 添加成员
      this.addMemberToken = PubSub.subscribe(TOPIC_ADD_MEMBER, (topic, data) => {
        // push('member/create')
        const {memberId} = this.props
        push(`member/create?memberType=1&redirect=/home/:memberId`)
      })
      // 添加数据
      this.addDataToken = PubSub.subscribe(TOPIC_PUSH_ADD_SOMETHING_CLICK, (topic, data) => {
        // push('member/create')
        if(data.dataType === 'bp'){
          push(`/record/${data.id}/bp/bpadd`)
        }else if(data.dataType === 'bs'){
          push(`/record/${data.id}/bs/bsadd`)
        }else if(data.dataType === 'tp'){
          push(`/record/${data.id}/temperature/add`)
        }else if(data.dataType === 'weight'){
          if(data.flag == true){
            push(`/weight/${data.id}/add`)
          }else{
            push(`/organization/memberinfo/manual?memberId=${data.id}`)
          }

        }

      })
      // 头像
      this.headimgToken = PubSub.subscribe(TOPIC_HOME_MEMBER_HEADIMG_CLICK, (topic, data) => {
        if (data.manager) {
          push(`member/${data.id}`)
        } else {
          push(`attention/${data.id}/attentioningMember`)
        }
      })
      // 邀请关注
      this.attentionToken = PubSub.subscribe(TOPIC_HOME_MEMBER_INVITATION_CLICK, (topic, data) => {
        const {memberId} = this.props
        push(`attention/${memberId}/attentionAccount`)
      })

    }

    componentWillUnmount() {
      // 取消关注事件
      PubSub.unsubscribe(this.addMemberToken)
      PubSub.unsubscribe(this.addDataToken)
      PubSub.unsubscribe(this.headimgToken)
      PubSub.unsubscribe(this.attentionToken)
      // PubSub.unsubscribe(this.chartBoxToken)
      // PubSub.unsubscribe(this.moreInfoToken)
      // PubSub.unsubscribe(this.clickUnreadRecord)
      // PubSub.unsubscribe(this.clickHealthWeekly)
      // PubSub.unsubscribe(this.clickMeasureActivity)
      // PubSub.unsubscribe(this.chartSportBoxToken)
    }

    // 切换成员
    onMemberChange(index, member) {
      if(!member.manager){
        this.setState({
          showMenu:false
        })
      }
      this.props.selectMember(member.id)
      this.props.replace(`home/${member.id}`)
    }

    render() {
      const {member} = this.props
      require('../../styles/home/home.less')

      return (
        <div id="homePage">
          <Title title='健康数据'></Title>
          {this.renderContent()}
        </div>
      )
    }

    renderContent() {
      let {members,member, memberId} = this.props
      const {manager} = member || {}
      let flag = false
      if(!manager && memberId !== CREATE_MEMBER_ID ){
        flag = true
      }
      if (!memberId) {
        return <noscript/>
      }
      return (
        <div>
          <Members
            members={members}
            memberId={memberId}
            onChange={this.onMemberChange}/>
          {this.renderContentArea()}
          {memberId && <Menu key="menu" {...member} />}

          {flag && <div className="m-bottom-text">关注中</div>}
        </div>
      )
    }
    _go(url) {
      const {push} = this.props
      push(url)
    }
    renderContentArea() {
      let { memberId, statPatient} = this.props
      const {bloodpressureDto} = statPatient || {}
      const {bloodsugarDto} = statPatient || {}
      const {weightDto} = statPatient || {}
      const {temperatureDto} = statPatient || {}
      const {heartRateDto} = statPatient || {}
      const {stepDto} = statPatient || {}
      const {sleepDto} = statPatient || {}
      const downSort = (x,y) =>{
        let bNum = -1
        if(!x.tabData && y.tabData){
          bNum = 1
        }
        if(x.tabData && y.tabData && x.tabData.measurementDate < y.tabData.measurementDate){
          bNum = 1
        }
        return bNum
      }
      const opts = [{
        name:'血压',
        tabClass:'m-tab-bp',
        tabData:bloodpressureDto,
        image:require('../../../static/images/home/bp_index_ico.png'),
        onClick:() => this._go(`record/${memberId}/bp/history`),
      },{
        name:'血糖',
        tabClass:'m-tab-bs',
        tabData:bloodsugarDto,
        image:require('../../../static/images/home/bs_index_ico.png'),
        onClick:() => this._go(`record/${memberId}/bs/history`),
      },{
        name:'体重',
        tabClass:'m-tab-weight',
        tabData:weightDto,
        image:require('../../../static/images/home/icon-home-weight.png'),
        onClick:() => this._go(`weight/${memberId}`),
      },{
        name:'体温',
        tabClass:'m-tab-tp',
        tabData:temperatureDto,
        image:require('../../../static/images/home/icon-home-temperature.png'),
        onClick:() => this._go(`record/${memberId}/temperature/chart`),
      },{
        name:'心率',
        tabClass:'m-tab-heartRate',
        tabData:heartRateDto,
        image:require('../../../static/images/home/icon-home-hreatrate.png'),
        onClick:() => this._go(`heartRate/${memberId}`),
      },{
        name:'步数',
        tabClass:'m-tab-step',
        tabData:stepDto,
        image:require('../../../static/images/home/icon-home-sport.png'),
        onClick:() => this._go(`sport/${memberId}`),
      },{
        name:'睡眠',
        tabClass:'m-tab-sleep',
        tabData:sleepDto,
        image:require('../../../static/images/home/icon-home-sleep.png'),
        onClick:() => this._go(`sleep/${memberId}`),
      }]
      opts.sort(downSort)

      if (memberId === CREATE_MEMBER_ID) {
        return (
          <div className="add_member">
            <img className="img" src={require('../../../static/images/member/bg_add.png')}/>
            <div className="text">创建成员会展示成员的健康数据，以便更好地了解他们</div>
          </div>
        )
      }
      return (
        <div className="m-home-wrapper">
          <div className="m-home-tab-wrap">
            {opts.map((opt, idx) => <HomeTab key={idx} {...opt}/>)}
          </div>
        </div>
      )
    }

  })

