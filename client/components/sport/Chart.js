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
  }

  componentDidMount(){
    this.renderSvg()
  }

  componentWillUnmount() {
  }

  render() {
    const {stepHourlyData,scaleRate,isHome} = this.props
    require('../../styles/sport/sport.styl')

    this.renderSvg()

    return (
      <div style={{marginTop:isHome?'0.45rem':''}}>
        <div style={{display: stepHourlyData ? 'none':'block'}} className="null">未有数据,请保持持续测量及上传</div>
        <div className="chart-info" style={{display: !stepHourlyData ? 'none':'flex'}}>
          <svg id="svg-step-history" width={this.svgInit().width} height={this.svgInit().height}></svg>
          <div className="tips" id="time-tips">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>
    )
  }

  renderSvg(){
    const {isHome,stepHourlyData,scaleRate} = this.props

    if(stepHourlyData&&stepHourlyData.step){
      let record = stepHourlyData
      let steps = record.step.split(',')
      let i
      let hourlyData = []
      let lastValue = 0

      for (i = 0; i < steps.length; i++) {
        if (parseInt(steps[i]) > lastValue) {
          hourlyData.push(parseInt(steps[i]) - lastValue)
          lastValue = steps[i]
        } else {
          hourlyData.push(0)
        }
      }

      //图表峰值
      let max = Math.max.apply(null, hourlyData)
      max = max > 1000 ? Math.ceil(max / 100) * 100 : max > 100 ? Math.ceil(max / 10) * 10 : 100
      //图表标线
      let mark = max * 0.8
      mark = mark > 1000 ? Math.round(mark / 100) * 100 : mark > 100 ? Math.round(mark / 10) * 10 : 100

      let svg = Snap('#svg-step-history')
      let charts = []
      if(svg){
        svg.clear()
        //柱状图
        for (i = 0; i < hourlyData.length; i++) {
          let item = []
          item[0] = (this.svgInit().marginLR + i * (this.svgInit().lineWidth + this.svgInit().lineSpace))
          item[1] = this.svgInit().marginLR + (i * (this.svgInit().lineWidth + this.svgInit().lineSpace) + this.svgInit().lineWidth)
          item[2] = hourlyData[i]
          charts.push(item)

          svg.paper.rect(item[0],
            this.svgInit().height - hourlyData[i] / max * this.svgInit().lineHeight - this.svgInit().lineDefH * 1,
            this.svgInit().lineWidth, hourlyData[i] / max * this.svgInit().lineHeight + this.svgInit().lineDefH * 1,
            2 * scaleRate).attr({
            fill: '#fff'
          })
        }
        //标注
        //this.svgConfig().mark.txt = mark
        //this.svgConfig().mark.y = (mark / max * this.svgInit().lineHeight) + 88 * scaleRate + this.svgInit().lineDefH * 1
        //marktxt = mark
        //marky = (mark / max * this.svgInit().lineHeight) + 88 * scaleRate + this.svgInit().lineDefH * 1

        let lineLeft=20
        let lineRight=this.svgInit().width-lineLeft
        let lineY= (mark / (max) * this.svgInit().lineHeight + this.svgInit().lineDefH * 1) + 1
        svg.paper.text(lineLeft, this.svgInit().height-lineY-5, mark).attr({
          fill: "#ffffff",
          fontSize: 24*scaleRate
        });
        svg.paper.line(lineLeft, this.svgInit().height-lineY, lineRight , this.svgInit().height-lineY).attr({
          stroke: "#ffffff",
          strokeLinecap: 'round',
          strokeWidth: 0.5,
          strokeDasharray: '4 4',
          strokeOpacity:"0.8",
        });

        //提示
        let markLine
        let markRect
        let markText
        let clearMarkLine = ()=> {
          markLine && markLine.remove()
          markRect && markRect.remove()
          markText && markText.remove()
        }
        let showChartTips=(event) => {
          event.preventDefault()
          let page = event.touches[0]
          let x = page.clientX
          for (let i = 0; i < charts.length; i++) {
            //this.svgConfig().tips.show = false
            //this.setState({tipsshow:false})
            if (x >= charts[i][0] && x <= charts[i][1]) {
              clearMarkLine()

              //this.setState({tipstxt:charts[i][2]})
              //this.setState({tipsx:charts[i][0] + (charts[i][1] - charts[i][0]) / 2 - 76 * scaleRate / 2})
              //this.setState({tipsshow:true})

              let x=charts[i][0] + (charts[i][1] - charts[i][0]) / 2 - 76 * scaleRate / 2
              markRect=svg.paper.rect(x,0,76*scaleRate,34*scaleRate,4*scaleRate).attr({
                fill: '#fff',
              });
              let tipTxt=charts[i][2];
              tipTxt=tipTxt.toString()
              markText=svg.paper.text(x+(76-(tipTxt.length*15))*scaleRate/2,(34+15)*scaleRate/2,tipTxt).attr({
                fill: '#0cabe9',
                fontSize: 24*scaleRate,
              });

              //虚线
              markLine = svg.paper.line((charts[i][1] - charts[i][0]) / 2 + charts[i][0],
                34*scaleRate, (charts[i][1] - charts[i][0]) / 2 + charts[i][0], this.svgConfig().height).attr({
                stroke: '#fff',
                strokeLinecap: 'round',
                strokeWidth: 1,
                strokeDasharray: '2 2'
              })
              break
            }
          }
        }

        if(!isHome){
          svg.untouchstart();
          svg.untouchmove();
          svg.untouchend();
          svg.untouchcancel();
          svg.touchstart( (event) => {
            showChartTips(event)
          })
          svg.touchmove( (event) => {
            showChartTips(event)
          })
          svg.touchend((event) => {
            clearMarkLine()
          })
          svg.touchcancel((event) => {
            clearMarkLine()
          })
        }
      }
    }
  }

  svgInit(){
    const {scaleRate} = this.props
    return {
      width: this.svgConfig().width * scaleRate,
      height: this.svgConfig().height * scaleRate,
      marginLR: this.svgConfig().marginLR * scaleRate,
      lineHeight: this.svgConfig().lineHeight * scaleRate,
      lineWidth: this.svgConfig().lineWidth * scaleRate,
      lineSpace: this.svgConfig().lineSpace * scaleRate,
      lineDefH: this.svgConfig().lineDefH * scaleRate,
    }
  }

  svgConfig(){
    const {isHome} = this.props
    return {
      show: false,
      width: isHome?727:750,
      height: 280,
      marginLR: 69,
      lineHeight: 220,
      lineWidth: 14,
      lineSpace: 12,
      lineDefH: 6
    }
  }

}
