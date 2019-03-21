import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {generateUrl} from '../../apis/request'
import {healthServer} from '../../apis/constant'
import {getUpdateDateDesc,checkFloat} from '../../util/common'
import {weightDataFormat} from '../../util/weight/weight'

import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

export default class Chart extends Component {
  //static propTypes = {
  //  weight: PropTypes.string,
  //  lastSevenWeightData:PropTypes.array
  //}

  static defaultProps = {
    weight: 0,
    lastSevenWeightData:[
      //{
      //  weight:70,
      //  pbf:20,
      //  bmi: 1,
      //  water: 1,
      //  muscle: 1,
      //  bone: 1,
      //  measurementDate:'2012-01-01'
      //}
    ],
    weightData:[],

    svgConf:{
      chartLeft:69,
      marginL:40,
      marginT:20,
      width:750,
      height:370,
    },
    scaleRate:screen.width / 750,

  }

  componentDidMount(){
    this.renderSvg()
  }

  componentWillUnmount() {
  }


  render(){
    const {isHome,lastSevenWeightData,scaleRate} = this.props
    require('../../styles/weight/weight.styl')

    this.renderSvg()

    return (
      <div className={isHome?'chart-home':'chart'}>
        <div style={{display: lastSevenWeightData&&lastSevenWeightData.length>0 ? 'none':'block'}} className="no-data">未有数据,请保持持续测量及上传</div>
        <svg id="weight-svg" className="weight-svg"
             style={{
             marginTop:this.scaledConf().marginT+'px',paddingTop:'5px',
             display: lastSevenWeightData&&lastSevenWeightData.length>0 ? 'inline':'none'
             }}
             width={this.scaledConf().width}
             height={this.scaledConf().height}
        />
      </div>
    )
  }

