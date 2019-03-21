//切换好友或群组聊天对象
function onSelSess(index, to_id, sessListName) {
    if (selToID != null && selToID != to_id) {
        var preSessDiv = document.getElementById("sessDiv_" + selToID);
        //将之前选中用户的样式置为未选中样式
        preSessDiv.className = "sessinfo";
        //设置之前会话的已读消息标记
        webim.setAutoRead(selSess, false, false);

        //设置当前选中用户的样式为选中样式
        var curSessDiv = document.getElementById("sessDiv_" + to_id);
        curSessDiv.className = "sessinfo-sel";
        var badgeDiv = document.getElementById("badgeDiv_" + to_id);
        badgeDiv.style.display = "none";

        //保存当前的消息输入框内容到草稿
        //获取消息内容
        var msgtosend = document.getElementsByClassName("msgedit")[0].value;
        var msgLen = webim.Tool.getStrBytes(msgtosend);
        if (msgLen > 0) {
            webim.Tool.setCookie("tmpmsg_" + selToID, msgtosend, 3600);
        }
        selToID = to_id;
        //清空聊天界面
        document.getElementsByClassName("msgflow")[0].innerHTML = "";

        var tmgmsgtosend = webim.Tool.getCookie("tmpmsg_" + selToID);
        if (tmgmsgtosend) {
            $("#send_msg_text").val(tmgmsgtosend);
        } else {
            $("#send_msg_text").val('');
        }

        if (sessListName == 'sesslist-group') {
            if (selType == webim.SESSION_TYPE.C2C) {
                selType = webim.SESSION_TYPE.GROUP;
            }
            selSess = null;
            webim.MsgStore.delSessByTypeId(selType, selToID);
            getLastGroupHistoryMsgs(getHistoryMsgCallback,
                    function (err) {
                        alert(err.ErrorInfo);
                    }
            );
        } else {
            if (selType == webim.SESSION_TYPE.GROUP) {
                selType = webim.SESSION_TYPE.C2C;
            }
            selSess = null;
            webim.MsgStore.delSessByTypeId(selType, selToID);
            //selSess = webim.MsgStore.sessByTypeId(selType, selToID);
            //webim.MsgStore.resetCookieAndSyncFlag();
            getLastC2CHistoryMsgs(getHistoryMsgCallback,
                    function (err) {
                        alert(err.ErrorInfo);
                    }
            );
        }
    }
}