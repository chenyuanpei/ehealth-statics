import React, {Component} from 'react'
import {connect} from 'react-redux'
import Link from 'react-router/lib/Link'
import tests from '../../test'
import {routingSelector} from '../../selectors/routing'

class TestPage extends Component {

  renderTest(testName) {
    const curTest = tests.find((test) => test && test.name === testName)

    if (!curTest) {
      return this.renderList()
    }

    return curTest.component
  }

  renderList() {
    return (
      <ul>
        {tests.map(test => (
          <li key={test.name}>
            <Link to={`/test/${test.name}`}>{test.name}</Link>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {routing} = this.props
    let testName = routing.get('pathname')

    const prefix = 'test/'
    testName = testName.substr(testName.indexOf(prefix) + prefix.length)

    if (!testName) {
      return this.renderList()
    }

    return this.renderTest(testName)
  }
}

export default connect(
  state => ({
    routing: routingSelector(state)
  })
)(TestPage)
