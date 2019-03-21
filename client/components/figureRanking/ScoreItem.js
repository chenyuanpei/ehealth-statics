import React, {Component, PropTypes} from 'react'
export default class ScoreItem extends Component {
  static propTypes = {

  }
  static defaultProps = {
    bodyScore:0,
    vote:0,
    month:1,
    day:1,
  }
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }

  componentWillUnmount() {
  }


  render() {
    const {click,bodyScore,vote,month,day} = this.props
    require('../../styles/figureRanking/scoreItem.less')

    return (
      <div>
        <div className="score-item" onClick={click}>
          <div className="date">{month}月{day}日</div>
          <span className="score">{bodyScore}分</span>
          <img className="heart-img" src={require('../../../static/images/figureRanking/heart_white.png')} />
          <span className="heart-num">{vote}</span>
        </div>
      </div>
    )
  }
}
