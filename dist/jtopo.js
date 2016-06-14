/**
 * JTOPO 0.4.8_01
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @build 2016-03-22
 */

/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/17
 */
(function (window) {
    var JTopo = {
        version: "0.1.0",
        zIndex_Container: 1,
        zIndex_Link: 2,
        zIndex_Node: 3,
        SceneMode: {
            normal: "normal",
            drag: "drag",
            edit: "edit",
            select: "select"
        },
        MouseCursor: {}
    };

    window.JTopo = JTopo;
})(window);

/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/17
 */
(function ($$) {

    $$.Element = function () {

        this.initialize = function () {
            this.elementType = "element";
            this.serializedProperties = ["elementType"];
            this.propertiesStack = [];
            this._id = "" + (new Date).getTime();
        };

        this.distroy = function () {
        };

        this.removeHandler = function () {
        };
        /**
         * 属性 get and set.
         * @param name 属性名
         * @param val 属性值
         * @returns {*}
         */
        this.attr = function (name, val) {
            if (null != name && null != val) {
                this[name] = val;
            } else if (null != name) {
                return this[name];
            }
            return this;
        };
    };
})(JTopo);

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
/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/17
 */
(function ($$) {
    $$.Scene = function (stage) {
        this.initialize = function () {
            $$.Scene.prototype.initialize.apply(this, arguments);
            //this.messageBus = new $$.util.MessageBus();
            this.elementType = "scene";
            this.childs = [];
            this.zIndexMap = {};
            this.zIndexArray = [];
            this.backgroundColor = "255,255,255";
            this.visible = true;
            this.alpha = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.mode = $$.SceneMode.normal;
            this.translate = true;
            this.translateX = 0;
            this.translateY = 0;
            this.lastTranslateX = 0;
            this.lastTranslateY = 0;
            this.mouseDown = false;
            this.mouseDownX = null;
            this.mouseDownY = null;
            this.mouseDownEvent = null;
            this.areaSelect = true;
            this.operations = [];
            this.selectedElements = [];
            this.paintAll = false;
        };
        this.addTo = function (stage) {
            if (null != stage && this.stage !== stage) {
                this.stage = stage;
            }
        };
        this.paint = function (graphics) {
            if (this.visible == true && null != this.stage) {
                graphics.save();
                this.paintBackgroud(graphics);
                graphics.restore();
                graphics.save();
                graphics.scale(this.scaleX, this.scaleY);
                if (true == this.translate) {
                    var translate = this.getOffsetTranslate(graphics);
                    graphics.translate(translate.translateX, translate.translateY);
                }
                this.paintChilds(graphics);
                graphics.restore();
                //graphics.save();
                //this.paintOperations(graphics, this.operations);
                //graphics.restore();
            }
        };

        this.repaint = function (graphics) {
            if (this.visible == true) {
                this.paint(graphics)
            }
        };
        /**
         * 绘制背景
         * @param graphics
         */
        this.paintBackgroud = function (graphics) {
            var width = graphics.canvas.width;
            var height = graphics.canvas.height;
            //console.log(this.background);
            if (null != this.background) {
                graphics.drawImage(this.background, 0, 0, width, height);
            } else {
                graphics.beginPath();
                graphics.fillStyle = "rgba(" + this.backgroundColor + "," + this.alpha + ")";
                graphics.fillRect(0, 0, width, eight);
                graphics.closePath();
            }
        };

        this.paintChilds = function (graphics) {
            for (var i = 0; i < this.zIndexArray.length; i++) {
                var elementZIndex = this.zIndexArray[i];
                var elements = this.zIndexMap[elementZIndex];
                for (var j = 0; j < elements.length; j++) {
                    var element = elements[j];
                    if (this.paintAll == true || this.isVisiable(element)) {
                        graphics.save();
                        if (element.transformAble == true) {
                            var cLocation = element.getCenterLocation();
                            graphics.translate(cLocation.x, cLocation.y);
                            if (element.rotate) {
                                graphics.rotate(element.rotate);
                            }
                            //var scaleX =  element.scaleX ? element.scaleX : 1;
                            //var scaleY =  element.scaleY ? element.scaleY : 1;
                            graphics.scale(element.scaleX || 1, element.scaleY || 1);
                        }
                        element.paint(graphics);
                        graphics.restore();
                    }
                }
            }

            //for (var c = 0; c < this.zIndexArray.length; c++)for (var d = this.zIndexArray[c], e = this.zIndexMap[d], f = 0; f < e.length; f++) {
            //    var g = e[f];
            //    if (1 == this.paintAll || this.isVisiable(g)) {
            //        if (b.save(), 1 == g.transformAble) {
            //            var h = g.getCenterLocation();
            //            b.translate(h.x, h.y), g.rotate && b.rotate(g.rotate), g.scaleX && g.scaleY ? b.scale(g.scaleX, g.scaleY) : g.scaleX ? b.scale(g.scaleX, 1) : g.scaleY && b.scale(1, g.scaleY)
            //        }
            //        1 == g.shadow && (b.shadowBlur = g.shadowBlur, b.shadowColor = g.shadowColor, b.shadowOffsetX = g.shadowOffsetX, b.shadowOffsetY = g.shadowOffsetY), g instanceof a.InteractiveElement && (g.selected && 1 == g.showSelected && g.paintSelected(b), 1 == g.isMouseOver && g.paintMouseover(b)), g.paint(b), b.restore()
            //    }
            //}
        };
        this.getOffsetTranslate = function (graphics) {
            var width = this.stage.canvas.width;
            var height = this.stage.canvas.height;
            if (null != graphics && "move" != graphics) {
                width = graphics.canvas.width;
                height = graphics.canvas.height;
            }
            var scaleX = width / this.scaleX / 2;
            var scaleY = height / this.scaleY / 2;
            var translate = {
                translateX: this.translateX + (scaleX - scaleX * this.scaleX),
                translateY: this.translateY + (scaleY - scaleY * this.scaleY)
            };
            return translate;
        };


        this.isVisiable = function (element) {
            if (element.visible == false) {
                return false;
            }
            //if (element instanceof $$.Link) {
            //    return true;
            //}
            // 可视范围外不渲染
            //var c = this.getOffsetTranslate(), d = element.x + c.translateX, e = element.y + c.translateY;
            //d *= this.scaleX, e *= this.scaleY;
            //var f = d + element.width * this.scaleX, g = e + element.height * this.scaleY;
            //return d > this.stage.canvas.width || e > this.stage.canvas.height || 0 > f || 0 > g ? !1 : !0
            return true;
        };

        //****************************************************************
        //* 公共API
        //****************************************************************
        this.add = function (element) {
            this.childs.push(element);
            if (this.zIndexMap[element.zIndex] == null) {
                this.zIndexMap[element.zIndex] = [];
                this.zIndexArray.push(element.zIndex);
                this.zIndexArray.sort(function (a, b) {
                    return a - b;
                });
            }
            this.zIndexMap["" + element.zIndex].push(element);
        };

        //****************************************************************
        //* 对象初始化
        //****************************************************************
        var that = this;
        this.initialize();

        if (null != stage) {
            stage.add(this);
            this.addTo(stage);
        }
    };

    $$.Scene.prototype = new $$.Element();
    // 钩子
    var c = {};
    Object.defineProperties($$.Scene.prototype, {
        background: {
            get: function () {
                return this._background;
            },
            set: function (src) {
                if ("string" == typeof src) {
                    var img = c[src];
                    if (null == img) {
                        img = new Image();
                        img.src = src;
                        img.onload = function () {
                            c[src] = img;
                        }
                    }
                    this._background = img;
                } else {
                    this._background = src;
                }
            }
        }
    });

})(JTopo);
/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/21
 */
