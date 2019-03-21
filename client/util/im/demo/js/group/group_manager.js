//创建群菜单点击事件
function createGroupMenuClick() {

    //重置表单
    $('#cg_form')[0].reset();

    var sessList = document.getElementsByClassName("sesslist-group")[0];
    var num = 1;
    if (sessList && sessList.childNodes) {
        num = sessList.childNodes.length + 1;
    }
    $("#cg_name").val('群' + num);

    $('#create_group_dialog').modal('show');
}
//搜索群菜单单击事件
function searchGroupMenuClick() {

    $("#sg_form")[0].reset();
    initSearchGroupTable([]);
    $('#search_group_table').bootstrapTable('load', []);
    $('#search_group_dialog').modal('show');

}
//定义搜索群结果表格每行的操作按钮
function sgOperateFormatter(value, row, index) {
    return [
        '<a class="plus" href="javascript:void(0)" title="申请加入">',
        '<i class="glyphicon glyphicon-plus"></i>',
        '</a>'

    ].join('');
}
//搜索群结果表格按钮事件
window.sgOperateEvents = {
    'click .plus': function (e, value, row, index) {

        $("#ajg_group_id").val(row.GroupId);
        $("#ajg_group_type").val(row.Type);
        $("#ajg_group_name").val(row.Name);

        if (row.Type == 'ChatRoom') {//聊天室直接申请加入
            applyJoinGroup();
        } else {
            $("#ajg_apply_msg").val('你好，我想加入贵群~');
            $('#apply_join_group_dialog').modal('show');
        }
    }
};
//初始化搜索群结果表格
function initSearchGroupTable(data) {
    $('#search_group_table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 500,
        striped: true,
        pagination: true,
        pageSize: pageSize,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        search: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {field: "GroupId", title: "ID", align: "center", valign: "middle", sortable: "true"},
            {field: "TypeZh", title: "类型", align: "center", valign: "middle", sortable: "true"},
            {field: "Type", title: "类型(英文)", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "Name", title: "名称", align: "center", valign: "middle", sortable: "true"},
            {field: "Owner_Account", title: "群主", align: "center", valign: "middle", sortable: "true"},
            {field: "CreateTime", title: "创建时间", align: "center", valign: "middle", sortable: "true"},
            {field: "MemberNum", title: "群成员数", align: "center", valign: "middle", sortable: "true"},
            {field: "sgOperate", title: "操作", align: "center", valign: "middle", formatter: "sgOperateFormatter", events: "sgOperateEvents"}
        ],
        data: data,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
}
//定义我的群组表格每行的操作按钮
function gmgOperateFormatter(value, row, index) {
    return [
        '<a class="plus ml10" href="javascript:void(0)" title="邀请成员">',
        '<i class="glyphicon glyphicon-plus"></i>',
        '</a>',
        '<a class="user ml10" href="javascript:void(0)" title="查看群成员">',
        '<i class="glyphicon glyphicon-user"></i>',
        '</a>',
        '<a class="bell ml10" href="javascript:void(0)" title="设置群消息提示">',
        '<i class="glyphicon glyphicon-bell"></i>',
        '</a>',
        '<a class="logout ml10" href="javascript:void(0)" title="退出该群">',
        '<i class="glyphicon glyphicon-log-out"></i>',
        '</a>',
        '<a class="pencil ml10" href="javascript:void(0)" title="修改群资料">',
        '<i class="glyphicon glyphicon-pencil"></i>',
        '</a>',
        '<a class="trash ml10" href="javascript:void(0)" title="解散该群">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>',
        '<a class="envelope ml10" href="javascript:void(0)" title="发送系统通知">',
        '<i class="glyphicon glyphicon-envelope"></i>',
        '</a>'

    ].join('');
}
//我的群组表格每行的操作按钮点击事件
window.gmgOperateEvents = {
    'click .plus': function (e, value, row, index) {
        if (row.TypeEn != 'Private') {
            alert('公开群或聊天室不支持直接拉人操作');
            return;
        }
        $('#gmfg_group_id').val(row.GroupId);
        getMyFriendGroup();
    },
    'click .user': function (e, value, row, index) {
        $('#ggm_group_id').val(row.GroupId);
        $('#ggm_my_role').val(row.Role);
        $('#ggm_group_type').val(row.TypeEn);

        getGroupMemberInfo(row.GroupId);
    },
    'click .bell': function (e, value, row, index) {
        $('#mgmf_sel_row_index').val(index);
        $('#mgmf_group_id').val(row.GroupId);
        //设置群消息提示类型
        //var msg_flag = webim.Tool.groupRoleCh2En(row.Role);
        var msg_flag = row.MsgFlagEn;
        //$("input[type=radio][name='mgmf_msg_flag_radio'][value=" + msg_flag + "]").attr("checked", 'checked');//此方法存在问题，当修改单选按钮值，并且关闭对话框，再打开对话时，无法选中真正的值
        var mgmf_msg_flag_radio = document.mgmf_form.mgmf_msg_flag_radio;
        for (var i = 0; i < mgmf_msg_flag_radio.length; i++) {
            if (mgmf_msg_flag_radio[i].value == msg_flag) {
                mgmf_msg_flag_radio[i].checked = true;
                break;
            }
        }
        $('#modify_group_msg_flag_dialog').modal('show');

    },
    'click .logout': function (e, value, row, index) {
        if (row.Role == '群主' && row.TypeEn != 'Private') {
            alert('您是群主，不能从公开群或聊天室退出');
            return;
        }
        if (confirm("确定退出该群吗？")) {
            quitGroup(row.GroupId);
        }
    },
    'click .pencil': function (e, value, row, index) {

        //成员可以修改讨论组的基本资料
        if (row.Role == '成员' && row.Type != 'Private') {
            alert('你不是群主或管理员，无法进行此操作');
            return;
        }
        $('#mg_sel_row_index').val(index);
        $('#mg_group_id').val(row.GroupId);
        $('#mg_name').val(webim.Tool.formatHtml2Text(row.Name));
        $('#mg_introduction').val(webim.Tool.formatHtml2Text(row.Introduction));
        $('#mg_notification').val(webim.Tool.formatHtml2Text(row.Notification));
        $('#modify_group_dialog').modal('show');
    },
    'click .trash': function (e, value, row, index) {
        if (row.Role != '群主') {
            alert('你不是群主，无法进行此操作');
        } else {
            if (row.TypeEn == 'Private') {
                alert('您是群主，不能解散讨论组');
                return;
            }
            if (confirm("确定解散该群组吗？")) {
                destroyGroup(row.GroupId);
            }
        }
    },
    'click .envelope': function (e, value, row, index) {
        /*if (row.Role != '群主') {
         alert('你不是群主，无法进行此操作');
         } else {
         if (row.TypeEn == 'Private') {
         alert('您是群主，不能解散讨论组');
         return;
         }
         if (confirm("确定解散该群组吗？")) {
         destroyGroup(row.GroupId);
         }
         }*/
        $('#sgsm_group_id').val(row.GroupId);
        $('#send_group_system_msg_dialog').modal('show');
    }
};
//初始化我的群组表格
function initGetMyGroupTable(data) {
    $('#get_my_group_table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 500,
        striped: true,
        pagination: true,
        pageSize: pageSize,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        search: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {field: "GroupId", title: "ID", align: "center", valign: "middle", sortable: "true"},
            {field: "Type", title: "类型", align: "center", valign: "middle", sortable: "true"},
            {field: "TypeEn", title: "类型(英文)", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "Name", title: "名称", align: "center", valign: "middle", sortable: "true"},
            {field: "RoleEn", title: "角色(英文)", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "Role", title: "角色", align: "center", valign: "middle", sortable: "true"},
            {field: "MsgFlagEn", title: "消息提示类型(英文)", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "MsgFlag", title: "消息提示类型", align: "center", valign: "middle", sortable: "true"},
            {field: "JoinTime", title: "加入时间", align: "center", valign: "middle", sortable: "true"},
            {field: "MemberNum", title: "成员数", align: "center", valign: "middle", sortable: "true"},
            {field: "Notification", title: "公告", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "Introduction", title: "简介", align: "center", valign: "middle", sortable: "true", visible: false},
            {field: "gmgOperate", title: "操作", align: "center", valign: "middle", formatter: "gmgOperateFormatter", events: "gmgOperateEvents"}
        ],
        data: data,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
}
//定义邀请好友加群表格每行的操作按钮
function gmfgOperateFormatter(value, row, index) {
    return [
        '<a class="plus" href="javascript:void(0)" title="邀请加入">',
        '<i class="glyphicon glyphicon-plus"></i>',
        '</a>'

    ].join('');
}
//邀请好友加群表格每行按钮单击事件
window.gmfgOperateEvents = {
    'click .plus': function (e, value, row, index) {
        $('#agm_group_id').val($('#gmfg_group_id').val());
        $('#agm_account').val(row.Info_Account);
        $('#add_group_member_dialog').modal('show');
    }
};
//初始化邀请好友加群表格
function initGetMyFriendGroupTable(data) {
    $('#get_my_friend_group_table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 500,
        striped: true,
        pagination: true,
        pageSize: pageSize,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        search: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {field: "Info_Account", title: "账号", align: "center", valign: "middle", sortable: "true"},
            {field: "Nick", title: "昵称", align: "center", valign: "middle", sortable: "true"},
            {field: "gmfgOperate", title: "操作", align: "center", valign: "middle", formatter: "gmfgOperateFormatter", events: "gmfgOperateEvents"}
        ],
        data: data,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
}

