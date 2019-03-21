import React, {Component, PropTypes} from 'react'
import Row from '../../../components/frozenui/grid/Row'
import RowFlex from '../../../components/frozenui/grid/RowFlex'
import Col from '../../../components/frozenui/grid/Col'

const boxStyle = {
  width: '100%',
  height: 200,
  boxSizing: 'border-box',
  border: '1px solid #000',
}

const contentStyle = {
  background: '#777',
  textAlign: 'center',
  boxSizing: 'border-box',
  border: '1px solid #ddd',
}

class GridTest extends Component {

  render() {
    return (
      <div>
        <div style={boxStyle}>
          <Row>
            <Col val="50" style={contentStyle}>50</Col>
            <Col val="50" style={contentStyle}>50</Col>
            <Col val="25" style={contentStyle}>25</Col>
            <Col val="75" style={contentStyle}>75</Col>
          </Row>
        </div>
        <div style={boxStyle}>
          <RowFlex>
            <Col val="1" style={contentStyle}>1</Col>
            <Col style={contentStyle}>1</Col>
            <Col val="2" style={contentStyle}>2</Col>
          </RowFlex>
        </div>
      </div>
    )
  }
}

export default {
  name: 'frozenui/grid/Grid',
  component: (
    <GridTest></GridTest>
  )
}
