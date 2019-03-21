import React from 'react'

const routes = ({
  path: '/',
  childRoutes: [
    {
      path: '/',
      component: require('../containers/App').default,
      indexRoute: {
        // component: require('../containers/home/index').default
        getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/home/index').default))
      },
      childRoutes: [
        /* 主页 */
        {
          path: 'home',
          // component: require('../containers/home/index').default,
          getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/home/index').default)),
          childRoutes: [{
            path: ':id',
            // component: require('../containers/home/index').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/home/index').default)),
          }],
        },
        /* 测量数据 */
        {
          path: 'record',
          childRoutes: [{
            path: ':id',
            // component: require('../containers/records/RecordTabs').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/RecordTabs').default)),
            childRoutes: [{
              path: 'bp',
              childRoutes: [
                /* 历史记录 */
                {
                  path: 'history',
                  // component: require('../containers/records/bp/History').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bp/History').default)),
                },
                /* 趋势 */
                {
                  path: 'trend',
                  // component: require('../containers/records/bp/Trend').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bp/Trend').default)),
                },
                /* 血压详情页 */
                {
                  path: 'bpdetail/:recordId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bp/bpDetail').default)),
                },
                /* 血压增加页面 */
                {
                  path: 'bpadd',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bp/bpAdd').default)),
                }
              ],
            }, {
              path: 'bs',
              childRoutes: [
                /* 历史记录 */
                {
                  path: 'history',
                  // component: require('../containers/records/bp/History').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bs/History').default)),
                },
                /* 趋势 */
                {
                  path: 'trend',
                  // component: require('../containers/records/bp/Trend').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bs/Trend').default)),
                },
                /* 血糖详情页 */
                {
                  path: 'bsdetail/:recordId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bs/bsDetail').default)),
                },
                /* 血糖增加页面 */
                {
                  path: 'bsadd',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bs/bsAdd').default)),
                },
                /* 血糖当月表格 */
                {
                  path: 'bstable',
                  // component: require('../containers/records/bp/Trend').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/bs/bsTable').default)),
                }
              ],
            }, {
              path: 'temperature',
              childRoutes: [
                /* 图表 */
                {
                  path: 'chart',
                  // component: require('../containers/records/bp/History').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/temperature/chart').default)),
                },
                /* 温度详情页 */
                {
                  path: 'detail/:recordId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/temperature/detail').default)),
                },
                /* 血糖增加页面 */
                {
                  path: 'add',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/temperature/add').default)),
                }
              ],
            }, {
              path: 'list',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/records/list').default)),
            }],
          }],
        },
        // /* 个人中心 */
        {
          path: 'center',
          indexRoute: {
            // component: require('../containers/center/center').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/center').default))
          },
          childRoutes: [
            /* 修改账户 */
            {
              path: 'edit',
              // component: require('../containers/center/accountedit/index').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/accountedit/index').default))
            },
            /* 绑定手机 */
            {
              path: 'bindMobile',
              // component: require('../containers/center/bindMobile').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/bindMobile').default))
            },
            /* 乐众绑定手机 */
            {
              path: 'lzBindMobile',
              // component: require('../containers/center/lzBindMobile').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/lzBindMobile').default))
            },
            {
              /* 橙医生绑定手机 */
              path: 'chengyisheng/:urlId',
              // component: require('../containers/center/chengyisheng').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/chengyisheng').default))
            },
            /* 升级合并主账号 */
            {
              path: 'update',
              // component: require('../containers/center/bindMobile').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/update').default))
            },
            /* 设置主账号，选择账号 */
            {
              path: 'chooseaccount',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/center/chooseaccount').default))
            }
          ]
        },
        /* 我的成员 */
        {
          path: 'member',
          indexRoute: {
            // component: require('../containers/member/member').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/member/member').default)),
          },
          childRoutes: [
            {
              path: 'memberClaim/:id',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/member/memberClaim').default)),
              },
              //       childRoutes: [
              //         /* 健康档案 */
              //         {
              //           path: 'healthRecord',
              //           getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthRecord/HealthRecord').default)),
              //         },
              //         /* 辅助检查报告 */
              //         {
              //           path: 'assistCheck',
              //           getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthRecord/AssistCheck').default)),
              //         }
              //       ]
            },
            /* 设备二维码认领成员 */
            {
              path: 'patientClaim/:id',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/member/patientClaim').default)),
            },
            {
              path: ':id',
              indexRoute: {
                /* 修改或创建成员资料 */
                // component: require('../containers/member/memberData').default,
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/member/memberData').default)),
              },
              //       childRoutes: [
              //         /* 健康档案 */
              //         {
              //           path: 'healthRecord',
              //           getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthRecord/HealthRecord').default)),
              //         },
              //         /* 辅助检查报告 */
              //         {
              //           path: 'assistCheck',
              //           getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthRecord/AssistCheck').default)),
              //         }
              //       ]
            }
          ]
        },
        /* 我的设备 */
        {
          path: 'device',
          indexRoute: {
            // component: require('../containers/device/devicelist/index').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/devicelist/index').default)),
          },
          childRoutes: [

            /* 固件升级设备里的链接 */
            {
              path: 'upgrade/:id/:softwareVersion/:hardwareVersion/:deviceId',
              // component: require('../containers/device/upgrade').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/upgrade').default)),
            },
            /* 固件推送消息链接 */
            {
              path: 'upgrade/:id',
              // component: require('../containers/device/upgrade').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/upgrade').default)),
            },
            /* 固件升级状态页面 */
            {
              path: 'upgradeStatus/:id',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/upgradeStatus/index.js').default)),
                // getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/deviceinfo').default)),
              },
              childRoutes: [{
                path: ':softwareVersion/:hardwareVersion/:deviceId',
                // component: require('../containers/device/upgrade').default,
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/upgradeStatus/index.js').default)),
              }]
            },
            // 乐心血压计i5/i5S(Wi-Fi版)升级公告
            {
              path: 'i5ota',
              // component: require('../containers/device/voiceHistory/index.js').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/i5ota/index.js').default)),
            },
            {
              path: ':deviceId',
              indexRoute: {
                /* 设备信息 */
                component: require('../containers/device/deviceinfo').default,
                // getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/deviceinfo').default)),
              },
              childRoutes: [
                /* 切换体重秤的单位链接 */
                {
                  path: 'deviceUnit',
                  // component: require('../containers/device/upgrade').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/deviceUnit').default)),
                },
                //  /* 绑定成员 */
                {
                  path: 'bindRoles',
                  // component: require('../containers/device/bindroles/index').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/bindroles/index').default)),
                },
                /* 配置wifi */
                {
                  path: 'configWifi',
                  // component: require('../containers/device/specWifi').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/specWifi').default)),
                },
                /* 配置失败 */
                {
                  path: 'specFail',
                  // component: require('../containers/others/specFail').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/specFail').default)),
                },
                /* 设置一键呼叫联系人 */
                {
                  path: 'linkmans',
                  indexRoute: {
                    // component: require('../containers/others/specFail').default,
                    getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/linkmans').default)),
                  },
                  childRoutes: [
                    /* 联系人详情 */
                    {
                      path: ':linkmanId',
                      // component: require('../containers/device/linkmansdetail').default,
                      getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/linkmansdetail').default)),
                    }
                  ]
                },
                //  /* 配置失败 */
                {
                  path: 'timeMeasureRemind',
                  // component: require('../containers/others/measureremind/index.js').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/measureremind/index.js').default)),
                },
                // 省电模式
                {
                  path: 'powerMode',
                  // component: require('../containers/device/powerMode/index.js').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/powerMode/index.js').default)),
                },
                // 省电模式时间段
                {
                  path: 'powerModeTime',
                  // component: require('../containers/device/powerMode/time.js').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/powerMode/time.js').default)),
                },
                // 语音历史
                {
                  path: 'voiceHistory',
                  // component: require('../containers/device/voiceHistory/index.js').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/device/voiceHistory/index.js').default)),
                },

              ]
            }
          ]
        },
        // /* 邀请关注 */
        {
          path: 'attention',
          childRoutes: [{
            path: ':id',
            childRoutes: [
              /* 邀请关注 */
              {
                path: 'attentionAccount',
                // component: require('../containers/attention/attentionAccount').default,
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/attention/attentionAccount').default)),
              },
              // /* 接收关注 */
              {
                path: 'attentioningMember',
                indexRoute: {
                  // component: require('../containers/attention/attentioningMember').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/attention/attentioningMember').default)),
                }
              },
            ]
          }]
        },
        // /* 机构 */
        {
          path: 'organization',
          childRoutes: [
            /* 解绑成功页面 */
            {
              path: 'deviceStatus',

              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/deviceStatus').default)),
            },
            /* 乐心健康介绍页面 */
            {
              path: 'lifesenseinfo',

              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/lifesenseInfo').default)),
            },
            // 完善信息
            {
              path: 'memberinfo/:deviceId',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/memberInfo/index.js').default)),
            },
            {
              path: ':id',
              childRoutes: [

                /* 机构信息 */
                {
                  path: 'organizationInfo',

                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/organizationInfo').default)),
                },
                /* 推荐医生 */
                {
                  path: 'doctor',

                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/doctor').default)),
                },
                // 公共设备
                {
                  path: 'publicDevice/:memberId/:deviceId/:dataId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/organization/publicDevice/index.js').default)),
                },

              ]
            }]
        },
        /* 医生 */
        {
          path: 'doctor',
          childRoutes: [
            /* 医生列表 */
            {
              path: 'doctorList',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/doctorList').default)),
            },
            /* 医生申请成功页面 */
            {
              path: 'relationsuccess',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/relationSuccess').default)),
            },
            /* 名医服务页面 */
            {
              path: 'famousDoctor',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/famousDoctor').default)),
            },
            /* 院前管理协议页面 */
            {
              path: 'agreement',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/agreement').default)),
            },
            {
              path: ':doctorId',
              childRoutes: [
                /* 患者管理 */
                {
                  path: 'patientManage',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/patientManage').default)),
                },
                /* 关联医生 */
                {
                  path: 'relation/:memberId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/relation').default)),
                },
                /* 对话 */
                {
                  path: 'chat/:memberId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctor/chat').default)),
                },

              ]
            }]
        },
        /* 医生 */
        {
          path: 'doctorTeam',
          childRoutes: [
            /* 术前管理结束服务 */
            {
              path: 'endService',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/endService').default)),
            },
            /* 术前管理购买页面 */
            {
              path: 'buy',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/buy').default)),
            },
            /* 院前管理购买页面 */
            {
              path: 'preServiceBuy',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/preServiceBuy').default)),
            },
            /* 工作室 */
            {
              path: 'studio',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/studio').default)),
            },
            /* 患者管理 */
            {
              path: 'service',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/service').default)),
            },
            /* 协议 */
            {
              path: 'agreement',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/agreement').default)),
            },
            /* info */
            {
              path: 'info',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/doctorTeam/info').default)),
            }

          ]
        },
        /* 健康周报 */
        {
          path: 'healthReport',
          childRoutes: [
            /* 列表 */
            {
              path: 'list',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthReport/weekly/list').default)),
            },
            {
              path: ':memberId',
              childRoutes: [
                /* 详情 */
                {
                  path: 'detail/:reportId',
                  // component: require('../containers/healthReport/weekly/detail').default,
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthReport/weekly/detail').default)),
                }
              ]
            }]
        },
        /* 健康资讯 */
        {
          path: 'information',
          indexRoute: {
            // component: require('../containers/member/member').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/information').default)),
          },
          childRoutes: [
            {
              path: ':id',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/information/info').default)),
            }]
        },
        /* 健康服务页面 */
        {
          path: 'healthService',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/healthService').default)),
          }
        },
        /* 常见问题 */
        {
          path: 'FAQ',
          indexRoute: {
            // component: require('../containers/member/member').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/FAQ/index.js').default)),
          },
          childRoutes: [
            {
              path: ':id',
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/FAQ/info').default)),
            }]
        },
        /* 其他 */
        {
          path: 'others',
          childRoutes: [
            /* 认领数据 */
            {
              path: 'claimData/:dataId',
              // component: require('../containers/others/claimData').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/claimData').default)),
            },
            /* 找回设备 */
            {
              path: 'backDevice/:deviceId',
              // component: require('../containers/others/backDevice').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/backDevice').default)),
            },
            {
              path: 'iframe',
              // component: require('../containers/Iframe').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/Iframe').default)),
            },
            /* 血压计流量续费失败 */
            {
              path: 'payErro',
              // component: require('../containers/others/payErro').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/payErro').default)),
            },
          ]
        },
        /* 临时 */
        {
          path: 'temp',
          childRoutes: [
            /* 录入数据 */
            {
              path: 'inputBpRecord',
              // component: require('../containers/temp/inputBpRecord').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/temp/inputBpRecord').default)),
            },
            /* 清楚缓存 */
            {
              path: 'clearLocalStorage',
              // component: require('../containers/temp/clearLocalStorage').default,
              getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/temp/clearLocalStorage').default)),
            },
          ]
        },
        // /* 新手任务 */
        {
          path: 'newbieTask',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/newbieTask/newbieTask').default)),
          },
          childRoutes: [
            {
              path: 'invitation',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/newbieTask/invitation').default)),
              },
            }
          ]
        },
        // /* 力美健身材排行榜 */
        {
          path: 'figureRanking',
          //indexRoute: {
          //  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/newbieTask/newbieTask').default)),
          //},
          childRoutes: [
            {
              path: 'rankingList',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/figureRanking/rankingList').default)),
              },
              childRoutes: [
                {
                  path: ':userId',
                  getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/figureRanking/rankingList').default)),
                }]
            },
            {
              path: 'rule',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/figureRanking/rule').default)),
              },
            },
            {
              path: 'personal/:userId',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/figureRanking/personal').default)),
              },
            },
            {
              path: 'sharePersonal/:userId',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/figureRanking/sharePersonal').default)),
              },
            }
          ]
        },

        {
          path: 'special',
          childRoutes: [
            {
              // 活动页面 三八妇女节otc活动
              path: 'womensday',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/special/womensDayOtc').default)),
              },
            },
            {
              path: 'publicDevice',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/special/publicDevice').default)),
              },
            },
            {
              path: 'publicDevicePost',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/special/publicDevicePost').default)),
              },
            },
            {
              path: 'companyInfo',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/special/companyInfo').default)),
              },
            },
            {
              path: 'poster',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/special/poster').default)),
              },
            }
          ]
        },
        // /* 体重 */
        {
          path: 'weight/:memberId',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/weight').default)),
          },
          childRoutes: [
            {
              path: 'history/:weightId',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/history').default)),
              },
            },
            {
              path: 'add',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/add').default)),
              },
            },
            {
              path: 'report/:weightId',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/report').default)),
              }
            },
            {
              path: 'physique',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/physique').default)),
              }
            },
            {
              path: 'bmi',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/weight/bmi').default)),
              }
            }
          ]
        },
        // /* 步数 */
        {
          path: 'sport/:memberId',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/sport/sport').default)),
          },
          childRoutes: [
            {
              path: 'history/:queryDate',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/sport/history').default)),
              },
            }
          ]
        },
        // /* 睡眠 */
        {
          path: 'sleep/:memberId',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/sleep/sleep').default)),
          },
          childRoutes: [
            {
              path: 'history/:t',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/sleep/history').default)),
              },
            }
          ]
        },
        // /* 心率 */
        {
          path: 'heartRate/:memberId',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/heartRate/heartRate').default)),
          },
          childRoutes: [
            {
              path: 'history/:t',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/heartRate/history').default)),
              },
            }
          ]
        },
        // /* 我的消息 */
        {
          path: 'message',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/message/message').default)),
          },
        },
        // /* 健康实验室 */
        {
          path: 'laboratory',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/laboratory/list').default)),
          },
          childRoutes: [
            {
              path: 'switch',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/laboratory/switch').default)),
              },
            },
            {
              path: 'article',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/laboratory/article').default)),
              },
            },
            {
              path: 'agreement',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/laboratory/agreement').default)),
              },
            }
          ]
        },
        // /* 血压测量打卡活动 */
        {
          path: 'clock',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/clock/postInfo').default)),
          },
          childRoutes: [
            {
              path: 'postInfo/:memberId',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/clock/postInfo').default)),
              },
            },
            {
              path: 'special',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/clock/special').default)),
              },
            },
            {
              path: 'mark',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/clock/mark').default)),
              },
            }
          ]
        },
        // /* 积分 */
        {
          path: 'integral',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/integral/myIntegral').default)),
          },
          childRoutes: [
            {
              path: 'myIntegral',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/integral/myIntegral').default)),
              },
            },
            {
              path: 'integralDetail',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/integral/integralDetail').default)),
              },
            }
          ]
        },
        // /* 产品列表页 */
        {
          path: 'product',
          indexRoute: {
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/clock/postInfo').default)),
          },
          childRoutes: [
            {
              path: 'list',
              indexRoute: {
                getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/product/list').default)),
              },
            }
          ]
        },
      ]
    },
    {
      path: 'payDemo',
      component: require('../containers/payDemo').default,
      getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/payDemo').default)),
    },
    {
      path: 'changeUser',
      component: require('../containers/others/changeUser').default,
      getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/others/changeUser').default)),
    },
    // /* 静态 */
    {
      path: 'static',
      childRoutes: [
        {

        childRoutes: [
          // /* 邀请分享成员 */
          {
            path: 'memberQrcode',
            // component: require('../containers/attention/showMember').default,
            getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/attention/showMember').default)),
          },
        ]
        }
      ]
    },
  ]
})

if (process.env.NODE_ENV !== 'production') {
  routes.childRoutes.push({
    path: 'test',
    component: require('../containers/test/TestPage').default,
    getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/test/TestPage').default)),
    childRoutes: [{
      path: '*',
      component: require('../containers/test/TestPage').default,
      getComponent: (localhost, cb) => require.ensure([], (require) => cb(null, require('../containers/test/TestPage').default)),
    }]
  })

}

export default routes
