/* eslint-disable */
/**
 * @author: zimyuan
 * @last-edit-date: 2016-01-15
 */

var _util = require('./util');

var doc = document,
  win = window,
  startMoveY = {},
  _defaultConfig = {
    el: null,
    cClass: 'prevent_over_scroll_container',
    styleId: 'prevent_over_scroll_style',
    styleStr: '{overflow-y: scroll; -webkit-overflow-scrolling: touch;}'
  };

function PreventOverScroll(options) {
  this.config = _util.extend(_defaultConfig, options || {});

  this.init();
}

PreventOverScroll.prototype = {
  constructor: PreventOverScroll,

  init: function () {

    this._initStyle();
    this._bindEvent(this.config.el);

  },

  // append class name for HTMLElements
  _initStyle: function () {
    var
      el = this.config.el,
      that = this;

    if (!_util.checkDeviceType('ios'))
      return;

    if (!el)
      throw '';

    el.className += that.config.cClass;

    this._appendStyle();
  },

  // append new stylesheet to `head` tag
  _appendStyle: function () {
    if (document.getElementById(this.config.styleId))
      return;
    var style = doc.createElement('style'),
      styleStr = '.' + this.config.cClass + this.config.styleStr;

    style.id = this.config.styleId;
    style.innerHTML = styleStr;

    doc.getElementsByTagName('head')[0].appendChild(style);
  }
  ,

  _startMove: function (e) {
    var e = e || win.event;

    startMoveY = e.touches[0].clientY;
  }
  ,

// 防止过分拉动
  _preventMove: function (e) {
    // 高位表示向上滚动, 底位表示向下滚动: 1容许 0禁止
    var status = '11',
      e = e || window.event,
      ele = this,
      currentY = e.touches[0].clientY,
      startY = startMoveY,
      scrollTop = ele.scrollTop,
      offsetHeight = ele.offsetHeight,
      scrollHeight = ele.scrollHeight;

    if (scrollTop === 0)
    // 如果内容小于容器则同时禁止上下滚动
      status = (  offsetHeight >= scrollHeight
        ? '00'
        : '01'  );

    else if (scrollTop + offsetHeight >= scrollHeight)
    // 已经滚到底部了只能向上滚动
      status = '10';

    if (status != '11') {
      // 判断当前的滚动方向
      var direction = (  currentY - startY > 0
        ? '10'
        : '01'  );

      // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
      if (!( parseInt(status, 2) & parseInt(direction, 2) )) {
        e.preventDefault();
        //e.stopPropagation();
        return;
      }
    }
  }
  ,

// 绑定事件处理程序
  _bindEvent: function (elem) {
    var elem, that = this,
      error;

    if (!elem) {
      error = 'elem ' + elem + 'is not exist!';
      throw error;
    }

    _util.addEvent(elem, 'touchstart', that._startMove);
    _util.addEvent(elem, 'touchmove', that._preventMove);
  }

}

export default PreventOverScroll