//读取群组公开资料-高级接口（可用于搜索群）
var getGroupPublicInfo = function () {
    if ($("#sg_group_id").val().length == 0) {
        alert('请输入群组ID');
        return;
    }
    if (webim.Tool.trimStr($("#sg_group_id").val()).length == 0) {
        alert('您输入的群组ID全是空格,请重新输入');
        return;
    }
    var options = {
        'GroupIdList': [
            $("#sg_group_id").val()
        ],
        'GroupBasePublicInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption'
        ]
    };
    webim.getGroupPublicInfo(
            options,
            function (resp) {
                var data = [];
                if (resp.GroupInfo && resp.GroupInfo.length > 0) {
                    for (var i in resp.GroupInfo) {
                        if (resp.GroupInfo[i].ErrorCode > 0) {
                            alert(resp.GroupInfo[i].ErrorInfo);
                            return;
                        }
                        var group_id = resp.GroupInfo[i].GroupId;
                        var name = webim.Tool.formatText2Html(resp.GroupInfo[i].Name);
                        var type_zh = webim.Tool.groupTypeEn2Ch(resp.GroupInfo[i].Type);
                        var type = resp.GroupInfo[i].Type;
                        var owner_account = resp.GroupInfo[i].Owner_Account;
                        var create_time = webim.Tool.formatTimeStamp(resp.GroupInfo[i].CreateTime);
                        var member_num = resp.GroupInfo[i].MemberNum;
                        var notification = webim.Tool.formatText2Html(resp.GroupInfo[i].Notification);
                        var introduction = webim.Tool.formatText2Html(resp.GroupInfo[i].Introduction);
                        data.push({
                            'GroupId': group_id,
                            'Name': name,
                            'TypeZh': type_zh,
                            'Type': type,
                            'Owner_Account': owner_account,
                            'MemberNum': member_num,
                            'Notification': notification,
                            'Introduction': introduction,
                            'CreateTime': create_time
                        });
                    }
                }
                $('#search_group_table').bootstrapTable('load', data);
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};

//创建群组
var createGroup = function () {
    var sel_friends = $('#select_friends').val();

    var member_list = [];
    var members = sel_friends.split(";"); //字符分割 
    for (var i = 0; i < members.length; i++)
    {
        if (members[i] && members[i].length > 0) {
            member_list.push(members[i]);
        }
    }

    if ($("#cg_name").val().length == 0) {
        alert('请输入群组名称');
        return;
    }
    if (webim.Tool.trimStr($("#cg_name").val()).length == 0) {
        alert('您输入的群组名称全是空格,请重新输入');
        return;
    }
    if (webim.Tool.getStrBytes($("#cg_name").val()) > 30) {
        alert('您输入的群组名称超出限制(最长10个汉字)');
        return;
    }
    if (webim.Tool.getStrBytes($("#cg_notification").val()) > 150) {
        alert('您输入的群组公告超出限制(最长50个汉字)');
        return;
    }
    if (webim.Tool.getStrBytes($("#cg_introduction").val()) > 120) {
        alert('您输入的群组简介超出限制(最长40个汉字)');
        return;
    }
    var groupType=$('input[name="cg_type_radio"]:checked').val();
    var options = {
        'GroupId': $("#cg_id").val(),
        'Owner_Account': loginInfo.identifier,
        'Type': groupType, //Private/Public/ChatRoom/AVChatRoom
        'Name': $("#cg_name").val(),
        'FaceUrl': '',
        'Notification': $("#cg_notification").val(),
        'Introduction': $('#cg_introduction').val(),
        'MemberList': member_list
    };
    if(groupType!='Private'){//非讨论组才支持ApplyJoinOption属性
        options.ApplyJoinOption=$('input[name="cg_ajp_type_radio"]:checked').val();
    }
    webim.createGroup(
            options,
            function (resp) {
                $('#create_group_dialog').modal('hide');
                alert('创建群成功');
                //读取我的群组列表
                getJoinedGroupListHigh(getGroupsCallbackOK);
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//修改群资料
var modifyGroup = function () {
    if ($("#mg_name").val().length == 0) {
        alert('请输入群组名称');
        return;
    }
    if (webim.Tool.trimStr($("#mg_name").val()).length == 0) {
        alert('您输入的群组名称全是空格,请重新输入');
        return;
    }
    if (webim.Tool.getStrBytes($("#fsm_name").val()) > 30) {
        alert('您输入的群组名称超出限制(最长10个汉字)');
        return;
    }
    if (webim.Tool.getStrBytes($("#fsm_notification").val()) > 150) {
        alert('您输入的群组公告超出限制(最长50个汉字)');
        return;
    }
    if (webim.Tool.getStrBytes($("#fsm_introduction").val()) > 120) {
        alert('您输入的群组简介超出限制(最长40个汉字)');
        return;
    }
    var options = {
        'GroupId': $('#mg_group_id').val(),
        'Name': $('#mg_name').val(),
        //'FaceUrl': $('#mg_face_url').val(),
        'Notification': $('#mg_notification').val(),
        'Introduction': $('#mg_introduction').val()
    };
    webim.modifyGroupBaseInfo(
            options,
            function (resp) {
                //在表格中修改对应的行              
                $('#get_my_group_table').bootstrapTable('updateRow', {
                    index: $('#mg_sel_row_index').val(),
                    row: {
                        Type: $('input[name="mg_type_radio"]:checked').val(),
                        Name: webim.Tool.formatText2Html($('#mg_name').val()),
                        Introduction: webim.Tool.formatText2Html($('#mg_introduction').val()),
                        Notification: webim.Tool.formatText2Html($('#mg_notification').val())
                    }
                });
                $('#modify_group_dialog').modal('hide');
                alert('修改群资料成功');
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//申请加群
var applyJoinGroup = function () {
    if (webim.Tool.getStrBytes($("#ajg_apply_msg").val()) > 300) {
        alert('您输入的附言超出限制(最长100个汉字)');
        return;
    }
    var options = {
        'GroupId': $("#ajg_group_id").val(),
        'ApplyMsg': $("#ajg_apply_msg").val(),
        'UserDefinedField': ''
    };
    webim.applyJoinGroup(
            options,
            function (resp) {
                $('#apply_join_group_dialog').modal('hide');
                var joinedStatus=resp.JoinedStatus;//JoinedSuccess--成功加入，WaitAdminApproval--等待管理员审核
                if(joinedStatus=="JoinedSuccess"){
                    //刷新我的群组列表
                    getJoinedGroupListHigh(getGroupsCallbackOK);
                    alert('成功加入该群');
                } else {
                    alert('申请成功，请等待群主审核');
                }
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//获取我的群组
var getMyGroup = function () {
    initGetMyGroupTable([]);
    var options = {
        'Member_Account': loginInfo.identifier,
        'Limit': totalCount,
        'Offset': 0,
        //'GroupType':'',
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption'
        ],
        'SelfInfoFilter': [
            'Role',
            'JoinTime',
            'MsgFlag',
            'UnreadMsgNum'
        ]
    };
    webim.getJoinedGroupListHigh(
            options,
            function (resp) {
                if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
                    alert('你目前还没有加入任何群组');
                    return;
                }
                var data = [];
                for (var i = 0; i < resp.GroupIdList.length; i++) {

                    var group_id = resp.GroupIdList[i].GroupId;
                    var name = webim.Tool.formatText2Html(resp.GroupIdList[i].Name);
                    var type_en = resp.GroupIdList[i].Type;
                    var type = webim.Tool.groupTypeEn2Ch(resp.GroupIdList[i].Type);
                    var role_en = resp.GroupIdList[i].SelfInfo.Role;
                    var role = webim.Tool.groupRoleEn2Ch(resp.GroupIdList[i].SelfInfo.Role);
                    var msg_flag = webim.Tool.groupMsgFlagEn2Ch(resp.GroupIdList[i].SelfInfo.MsgFlag);
                    var msg_flag_en = resp.GroupIdList[i].SelfInfo.MsgFlag;
                    var join_time = webim.Tool.formatTimeStamp(resp.GroupIdList[i].SelfInfo.JoinTime);
                    var member_num = resp.GroupIdList[i].MemberNum;
                    var notification = webim.Tool.formatText2Html(resp.GroupIdList[i].Notification);
                    var introduction = webim.Tool.formatText2Html(resp.GroupIdList[i].Introduction);
                    data.push({
                        'GroupId': group_id,
                        'Name': name,
                        'TypeEn': type_en,
                        'Type': type,
                        'RoleEn': role_en,
                        'Role': role,
                        'MsgFlagEn': msg_flag_en,
                        'MsgFlag': msg_flag,
                        'MemberNum': member_num,
                        'Notification': notification,
                        'Introduction': introduction,
                        'JoinTime': join_time
                    });
                }
                //打开我的群组列表对话框
                $('#get_my_group_table').bootstrapTable('load', data);
                $('#get_my_group_dialog').modal('show');
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//退群
var quitGroup = function (group_id) {
    var options = null;
    if (group_id) {
        options = {
            'GroupId': group_id
        };
    }
    if (options == null) {
        alert('退群时，群组ID非法');
        return;
    }
    webim.quitGroup(
            options,
            function (resp) {
                //在表格中删除对应的行
                $('#get_my_group_table').bootstrapTable('remove', {
                    field: 'GroupId',
                    values: [group_id]
                });
                //刷新我的群组列表
                getJoinedGroupListHigh(getGroupsCallbackOK);
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//读取群组基本资料-高级接口
var getGroupInfo = function (group_id, cbOK, cbErr) {
    var options = {
        'GroupIdList': [
            group_id
        ],
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption'
        ],
        'MemberInfoFilter': [
            'Account',
            'Role',
            'JoinTime',
            'LastSendMsgTime',
            'ShutUpUntil'
        ]
    };
    webim.getGroupInfo(
            options,
            function (resp) {
                if (cbOK) {
                    cbOK(resp);
                }
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};


//初始化聊天界面中的我的群组列表
var getJoinedGroupListHigh = function (cbOK, cbErr) {

    var options = {
        'Member_Account': loginInfo.identifier,
        'Limit': totalCount,
        'Offset': 0,
        //'GroupType':'',
        'GroupBaseInfoFilter': [
            'Type',
            'Name',
            'Introduction',
            'Notification',
            'FaceUrl',
            'CreateTime',
            'Owner_Account',
            'LastInfoTime',
            'LastMsgTime',
            'NextMsgSeq',
            'MemberNum',
            'MaxMemberNum',
            'ApplyJoinOption'
        ],
        'SelfInfoFilter': [
            'Role',
            'JoinTime',
            'MsgFlag',
            'UnreadMsgNum'
        ]
    };

    webim.getJoinedGroupListHigh(
            options,
            function (resp) {

                if (resp.GroupIdList && resp.GroupIdList.length) {
                    //清空群组列表
                    var sessList = document.getElementsByClassName("sesslist-group")[0];
                    sessList.innerHTML = "";
                    for (var i = 0; i < resp.GroupIdList.length; i++) {
                        var group_name = resp.GroupIdList[i].Name;
                        if (group_name.length > maxNameLen) {//名称过长，截取一部分
                            group_name = group_name.substr(0, maxNameLen) + "...";
                        }
                        addSess(resp.GroupIdList[i].GroupId, webim.Tool.formatText2Html(group_name), friendHeadUrl, resp.GroupIdList[i].SelfInfo.UnreadMsgNum, 'sesslist-group');
                    }

                    if (selType == webim.SESSION_TYPE.GROUP || selToID == null) {
                        //清空聊天界面
                        document.getElementsByClassName("msgflow")[0].innerHTML = "";
                        
                        selType = webim.SESSION_TYPE.GROUP;
                        
                        selToID = resp.GroupIdList[0].GroupId;
                        
                        //默认选中当前聊天对象
                        if (defaultSelGroupId){
                            selToID=defaultSelGroupId;
                        }
                        
                        selSess=webim.MsgStore.sessByTypeId(selType, selToID);
                        
                        //设置当前选中用户的样式为选中样式
                        var selSessDiv = document.getElementById("sessDiv_" + selToID);
                        if (selSessDiv) {
                            selSessDiv.className = "sessinfo-sel";
                        } else {
                            webim.Log.warn("不存在selSessDiv(group): selSessDivId=" + "sessDiv_" + selToID);
                        }

                        var selBadgeDiv = document.getElementById("badgeDiv_" + selToID);
                        if (selBadgeDiv) {
                            selBadgeDiv.style.display = "none";
                        } else {
                            webim.Log.warn("不存在selBadgeDiv(group): selBadgeDivId=" + "badgeDiv_" + selToID);
                        }
                    }

                    if (cbOK) {
                        cbOK();
                    }

                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );

};
//解散群组
var destroyGroup = function (group_id) {
    var options = null;
    if (group_id) {
        options = {
            'GroupId': group_id
        };
    }
    if (options == null) {
        alert('解散群时，群组ID非法');
        return;
    }
    webim.destroyGroup(
            options,
            function (resp) {
                //在表格中删除对应的行
                $('#get_my_group_table').bootstrapTable('remove', {
                    field: 'GroupId',
                    values: [group_id]
                });
                //读取我的群组列表
                getJoinedGroupListHigh(getGroupsCallbackOK);
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};

//获取我的好友，然后邀请加群
var getMyFriendGroup = function () {

    initGetMyFriendGroupTable([]);
    var options = {
        'From_Account': loginInfo.identifier,
        'TimeStamp': 0,
        'StartIndex': 0,
        'GetCount': totalCount,
        'LastStandardSequence': 0,
        "TagList":
                [
                    "Tag_Profile_IM_Nick",
                    "Tag_SNS_IM_Remark"
                ]
    };

    webim.getAllFriend(
            options,
            function (resp) {

                if (resp.FriendNum > 0) {
                    var table_friends_data = [];
                    var friends = resp.InfoItem;
                    if (!friends || friends.length == 0) {
                        alert('你目前还没有好友，无法邀请好友加入该群');
                        return;
                    }
                    var count = friends.length;

                    for (var i = 0; i < count; i++) {
                        var friend_name = friends[i].Info_Account;
                        if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[0] && friends[i].SnsProfileItem[0].Tag) {
                            friend_name = friends[i].SnsProfileItem[0].Value;
                        }

                        table_friends_data.push({
                            'Info_Account': friends[i].Info_Account,
                            'Nick': webim.Tool.formatText2Html(friend_name)
                        });
                    }
                    //打开我的好友列表对话框
                    $('#get_my_friend_group_table').bootstrapTable('load', table_friends_data);
                    $('#get_my_friend_group_dialog').modal('show');

                } else {
                    alert('你目前还没有好友，无法邀请好友加入该群');
                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};


//选择我的好友
var selectMyFriendGroup = function () {

    initSelectMyFriendGroupTable([]);
    var options = {
        'From_Account': loginInfo.identifier,
        'TimeStamp': 0,
        'StartIndex': 0,
        'GetCount': totalCount,
        'LastStandardSequence': 0,
        "TagList":
                [
                    "Tag_Profile_IM_Nick",
                    "Tag_SNS_IM_Remark"
                ]
    };

    webim.getAllFriend(
            options,
            function (resp) {

                if (resp.FriendNum > 0) {
                    var table_friends_data = [];
                    var friends = resp.InfoItem;
                    if (!friends || friends.length == 0) {
                        alert('你目前还没有好友，无法建群');
                        return;
                    }
                    var count = friends.length;

                    for (var i = 0; i < count; i++) {
                        var friend_name = friends[i].Info_Account;
                        if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[0] && friends[i].SnsProfileItem[0].Tag) {
                            friend_name = friends[i].SnsProfileItem[0].Value;
                        }

                        table_friends_data.push({
                            'Info_Account': friends[i].Info_Account,
                            'Nick': webim.Tool.formatText2Html(friend_name)
                        });
                    }
                    //打开选择我的好友列表对话框
                    $('#select_my_friend_group_table').bootstrapTable('load', table_friends_data);
                    $('#select_my_friend_group_dialog').modal('show');

                } else {
                    alert('你目前还没有好友，无法建群');
                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};

//定义（创建群之前）选择好友表格每行按钮
function smfgOperateFormatter(value, row, index) {
    return [
        '<a class="plus" href="javascript:void(0)" title="选中">',
        '<i class="glyphicon glyphicon-plus"></i>',
        '</a>',
        '<a class="minus" href="javascript:void(0)" title="取消">',
        '<i class="glyphicon glyphicon-minus"></i>',
        '</a>',
    ].join('');
}
//（创建群之前）选择好友表格每行按钮单击事件
window.smfgOperateEvents = {
    'click .plus': function (e, value, row, index) {

        var sel_friends = $('#select_friends').val();
        var account = row.Info_Account;
        //先判断是否已选择
        if (sel_friends && sel_friends != '') {
            var pos = sel_friends.indexOf(";" + account + ";");
            if (pos >= 0) {
                alert('已选择该好友，请选择其他好友');
                return;
            }
        } else {
            sel_friends = ';';
        }
        sel_friends += row.Info_Account + ";";
        $('#select_friends').val(sel_friends);
        alert('选择成功');

    },
    'click .minus': function (e, value, row, index) {
        var sel_friends = $('#select_friends').val();
        var account = row.Info_Account;
        //先判断是否已选择
        if (!sel_friends || sel_friends == '') {

            alert('还未选择好友，不能进行此操作');
            return;


        } else {
            var pos = sel_friends.indexOf(";" + account + ";");
            var strlen = (account + ";").length;
            if (pos >= 0) {
                var begin = sel_friends.substr(0, pos);
                var end = sel_friends.substr(pos + strlen);
                var new_sel_friends = begin + end;
            } else {
                alert('未选择该好友，不能进行此操作');
                return;
            }

        }
        if (new_sel_friends == ';') {
            new_sel_friends = '';
        }
        $('#select_friends').val(new_sel_friends);
        alert('取消成功');
    }
};
//初始化（创建群之前）选择好友表格
function initSelectMyFriendGroupTable(data) {
    $('#select_my_friend_group_table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 500,
        striped: true,
        pagination: true,
        pageSize: pageSize,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        search: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {field: "Info_Account", title: "账号", align: "center", valign: "middle", sortable: "true"},
            {field: "Nick", title: "昵称", align: "center", valign: "middle", sortable: "true"},
            {field: "smfgOperate", title: "操作", align: "center", valign: "middle", formatter: "smfgOperateFormatter", events: "smfgOperateEvents"}
        ],
        data: data,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
}

