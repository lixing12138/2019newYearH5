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
        * 触发晃动事件或者点击开瓶按钮事件
        * */
        $(".page3 > #wishButton").click(function () {
            $(".page3 > #wishButton").css("display","none");
            $(".page3 ").addClass('shakeBottle');
            setTimeout(function () {
                document.getElementById("shakeMusic").pause();
                document.getElementById("peng").play();
                setTimeout(function () {
                    $("#cork").addClass("bomb");

                },900)
            },500)
        })

        /*
         * 监控手机晃动
         * */
        let shakePhone = function () {
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion',deviceMotionHandle,false);
                let shakeThreshold = 5000, lastUpdateTime = 0,
                    x = 0, y = 0,z=0, last_x = 0, last_y = 0, last_z = 0;
                function deviceMotionHandle(event) {
                    let acceleration=event.accelerationIncludingGravity;
                    let currentTime=new Date().getTime();
                    let isShaking=false;
                    if ((currentTime-lastUpdateTime)>10){
                        let intervalTime=currentTime-lastUpdateTime;
                        lastUpdateTime=currentTime;
                        x=acceleration.x;
                        y=acceleration.y;
                        z=acceleration.z;
                        let speed=Math.abs(x +y + z - last_x - last_y - last_z) /intervalTime * 10000;

                        if (speed>shakeThreshold&&!isShaking){
                            isShaking=true;
                            $("#shakeMusic").play();

                            setTimeout(function () {
                                window.removeEventListener("devicemotion",deviceMotionHandle,false);
                                $(".page3 > #wishButton").trigger('click');
                                isShaking=false;
                            },1000);
                        }
                    }
                    last_x=x;
                    last_y=y;
                    last_z=z;
                }
            }else {

            }
        }
    }
)