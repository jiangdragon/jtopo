/**
 * @author 傻大
 * @Email jiangdragon@126.com | jiang_long@topsec.com.cn
 * @Time 2016/3/21
 */
module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("./src/copy.js")
            .replace(/@VERSION/, pkg.version)
            .replace(/@DATE/, grunt.template.today("yyyy-mm-dd")) + "\n",
        // Task configuration.
        concat: {
            options: {
                banner: "<%= banner %>"
            },
            target: {
                dest: "dist/jtopo.js",
                src: [
                    "./src/jtopo.js",
                    "./src/element/element.js",
                    "./src/stage.js",
                    "./src/scene.js",
                    "./src/element/displayElement.js",
                    "./src/element/interactiveElement.js",
                    "./src/element/editableElement.js",
                    "./src/node/node.js"
                ]
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>",
                report: "min"
            },
            dist: {
                src: "<%= concat.target.dest %>",
                dest: "dist/jtopo-min.js"
            }
        },
        clean: {
            contents: ['dist/*']
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["clean", "concat", "uglify"]);
}