import React, {Component, PropTypes} from 'react'
import {calc} from '../../util/setFontSize'
import ScrollView from '../common/scroll/ScrollView'
import {compareValue} from '../../util/compare'

let zrender
if (process.browser) {
  const shape = {}
  shape.CircleShape = require('zrender/shape/Circle')
  shape.RectangleShape = require('zrender/shape/Rectangle')
  shape.LineShape = require('zrender/shape/Line')
  shape.TextShape = require('zrender/shape/Text')
  shape.star = require('zrender/shape/Star')

  zrender = {
    zrender: require('zrender'),
    shape,
  }
}

const zrStyle = {width: '100%', height: '100%'}

const noDataStyle = {
  position: 'absolute',
  left: 0,
  top: calc(97),
  width: '100%',
  textAlign: 'center',
  color: 'rgba(255,255,255,0.5)',
  fontSize: calc(28),
}

const zrValBoxStyle = {
  position: 'absolute',
  bottom: 0,
  top: 0
}
export default class LineChart extends Component {

  static propTyps = {
    values: PropTypes.arrayOf(PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.number).isRequired,
    })).isRequired,
    datas: PropTypes.arrayOf(PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.number).isRequired,
    })).isRequired,
    yAxis: PropTypes.shape({
      defMax: PropTypes.number,
      defMin: PropTypes.number,
      minScale: PropTypes.number,
    }),
    initOffsetX: PropTypes.number,
    xAxis: PropTypes.shape({
      format: PropTypes.func,
      values: PropTypes.array,

    }),
    scroll: PropTypes.bool,
    noDataTip: PropTypes.string,
  }

  static defaultProps = {
    yAxis: {
      max: -Infinity,
      min: Infinity,
      defMax: 120,
      defMin: 60,
      minScale: 10
    },
    initOffsetX: 0,
    xAxis: {
      format: (v) => (v),
      values: [],
      datas:[]
    },
    values: [],
    datas:[],
    scroll: false,
    noDataTip: '没有数据'
  }

  state = {
    showNoDataTip: undefined
  }

  componentDidMount() {
    this.zrValOffset = 10

    const {xAxis} = this.props
    this.zrValSpan = 83
    if(xAxis.type === 'day'){
      this.zrValSpan = 0.34
    }

    this.zrValPadding = ((546 + 2 * this.zrValOffset) - (83 * 6)) / 2 // 620-60-14

    const {zrenderBox, zrenderValues, zrenderValuesBox} = this.refs

    this.zrenderBoxWidth = zrenderBox.offsetWidth

    zrenderBox.style.height = this.calc(305) + 'px'

    this.zr = zrender.zrender.init(this.refs.zrender)

    zrenderValuesBox.style.left = this.calc(60 - this.zrValOffset) + 'px'
    zrenderValuesBox.style.right = this.calc(14 - this.zrValOffset) + 'px'

    zrenderValues.style.width = this.calcZrValWidth() + 'px'

    this.zrVal = zrender.zrender.init(zrenderValues)
    // this.zrValSel = zrender.init(this.refs.zrenderValueSelect)

    this.changeShowNoDataTip()

    this.renderChart(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.changeShowNoDataTip(nextProps)

    const {values, xAxis} = this.props
    const {values: nextValues, xAxis: nextXAxis} = nextProps
    if(nextXAxis.type && nextXAxis.type === 'week'){
      this.zrValSpan = 83
    }else if(nextXAxis.type === 'month'){
      if(nextXAxis.values.length === 30){
        this.zrValSpan = 16.6
      }else {
        this.zrValSpan = 16
      }
    }else if(nextXAxis.type === 'day'){
      this.zrValSpan = 0.34
    }else {
      this.zrValSpan = 45.3
    }
    if (values.length !== nextValues.length) {
      return this.renderChart(nextProps)
    }
    for (let i = 0; i < values.length; i++) {
      let item = values[i]
      let nextItem = nextValues[i]

      if (item.values.length !== nextItem.values.length) {
        return this.renderChart(nextProps)
      }

      for (let j = 0; j < item.values.length; j++) {
        if (item.values[j] !== nextItem.values[j]) {
          return this.renderChart(nextProps)
        }
      }
    }

    if (!compareValue(xAxis, nextXAxis)) {

      return this.renderChart(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {noDataTip} = this.props
    const {noDataTip: nextNoDataTip} = nextProps
    const {showNoDataTip} = this.state
    const {showNoDataTip: nextShowNoDataTip} = nextState
    if (showNoDataTip !== nextShowNoDataTip || noDataTip !== nextNoDataTip) {
      // 当 是否显示没数据 或 显示没数据文本 发生改变才更新
      return true
    }
    return false
  }

  changeShowNoDataTip(props) {
    props = props || this.props
    const {values} = props

    this.setState({
      showNoDataTip: !values.some(v => v.values.some(v => v !== undefined))
    })
  }

  addShape(zr, Shape, options) {
    let shapeObj = new Shape({
      ...options,
      hoverable: false,
    })
    zr.addShape(shapeObj)
    return shapeObj
  }

  calcZrValWidth(props) {
    let max = 7

    const {values} = props || this.props
    // 求最大值和最小值
    values.forEach((obj) => {
      max = obj.values.length > max ? obj.values.length : max
    })

    // (546 + 2 * this.zrValOffset) = 2* this.zrValPadding + (this.zrValSpan * 6)     //620-60-14
    let width = ((max - 1) * this.zrValSpan) + (2 * this.zrValPadding)

    return this.calc(width)
  }

  calc(p) {
    return parseInt(this.zrenderBoxWidth / (620) * p)
  }

  // 图表
  renderChart(props) {
    const {zrenderValues, scrollView} = this.refs
    const {xAxis} = this.props
    zrenderValues.style.width = this.calcZrValWidth(props) + 'px'
    let xPosArea = 0.20
    if(xAxis.type === 'week'){
      xPosArea = 25
    }else if(xAxis.type === 'month'){
      xPosArea = 5
    }else if(xAxis.type === 'year'){
      xPosArea = 13
    }
    const render = () => {
      this.zrVal.resize()

      this.zr.clear()
      this.zrVal.clear()

      // y坐标
      this.renderCoordinate(props)

      // x坐标
      this.renderXAxis(props)

      // 值
      this.renderValues(props)

      this.renderValueSelected(props)
      this.zrVal.render()
      let _that = this
      let valuesPosIndexArray = []
      let index = 0
      for(let j in _that.valuesPos){
        valuesPosIndexArray[index] = j
        index ++
      }
      this.zrVal.on('touchstart',function(params){
        let posClientX = params.event.changedTouches[0].clientX - 30
        if(xAxis.type == 'day'){
          posClientX = params.event.changedTouches[0].clientX - 28
        }
        let valueIndex = 0
        for(let i in _that.valuesPos){

          if(xAxis.type == 'day'){
            let beforeArea = 0
            let afterArea = 674
            if(!!_that.valuesPos[valuesPosIndexArray[valueIndex+1]]){
                afterArea = _that.valuesPos[i][0].x + (_that.valuesPos[valuesPosIndexArray[valueIndex+1]][0].i-_that.valuesPos[i][0].i) * 0.5 * xPosArea
            }
            if(!!_that.valuesPos[valuesPosIndexArray[valueIndex-1]]){
              beforeArea = _that.valuesPos[i][0].x - (_that.valuesPos[i][0].i-_that.valuesPos[valuesPosIndexArray[valueIndex-1]][0].i) * 0.5 * xPosArea
            }
            if(posClientX >= beforeArea && posClientX <= afterArea){
              _that.showValue(i)
            }
          }else{
            if(posClientX >= _that.valuesPos[i][0].x - xPosArea && posClientX <= _that.valuesPos[i][0].x + xPosArea){
              _that.showValue(i)
            }
          }

          valueIndex ++
        }

      })
      this.zrVal.on('touchmove',function(params){
        let posClientX = params.event.changedTouches[0].clientX
        if(xAxis.type == 'day'){
          posClientX = params.event.changedTouches[0].clientX - 28
        }
        let valueIndex = 0
        for(let i in _that.valuesPos){

          if(xAxis.type == 'day'){
            let beforeArea = 0
            let afterArea = 674
            if(!!_that.valuesPos[valuesPosIndexArray[valueIndex+1]]){
              afterArea = _that.valuesPos[i][0].x + (_that.valuesPos[valuesPosIndexArray[valueIndex+1]][0].i-_that.valuesPos[i][0].i) * 0.5 * xPosArea
            }
            if(!!_that.valuesPos[valuesPosIndexArray[valueIndex-1]]){
              beforeArea = _that.valuesPos[i][0].x - (_that.valuesPos[i][0].i-_that.valuesPos[valuesPosIndexArray[valueIndex-1]][0].i) * 0.5 * xPosArea
            }
            if(posClientX >= beforeArea && posClientX <= afterArea){
              _that.showValue(i)
            }
          }else{
            if(posClientX >= _that.valuesPos[i][0].x - xPosArea && posClientX <= _that.valuesPos[i][0].x + xPosArea){
              _that.showValue(i)
            }
          }

          valueIndex ++
        }
      })
      this.zrVal.on('touchend',function(params){
        if (_that._valShowValuesShape) {
          _that.zrVal.delShape(_that._valShowValuesShape.id)
        }
        if (_that._valShowValuesShape2) {
          _that.zrVal.delShape(_that._valShowValuesShape2.id)
        }
        if (_that._valShowValueLine) {

          _that.zrVal.delShape(_that._valShowValueLine.id)
        }
        if (_that._valStar) {

          _that.zrVal.delShape(_that._valStar.id)
        }
      })
    }

    if (scrollView) {
      scrollView.update()
      // if (props.initOffsetX) {
      setTimeout(() => {
        const x = this.calc(props.initOffsetX * -this.zrValSpan)
        scrollView.swiper.setWrapperTranslate(x)

        render()
      }, 0)
      return
      // }
    }

    render()
  }

  // 画坐标
  renderCoordinate(props) {
    // 三条虚线对应的y轴坐标
    this.yList = [this.calc(70), this.calc(234)]

    this.calcCoordinate(props)

    let baseLineStyle = {
      strokeColor: '#FFF',
      lineWidth: 1,
      xStart: this.calc(20),
      xEnd: this.calc(606),
      opacity: 0.26,
      lineType: 'dashed',
      // dashLength:this.calc(8),
    }

    let baseTextStyle = {
      ...(this.genTextStyle(20)),
      x: this.calc(20),
      textBaseline: 'bottom',
      textAlign: 'left',
    }

    // 坐标线
    this.yList.forEach((y, i) => {
      this.addShape(this.zr, zrender.shape.LineShape, {
        style: {
          ...baseLineStyle,
          yStart: y,
          yEnd: y,
        }
      })

      this.addShape(this.zr, zrender.shape.TextShape, {
        style: {
          ...baseTextStyle,
          y: y - 4,
          text: this.cList[i]
        }
      })
    })
  }

  // 获取文本样式
  genTextStyle(fontSize) {
    return {
      brushType: 'fill',
      color: '#FFFFFF',
      textFont: `normal ${this.calc(fontSize)}px verdana`,
      textAlign: 'left',
      textBaseline: 'top'
    }
  }

  // 计算坐标
  calcCoordinate(props) {
    let {yAxis: {max: maxMax, min: minMin, defMax, defMin, minScale}, values} = props || this.props

    // 求最大值和最小值
    let max = Math.max(...values.map(({values}) => Math.max(...values.filter(v => !!v))))
    let min = Math.min(...values.map(({values}) => Math.min(...values.filter(v => !!v))))
    if (!isFinite(max)) {
      max = defMax
      min = defMin
    }

    max = max > defMax ? max : defMax
    min = min < defMin ? min : defMin
    // let mid = Math.ceil(min + (max - min) / 2)
    // let dif = Math.ceil((max - min) / 2)
    max = max.toFixed(1)

    min = min.toFixed(1)
    //// 求第二条虚线的最的坐标
    //let midPer = 82 / 215
    //let mid = parseInt((max - min) * midPer) + min
    //
    //let remainder = mid % minScale
    //mid = remainder === 0 ? mid : (remainder > (minScale / 2) ? mid + (minScale - remainder) : mid - remainder)
    //
    //// 求最小坐标与中间坐标的差值
    //let minDif = mid - min
    //remainder = minDif % minScale
    //minDif = remainder === 0 ? minDif : minDif + (minScale - remainder)
    //
    //// 求最大坐标与中间坐标的差值
    //let maxDif = parseInt((max - mid) / ((82 + 50) / 82))
    //remainder = maxDif % minScale
    //maxDif = remainder === 0 ? maxDif : maxDif + (minScale - remainder)
    //
    //let dif = maxDif > minDif ? maxDif : minDif

    //max = mid + dif
    //min = mid - dif
    //
    //while (max > maxMax || min < minMin) {
    //  if (max > maxMax && min - minScale >= minMin) {
    //    mid = mid - minScale
    //  } else if (min < minMin && max + minScale <= maxMax) {
    //    mid = mid + minScale
    //  } else {
    //    dif - minScale
    //  }
    //
    //  max = mid + dif
    //  min = mid - dif
    //}

    this.cList = [max, min]
  }

  renderXAxis(props) {
    const {xAxis} = props || this.props
    if (!xAxis || !xAxis.values || (xAxis.type === 'month' || xAxis.type === 'day')) {
      return
    }
    //显示下面的文字
    xAxis.values.forEach((value, i) => {
      this.addShape(this.zrVal, zrender.shape.TextShape, {
        style: {
          ...(this.genTextStyle(20)),
          textBaseline: 'middle',
          textAlign: 'center',
          display:'none',
          x: this.calcX(i),
          y: this.yList[1] + this.calc(38),
          text: xAxis.format ? xAxis.format(value) : value
        }
      })
    })
  }

  // 画值
  renderValues(props) {
    const {values,datas} = props || this.props

    this.valuesPos = []

    let lastIndex
    values.forEach((obj, mindex) => {
      const list = []

      obj.values.forEach((v, i) => {

        if (!v) {
          return
        }
        console.log(datas[0].values[i].level)
        const item = {
          i: i,
          level:datas[0].values[i].level,
          x: this.calcX(i),
          y: this.calcY(v),
        }

        list.push(item)

        this.renderValueLine(list)
        if(mindex === 0){
          this.renderValueRound(item)
        }else{
          this.renderValueCircle(item)
        }


        this.renderValueArea(item)

        if (!this.valuesPos[i]) {
          this.valuesPos[i] = []
        }

        this.valuesPos[i].push(item)

        lastIndex = i
      })
    })

    if (lastIndex) {
      this.selectedIndex = lastIndex
    }
  }

  calcX(i) {
    return this.calc(i * this.zrValSpan + this.zrValPadding)
  }

  // 值的圆点
  renderValueCircle({level=2,x, y}) {
    const {xAxis} = this.props
    let colorArray = ['#f5a623','#f5a623','#1991eb','#ff001f','#d0021b']
    this.addShape(this.zrVal, zrender.shape.CircleShape, {
      style: {
        r: this.calc(4),
        x: x,
        y: y,
        lineWidth: 1,
        color: xAxis.type == 'day' ? colorArray[level] : '#FFFFFF',
        strokeColor: xAxis.type == 'day' ? colorArray[level] : '#FFFFFF',
        //brushType: 'stroke',
        brushType: 'both',
      }
    })
  }
  // 值的空心点
  renderValueRound({level=2,x, y}) {
    const {xAxis} = this.props
    let colorArray = ['#f5a623','#f5a623','#1991eb','#ff001f','#d0021b']

    this.addShape(this.zrVal, zrender.shape.CircleShape, {
      style: {
        r: this.calc(4),
        x: x,
        y: y,
        lineWidth: 1,
        color: xAxis.type == 'day' ? colorArray[level] : '#FFFFFF',
        strokeColor: xAxis.type == 'day' ? colorArray[level] : '#FFFFFF',
        //brushType: 'stroke',
        brushType: 'both',
      }
    })
  }
  // 值的线
  renderValueLine(list) {
    const [p1, p2] = list
    const {xAxis} = this.props
    if(xAxis.type == 'day'){
      return
    }
    if (!p1 || !p2) {
      return
    }

    this.addShape(this.zrVal, zrender.shape.LineShape, {
      style: {
        lineType: p2.i - p1.i === 1 ? 'solid' : 'dotted',
        strokeColor: '#FFF',
        lineWidth: 2,
        opacity: p2.i - p1.i === 1 ? 0.7 : 0.4,
        xStart: p1.x,
        xEnd: p2.x,
        yStart: p1.y,
        yEnd: p2.y,
      }
    })

    list.shift()
  }

  renderValueArea({x, y, i}) {
    let halfWidth = this.calc(30)
    const {scroll} = this.props

    this.addShape(this.zrVal, zrender.shape.RectangleShape, {
      index: i,
      style: {
        // color: '#FFF',
        opacity: 0,
        x: x - halfWidth,
        y: 0,
        width: halfWidth * 2,
        height: this.zrVal.getHeight() - this.calc(70),
      },
      clickable: scroll,
      onclick: (params) => {
        // this.showValue(params.target.index)
      },
      // onmousedown: (params) => {
      //
      //   console.log(params)
      //   this.showValue(params.target.index)
      // },
      // onmouseover: (params) => {
      //   console.log(params)
      //   this.showValue(params.target.index)
      // },
      // ontouchstart: (params) => {
      //   console.log('=======777=========')
      //   console.log(params)
      //   this.showValue(params.target.index)
      // },
      // ontouchmove: (params) => {
      //   alert(JSON.stringify(params))
      //   this.showValue(params.target.index)
      // },
      // ontouchend: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },
      // onmouseout: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },
      // onmouseup: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },
    })
  }

  renderValueSelected(props) {
    if (this.selectedIndex === undefined) {
      return
    }

    const pos = this.valuesPos[this.selectedIndex]

    if (this._valSelectedShapes) {
      this._valSelectedShapes.forEach(shapes => {
        shapes.forEach((shape, i) => {
          this.zrVal.delShape(shape.id)
        })
      })
    }

    this._valSelectedShapes = []

    if (!pos) {
      return
    }

    pos.forEach(({x, y}, i) => {
      const baseStyle = {
        x,
        y,
        lineWidth: 1,
        color: '#FFF',
        // brushType: 'stroke',
        brushType: 'fill',
      }

      const shapes = [
        this.addShape(this.zrVal, zrender.shape.CircleShape, {
          style: {
            ...baseStyle,
            r: this.calc(10),
            opacity: 0.36,
          }
        }),
        this.addShape(this.zrVal, zrender.shape.CircleShape, {
          style: {
            ...baseStyle,
            r: this.calc(15),
            opacity: 0.18,
          }
        })
      ]

      this._valSelectedShapes[i] = shapes
    })
  }

  calcP({x: x1, y: y1}, {x: x2, y: y2}, r) {
    // console.log('x1=' + x1)
    // console.log('y1=' + y1)
    // console.log('x2=' + x2)
    // console.log('y1=' + y2)
    // console.log('r=' + r)
    let p1 = {
      m: r * Math.abs(x2 - x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + x1,
      n: r * Math.abs(y2 - y1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + y1
    }
    return [p1, {
      m: x1 + x2 - p1.m,
      n: y1 + y2 - p1.n
    }]
  }

  calcY(value) {
    const temp = (this.yList[0] - this.yList[1]) / (this.cList[0] - this.cList[1])
    return (value - this.cList[0]) * temp + this.calc(70)
  }

  selectValue(index) {
    if (index === this.selectedIndex) {
      return
    }
    this.selectedIndex = index

    this.renderValueSelected()
  }
  showValue(index){

    this.selectedIndex = index

    this.renderShowValue()
  }
  renderShowValue(props){
    let {values,moreInfo,datas} = props || this.props
    if(moreInfo){
      return
    }
    if (this.selectedIndex === undefined) {
      return
    }

    const pos = this.valuesPos[this.selectedIndex]

    if (this._valShowValuesShape) {
      this.zrVal.delShape(this._valShowValuesShape.id)
    }
    if (this._valShowValuesShape2) {
      this.zrVal.delShape(this._valShowValuesShape2.id)
    }
    if (this._valShowValueLine) {

      this.zrVal.delShape(this._valShowValueLine.id)
    }
    if (this._valStar) {

      this.zrVal.delShape(this._valStar.id)
    }

    this._valShowValuesShape = null
    this._valShowValuesShape2 = null
    this._valShowValueLine = null
    this._valStar = null

    if (!pos) {
      return
    }
    const canvasWidth = this.calcZrValWidth(props)
    let xPosition = this.calcX(this.selectedIndex) - 68
    if(this.calcX(this.selectedIndex) - 68 < 0){
      xPosition = 0
    }else if(this.calcX(this.selectedIndex) + 68 > canvasWidth){
      xPosition = canvasWidth - 132
    }
    const shapesLine = this.addShape(this.zrVal, zrender.shape.LineShape, {
      style: {
        lineType:'dotted',
        strokeColor: '#FFF',
        lineWidth: 2,
        opacity: 0.7,
        xStart: this.calcX(this.selectedIndex),
        xEnd: this.calcX(this.selectedIndex),
        yStart: pos[0].y,
        yEnd: this.calc(70),
      }
    })
    const valStar = this.addShape(this.zrVal, zrender.shape.star, {
      style: {
        background: '#fff',
        color:'#fff',
        x: this.calcX(this.selectedIndex),
        n:5,
        y: this.calc(56),
        r: 10,
        r0:20
      }
    })
    const colorArray = ['#f5a623','#f5a623','#1991eb','#ff001f','#d0021b'];
    const shapes = this.addShape(this.zrVal, zrender.shape.RectangleShape, {
      style: {
        width : 132,
        textColor:colorArray[datas[0].values[this.selectedIndex].level],
        color:'#fff',
        height : 25,
        textFont:'normal 14px verdana',
        background: '#fff',
        textPosition:'inside',
        radius: [2,2,0,0],
        x: xPosition,
        y: this.calc(0),
        text: parseFloat(values[0].values[this.selectedIndex]).toFixed(1) + 'mmol/L ' + datas[0].values[this.selectedIndex].levelName,
      }
    })
    const shapes2 = this.addShape(this.zrVal, zrender.shape.RectangleShape, {
      style: {
        width : 132,
        textColor:'#4A4A4A',
        color:'#fff',
        height : 24,
        textFont:'normal 14px verdana',
        background: '#fff',
        textPosition:'inside',
        radius: [0,0,2,2],
        x: xPosition,
        y: this.calc(34),
        text: datas[0].values[this.selectedIndex].mealPeroidName,
      }
    })



    this._valStar = valStar
    this._valShowValuesShape = shapes
    this._valShowValuesShape2 = shapes2

    this._valShowValueLine = shapesLine

  }
  render() {
    const {scroll, className, noDataTip} = this.props
    const {showNoDataTip} = this.state

    // const zrVal = scroll ? (
    //   <ScrollView
    //     ref="scrollView"
    //     options={{
    //       direction: 'horizontal',
    //       freeModeMomentum: false,
    //       // freeModeMomentumRatio: 0.5,
    //       freeModeMomentumBounceRatio: 0.5,
    //       resistanceRatio: 0.5,
    //     }}
    //     scrollbar={false}
    //   >
    //     <div style={zrStyle} ref="zrenderValues"></div>
    //   </ScrollView>
    // ) : (
    //   <div style={zrStyle} ref="zrenderValues"></div>
    // )

    return (
      <div className={className} ref="zrenderBox" style={{...zrStyle, position: 'relative'}}>
        <div style={zrStyle} ref="zrender"></div>
        <div ref="zrenderValuesBox" style={zrValBoxStyle}>
          <div style={zrStyle} ref="zrenderValues"></div>
        </div>
        <div style={{...noDataStyle, display: showNoDataTip ? 'block' : 'none'}}>
          {noDataTip}
        </div>
      </div>
    )
  }
}
