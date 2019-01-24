$(
    function () {
        /*
        * 判断是否为微信浏览器
        * */
        let isWeiXin = false;
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i))
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                isWeiXin = true;
            }

        if (isWeiXin){
            doShare();
        }
        /*
        * 设备宽度较大时缩小瓶子
        * */
        let deviceWidth = document.body.clientWidth;
        let deviceHeight = document.body.clientHeight;
        if (deviceWidth > 760) {
            let page3 = $(".page3");
            page3.css({"width": page3.width() * 0.8, "height": page3.height() * 0.8});
            let cartoon = $(".page4 > .sign > #cartoon");
            cartoon.css({"width": cartoon.width() * 0.8, "height": cartoon.height() * 0.8});
            let description = $(".page4 > .sign > #description");
            description.css({"width": description.width() * 0.8, "height": description.height() * 0.8});
            let code = $(".page4 > .sign > #code");
            code.css({"width": code.width() * 0.8, "height": code.height() * 0.8});
            let saoyisao = $(".page4 > .sign > #saoyisao");
            saoyisao.css({"width": saoyisao.width() * 0.8, "height": saoyisao.height() * 0.8})
        }


        /*
        * 选择性别
        * */
        let sex = 1;//男
        $(".page2 > #message > #select > #picBoy").click(function () {
            $(".page2 > #message > #select > #picBoy").removeClass('picBoy').addClass('selectedBoy');
            $(".page2 > #message > #select > #picGirl").removeClass('selectedGirl').addClass('picGirl');
            sex = 1;
            //console.log("nan");
        });
        $(".page2 > #message > #select > #picGirl").click(function () {
            $(".page2 > #message > #select > #picGirl").removeClass('picGirl').addClass('selectedGirl');
            $(".page2 > #message > #select > #picBoy").removeClass('selectedBoy').addClass('picBoy');
            sex = 2;
            //console.log("nv");
        });
        //获得名字
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
                        $(".page2").removeClass('show').addClass('hidden');
                        $(".page3").removeClass('hidden').addClass('fade-in');
                        /*
                        * 检测手机晃动
                        * */
                        shakePhone();

                    }, 500);
                }, 500);
            }
        })

        /*
        * * 触发晃动事件或者点击开瓶按钮事件
        * * */
        $(".page3 > #wishButton").click(function () {
            $(".page3 > #wishButton").css("display", "none");
            $(".page3 ").addClass('shakeBottle');
            setTimeout(function () {
                document.getElementById("peng").play();
                setTimeout(function () {
                    $("#cork").addClass("bomb");
                    $(".page3 > #bottle").addClass('fade-out');
                    $(".page3 > #star").removeClass('starRotate').addClass('getBiggerStar');
                    setTimeout(function () {
                        $(".page3 > #star").css("display", "none");
                        /*
                        * 设置page4中的姓名 title cartoon  description
                        * */
                        let num = Math.floor(Math.random() * 10);
                        paintPage(nickName, sex, 0);
                        $(".page4").removeClass('hidden').addClass('fade-in');
                        let interval = 11 + $(".page4 > .sign > #name").width() * 100 / deviceWidth;
                        $(".page4 > .sign > #tongxue").css("left", interval + "vw");
                        setTimeout(function () {
                            saveToPNG();
                        }, 100)
                    }, 3000)
                }, 900)
            }, 1000)
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
            if (window.DeviceMotionEvent && isWeiXin) {
                window.addEventListener('devicemotion', deviceMotionHandle, false);
                let shakeThreshold = 5000, lastUpdateTime = 0,
                    x = 0, y = 0, z = 0, last_x = 0, last_y = 0, last_z = 0;

                function deviceMotionHandle(event) {
                    let acceleration = event.accelerationIncludingGravity;
                    let currentTime = new Date().getTime();
                    if ((currentTime - lastUpdateTime) > 10) {
                        let intervalTime = currentTime - lastUpdateTime;
                        lastUpdateTime = currentTime;
                        x = acceleration.x;
                        y = acceleration.y;
                        z = acceleration.z;
                        let speed = Math.abs(x + y + z - last_x - last_y - last_z) / intervalTime * 10000;

                        if (speed > shakeThreshold) {
                            if ("vibrate" in navigator) {
                                navigator.vibrate([400, 200, 400, 200, 400, 200]);
                            }
                            setTimeout(function () {
                                window.removeEventListener("devicemotion", deviceMotionHandle, false);
                                $(".page3 > #wishButton").trigger('click');
                            }, 500);
                        }
                    }
                    last_x = x;
                    last_y = y;
                    last_z = z;
                }
            } else {
                console.log("no support");
                $(".page3 > #wishButton").fadeIn();
            }
        }


        /**
         * bgm自动播放
         * */
        bgmAutoPlay('bgm');

        function bgmAutoPlay(id) {
            let audio = document.getElementById(id);
            let play = function () {
                audio.play();
                if (audio.paused) {
                    stopMusic.css('animation-play-state', 'paused');
                } else {
                    stopMusic.css('animation-play-state', 'running');
                }
            };
            document.addEventListener("WeixinJSBridgeReady", play, false);
            play();
        }

        /*
        * 绘制page4
        * */
        function paintPage(name, sex, num) {
            /*
             * 添加名字
             * */
            $(".page4 > .sign > #name").text(name);
            /*
            * 添加title
            * */
            let message = [
                {
                    "title": "科研青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "文学青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "锦鲤青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "恋爱青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "三教青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "红色青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "中二青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "二次元青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "硬核青年",
                    "description": "./images/description/jinli.png",
                },
                {
                    "title": "背锅青年",
                    "description": "./images/description/jinli.png",
                }
            ];
            let imagePathBoy = [
                "./images/boy/keyan.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png",
                "./images/boy/jinli.png"
            ];
            let imagePathGirl = ["./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png",
                "./images/girl/jinli.png"];
            //设置cartoon
            if (sex === 1) {
                let path = imagePathBoy[num];
                $(".page4 > .sign > #cartoon").css({
                    "background": "url(" + path + ") center no-repeat",
                    "background-size": "100%"
                });
            } else {
                let path = imagePathGirl[num];
                $(".page4 > .sign > #cartoon").css({
                    "background": "url(" + path + ") center no-repeat",
                    "background-size": "100%"
                });
            }
            //设置description
            $(".page4 > .sign > #description").css({
                "background": " url(" + message[num]["description"] + ") no-repeat",
                "background-size": "100%"
            });
            //设置nickname
            $(".page4 > .sign > #nickname").css({
                "background": "url('./images/nickname/jinli.png')",
                "background-size": "100%"
            });
        }

        /*
      * 保存为图片
      * */
        function saveToPNG() {
            var cntElem = $('#sign')[0];

            var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = 2; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                // logging: true, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true // 【重要】开启跨域配置
            };

            html2canvas(shareContent, opts).then(function (canvas) {

                var context = canvas.getContext('2d');
                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;

                // 【重要】默认转化的格式为png,也可设置为其他格式
                var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
                $('.page4').empty();
                $('#result').css("display", "block").append(img);

                $(img).css({
                    "width": canvas.width / 2 + "px",
                    "height": canvas.height / 2 + "px",
                })
            });
        }


        /*
        * 微信分享
        * */

        function doShare() {
            $.ajax({
                url: "./php/getMessage.php",
                type: "GET",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    wx.config({
                        beta:true,
                        debug:true,
                        appId:data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ]
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: 'newYearH5', // 分享标题
                            link: 'https://xcx.fudan.edu.cn/newyear', // 分享链接，该链接域名必须与当前企业的可信域名一致
                            imgUrl: 'https://xcx.fudan.edu.cn/newyear/sharePic.png', // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                alert("分享成功");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                alert("取消分享");
                            }
                        });

                        wx.onMenuShareAppMessage({
                            title: 'newYearH5', // 分享标题
                            desc: 'h5描述', // 分享描述
                            link: 'https://xcx.fudan.edu.cn/newyear', // 分享链接，该链接域名必须与当前企业的可信域名一致
                            imgUrl: 'https://xcx.fudan.edu.cn/newyear/sharePic.png', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                alert("分享成功");
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                                alert("取消分享");
                            }
                        });
                    });
                    wx.error(function (res) {

                    })
                }
            })
        }
    })