(function ($$) {

    $$.DisplayElement = function () {

        this.initialize = function () {
            // 父类调用
            $$.DisplayElement.prototype.initialize.apply(this, arguments);

            this.elementType = "displayElement";
            this.x = 0;
            this.y = 0;
            this.width = 32;
            this.height = 32;
            this.visible = true;
            this.alpha = 1;
            this.rotate = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.strokeColor = "22,124,255";
            this.borderColor = "22,124,255";
            this.fillColor = "22,124,255";
            this.shadow = false;
            this.shadowBlur = 5;
            this.shadowColor = "rgba(0,0,0,0.5)";
            this.shadowOffsetX = 3;
            this.shadowOffsetY = 6;
            this.transformAble = false;
            this.zIndex = 0;
        };

        this.paint = function (graphics) {
            graphics.beginPath();
            graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
            graphics.rect(-this.width / 2, -this.height / 2, this.width, this.height);
            graphics.fill();
            graphics.stroke();
            graphics.closePath();
        };

        this.getLocation = function () {
            return {x: this.x, y: this.y};
        };
        //****************************************************************
        //* 公共API
        //****************************************************************
        this.setLocation = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        this.getCenterLocation = function () {
            var result = {
                x: this.x + this.width / 2,
                y: this.y + this.height / 2
            };

            return result;
        }
        //****************************************************************
        //* 对象初始化
        //****************************************************************
        this.initialize(arguments);
        // 钩子
        Object.defineProperties($$.DisplayElement.prototype, {
            cx: {
                get: function () {
                    return this.x + this.width / 2
                }, set: function (a) {
                    this.x = a - this.width / 2
                }
            }, cy: {
                get: function () {
                    return this.y + this.height / 2
                }, set: function (a) {
                    this.y = a - this.height / 2
                }
            }
        });

    };


    $$.DisplayElement.prototype = new $$.Element();
})(JTopo);
/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/21
 */
