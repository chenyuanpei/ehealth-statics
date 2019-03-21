import React,{Component,PropTypes} from 'react'


const containerStyleLeft = {
    width: '35%',
    height: '42px',
    float: 'left',
    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '42px'
}

const containerStyleRight ={
    width: '65%',
    height: '100%',
    float: 'left',
    textAlign: 'center',
    fontSize: 'xx-small'
}

const containerStyleUp = {
    width: '33%',
    height: '100%',
    float: 'left',
    textAlign: 'center',
    fontSize: '24px'
}

const containerStyleDown = {
    width: '33%',
    height: '100%',
    float: 'left',
    textAlign: 'center',
    fontSize: 'xx-small'
}

const containerStyle = {
    height: '42px'
}

export default class LatestRecord extends Component {

    render() {

        const {lastData} = this.props

        return (
            <div style={containerStyle}>
                <div style={containerStyleLeft}>
                    正常
                </div>
                <div style={containerStyleRight}>
                    <div>
                        <div style={containerStyleUp}>{lastData.sp}</div>
                        <div style={containerStyleUp}>{lastData.dp}</div>
                        <div style={containerStyleUp}>{lastData.hr}</div>
                    </div>
                    <div>
                        <div style={containerStyleDown}>高压mmHg</div>
                        <div style={containerStyleDown}>低压mmHg</div>
                        <div style={containerStyleDown}>次/分</div>
                    </div>
                </div>
            </div>

        )
    }
}

LatestRecord.propTypes = {
    lastData: PropTypes.object,
}