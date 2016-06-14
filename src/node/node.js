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