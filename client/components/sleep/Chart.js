import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

export default class Chart extends Component {
  //static propTypes = {
  //
  //}

  static defaultProps = {
    scaleRate:screen.width / 750,
    markSamples:[
      {
        name: '深睡',
        color: '#6556c8',
        lv: 3,
      },
      {
        name: '浅睡',
        color: '#8996ed',
        lv: 2
      },
      {
        name: '觉醒',
        color: '#cdd3ff',
        lv: 1
      },
    ],
  }

  state = {
    markLineLeft: -1,
    labelTextLeft: -1,
    sleepPeriod: ''
  }

  componentDidMount(){
    this.renderSvg()
  }

  componentWillUnmount() {
  }

  render() {
    const {scaleRate,sleepData,markSamples,isHome} = this.props
    const {markLineLeft,labelTextLeft,sleepPeriod} = this.state
    require('../../styles/sleep/chart.styl')

    let dailySleepRecord=sleepData
    if(!dailySleepRecord){
      dailySleepRecord={
        analysisDate: null,
        awakeningHoursM : 0,
        dataPrevious : false,
        daySetTsDate : null,
        daySetTwDate : null,
        deepSleepHoursM : 0,
        firstAnalysisDate : 0,
        getupTime : null,
        shllowSleepHoursM : 0,
        sleepHoursM : 0,
        sleepTime : null,
        xLabels : "",
        yValues : "",
      }
    }

    this.renderSvg()

    return (
      <div className="chart" style={{marginTop:isHome?'0.45rem':''}}>
        <p className="no-data-tip" style={{display:!dailySleepRecord.analysisDate?'flex':'none'}}>未有数据,请保持持续测量及上传</p>
        <svg id="sleep-svg" style={{visibility:dailySleepRecord.analysisDate?'visible':'hidden'}}
          height={this.scaledConf().height} width={this.scaledConf().width}>
        </svg>
        <div className="labels" style={{display:dailySleepRecord.analysisDate?'flex':'none'}}>
          <p>{this.toTimeString(dailySleepRecord.sleepTime)}</p>
          <p>{this.toTimeString(dailySleepRecord.getupTime)}</p>
        </div>
        <div className="mark-line" style={{left:markLineLeft+'px',display:markLineLeft>=0?'block':'none'}}></div>
        <div id="labelText" className="label-text" style={{left:labelTextLeft+'px','visibility':labelTextLeft>=0?'visible':'hidden'}} >
          {sleepPeriod}
        </div>
      </div>
    )
  }

  renderSvg(){
    const {scaleRate,sleepData,markSamples} = this.props

    if(sleepData&&sleepData.analysisDate){
      let paper = Snap('#sleep-svg')
      if(paper){
        paper.clear()
        //this.resetSvgEvents(paper)
        let g = paper.g()
        this.resetSvgEvents(g)
        g.clear()
        const mtr = Snap.matrix()
        mtr.scale(1, -1, 0, paper.node.height.baseVal.value / 2)
        g.transform(mtr)
        const xValues = sleepData.xLabels.split(',')
        const yValues = sleepData.yValues.split(',')
        const unitWidth = this.scaledConf().width / yValues.reduce((prev, curr)=>parseInt(curr) + prev, 0)
        let x = 0
        //1.觉醒 2.浅睡 3.深睡
        for (let i = 0; i < xValues.length; i++) {
          let h
          let lv = parseInt(xValues[i])
          let height = 0
          if(lv==1){
            height = this.scaledConf().height-60*scaleRate
          }else if(lv==2){
            height = this.scaledConf().height-60*scaleRate
          }else{
            height = this.scaledConf().height- 60*scaleRate-60*scaleRate
          }
          let minNum = yValues.slice(0,i).reduce((initV,e)=>initV+parseInt(e),0)
          //console.log(new Date(this.dailySleepRecord.sleepTime+minNum*60*1000),new Date(this.dailySleepRecord.sleepTime+(minNum+parseInt(yValues[i])*60*1000)))
          let period = new Date(sleepData.sleepTime+minNum*60*1000).toTimeString().substr(0,5)
            +'-'
            +new Date(sleepData.sleepTime+(minNum+parseInt(yValues[i]))*60*1000).toTimeString().substr(0,5)
          //console.log(period)
          g.el('rect').attr({
            x: x,
            y: 0,
            width: unitWidth * parseInt(yValues[i]),
            height: height,
            fill: markSamples.filter((e)=> {

              return e.lv == xValues[i]

            })[0].color,
            'data-period':period
          })

          x = x + unitWidth * parseInt(yValues[i])
        }
      }
    }
  }




