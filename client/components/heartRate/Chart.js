import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {weightDataFormat} from '../../util/weight/weight'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

export default class Chart extends Component {
  static propTypes = {

  }

  static defaultProps = {
    scaleRate:screen.width / 750,
    svgConf:{
      width:612,
      gapHeight:210,
      height:250,
      height2:40,
    },
    birthday:1990
  }

  constructor(props) {
    super(props)
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  //this.renderSvg()
  //  return false
  //}

  componentDidMount(){
    this.renderSvg()
  }

  componentWillUnmount() {
  }

  render() {
    const {scaleRate,heartRateData} = this.props
    require('../../styles/heartRate/heartRate.styl')

    this.renderSvg()

    return (
      <div className="chart">
        <p className="no-data-tip" style={{display:heartRateData?'none':'flex'}}>未有数据,请保持持续测量及上传</p>
        <div className="svg-wrapper" style={{display:heartRateData?'flex':'none'}}>
          <svg className="heartRate-tip-svg" id='heartRate-tip-svg' width={this.scaledConf().width} height={this.scaledConf().height2}></svg>
          <svg id='heartRate-svg' height={this.scaledConf().height} width={this.scaledConf().width}></svg>
          <div className="bgLines" style={{display:heartRateData?'block':'none'}}>
            <div className="line-wrapper">
              <div className="line" style={{bottom:this.scaledConf().gapHeight/2+'px'}}></div>
              <div className="line" style={{bottom:this.scaledConf().gapHeight+'px'}}></div>
              <div className="line"></div>
            </div>
          </div>
          <ul className="ver-labels" style={{display:heartRateData?'flex':'none'}}>
            <li>{this.clickableGraphData().max}</li>
            <li>{Math.ceil((this.clickableGraphData().max+this.clickableGraphData().min)/2)}</li>
            <li>{this.clickableGraphData().min}</li>
          </ul>
        </div>
        <div className="labels" style={{display:heartRateData?'flex':'none'}}>
          <p>00:00</p>
          <p style={{textAlign:'center'}}>12:00</p>
          <p>23:59</p>
        </div>
    </div>
    )
  }

  renderSvg(){
    const {isHome,scaleRate,heartRateData} = this.props
    let paper = Snap('#heartRate-svg')
    if(paper&&heartRateData){
      paper.clear()
      let g = paper.g().attr({
        id:'hrClickGraph'
      })
      if(!isHome){
        this.resetSvgEvents(paper)
      }
      let svgRect = document.getElementById('heartRate-svg').getBoundingClientRect()
      let mtr = Snap.matrix()
      mtr.scale(1, -1, 0, this.scaledConf().height / 2)
      g.transform(mtr)
      let delta = this.clickableGraphData().max-this.clickableGraphData().min
      let rate = delta/this.scaledConf().gapHeight
      let labelLineAttr = {
        stroke:'#d6d7da',
        strokeWidth:'0.5px',
      }
      let unitWidth = this.scaledConf().width/this.clickableGraphData().arr.length
      let _x = 0,y=0
      //let gradient = paper.gradient(this.gradientDescriptor())
      let points = []
      points.push(_x)
      points.push(y)
      let lastPoint = null
      let polys = [[]]

      for(let i = 0;i<=this.clickableGraphData().arr.length;i++){
        try{
          y = (this.clickableGraphData().arr[i]-this.clickableGraphData().min)/rate+Math.random()*0.00001
          points.push(_x)
          points.push(y)

          g.el('circle').attr({
            cx:_x,
            cy:y,
            r:0,
            'class':'c'+i
          })
          let poly = polys[polys.length-1]
          if(y>=0){
            poly.push({x:_x,y:y})
          }else{
            polys.push(null)
            polys.push([])
          }

          if((this.clickableGraphData().arr[i+1]<=0||this.clickableGraphData().arr[i+1]===undefined)
            &&lastPoint
            &&lastPoint.y<=0
            &&(this.clickableGraphData().arr[i+1]-this.clickableGraphData().min)/rate<=0||this.clickableGraphData().arr[i+1]===undefined
            &&y>0){

            let v = this.clickableGraphData().arr[i]
            let pointColor = 'black'

            if(v<this.colorStops().normal){

            }else if(v<this.colorStops().normal){
            }else if(v<this.colorStops().normal){
            }
            g.el('circle').attr({
              cx:_x,
              cy:y,
              r:1,
              fill:this.getPointColor(y),
              //'class':'xxx'
            })
          }

          lastPoint = {
            x:_x,
            y:y
          }

          _x+=unitWidth
        }catch(e){
          console.log(e)
        }
      }
      polys = polys.filter(e=>e&&e.length>1)

      points.push(_x)
      points.push(0)

      for(let i = 0;i<polys.length;i++){
        let mPoints = []
        polys[i].forEach(e=>{
          mPoints.push(e.x,e.y)
        })

        let polyPoints = [polys[i][0].x,this.clickableGraphData().min*-1,...mPoints,polys[i][polys[i].length-1].x,(this.clickableGraphData().max-this.clickableGraphData().min)/rate]

        g.polyline(mPoints).attr({stroke:this.getGradient(mPoints),strokeWidth:2,fill:'none'})
      }
    }
  }

  scaledConf(){
    const {svgConf,scaleRate} = this.props
    return{
      height:svgConf.height*scaleRate,
      width:svgConf.width*scaleRate,
      gapHeight:svgConf.gapHeight*scaleRate,
      height2:svgConf.height2*scaleRate
    }
  }


  getGradient(polyPoints){
    //#1af4ab
    //#ffe900
    //#ffaa00
    //#ff3100

    let delta = this.clickableGraphData().max-this.clickableGraphData().min
    let rate = delta/this.scaledConf().gapHeight
    let yValues = polyPoints.filter((v,i)=>i%2==1)
    let yMin = Math.min(...yValues)
    let yMax = Math.max(...yValues)
    let colorRanges = [
      {color: '#1ad4d0', range: [0, (this.colorStops().warmup[0] - this.clickableGraphData().min) / rate],},
      {color: '#ffe400', range: [(this.colorStops().warmup[0] - this.clickableGraphData().min) / rate, (this.colorStops().warmup[1] - this.clickableGraphData().min) / rate],},
      {color: '#ffb500', range: [(this.colorStops().lf[0] - this.clickableGraphData().min) / rate, (this.colorStops().lf[1] - this.clickableGraphData().min) / rate],},
      {color: '#f26b08', range: [(this.colorStops().stm[0] - this.clickableGraphData().min) / rate, (this.colorStops().stm[1] - this.clickableGraphData().min) / rate],},
      {color: '#e51111', range: [(this.colorStops().sup[0] - this.clickableGraphData().min) / rate, Infinity ],},
    ]


    const yMinColor = colorRanges.filter(e=>e.range[0]<=yMin&&e.range[1]>yMin)[0]
    const yMaxColor = colorRanges.filter(e=>e.range[0]<=yMax&&e.range[1]>yMax)[0]

    let colors = colorRanges.slice(colorRanges.findIndex(e=>e==yMinColor),colorRanges.findIndex(e=>e==yMaxColor)+1)

    if(yMinColor==yMaxColor){
      colors = [yMinColor]
    }
    let descriptor = 'l(0, 0, 0, 1)'
    let yLength = yMax - yMin
    let yD1 = 0
    let yD2 = 0
    let parts = []
    console.log(colors)
    for(let i = 0;i<colors.length;i++){
      if(i==0){
        yD1 = 0
        yD2 = colors[i].range[1]-yMin
      }else if(i==colors.length-1){
        yD1 = colors[i].range[0]-yMin
        yD2 = yLength
      }else{
        yD1 = colors[i].range[0]-yMin
        yD2 = colors[i].range[1]-yMin
      }
      parts.push(colors[i].color+':'+(yD1/yLength*100).toFixed(2))
      parts.push(colors[i].color+':'+(yD2/yLength*100).toFixed(2))

    }
    descriptor +=parts.join('-')
    console.log(descriptor)

    //let absoluteStops = [
    //  {v: 0, c: '#1af4ab'},
    //  {v: (this.colorStops().lf[0]-this.clickableGraphData().min)/rate, c: '#ffe900'},
    //  {v: (this.colorStops().stm[0]-this.clickableGraphData().min)/rate, c: '#ffaa00'},
    //  {v: (this.colorStops().sup[0]-this.clickableGraphData().min)/rate, c: '#ff3100'}
    //]
    ////console.log(absoluteStops)
    //for(let i=0;i<absoluteStops.length;i++){
    //  if(yMin>absoluteStops[i].v){
    //    absoluteStops[i].v1 = yMin
    //  }
    //  if(yMax>absoluteStops[i].v){
    //    absoluteStops[i].v2 = yMax
    //  }
    //}
    //let descriptor = 'l(0, 0, 0, 1)#1af4ab'
    //let yLength = yMax-yMin
    //for(let i = 1;i<absoluteStops.length;i++){
    //  //if(absoluteStops[i].v>=yMin&&absoluteStops[i].v<=yMax){
    //  let v = absoluteStops[i].v1?absoluteStops[i].v1:absoluteStops[i].v
    //  let f = (v-yMin)/yLength
    //  f = f>0?f:0
    //  descriptor+='-'+absoluteStops[i-1].c+':'+(100*f).toFixed(2)
    //  descriptor+='-'+absoluteStops[i].c+':'+(100*f).toFixed(2)
    //  //}
    //}
    //descriptor+='-#ff3100:100'

    //console.log({...this.colorStops()},absoluteStops,descriptor)
    //console.log('============')

    return descriptor
  }

  getPointColor(y){
    let delta = this.clickableGraphData().max-this.clickableGraphData().min
    let rate = delta/this.scaledConf().gapHeight
    let absoluteStops = [
      {v: 0, c: '#1ad4d0'},
      {v: (this.colorStops().warmup[0] - this.clickableGraphData().min) / rate, c: '#ffe400'},
      {v: (this.colorStops().lf[0] - this.clickableGraphData().min) / rate, c: '#ffb500'},
      {v: (this.colorStops().stm[0] - this.clickableGraphData().min) / rate, c: '#f26b08'},
      {v: (this.colorStops().sup[0] - this.clickableGraphData().min) / rate, c: '#e51111'}
    ]
    let color = ''
    for(let i=0;i<absoluteStops.length;i++){
      if(y>=absoluteStops[i].v){
        color = absoluteStops[i].c
      }

    }
    return color
  }


  execTypeDef(){
    let ageBase = 220-25
    let s1 = ageBase*0.5
    let s2 = ageBase*0.7
    let s3 = ageBase*0.85
    let ss1 = 0.6*ageBase
    let ss2 = 0.775*ageBase
    return {
      ss0:0.4*ageBase,
      ss1,
      ss2
    }
  }

  clickableGraphData(){
    const {heartRateData} = this.props
    if(heartRateData&&this.execTypeDef()){
      return {
        arr:heartRateData.hr,
        max:this.vLabels().max,
        min:this.vLabels().min,
        execTypeDef:this.execTypeDef()
      }
    }
    return{
      arr:null,
      max:null,
      min:null,
      execTypeDef:null
    }
  }

  vLabels(){
    const {heartRateData} = this.props
    let max = 0
    let min = 0
    let mid = 0
    if(heartRateData){
      let records = heartRateData.hr.filter(e=>e!=0)

      max = Math.max(...records)+1
      min  = Math.min(...records)-1
      mid = Math.ceil((max+min)/2)
    }

    return {
      max,min,mid
    }
  }


  gradientDescriptor(){
    let desc =  'l(0, 0, 0, 1)transparent-#1af4ab:1'

      +'-#1af4ab:'+this.toPercentNum(this.colorStops().norm[1])

      +'-#ffe900:'+this.toPercentNum(this.colorStops().lf[0])
      +'-#ffe900:'+this.toPercentNum(this.colorStops().lf[1])

      +'-#ffaa00:'+this.toPercentNum(this.colorStops().stm[0])
      +'-#ffaa00:'+this.toPercentNum(this.colorStops().stm[1])

      +'-#ff3100:'+this.toPercentNum(this.colorStops().sup[0])

      +'-#ff3100:100'

    return desc
  }

  toPercentNum(n){
    n = (n)/(this.clickableGraphData().max)
    n = n>0?n:0.011
    return (n*100).toFixed(2)
  }

  colorStops() {
    const {birthday} = this.props
    //let age = new Date().getFullYear()-birthday
    let base = 200
    if(birthday){
      base = 220-birthday
    }
    return {
      norm:[0,0.5*base],
      warmup:[0.5*base,0.6*base],
      lf:[0.6*base,0.7*base],
      stm:[0.7*base,0.85*base],
      sup:[0.85*base,base]
    }
  }


  resetSvgEvents(paper){
    const {scaleRate} = this.props

    let ontouch=(e)=>{
      e.preventDefault()
      let svgRect =  document.getElementById('heartRate-svg').getBoundingClientRect()
      let touchX=e.touches[0].pageX
      Snap.selectAll('.data-mark').remove()
      let unitWidth = this.scaledConf().width/this.clickableGraphData().arr.length
      let i = Math.round((e.touches[0].pageX-svgRect.left)/unitWidth)
      if(!this.clickableGraphData().arr[i]){
        return
      }
      let g = Snap.select('#hrClickGraph')
      if(this.clickableGraphData().arr[i]-this.clickableGraphData().min<0)return
      let el = Snap.select('.c'+i)
      let point = {
        x1:el.attr('cx'),
        y1:el.attr('cy')
      }
      g.el('circle').attr({
        cx:point.x1,
        cy:point.y1,
        r:5*scaleRate,
        fill:'#ffffff',
        'class':'data-mark'
      })
      g.el('circle').attr({
        cx:point.x1,
        cy:point.y1,
        r:9*scaleRate,
        opacity:0.3,
        fill:'#ffffff',
        'class':'data-mark'
      })

      g.el('line').attr({
        ...point,
        x2:point.x1,
        y2:1000,
        strokeWidth:2,
        stroke:'#ffffff',
        strokeDasharray:'2 2',
        'class':'data-mark'
      })
      let rH = 40*scaleRate,rW = 180*scaleRate
      let m = 5*i%60
      let labelText = this.clickableGraphData().arr[i]+'次/分 '+Math.floor(5*i/60)+':'+(m>=10?m:'0'+m)


      let rectW=210*scaleRate
      let rectH=35*scaleRate

      let labelX = touchX

      //console.log(labelX)

      let minLeft = 69*scaleRate+rectW/2
      labelX=labelX<minLeft?minLeft:labelX
      let maxLeft = screen.width-69*scaleRate-rectW/2
      labelX = labelX>maxLeft?maxLeft:labelX

      labelX = labelX-69*scaleRate-rectW/2



      let paperTip = Snap('#heartRate-tip-svg')
      let markRect=paperTip.paper.rect(labelX,3*scaleRate,rectW,rectH,4*scaleRate).attr({
        fill: '#fff',
        'class':'data-mark'
      });

      let markText=paperTip.paper.text(labelX+(210-195)*scaleRate/2,(35+25+3)*scaleRate/2,labelText).attr({
        fill: '#2fa7c5',
        fontSize: 30*scaleRate,
        'class':'data-mark'
      });
    }

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
      //clearMarkLine()
      Snap.selectAll('.data-mark').remove()
    })
    paper.touchcancel(e=>{
      //clearMarkLine()
      Snap.selectAll('.data-mark').remove()
    })

  }
}
