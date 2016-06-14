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