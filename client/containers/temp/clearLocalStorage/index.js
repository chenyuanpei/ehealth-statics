import React, {Component} from 'react'
// components
import Title from '../../../components/common/title/Title'

export default class extends Component {

  componentDidMount() {
    window.localStorage.clear()
  }

  render() {
    return (
      <div>
        <Title title='清楚缓存'></Title>
        <h1>缓存已清除</h1>
      </div>
    )
  }
}
