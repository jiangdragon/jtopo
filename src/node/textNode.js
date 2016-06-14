/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/18
 */
(function ($$) {

    $$.TextNode = function (text) {
        this.text = text;
        this.elementType = "TextNode";
        /**
         * @private 绘制
         * @param a
         */
        this.paint = function (graphics) {
            graphics.beginPath();
            graphics.font = this.font;
            this.width = graphics.measureText(this.text).width;
            this.height = graphics.measureText("鐢�").width;
            graphics.strokeStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
            graphics.fillStyle = "rgba(" + this.fontColor + ", " + this.alpha + ")";
            graphics.fillText(this.text, -this.width / 2, this.height / 2);
            graphics.closePath();
            //this.paintBorder(graphics);
            //this.paintCtrl(graphics);
            //this.paintAlarmText(graphics);
        };

        //****************************************************************
        //* 对象初始化
        //****************************************************************
        this.initialize();
    };

})(JTopo);