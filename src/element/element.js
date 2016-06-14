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
