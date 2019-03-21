// 获取当前帐号
export const GET_ACCOUNT_REQUEST = Symbol('GET_ACCOUNT_REQUEST')
export const GET_ACCOUNT_SUCCESS = Symbol('GET_ACCOUNT_SUCCESS')
export const GET_ACCOUNT_FAILURE = Symbol('GET_ACCOUNT_FAILURE')

// 修改用户头像
export const UPDATE_ACCOUNT_HEADIMG_REQUEST = Symbol('UPDATE_ACCOUNT_HEADIMG_REQUEST')
export const UPDATE_ACCOUNT_HEADIMG_SUCCESS = Symbol('UPDATE_ACCOUNT_HEADIMG_SUCCESS')
export const UPDATE_ACCOUNT_HEADIMG_FAILURE = Symbol('UPDATE_ACCOUNT_HEADIMG_FAILURE')

// 修改用户昵称
export const UPDATE_ACCOUNT_NICKNAME_REQUEST = Symbol('UPDATE_ACCOUNT_NICKNAME_REQUEST')
export const UPDATE_ACCOUNT_NICKNAME_SUCCESS = Symbol('UPDATE_ACCOUNT_NICKNAME_SUCCESS')
export const UPDATE_ACCOUNT_NICKNAME_FAILURE = Symbol('UPDATE_ACCOUNT_NICKNAME_FAILURE')

// 修改手机号码
export const UPDATE_ACCOUNT_MOBILE_REQUEST = Symbol('UPDATE_ACCOUNT_MOBILE_REQUEST')
export const UPDATE_ACCOUNT_MOBILE_SUCCESS = Symbol('UPDATE_ACCOUNT_MOBILE_SUCCESS')
export const UPDATE_ACCOUNT_MOBILE_FAILURE = Symbol('UPDATE_ACCOUNT_MOBILE_FAILURE')