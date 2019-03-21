import React, {Component, PropTypes} from 'react'


export default class BsTableTop extends Component {

  render() {

    return (
      <div className="trend_top">
        <div className="trend_chart">
          <div className="m-bs-table-color-tips">
            <div className="m-bs-color-item">
              <div className="m-bs-color-txt">
                <div className="m-bs-color-ico m-bs-color-red"></div>
                偏高
              </div>
            </div>
            <div className="m-bs-color-item">
              <div className="m-bs-color-txt">
                <div className="m-bs-color-ico m-bs-color-green"></div>
                正常
              </div>
            </div>
            <div className="m-bs-color-item">
              <div className="m-bs-color-txt">
                <div className="m-bs-color-ico m-bs-color-orange"></div>
                偏低
              </div>
            </div>
            <div className="m-bs-color-item">
              <div className="m-bs-color-txt">
                <div className="m-bs-color-ico m-bs-color-blue"></div>
                备注
              </div>
            </div>
          </div>
          <div className="m-bs-table-top">
            <table cellPadding="0" cellSpacing="0" width={`100%`}>
              <tbody>
                <tr>
                  <th rowSpan="2">日期</th>
                  <td colSpan="2">早餐</td>
                  <td colSpan="2">午餐</td>
                  <td colSpan="2">晚餐</td>
                  <th rowSpan="2">睡前</th>
                </tr>
                <tr>
                  <td>空腹</td>
                  <td>后</td>
                  <td>前</td>
                  <td>后</td>
                  <td>前</td>
                  <td>后</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>
    )
  }
}