  scaledConf(){
    const {scaleRate} = this.props
    return {
      width: this.svgConf().width * scaleRate,
      height: this.svgConf().height * scaleRate,
      unitLength: 0,
    }
  }

  svgConf(){
    const {isHome} = this.props
    return {
      width: isHome?597:620,
      height: 184+60
    }
  }

  toTimeString(t){
    t = new Date(parseInt(t))
    return t.toTimeString().substr(0,5)
  }

  resetSvgEvents(paper){
    const {isHome} = this.props
    if(!isHome){
      paper.untouchstart();
      paper.untouchmove();
      paper.untouchend();
      paper.untouchcancel();
      paper.touchstart(e=>{
        ontouch(e)
      })
      paper.touchmove(e=>{
        ontouch(e)
      })
      paper.touchend(e=>{
        //this.setState({labelTextLeft:-1,markLineLeft:-1})
        clearMarkLine()
      })
      paper.touchcancel(e=>{
        //this.setState({labelTextLeft:-1,markLineLeft:-1})
        clearMarkLine()
      })
    }

    //提示
    let markLine
    let markRect
    let markText
    let clearMarkLine = ()=> {
      markLine && markLine.remove()
      markRect && markRect.remove()
      markText && markText.remove()
    }

    let sleepPeriod=''
    let heightL=0
    let ontouch = (e) => {
      e.preventDefault()
      clearMarkLine()
      let leftValue=isHome?5:0
      let scaleRate=screen.width / 750;
      let touchX=e.touches[0].pageX
      //let dashLineRect = this.$els.markLine.getBoundingClientRect()
      let labelTextRect = document.getElementById('labelText').getBoundingClientRect()
      let svgRect = document.getElementById('sleep-svg').getBoundingClientRect()
      let markLineLeftMin=leftValue*scaleRate
      let markLineLeftMax = svgRect.width

      let markTextLeftMin=leftValue*scaleRate
      let markTextLeftMax = svgRect.width-5-svgRect.left*2-leftValue*2*scaleRate-180/2*scaleRate
      if(isHome){
        markTextLeftMax=svgRect.width-svgRect.left*2-180/2*scaleRate+leftValue*2*scaleRate
      }


      //let labelTextLeftMin=(30*scaleRate+labelTextRect.width/2)
      //let labelTextLeftMax = screen.width-30*scaleRate-labelTextRect.width/2
      //
      //let labelTextLeft = touchX
      //labelTextLeft = labelTextLeft>labelTextLeftMax?labelTextLeftMax:labelTextLeft
      //labelTextLeft = labelTextLeft<labelTextLeftMin?labelTextLeftMin:labelTextLeft
      //this.labelTextLeft = labelTextLeft

      let markLineLeft = touchX-svgRect.left

      //this.markLineLeft = markLineLeft
      let el = Snap.getElementByPoint(e.touches[0].pageX, e.touches[0].pageY).node

      let x1=markLineLeft
      let x2=markLineLeft-180/2*scaleRate
      x1 = x1>markLineLeftMax?markLineLeftMax:x1
      x1 = x1<markLineLeftMin?markLineLeftMin:x1
      x2 = x2>markTextLeftMax?markTextLeftMax:x2
      x2 = x2<markTextLeftMin?markTextLeftMin:x2

      let txt=''
      let hh=0
      if(el){
        try{
          sleepPeriod = el.attributes['data-period'].value
          heightL = el.attributes['height'].value
          //this.setState({sleepPeriod:sleepPeriod})
        }catch(e){
          console.error(e)
        }
        txt=sleepPeriod
        hh=heightL
        //this.setState({labelTextLeft:labelTextLeft,markLineLeft:markLineLeft})
        markRect=paper.paper.rect(x2,3*scaleRate,180*scaleRate,36*scaleRate,8*scaleRate).attr({
          fill: '#fff',
        });
        markText=paper.paper.text(x2+(180-160)*scaleRate/2,(36+25+3)*scaleRate/2,txt).attr({
          fill: '#6449bf',
          fontSize: 30*scaleRate,
        });
        //虚线
        markLine = paper.paper.line(x1,
          34*scaleRate, x1, this.scaledConf().height-hh).attr({
          stroke: '#fff',
          strokeLinecap: 'round',
          strokeWidth: 1,
          strokeDasharray: '2 2'
        })
      }
    }
  }
}
