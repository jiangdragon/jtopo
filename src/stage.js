/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/17
 */
(function ($$) {

    $$.Stage = function (canvas) {
        /**
         * @private 初始化
         * @param canvas
         */
        this.initialize = function (canvas) {
            this.canvas = canvas;
            this.graphics = canvas.getContext("2d");
            this.childs = [];
            this.frames = 24;
            //this.messageBus = new $$.util.MessageBus();
            //this.eagleEye = b(this);
            this.wheelZoom = null;
            this.mouseDownX = 0;
            this.mouseDownY = 0;
            this.mouseDown = false;
            this.mouseOver = false;
            this.needRepaint = true;
            this.serializedProperties = ["frames", "wheelZoom"];

            //this.initEvent();

        };
        this.start = function () {
            if (0 == that.frames) {
                setTimeout(arguments.callee, 100);
            } else if (that.frames < 0) {
                that.repaint();
                setTimeout(arguments.callee, 1e3 / -that.frames);
            } else {
                that.repaint();
                setTimeout(arguments.callee, 1e3 / that.frames);
            }
        };
        /**
         * @private 派发事件到各场景(layer图层)
         * @param type
         * @param evt
         */
        this.dispatchEventToScenes = function (type, evt) {

        };
        /**
         * @private 初始化事件
         * @param canvas
         */
        this.initEvent = function (canvas) {
            if ($$.util.isIE || !window.addEventListener) {
                canvas.onmouseout = f;
                canvas.onmouseover = e;
                canvas.onmousedown = g;
                canvas.onmouseup = h;
                canvas.onmousemove = i;
                canvas.onclick = j;
                canvas.ondblclick = k;
                canvas.onmousewheel = l;
                canvas.touchstart = g;
                canvas.touchmove = i;
                canvas.touchend = h;
            } else {
                canvas.addEventListener("mouseout", f);
                canvas.addEventListener("mouseover", e);
                canvas.addEventListener("mousedown", g);
                canvas.addEventListener("mouseup", h);
                canvas.addEventListener("mousemove", i);
                canvas.addEventListener("click", j);
                canvas.addEventListener("dblclick", k);
                if ($$.util.isFirefox) {
                    canvas.addEventListener("DOMMouseScroll", l);
                } else {
                    canvas.addEventListener("mousewheel", l)
                }
            }
            // 键盘事件
            if (window.addEventListener) {
                window.addEventListener("keydown", this.keyEventHander, true);// 按下
                window.addEventListener("keyup", this.keyEventHander, true);// 弹起
            }
        };

        this.getPosition = function (evt) {
            var result = $$.util.getEventPosition(evt);
            var offset = $$.util.getOffsetPosition(this.canvas);

            result.offsetLeft = result.pageX - offset.left;
            result.offsetTop = result.pageY - offset.top;
            result.x = result.offsetLeft;
            result.y = result.offsetTop;
            result.target = null;
            return result;
        };
        /**
         * @private 鼠标事件
         * @param evt
         */
        this.mouseOvertHander = function (evt) {
            document.onselectstart = function () {
                return false;
            };
            that.mouseOver = true;

            var position = that.getPosition(evt);
            that.dispatchEventToScenes("mouseover", position);
            //that.dispatchEvent("mouseover", evt);
        };
        /**
         * private 键盘按下、弹起事件处事
         * @param evt {Event}
         */
        this.keyEventHander = function (evt) {
            that.dispatchEventToScenes(evt.type, $$.util.cloneEvent(evt));
            var keyCode = evt.keyCode;
            if (37 == keyCode || 38 == keyCode || 39 == keyCode || 40 == keyCode) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                } else {
                    evt = evt || window.event;
                    evt.returnValue = false;
                }
            }
        };

        //****************************************************************
        //* 公共API
        //****************************************************************
        this.paint = function () {
            if (null != this.canvas) {
                this.graphics.save();
                this.graphics.clearRect(0, 0, this.width, this.height);
                // 场景(layer图层)
                var i, child;
                for (i = 0; i < this.childs.length; i++) {
                    child = this.childs[i];
                    if (child.visible == true) {
                        child.repaint(this.graphics);
                    }
                }
                // 鹰眼
                //if (this.eagleEye.visible == true) {
                //    this.eagleEye.paint(this);
                //}
                this.graphics.restore();
            }

        };

        this.repaint = function () {
            if (0 == this.frames) {
                return;
            }

            this.paint();
            if (this.frames < 0 && this.needRepaint == false) {
                this.needRepaint = false;
            }
        };
        /**
         *
         * @param scene
         */
        this.add = function (scene) {
            for (var i = 0; i < this.childs.length; i++) {
                if (this.childs[i] === scene) {
                    return;
                }
            }
            scene.addTo(this);
            this.childs.push(scene);
        };
        //****************************************************************
        //* 对象初始化
        //****************************************************************
        var that = this;
        if (null != canvas) {
            this.initialize(canvas);
        }
        // 屏蔽右键
        document.oncontextmenu = function () {
            return false;
        };

        this.start();
    };

    // 原型链
    $$.Stage.prototype = {
        get width() {
            return this.canvas.width;
        },
        get height() {
            return this.canvas.height;
        }
    };
})(JTopo);