(function ($$) {

    $$.InteractiveElement = function () {

        this.initialize = function () {
            // 父类调用
            $$.InteractiveElement.prototype.initialize.apply(this, arguments);
            this.elementType = "interactiveElement";
            this.dragable = false;
            this.selected = false;
            this.showSelected = true;
            this.selectedLocation = null;
            this.isMouseOver = false;
        };

        //****************************************************************
        //* 对象初始化
        //****************************************************************
        this.initialize(arguments);
    };

    $$.InteractiveElement.prototype = new $$.DisplayElement();

})(JTopo);

/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/21
 */
(function ($$) {

    $$.EditableElement = function () {
        this.initialize = function () {
            // 父类调用
            $$.InteractiveElement.prototype.initialize.apply(this, arguments);
            this.editAble = false;
            this.selectedPoint = null;
        };

        //****************************************************************
        //* 对象初始化
        //****************************************************************
        this.initialize(arguments);
    };

    $$.EditableElement.prototype = new $$.InteractiveElement();

})(JTopo);
/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/21
 */
(function ($$) {

    $$.Node = function (text) {
        this.initialize = function (text) {
            this.elementType = "node";
            this.zIndex = $$.zIndex_Node;
            this.text = text;
            this.font = "12px Consolas";
            this.fontColor = "255,255,255";
            this.borderWidth = 0;
            this.borderColor = "255,255,255";
            this.borderRadius = null;
            this.dragable = true;
            this.textPosition = "Bottom_Center";
            this.textOffsetX = 0;
            this.textOffsetY = 0;
            this.transformAble = true,
            this.inLinks = null;
            this.outLinks = null;
        };

        this.paint = function (graphics) {//graphics
            if (this.image) {
                //var alpha = graphics.globalAlpha;
                //graphics.globalAlpha = this.alpha;
                //
                //if (null != this.alarmImage && null != this.alarm) {
                //    graphics.drawImage(this.alarmImage, -this.width / 2, -this.height / 2, this.width, this.height);
                //} else {
                //    graphics.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
                //    graphics.globalAlpha = alpha;
                //}
            } else {
                graphics.beginPath();
                graphics.fillStyle = "rgba(" + this.fillColor + "," + this.alpha + ")";
                if (null == this.borderRadius || 0 == this.borderRadius) {
                    graphics.rect(-this.width / 2, -this.height / 2, this.width, this.height);
                } else {
                    //graphics.JTopoRoundRect(-this.width / 2, -this.height / 2, this.width, this.height, this.borderRadius);
                }
                graphics.fill();
                graphics.closePath();
                this.paintText(graphics);
                //this.paintBorder(graphics);
                //this.paintCtrl(graphics);
                //this.paintAlarmText(graphics);
            }
        };
        this.paintText = function (graphics) {
            var text = this.text;
            if (null != text && "" != text) {
                graphics.beginPath();
                graphics.font = this.font;
                var width = graphics.measureText(text).width;
                var height = graphics.measureText("拓扑").width;
                var textPostion = this.getTextPostion(this.textPosition, width, height);
                graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
                graphics.fillText(text, textPostion.x, textPostion.y);
                graphics.closePath();
            }
        };
        this.getTextPostion = function (textPostion, x, y) {
            var xx = yy = 0;
            if (null == textPostion || "Bottom_Center" == textPostion) {
                xx = -this.width / 2 + (this.width - x) / 2;
                yy = this.height / 2 + y;
            } else if ("Top_Center" == textPostion) {
                xx = -this.width / 2 + (this.width - x) / 2;
                yy = -this.height / 2 - y / 2;
            } else if ("Top_Right" == textPostion) {
                xx = this.width / 2;
                yy = -this.height / 2 - y / 2;
            } else if ("Top_Left" == textPostion) {
                xx = -this.width / 2 - b;
                yy = -this.height / 2 - c / 2;
            }

            if (null != this.textOffsetX) {
                xx += this.textOffsetX;
            }

            if (null != this.textOffsetY) {
                yy += this.textOffsetY;
            }
            return {
                x: xx,
                y: yy
            };
            //var d = null;
            //return null == a || "Bottom_Center" == a ? d = {
            //    x: -this.width / 2 + (this.width - b) / 2,
            //    y: this.height / 2 + c
            //} : "Top_Center" == a ? d = {
            //    x: -this.width / 2 + (this.width - b) / 2,
            //    y: -this.height / 2 - c / 2
            //} : "Top_Right" == a ? d = {
            //    x: this.width / 2,
            //    y: -this.height / 2 - c / 2
            //} : "Top_Left" == a ? d = {
            //    x: -this.width / 2 - b,
            //    y: -this.height / 2 - c / 2
            //} : "Bottom_Right" == a ? d = {
            //    x: this.width / 2,
            //    y: this.height / 2 + c
            //} : "Bottom_Left" == a ? d = {
            //    x: -this.width / 2 - b,
            //    y: this.height / 2 + c
            //} : "Middle_Center" == a ? d = {
            //    x: -this.width / 2 + (this.width - b) / 2,
            //    y: c / 2
            //} : "Middle_Right" == a ? d = {
            //    x: this.width / 2,
            //    y: c / 2
            //} : "Middle_Left" == a && (d = {
            //    x: -this.width / 2 - b,
            //    y: c / 2
            //}), null != this.textOffsetX && (d.x += this.textOffsetX), null != this.textOffsetY && (d.y += this.textOffsetY), d
        };

        //****************************************************************
        //* 对象初始化
        //****************************************************************
        $$.Node.prototype.initialize.apply(this, [text]);
        this.initialize(text);
    };


    $$.Node.prototype = new $$.EditableElement();
    //$$.Node.prototype = {
    //    initialize: function (c) {
    //b.prototype.initialize.apply(this, arguments), this.elementType = "node", this.zIndex = a.zIndex_Node, this.text = c, this.font = "12px Consolas", this.fontColor = "255,255,255", this.borderWidth = 0, this.borderColor = "255,255,255", this.borderRadius = null, this.dragable = !0, this.textPosition = "Bottom_Center", this.textOffsetX = 0, this.textOffsetY = 0, this.transformAble = !0, this.inLinks = null, this.outLinks = null;
    //var d = "text,font,fontColor,textPosition,textOffsetX,textOffsetY,borderRadius".split(",");
    //this.serializedProperties = this.serializedProperties.concat(d)
    //    }
    //};

})
(JTopo);