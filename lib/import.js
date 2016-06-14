/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2015/12/30
 */
function Import(path) {
    if (path.match(/\.js$/i)) {
        document.write("<script type=\"text/javascript\" src=\"" + path + "\"></script>");
    } else if (path.match(/\.css$/i)) {
        document.write("<style type=\"text/css\">@import " + "\"" + path + "\";</style>");
    }
}

//Import("./dist/jtopo.js");
Import("./src/jtopo.js");
Import("./src/element/element.js");

Import("./src/stage.js");
Import("./src/scene.js");

Import("./src/element/displayElement.js");
Import("./src/element/interactiveElement.js");
Import("./src/element/editableElement.js");

Import("./src/node/node.js");