$(function() {
    // 滚动条
    $('.main').mCustomScrollbar();

    // 为发送按钮绑定鼠标事件
    $('#btnSend').on('click', function() {
            var text = $("#ipt").val().trim()
            if (text.length <= 0) {
                return $('#ipt').val('')
            }
            // 如果用户输入聊天内容，则将聊天内容追加到页面上显示
            $('#talk_list').append(' <li class="right_word"><span>' + text + '</span> <img src="img/02.jpeg" alt=""></li>')

            $("#ipt").val('');
            // 重置滚动条
            $('.main').mCustomScrollbar("update");
            // 发起请求
            getMsg(text);
        })
        // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                if (res.message == 'success') {
                    //   接受聊天消息
                    var msg = res.data.info.text;
                    $('#talk_list').append(' <li class="left_word"><span>' + msg + '</span> <img src="img/01.jpg" alt=""></li>');
                    // 重置滚动条
                    $('#talk_list').mCustomScrollbar("update");
                    getVoice(msg);
                }
            }
        })
    }
    // 文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                if (res.status === 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    }
    // 让文本输入框响应回车事件
    $('#ipt').on('keyup', function(e) {
        // e.keyCode可以获取当前按键的编码
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }
    })
})