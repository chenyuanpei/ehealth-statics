//退出
function quitClick() {
    if (loginInfo.identifier) {
        //sdk登出
        webim.logout(
                function (resp) {
                    loginInfo.identifier = null;
                    loginInfo.userSig = null;
                    document.getElementById("webim_demo").style.display = "none";
                    var indexUrl = window.location.href;
                    var pos = indexUrl.indexOf('?');
                    if (pos >= 0) {
                        indexUrl = indexUrl.substring(0, pos);
                    }
                    window.location.href = indexUrl;
                }
        );
    } else {
        alert('未登录');
    }
}