import React, {Component, PropTypes} from 'react'

const shape = {}
if (process.browser) {
  shape.CircleShape = require('zrender/shape/Circle')
  shape.SectorShape = require('zrender/shape/Sector')
  shape.RingShape = require('zrender/shape/Ring')
  shape.EllipseShape = require('zrender/shape/Ellipse')
  shape.HeartShape = require('zrender/shape/Heart')
  shape.DropletShape = require('zrender/shape/Droplet')
  shape.PolygonShape = require('zrender/shape/Polygon')
  shape.RectangleShape = require('zrender/shape/Rectangle')
  shape.PolylineShape = require('zrender/shape/Polyline')
  shape.LineShape = require('zrender/shape/Line')
  shape.BezierCurveShape = require('zrender/shape/BezierCurve')
  shape.TextShape = require('zrender/shape/Text')
  shape.ImageShape = require('zrender/shape/Image')
  shape.PathShape = require('zrender/shape/Path')
  shape.TrochoidShape = require('zrender/shape/Trochoid')
  shape.RoseShape = require('zrender/shape/Rose')
  shape.StarShape = require('zrender/shape/Star')
  shape.IsogonShape = require('zrender/shape/Isogon')
}

export default class Zrender extends Component {

  componentDidMount() {
    const {zrender: el} = this.refs
    const zrender = require('zrender')
    this.zr = zrender.init(el)

    this.zrRender()
  }

