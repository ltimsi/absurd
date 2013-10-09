'use strict';

var fs = require("fs");

module.exports = function(grunt) {
    grunt.registerMultiTask('client-side', 'generate client-side version of the library', function() {
        
        var tmp = grunt.file.read(this.data.src, {});
    	var content = '';

    	content = "var Absurd = (function(w) {\n";

        if(fs.existsSync(__dirname + "/client-side-libs")) {
			var libs = fs.readdirSync(__dirname + "/client-side-libs");
			for(var i=0; i<libs.length; i++) {
				var fileContent = fs.readFileSync(__dirname + "/client-side-libs/" + libs[i], {encoding: 'utf8'});
				content += fileContent + ";\n";
			}
		}

        content += tmp;
        content += ';\nreturn client();\n';
        content += '})(window);';

        grunt.file.write(this.data.dest, content, {});

    });
};