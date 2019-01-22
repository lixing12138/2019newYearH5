/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('page1',
    {//颗粒参数
        "particles": {
            "number": {
                "value": 50,//粒子个数
                //密度
                "density": {
                    //激活
                    "enable": true,
                    //值区,越小越多
                    "value_area": 100
                }
            },
            "color": {
                //下面是各种可接收值的格式
                //"#b61924"
                // {r:182, g:25, b:36}
                // {h:356, s:76, l:41}
                // ["#b61924", "#333333", "999999"]
                // "random"
                "value": "#ffffff"
            },
            //粒子形状
            //下面是各种可接收值的格式 都可以与下面的 nb_sides 边的数量结合使用
            //"circle"  园
            // "edge" 有边的 看起来像是嵌套的一种图形
            // "triangle" 三角形
            // "polygon" 多边形
            // "star" 星星
            // "image" 图片 对应下面的 image 参数
            // ["circle", "triangle", "image"]  数组混合参数 这样出来的形状就像是随机的多个形状
            "shape": {
                "type": "image",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                //配合多边形使用
                "polygon": {
                    "nb_sides": 5
                },
                //图片参数
                "image": {
                    "src": "./snow.png",
                    "width": 200,
                    "height": 200
                }
            },
            //透明度
            "opacity": {
                //数字
                "value": 1,
                //布尔值
                "random": true,
                //动画参数
                "anim": {
                    //激活
                    "enable": true,
                    //速度
                    "speed": 0.5,
                    //时间
                    "opacity_min": 0,
                    //同步
                    "sync": false
                }
            },
            //粒子尺寸
            "size": {
                "value": 6,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 5,
                    "sync": false
                }
            },
            //连接线
            "line_linked": {
                //激活
                "enable": false,
                //距离
                "distance": 150,
                //颜色
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            //移动
            "move": {
                "enable": true,
                //速度
                "speed": 0.5,
                //方向
                //"none"
                // "top"
                // "top-right"
                // "right"
                // "bottom-right"
                // "bottom"
                // "bottom-left"
                // "left"
                // "top-left"
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                //吸引
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        //互动性
        "interactivity": {
            //检测'canvas'，'window'
            "detect_on": "canvas",
            //添加事件
            "events": {
                //鼠标经过
                "onhover": {
                    "enable": false,
                    //模式
                    //下面是各种可接收值
                    //"grab" 抓住  显示的是粒子间的连接线
                    // "bubble" 气泡 显示的是放大版的上面的 image src 的图片
                    // "repulse" 浅水 使粒子无法进入鼠标固定的范围
                    // ["grab", "bubble"]  还可以用数组的形式来设置
                    "mode": "grab"
                },
                //点击事件
                //下面是各种可接收值
                //"push"  增加粒子
                // "remove"  删除粒子
                // "bubble"
                // "repulse"
                // ["push", "repulse"]
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },

            //给上面的可设置的模式增加更多的的参数设置
            "modes": {
                "grab": {
                    //距离
                    "distance": 400,
                    //连接线
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 250,
                    //尺寸
                    "size": 0,
                    //持续时间
                    "duration": 2,
                    "opacity": 0,
                    //速度
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                //增加
                "push": {
                    "particles_nb": 4
                },
                //去除
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }


);