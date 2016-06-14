$(document).ready(function () {
    var canvas = document.getElementById('canvas');
    var stage = new JTopo.Stage(canvas);
    //显示工具栏
    showJTopoToobar(stage);
    stage.eagleEye.visible = true;

    var scene = new JTopo.Scene(stage);
    scene.background = './img/bg.jpg';


    // 向场景增加节点
    for(var i= 0; i<500; i++){
        var node = new JTopo.Node('' + i);
        node.shadow = false;
        node.setSize(30, 30);
        node.rotate = Math.random(); // 旋转角度
        node.textPosition = "Middle_Center";
        var s = 2;
        var x = Math.random() * stage.width * s - Math.random() * stage.width * s;
        var y = Math.random() * stage.height * s - Math.random() * stage.height * s;
        node.setLocation(x, y);
        node.fillColor = JTopo.util.randomColor();

        scene.add(node);
    };

    // 节点
    function newNode(x, y, w, h, text) {
        var node = new JTopo.Node(text);
        node.setLocation(x, y);
        node.setSize(w || 30, h || 30);
        scene.add(node);
        return node;
    }

    //var node = newNode(409, 269, null, null, "Hello");
    //
    //var from = newNode(550, 400, 30, 30, "from");
    //var to = newNode(650, 300, 30, 30, "to");
    //
    //var link = new JTopo.CurveLink(from, to, "curve");
    //link.lineWidth = 3; // 线宽
    //link.arrowsRadius = 20;
    //scene.add(link);

});