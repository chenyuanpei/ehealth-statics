//监听新消息事件
//newMsgList 为新消息数组，结构为[Msg]
function onMsgNotify(newMsgList) {
    //console.warn(newMsgList);
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();

    for (var j in newMsgList) {//遍历新消息
        newMsg = newMsgList[j];

        if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            addMsg(newMsg);
        }
    }
    //消息已读上报，以及设置会话自动已读标记
    webim.setAutoRead(selSess, true, true);

    for (var i in sessMap) {
        sess = sessMap[i];
        if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
            updateSessDiv(sess.type(), sess.id(), sess.name(),sess.unread());
        }
    }
}

//监听直播聊天室新消息事件
//newMsgList 为新消息数组，结构为[Msg]
//监听大群新消息（普通，点赞，提示，红包）
function onBigGroupMsgNotify(newMsgList) {
    var newMsg;
    for (var i = newMsgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
        newMsg = newMsgList[i];
        webim.Log.warn('receive a new group(AVChatRoom) msg: ' + newMsg.getFromAccountNick());
        //显示收到的消息
        addMsg(newMsg);
    }
}

//更新某一个好友或者群div-未读消息数
function updateSessDiv(sess_type, to_id, name,unread_msg_count) {
    var badgeDiv = document.getElementById("badgeDiv_" + to_id);
    if (badgeDiv && unread_msg_count > 0) {
        if (unread_msg_count >= 100) {
            unread_msg_count = '99+';
        }
        badgeDiv.innerHTML = "<span>" + unread_msg_count + "</span>";
        badgeDiv.style.display = "block";
    } else if (badgeDiv == null) {//没有找到对应的聊天id
        if (name.length > maxNameLen) {//名称过长，截取一部分
                name = name.substr(0, maxNameLen) + "...";
        }
        if (sess_type == webim.SESSION_TYPE.C2C) {
            addSess(to_id, name, friendHeadUrl, unread_msg_count, 'sesslist');
        } else {
            addSess(to_id, name, friendHeadUrl, unread_msg_count, 'sesslist-group');
        }
    }
}

//在好友或群组列表左边框新增一行
function addSess(to_id, name, face, unread_msg_count, sesslist) {
    var sessList = document.getElementsByClassName(sesslist)[0];
    var index = sessList.childNodes.length;
    var sessDiv = document.createElement("div");
    sessDiv.id = "sessDiv_" + to_id;
    //如果当前选中的用户是最后一个用户
    sessDiv.className = "sessinfo";
    //添加单击用户头像事件
    sessDiv.onclick = function () {
        onSelSess(index, to_id, sesslist);
    };
    var faceImg = document.createElement("img");
    faceImg.id = "faceImg_" + to_id;
    faceImg.className = "face";
    faceImg.src = face;
    var nameDiv = document.createElement("div");
    nameDiv.id = "nameDiv_" + to_id;
    nameDiv.className = "name";
    nameDiv.innerHTML = name;
    var badgeDiv = document.createElement("div");
    badgeDiv.id = "badgeDiv_" + to_id;
    badgeDiv.className = "badge";
    if (unread_msg_count > 0) {
        if (unread_msg_count >= 100) {
            unread_msg_count = '99+';
        }
        badgeDiv.innerHTML = "<span>" + unread_msg_count + "</span>";
        badgeDiv.style.display = "block";
    }
    sessDiv.appendChild(faceImg);
    sessDiv.appendChild(nameDiv);
    sessDiv.appendChild(badgeDiv);
    sessList.appendChild(sessDiv);
}