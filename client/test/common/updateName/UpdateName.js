import React, {Component, PropTypes} from 'react'
import UpdateName from '../../../components/common/updateName/UpdateName'

const latestData = {
  familyImg: 'static/images/icon_user_no.png',
  name: '其中的爸爸',
  updateImg: 'static/images/btn_edit.png'
}

export default {
  name: 'UpdateName',
  component: (
    <div>
      <UpdateName lastData={latestData}>
      </UpdateName >
    </div>
  )
}
