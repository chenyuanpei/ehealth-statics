import React, {Component, PropTypes} from 'react'
import AssistTab from '../../../components/healthRecord/AssistTab'
const imgSrcList = [
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg',
  'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=401693168,491945454&fm=116&gp=0.jpg',
]
export default {
  name: 'AssistTab',
  component: (
    <div>
      <AssistTab name="化验、辅助检查" items={imgSrcList}/>
    </div>
  )
}
