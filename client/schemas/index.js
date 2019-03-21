import {Schema, arrayOf} from 'normalizr'

// account
export const ACCOUNT = new Schema('account', {idAttribute: 'id'})
export const ACCOUNT_ARRAY = arrayOf(ACCOUNT)

// chengyisheng
export const CHENGYISHENG = new Schema('chengyisheng', {idAttribute: 'url'})
export const CHENGYISHENG_ARRAY = arrayOf(CHENGYISHENG)

// accountMerge
export const ACCOUNTMERGE = new Schema('accountMerge', {idAttribute: 'status'})
export const ACCOUNTMERGE_ARRAY = arrayOf(ACCOUNTMERGE)

// doctor
export const DOCTOR = new Schema('doctor', {idAttribute: 'id'})
export const DOCTOR_ARRAY = arrayOf(DOCTOR)

// assistant
export const ASSISTANT = new Schema('assistant', {idAttribute: 'id'})
export const ASSISTANT_ARRAY = arrayOf(ASSISTANT)

// member
export const MEMBER = new Schema('member', {idAttribute: 'id'})
// MEMBER.define({
//   doctors: arrayOf(DOCTOR)
// })
export const MEMBER_ARRAY = arrayOf(MEMBER)

// device
export const DEVICE = new Schema('device', {idAttribute: 'deviceId'})
export const DEVICE_ARRAY = arrayOf(DEVICE)

export const NEWBIETASK = new Schema('newbietask', {idAttribute: 'id'})
export const NEWBIETASK_ARRAY = arrayOf(NEWBIETASK)

