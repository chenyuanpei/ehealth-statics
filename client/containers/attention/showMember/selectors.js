import {createStructuredSelector} from 'reselect'

// account
const accountSelector = (state, props) => props.location.query.account

// name
const nameSelector = (state, props) => props.location.query.name

// qrcode
const qrcodeSelector = (state, props) => props.location.query.qrcode

export default createStructuredSelector(
  {
    account: accountSelector,
    name: nameSelector,
    qrcode: qrcodeSelector,
  }
)
