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