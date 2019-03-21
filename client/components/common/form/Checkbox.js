import React,{Component,PropTypes} from 'react'
export default class Checkbox extends Component{
    static PropTypes = {
        checkBoxList:PropTypes.array
    }
    render(){
        require('weui/src/style/widget/weui_cell/weui_check.less')
        require('weui/src/style/widget/weui_cell/weui_form.less')
        require('weui/src/style/icon/weui_icon_font.less')

        const {checkBoxList} = this.props
        var list = checkBoxList.map(function(n,index){
            return (<label key={index} className="weui_cell weui_check_label" htmlFor={index}>
                <div className="weui_cell_hd">
                    <input type="checkbox" className="weui_check" name="checkbox1" id={index} />
                        <i className="weui_icon_checked"> </i>
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <p>{n}</p>
                </div>
            </label>)
        });
        return (
            <div className="weui_cells weui_cells_checkbox">
                {list}
            </div>
        )
    }
}