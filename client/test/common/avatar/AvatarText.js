import React, {Component, PropTypes} from 'react'
import AvatarText from '../../../components/common/Avatar/AvatarText'

const defaultStyle = {
  width: '100px',
}

export default {
  name: 'AvatarText',
  component: (
    <AvatarText styles={defaultStyle} src="http://dev.lhealthcenter.com/userfiles/static/picture/lifesensedoctor.jpg"
                name="大伯"/>
  )
}