  zrRender() {
    const zr = this.zr

    zr.clear()
    var color = require('zrender/tool/color')
    var colorIdx = 0
    var width = Math.ceil(zr.getWidth())
    var height = Math.ceil(zr.getHeight())

// 圆形
    zr.addShape(new shape.CircleShape({
      style: {
        x: 100,
        y: 100,
        r: 50,
        brushType: 'both',
        color: 'rgba(220, 20, 60, 0.8)',          // rgba supported
        strokeColor: color.getColor(colorIdx++),  // getColor from default palette
        lineWidth: 5,
        text: 'circle',
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true,   // default false
      clickable: true,   // default false

      // 可自带任何有效自定义属性
      _name: 'Hello~',
      onclick: function (params) {
        // alert(params.target._name)
      },

      // 响应事件并动态修改图形元素
      onmousewheel: function (params) {
        var eventTool = require('zrender/tool/event')
        var delta = eventTool.getDelta(params.event)
        var r = params.target.style.r
        r += (delta > 0 ? 1 : -1) * 10
        if (r < 10) {
          r = 10
        }
        zr.modShape(params.target.id, {style: {r: r}})
        zr.refresh()
        eventTool.stop(params.event)
      }
      /* 封装支持事件，见shape/base, config.EVENT
       onmousemove : function(e){console.log('onmousemove',e)},
       onmouseover : function(e){console.log('onmouseover',e)},
       onmouseout  : function(e){console.log('onmouseout',e)},
       onmousedown : function(e){console.log('onmousedown',e)},
       onmouseup   : function(e){console.log('onmouseup',e)},
       ondragstart : function(e){console.log('ondragstart',e)},
       ondragend   : function(e){console.log('ondragend',e)},
       ondragenter : function(e){console.log('ondragenter',e)},
       ondragover  : function(e){console.log('ondragover',e)},
       ondragleave : function(e){console.log('ondragleave',e)},
       ondrop      : function(e){console.log('ondrop',e)}
       */
    }))

// 扇形
    zr.addShape(new shape.SectorShape({
      style: {
        x: width - 250,
        y: 150,
        r: 100,
        // r0 : 50,
        startAngle: 30,
        endAngle: 90,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 8,
        lineJoin: 'round',
        text: 'sector'
      },
      draggable: true
    }))

// 圆环
    zr.addShape(new shape.RingShape({
      style: {
        x: width / 2,
        y: height / 2,
        r: 100,
        r0: 50,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 3,
        text: 'ring'
      },
      draggable: true
    }))

// 椭圆
    zr.addShape(new shape.EllipseShape({
      style: {
        x: 350,
        y: 100,
        a: 70,
        b: 30,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 8,
        text: 'ellipse',
        textPosition: 'inside'
      },
      draggable: true
    }))

// 心形
    zr.addShape(new shape.HeartShape({
      style: {
        x: width - 350,
        y: 100,
        a: 50,
        b: 70,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 8,
        text: 'heart',
        textPosition: 'inside'
      },
      draggable: true
    }))

// 水滴
    zr.addShape(new shape.DropletShape({
      style: {
        x: 380,
        y: 300,
        a: 50,
        b: 70,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 8,
        text: 'droplet',
        textPosition: 'inside'
      },
      draggable: true
    }))

// 多边形
    zr.addShape(new shape.PolygonShape({
      style: {
        pointList: [[310, 120], [360, 120], [348, 230], [250, 340], [146, 200]],
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 10,
        text: 'polygon',
        textPosition: 'inside'     // default top
      },
      draggable: true
    }))

// 矩形
    zr.addShape(new shape.RectangleShape({
      style: {
        x: width - 350,
        y: 210,
        width: 300,
        height: 100,
        radius: [20, 50],
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 15,
        lineJoin: 'round',
        text: 'rectangle'
      },
      draggable: true
    }))

// 折线
    zr.addShape(new shape.PolylineShape({
      style: {
        pointList: [[10, 10], [60, 100], [148, 130], [250, 40], [446, 100]],
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 3,
        text: 'polyline'
      },
      draggable: true
    }))

// 直线
    zr.addShape(new shape.LineShape({
      style: {
        xStart: 0,
        yStart: 0,
        xEnd: width,
        yEnd: height,
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 2,
        lineType: 'dashed',    // default solid
        text: 'line'
      },
      draggable: true
    }))

// 贝塞尔曲线
    zr.addShape(new shape.BezierCurveShape({
      style: {
        xStart: width,
        yStart: 0,
        cpX1: width / 2,
        cpY1: 0,
        cpX2: width / 2,
        cpY2: height,
        xEnd: 0,
        yEnd: height,
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 2,
        text: 'beziercurve'
      },
      draggable: true
    }))

// 文本
    zr.addShape(new shape.TextShape({
      style: {
        x: width / 2,
        y: 10,
        brushType: 'fill',
        color: color.getColor(colorIdx++),
        shadowColor: 'yellow',
        shadowBlur: 10,
        lineWidth: 3,
        text: 'zrender',
        textFont: 'normal 50px verdana',
        textAlign: 'center',
        textBaseline: 'top'
      },
      draggable: true
    }))

// 图片
    zr.addShape(new shape.ImageShape({
      style: {
        x: 0,
        y: 0,
        image: "../asset/ico/favicon.png",
        width: 20,
        height: 20
      },
      draggable: true
    }))

// 路径
    zr.addShape(new shape.PathShape({
      style: {
        // path : 'M 0 0 L 0 100 L 100 100 Z',
        path: 'M66,10, L23,127, L122,50, L10,49, L109,127 z',
        x: 20,
        y: 200,
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),
        lineWidth: 10,
        text: 'path',
        textPosition: 'bottom'
      },
      draggable: true
    }))

// 内旋轮线
    zr.addShape(new shape.TrochoidShape({
      style: {
        x: 200,
        y: 100,
        r: 50,
        r0: 35,
        d: 50,
        strokeColor: color.getColor(colorIdx++),   // getColor from default palette
        lineWidth: 2,
        text: '内旋轮曲线',
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true
    }))

// 外旋轮曲线
    zr.addShape(new shape.TrochoidShape({
      style: {
        x: 450,
        y: 200,
        r: 50,
        r0: 35,
        d: 30,
        location: 'out',
        strokeColor: color.getColor(colorIdx++),   // getColor from default palette
        lineWidth: 2,
        text: '外旋轮曲线',
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true
    }))

    // 玫瑰线
    zr.addShape(new shape.RoseShape({
      style: {
        x: 300,
        y: 100,
        r: [35],
        k: 7,
        n: 4,
        strokeColor: color.getColor(colorIdx++),   // getColor from default palette
        lineWidth: 2,
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true
    }))

    // n角星
    zr.addShape(new shape.StarShape({
      style: {
        x: width / 2 + 100,
        y: 320,
        r: 70,
        // r0: 27,
        n: 7,
        lineJoin: 'round',
        brushType: 'both',
        color: color.getColor(colorIdx++),
        strokeColor: color.getColor(colorIdx++),   // getColor from default palette
        lineWidth: 10,
        text: 'n角星',
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true
    }))

// 正n边形
    zr.addShape(new shape.IsogonShape({
      style: {
        x: 300,
        y: 320,
        r: 70,
        n: 9,
        brushType: 'both',
        color: color.getColor(colorIdx++),          // rgba supported
        strokeColor: color.getColor(colorIdx++),   // getColor from default palette
        lineWidth: 9,
        text: '正n边形',
        textPosition: 'inside'
      },
      hoverable: true,   // default true
      draggable: true
    }))

    // 绘画
    zr.render()
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} {...{...this.props, ref: 'zrender'}} >
      </div>
    )
  }
}
