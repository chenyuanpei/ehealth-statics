import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Select from '../../components/common/dialog/select'
import {areaJson} from '../../const/area'
import {add} from '../../util/common'
export default class AreaChoice extends Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    confirm: PropTypes.func,
    getValues: PropTypes.func,
  }

  state = {
    show: this.props.show
  }

  componentWillReceiveProps(nextProps) {
    const {show} = this.props
    const {show: nextShow} = nextProps

    if (show !== nextShow) {
      this.setState({
        show: nextShow
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {show} = this.state
    const {show: nextShow} = nextState
    if (show !== nextShow) {
      return true
    }
    return false
  }

  render() {
    const {show} = this.state
    let thisGen = JSON.stringify(this._genOpts())
    console.log(thisGen)
    return (
      <Select show={show} ref="select" {...this._genOpts()} />
    )
  }

  // 生成配置
  _genOpts() {
    const {onConfirm, onCancel, value, getValues} = this.props
    return ({
      confirm: () => {
        onConfirm && onConfirm(this.refs.select.getValue())
      },
      onCancel: () => {
        onCancel && onCancel()
      },
      title: '所在地区',
      data: [
        {

          genValues: ([v]) => {
            this.provinceList = this._genProvinceValues()
            return this.provinceList.map(({id}) => id)
          },
          format: (v) => {
            if (!this.provinceList)return ''

            const province = this.provinceList.find(({id}) => id === v)
            if (!province)return ''

            return province.name
          }
        }, {
          genValues: ([v]) => {
            const values = []
            if(v){
              for (let i = 0; i < areaJson.length; i++) {
                if(areaJson[i].parentid == v){
                  values.push(areaJson[i])
                }

              }
            }
            this.cityList = values

            return this.cityList.map(({id}) => id)
          },
          format: (v) => {
            if (!this.cityList)return ''

            const city = this.cityList.find(({id}) => id === v)
            if (!city)return ''

            return city.name
          }
        }, {
          genValues: ([province,city]) => {
            const values = []
            if(city){
              for (let i = 0; i < areaJson.length; i++) {
                if(areaJson[i].parentid == city){
                  values.push(areaJson[i])
                }

              }
            }
            this.areaList = values
            return this.areaList.map(({id}) => id)
          },
          format: (v) => {
            if (!this.areaList)return ''

            const area = this.areaList.find(({id}) => id === v)
            if (!area)return ''

            return area.name
          }
        }
      ],
      value: ['5','75','695'],
      parseValue: (v) => {
        console.log('paseValue', v)
        return v
      },
      valueFormat: (arr) => {
        const province = this.provinceList.find(({id}) => id === arr[0])
        const city = this.cityList.find(({id}) => id === arr[1])
        const area = this.areaList ? this.areaList.find(({id}) => id === arr[2]) : ''

        if(!city) return ''
        if(!area) return [{
          id:arr[0],
          name:province.name
        },{
          id:arr[1],
          name:city.name
        }]
        return [{
          id:arr[0],
          name:province.name
          },{
          id:arr[1],
            name:city.name
        },{
          id:arr[2],
          name:area.name
        }]
      },
    })
  }

  // 生成省份
  _genProvinceValues() {
    const arr = []
    for (let i = 0; i < areaJson.length; i ++) {
      if(areaJson[i].depth == '1' ){
        arr.push(areaJson[i])
      }
    }
    return arr
  }
  // 生成Values
  _genValues(min, max, step) {
    const arr = []
    for (let i = min; i <= max; i = add(i, step)) {
      arr.push(i)
    }
    return arr
  }
}
