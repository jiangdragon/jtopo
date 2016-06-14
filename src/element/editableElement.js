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