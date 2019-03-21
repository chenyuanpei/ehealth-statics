import React,{Component,PropTypes} from 'react'

import SlideDelete from '../../components/attention/SlideDelete'
import ScrollView from '../../components/common/scroll/ScrollView'

class SlideDeleteTest extends Component {

    close() {
        for (var i = 0; i < 20; i++) {
            this.refs[`SlideDelete${i}`].close()
        }
    }

    render() {

        const list = []
        for (var i = 0; i < 50; i++) {
            ((i)=> {
                list.push(
                    <SlideDelete  key={i} onDelete={()=>alert(`SlideDelete${i}`)}>
                        <h1>{`Hello World ${i}`}</h1>
                    </SlideDelete>
                )
            })(i)
        }

        return (
            <ScrollView>
                <div ref="view">
                    {list}
                </div>
            </ScrollView>
        )
    }
}


export default {
    name: 'SlideDelete',
    component: (
        <SlideDeleteTest/>
    )
}