$(
    function () {
        /*
        * 设备宽度较大时缩小瓶子
        * */
        let deviceWidth = document.body.clientWidth;
        if (deviceWidth > 760) {
            $(".page3").css({
                "-webkit-transform": "scale(0.5)",
                "-moz-transform": "scale(0.5)",
                "-ms-transform": "scale(0.5)",
                "-o-transform": "scale(0.5)",
                "transform": "scale(0.5)"
            });
        }
        //获得名字性别
        let nickName = "";
        $(".page2 > #message > #btn").click(function () {
            let name = $(".page2 > #message > span >#messageInput").val();
            if (!name) {
                alert("请输入昵称");
            } else {
                nickName = name;
                setTimeout(function () {
                    $(".page2").addClass('fade-out');
                    setTimeout(function () {
                        $(".page2").removeClass('show');
                        $(".page3").removeClass('hidden').addClass('fade-in');
                        /*
                        * 检测手机晃动
                        * */

                    }, 500);
                }, 500);
            }
            console.log(nickName);
        })

        /*
        * 背景音乐开关，默认音乐关闭
        * */
        let stopMusic = $("#stopMusic");
        stopMusic.css('animation-play-state', 'paused');
        let music = document.getElementById("bgm");
        stopMusic.click(function () {
            if (stopMusic.css('animation-play-state') === 'paused') {
                stopMusic.css('animation-play-state', 'running');
                music.play();
            } else {
                stopMusic.css('animation-play-state', 'paused');
                music.pause();
            }
        });

        /*
         * 监控手机晃动
         * */
        let shakePhone = function () {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion',deviceMotionHandle)
                let shakeThreshold = 5000, lastUpdateTime = 0,
                    x = 0, y = 0, last_x = 0, last_y = 0, last_z = 0;
            }
        }
    }
)