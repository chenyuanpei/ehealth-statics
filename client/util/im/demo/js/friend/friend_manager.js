//定义我的好友表格每行的操作按钮
function gmfOperateFormatter(value, row, index) {
    return [
        '<a class="ban-circle" href="javascript:void(0)" title="拉黑">',
        '<i class="glyphicon glyphicon-ban-circle"></i>',
        '</a>',
        '<a class="remove ml10" href="javascript:void(0)" title="删除">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'

    ].join('');
}
//我的好友表格每行的操作按钮点击事件
window.gmfOperateEvents = {
    'click .ban-circle': function (e, value, row, index) {
        if (confirm("确定将该好友拉黑吗？")) {
            addBlackList(row.Info_Account);
        }
    },
    'click .remove': function (e, value, row, index) {
        $('#df_to_account').val(row.Info_Account);
        $('#delete_friend_dialog').modal('show');
    }
};
//初始化我的好友表格
function initGetMyFriendTable(data) {
    $('#get_my_friend_table').bootstrapTable({
        method: 'get',
        cache: false,
        height: 500,
        striped: true,
        pagination: true,
        sidePagination: 'client',
        pageSize: pageSize,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        search: true,
        showColumns: true,
        clickToSelect: true,
        columns: [
            {field: "Info_Account", title: "账号", align: "center", valign: "middle", sortable: "true"},
            {field: "Nick", title: "昵称", align: "center", valign: "middle", sortable: "true"},
            {field: "Gender", title: "性别", align: "center", valign: "middle", sortable: "true"},
            {field: "gmfOperate", title: "操作", align: "center", valign: "middle", formatter: "gmfOperateFormatter", events: "gmfOperateEvents"}
        ],
        data: data,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
}
//申请加好友
var applyAddFriend = function () {

    var len = webim.Tool.getStrBytes($("#af_add_wording").val());
    if (len > 120) {
        alert('您输入的附言超过字数限制(最长40个汉字)');
        return;
    }
    var add_friend_item = [
        {
            'To_Account': $("#af_to_account").val(),
            "AddSource": "AddSource_Type_Unknow",
            "AddWording": $("#af_add_wording").val() //加好友附言，可为空
        }
    ];
    var options = {
        'From_Account': loginInfo.identifier,
        'AddFriendItem': add_friend_item
    };

    webim.applyAddFriend(
            options,
            function (resp) {
                if (resp.Fail_Account && resp.Fail_Account.length > 0) {
                    for (var i in resp.ResultItem) {
                        alert(resp.ResultItem[i].ResultInfo);
                        break;
                    }
                } else {

                    if ($('#af_allow_type').val() == '允许任何人') {
                        //重新加载好友列表
                        getAllFriend(getAllFriendsCallbackOK);
                        alert('添加好友成功');
                    } else {
                        $('#add_friend_dialog').modal('hide');
                        alert('申请添加好友成功');
                    }

                }
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};

//删除好友
var deleteFriend = function () {

    if (!confirm("确定删除该好友吗？")) {
        return;
    }

    var to_account = [];

    to_account = [
        $("#df_to_account").val()
    ];

    if (to_account.length <= 0) {
        return;
    }
    var options = {
        'From_Account': loginInfo.identifier,
        'To_Account': to_account,
        //Delete_Type_Both'//单向删除："Delete_Type_Single", 双向删除："Delete_Type_Both".
        'DeleteType': $('input[name="df_type_radio"]:checked').val()
    };

    webim.deleteFriend(
            options,
            function (resp) {
                //在表格中删除对应的行
                $('#get_my_friend_table').bootstrapTable('remove', {
                    field: 'Info_Account',
                    values: [$("#df_to_account").val()]
                });
                //重新加载好友列表
                getAllFriend(getAllFriendsCallbackOK);
                $('#delete_friend_dialog').modal('hide');
                alert('删除好友成功');
            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );

};
//获取我的好友
var getMyFriend = function () {
    
    //清空
    initGetMyFriendTable([]);

    var options = {
        'From_Account': loginInfo.identifier,
        'TimeStamp': 0,
        'StartIndex': 0,
        'GetCount': totalCount,
        'LastStandardSequence': 0,
        "TagList":
                [
                    "Tag_Profile_IM_Nick",
                    "Tag_SNS_IM_Remark",
                    "Tag_Profile_IM_Gender"
                ]
    };

    webim.getAllFriend(
            options,
            function (resp) {

                if (resp.FriendNum > 0) {

                    var table_friends_data = [];
                    var friends = resp.InfoItem;
                    if (!friends || friends.length == 0) {
                        alert('你目前还没有好友');
                        return;
                    }

                    var count = friends.length;

                    for (var i = 0; i < count; i++) {
                        var friend_name = friends[i].Info_Account;
                        var gender = "未知";
                        if (friends[i].SnsProfileItem) {
                            for (var j in friends[i].SnsProfileItem) {
                                switch (friends[i].SnsProfileItem[j].Tag) {
                                    case 'Tag_Profile_IM_Nick':
                                        friend_name = friends[i].SnsProfileItem[j].Value;
                                        break;
                                    case 'Tag_Profile_IM_Gender':
                                        switch (friends[i].SnsProfileItem[j].Value) {
                                            case 'Gender_Type_Male':
                                                gender = '男';
                                                break;
                                            case 'Gender_Type_Female':
                                                gender = '女';
                                                break;
                                            case 'Gender_Type_Unknown':
                                                gender = '未知';
                                                break;
                                        }
                                        break;
                                }
                            }
                        }
                        table_friends_data.push({
                            'Info_Account': friends[i].Info_Account,
                            'Nick': webim.Tool.formatText2Html(friend_name),
                            'Gender': gender
                        });
                    }

                    //打开我的好友列表对话框
                    $('#get_my_friend_table').bootstrapTable('load', table_friends_data);
                    $('#get_my_friend_dialog').modal('show');
                } else {
                    alert('您目前还没有好友');
                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};
//初始化聊天界面左侧好友列表框
var getAllFriend = function (cbOK, cbErr) {

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
                
                //清空聊天对象列表
                var sessList = document.getElementsByClassName("sesslist")[0];
                sessList.innerHTML = "";
                if (resp.FriendNum > 0) {

                    var friends = resp.InfoItem;
                    if (!friends || friends.length == 0) {
                        return;
                    }
                    var count = friends.length;

                    for (var i = 0; i < count; i++) {
                        var friend_name = friends[i].Info_Account;
                        if (friends[i].SnsProfileItem && friends[i].SnsProfileItem[0] && friends[i].SnsProfileItem[0].Tag) {
                            friend_name = friends[i].SnsProfileItem[0].Value;

                        }
                        if (friend_name.length > maxNameLen) {//帐号或昵称过长，截取一部分
                            friend_name = friend_name.substr(0, maxNameLen) + "...";
                        }
                        //增加一个好友div
                        addSess(friends[i].Info_Account, webim.Tool.formatText2Html(friend_name), friendHeadUrl, 0, 'sesslist');
                    }

                    if (selType == webim.SESSION_TYPE.C2C) {
                        
                        
                        //清空聊天界面
                        document.getElementsByClassName("msgflow")[0].innerHTML = "";
                        //默认选中当前聊天对象
                        selToID = friends[0].Info_Account;
                        
                        selType == webim.SESSION_TYPE.C2C
                        
                        selSess=webim.MsgStore.sessByTypeId(selType, selToID);
                        
                        
                        //设置当前选中用户的样式为选中样式
                        var selSessDiv = document.getElementById("sessDiv_" + selToID);
                        if (selSessDiv) {
                            selSessDiv.className = "sessinfo-sel";
                        } else {
                            webim.Log.warn("不存在selSessDiv(c2c): selSessDivId=" + "sessDiv_" + selToID);
                        }
                        
                        var selBadgeDiv = document.getElementById("badgeDiv_" + selToID);
                        if (selBadgeDiv) {
                            selBadgeDiv.style.display = "none";
                        } else {
                            webim.Log.warn("不存在selBadgeDiv(c2c): selBadgeDivId=" + "badgeDiv_" + selToID);
                        }
                    }
                    if (cbOK)
                        cbOK();

                }

            },
            function (err) {
                alert(err.ErrorInfo);
            }
    );
};


