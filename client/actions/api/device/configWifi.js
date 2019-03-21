import {createAction} from 'redux-actions'

export const CONFIG_WIFI_REQUEST = 'CONFIG_WIFI_REQUEST'
export const CONFIG_WIFI_SUCCESS = 'CONFIG_WIFI_SUCCESS'
export const CONFIG_WIFI_FAILURE = 'CONFIG_WIFI_FAILURE'

const configWifiRequest = createAction(
  CONFIG_WIFI_REQUEST,
  (deviceId) => ({
    request: {
      url: 'device_api/send_wifi_right_notice',
      data: {
        deviceId
      }
    }
  })
)

export function configWifi(deviceId) {
  return (dispatch) => dispatch(configWifiRequest(deviceId))
}
