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