  renderSvg() {
    const {isHome,lastSevenWeightData,scaleRate} = this.props

    if(lastSevenWeightData&&lastSevenWeightData.length>0){

      let weightData=lastSevenWeightData;
      //weightData.reverse();
      let minWeight=0;
      let maxWeight=0;
      let minPbf=0;
      let maxPbf=0;
      let avgWeight=0;
      let avgPbf=0;
      let sumWeight=0;
      let sumPbf=0;
      let pbfLen=0;
      for(let i=0;i<weightData.length;i++){
        if(i==0){
          minWeight=weightData[i].weight;
          maxWeight=weightData[i].weight;
          if(weightData[i].pbf){
            minPbf=weightData[i].pbf;
            maxPbf=weightData[i].pbf;
          }
        }else{
          if(minWeight>weightData[i].weight){
            minWeight=weightData[i].weight;
          }else if(maxWeight<weightData[i].weight){
            maxWeight=weightData[i].weight;
          }
          if(weightData[i].pbf){
            if(minPbf==0){
              minPbf=weightData[i].pbf;
            }
            if(minPbf>weightData[i].pbf){
              minPbf=weightData[i].pbf;
            }else if(maxPbf<weightData[i].pbf){
              maxPbf=weightData[i].pbf;
            }
          }
        }
        sumWeight+=weightData[i].weight;
        if(weightData[i].pbf){
          sumPbf+=weightData[i].pbf;
          pbfLen++;
        }
      }
      pbfLen=pbfLen==0?1:pbfLen;
      maxWeight+=1;
      minWeight-=1;
      maxPbf+=1;
      minPbf-=1;
      avgWeight=(sumWeight/weightData.length).toFixed(1);
      avgPbf=(sumPbf/pbfLen).toFixed(1);


      let svg = Snap("#weight-svg");
      if(svg){
        svg.clear();
        let chartHeight=300*scaleRate

        let weightHeight=(130-25)*scaleRate;
        let pbfHeight=(130-25)*scaleRate;

        let chartLeft=this.scaledConf().chartLeft;
        let chartTop=90*scaleRate;
        let chartWidth=this.scaledConf().width-chartLeft*2;
        let chartSpace=chartWidth/6;
        let circleW=4*scaleRate;
        let pbfTop=weightHeight+(5*scaleRate)+chartTop;

        let bigCircleW=9*scaleRate;
        let smallCircleW=5*scaleRate;
        let rectW=180*scaleRate;
        let rectH=72*scaleRate;

        let weightSpace=weightHeight/(maxWeight-minWeight);
        let pbfSpace=pbfHeight/(maxPbf-minPbf);

        //svg.paper.rect(chartLeft, chartTop, chartWidth, weightHeight, 0);

        //体重平均线
        let avgWeightPosition=weightSpace*(maxWeight-avgWeight)+chartTop;
        svg.paper.text(10*scaleRate, avgWeightPosition-5, avgWeight).attr({
          fill: "#ffffff",
          fontSize: 24*scaleRate
        });
        svg.paper.line(this.scaledConf().marginL, avgWeightPosition, this.scaledConf().width-this.scaledConf().marginL, avgWeightPosition).attr({
          stroke: "#ffffff",
          strokeLinecap: 'round',
          strokeWidth: 0.5,
          strokeDasharray: '4 4'
        });

        //svg.paper.rect(chartLeft, pbfTop,chartWidth, pbfHeight, 0);

        if(avgPbf!=0){
          //pbf平均线
          let avgPbfPosition=pbfTop+pbfSpace*(maxPbf-avgPbf);
          svg.paper.text(10*scaleRate, avgPbfPosition-5, avgPbf+'%').attr({
            fill: "#ffffff",
            fontSize: 24*scaleRate
          });
          svg.paper.line(this.scaledConf().marginL, avgPbfPosition, this.scaledConf().width-this.scaledConf().marginL, avgPbfPosition).attr({
            stroke: "#ffffff",
            strokeLinecap: 'round',
            strokeWidth: 0.5,
            strokeDasharray: '4 4',
            strokeOpacity:"0.8",
          });
        }

        //阴影部分
        let pbfArray=[]
        let lastlinePbf=-1;

        let lastPbf=-1;
        for(let i=0;i<weightData.length;i++){
          let weightPosition=chartTop+weightSpace*(maxWeight-weightData[i].weight);
          let pbfPosition=0;
          if(weightData[i].pbf){
            lastPbf=weightData[i].pbf;
            pbfPosition=pbfTop+pbfSpace*(maxPbf-weightData[i].pbf);
          }else{
            if(lastPbf!=-1){
              weightData[i].isShowPbfText=1;
              pbfPosition=pbfTop+pbfSpace*(maxPbf-lastPbf);
            }
          }
          weightData[i].weightPosition=weightPosition;
          if(pbfPosition==0){
            pbfPosition=pbfTop+pbfSpace*(maxPbf-0);
          }
          weightData[i].pbfPosition=pbfPosition;
          let xLen=i;

          //体重圆点
          svg.paper.circle(chartLeft+chartSpace*xLen, weightPosition, circleW).attr({
            fill:"#0dc8aa",
            stroke: "#ffffff",
            strokeWidth: 2*scaleRate
          });

          if(i==weightData.length-1){
            svg.paper.circle(chartLeft+chartSpace*xLen, weightPosition, 5*scaleRate).attr({
              fill:"#ffffff",
              fillOpacity:"1",
            });
            svg.paper.circle(chartLeft+chartSpace*xLen, weightPosition, 12*scaleRate).attr({
              fill:"#ffffff",
              fillOpacity:"0.54",
            });
            svg.paper.circle(chartLeft+chartSpace*xLen, weightPosition, 19*scaleRate).attr({
              fill:"#ffffff",
              fillOpacity:"0.22",
            });
          }

          //脂肪率圆点
          if(lastPbf!=-1){
            if(weightData[i].pbf){
              svg.paper.circle(chartLeft+chartSpace*xLen, pbfPosition, circleW).attr({
                fill:"#ffffff",
                stroke: "#ffffff",
                strokeWidth: 2*scaleRate
              });
            }else{
              svg.paper.circle(chartLeft+chartSpace*xLen, pbfPosition, circleW).attr({
                fill:"#ffffff",
                stroke: "#ffffff",
                strokeWidth: 2*scaleRate,
                strokeOpacity:"0.3",
                fillOpacity:"0.3",
              });
            }
          }
          //连线
          if(i!=weightData.length-1){
            let nextWeightPosition=chartTop+weightSpace*(maxWeight-weightData[i+1].weight);
            svg.paper.polyline(chartLeft+chartSpace*xLen+circleW, weightPosition,chartLeft+chartSpace*(xLen+1), nextWeightPosition).attr({
              stroke: "#ffffff",
              strokeOpacity:"0.7",
              strokeWidth: 4*scaleRate
            });
            if(lastPbf!=-1){
              let nextPbfPosition=0
              if(weightData[i+1].pbf){
                nextPbfPosition=pbfTop+pbfSpace*(maxPbf-weightData[i+1].pbf);
              }else{
                if(lastPbf!=-1){
                  nextPbfPosition=pbfTop+pbfSpace*(maxPbf-lastPbf);
                }
              }
              if(weightData[i+1].pbf) {
                svg.paper.polyline(chartLeft + chartSpace * xLen + circleW, pbfPosition, chartLeft + chartSpace * (xLen + 1), nextPbfPosition).attr({
                  stroke: "#ffffff",
                  strokeWidth: 4 * scaleRate
                });
              }else{
                svg.paper.polyline(chartLeft + chartSpace * xLen + circleW, pbfPosition, chartLeft + chartSpace * (xLen + 1), nextPbfPosition).attr({
                  stroke: "#ffffff",
                  strokeWidth: 4 * scaleRate,
                  strokeOpacity:"0.3",
                });
              }
            }
          }
        }

        let markLine;
        let weightBigCircle;
        let weightSmallCircle;
        let pbfBigCircle;
        let pbfSmallCircle;
        let dataRect;
        let dateText;
        let dataText;
        let clearLine=() => {
          markLine && markLine.remove()
          weightBigCircle && weightBigCircle.remove()
          weightSmallCircle && weightSmallCircle.remove()
          pbfBigCircle && pbfBigCircle.remove()
          pbfSmallCircle && pbfSmallCircle.remove()
          dataRect && dataRect.remove()
          dateText && dateText.remove()
          dataText && dataText.remove()
        }
        let showWeightPbf = (event)=>{
          event.preventDefault()
          let touch = event.touches[0];
          let x = touch.clientX;
          let y = touch.clientY;
          for(let i=0;i<weightData.length;i++) {
            weightDataFormat(weightData[i])

            let xLen=i;
            let pointX = chartLeft + chartSpace * xLen;
            if(parseInt(pointX)>parseInt(x-5)&&parseInt(pointX)<parseInt(x+5)){

              clearLine();
              weightBigCircle=svg.paper.circle(pointX, weightData[i].weightPosition, bigCircleW).attr({
                fill:"#ffffff",
                fillOpacity:"0.5"
              });
              weightSmallCircle=svg.paper.circle(pointX, weightData[i].weightPosition, smallCircleW).attr({
                fill:"#ffffff",
              });

              let lineYPosition=0
              if(avgPbf!=0){
                pbfBigCircle=svg.paper.circle(pointX, weightData[i].pbfPosition, bigCircleW).attr({
                  fill:"#ffffff",
                  fillOpacity:"0.5"
                });
                pbfSmallCircle=svg.paper.circle(pointX, weightData[i].pbfPosition, smallCircleW).attr({
                  fill:"#ffffff",
                });

              }
              lineYPosition=weightData[i].weightPosition

              markLine=svg.paper.line(pointX,rectH,pointX,lineYPosition).attr({
                stroke: "#ffffff",
                strokeLinecap: 'round',
                strokeWidth: 1,
                strokeDasharray: '2 2'
              });

              if(i==0){
                pointX+=20*scaleRate
              }

              if(i==weightData.length-1){
                pointX-=20*scaleRate
              }

              let time = weightData[i].measurementDate.replace(/-/g, '/');
              time = new Date(time).format('MM/dd');
              if(weightData[i].pbf){
                dataRect=svg.paper.rect(pointX-rectW/2,0,rectW,rectH,2).attr({
                  fill:"#ffffff",
                });
                dateText=svg.paper.text(pointX-30*scaleRate, 30*scaleRate, time).attr({
                  fill: "#0dc8aa",
                  fontSize: 24*scaleRate
                });
                dataText=svg.paper.text(pointX-60*scaleRate, 60*scaleRate, weightData[i].weight+'kg '+weightData[i].pbf+'%').attr({
                  fill: "#0dc8aa",
                  fontSize: 24*scaleRate
                });
              }else if(weightData[i].isShowPbfText==1){
                dataRect=svg.paper.rect(pointX-rectW/2,0,rectW,rectH,2).attr({
                  fill:"#ffffff",
                });
                dateText=svg.paper.text(pointX-60*scaleRate, 30*scaleRate, weightData[i].weight+'kg '+time).attr({
                  fill: "#0dc8aa",
                  fontSize: 24*scaleRate
                });
                dataText=svg.paper.text(pointX-55*scaleRate, 60*scaleRate, '未测脂肪率').attr({
                  fill: "#0dc8aa",
                  fontSize: 24*scaleRate
                });

              }else{
                dataRect=svg.paper.rect(pointX-rectW/2,rectH/2,rectW,rectH/2,2).attr({
                  fill:"#ffffff",
                });
                dateText=svg.paper.text(pointX-70*scaleRate, 63*scaleRate, weightData[i].weight+'kg '+time).attr({
                  fill: "#0dc8aa",
                  fontSize: 24*scaleRate
                });
              }
              break;
            }
          }
        }
        if(!isHome){
          svg.untouchstart();
          svg.untouchmove();
          svg.untouchend();
          svg.touchstart(event=>{
            showWeightPbf(event)
          })
          svg.touchmove(event=>{
            showWeightPbf(event)
          })
          svg.touchend(event=>{
            clearLine()
          })
        }
      }
    }
  }

  scaledConf(){
    const {svgConf,scaleRate,isHome} = this.props
    return{
      height:svgConf.height*scaleRate,
      width:(isHome?727:svgConf.width)*scaleRate,
      marginT:svgConf.marginT*scaleRate,
      marginL:svgConf.marginL*scaleRate,
      chartLeft:svgConf.chartLeft*scaleRate
    }
  }





}
