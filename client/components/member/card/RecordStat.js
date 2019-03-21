import React,{Component,PropTypes} from 'react'
import {RowFlex,Col} from '../../frozenui/grid'

const containerStyle = {
    height: '100%',
    width: '100%',
}

export default class RecordStat extends Component {

    render() {

        const {name,headimgurl} = this.props

        return (
            <div style={containerStyle}>
                <RowFlex  className="ui-whitespace">
                    <Col>
                        One Third
                    </Col>
                    <Col>
                        One Third
                    </Col>
                    <Col>
                        One Third
                    </Col>
                </RowFlex>
            </div>
        )

    }

}

RecordStat.propTypes = {}
