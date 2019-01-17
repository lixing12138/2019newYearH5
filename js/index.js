$(
    function () {
        /*
        * 设备宽度较大时缩小瓶子
        * */
        let deviceWidth=document.body.clientWidth;
        if (deviceWidth>760){
            $(".page3 > #bottle").css({
                "-webkit-transform": "scale(0.5)",
            "-moz-transform": "scale(0.5)",
            "-ms-transform": "scale(0.5)",
            "-o-transform": "scale(0.5)",
            "transform": "scale(0.5)"
            });
        }
        //获得名字性别
        let nickName="";
        $(".page2 > #message > #btn").click(function () {
            let name=$(".page2 > #message > span >#messageInput").val();
            if (!name){
                alert("请输入昵称");
            } else {
                nickName=name;
                setTimeout(function () {
                    $(".page2").addClass('fade-out');
                    setTimeout(function () {
                        $(".page2").removeClass('show');
                        $(".page3").removeClass('hidden').addClass('fade-in');
                    },500);
                },500);
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
        let shakePhone=function () {
            var SHAKE_THRESHOLD = 3000;
            var last_update = 0;
            var x = y = z = last_x = last_y = last_z = 0;
            function init() {
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                } else {
                    alert('not support mobile event');
                }
            }
            function deviceMotionHandler(eventData) {
                var acceleration = eventData.accelerationIncludingGravity;
                var curTime = new Date().getTime();
                if ((curTime - last_update) > 100) {
                    var diffTime = curTime - last_update;
                    last_update = curTime;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                    if (speed > SHAKE_THRESHOLD) {
                        alert("摇动了");
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            }
        }
    }
)