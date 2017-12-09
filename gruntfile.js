/**
 * @description This function is the configuration of the Grunt Task Manager.
 * @type {Function}
 * @returns {Undefined}
 */
module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        jshint: {
            all: {
                src: [
                    "src/**/*.js",
                    "test/unit/**/*.espec.js",
                    "test/e2e/**/*.spec.js"
                ],
                options: {
                    ignores: ['node_modules', 'jquery.1.12.4.min.js'],
                    reporter: "checkstyle"
                }
            }
        },
        shell: {
            openapp: {
                command: 'sensible-browser http://localhost:8700/app',
                options: {
                    async: false
                }
            },
            testunit: {
                command: 'karma start test/karma.unit.conf.js',
                options: {
                    async: false
                }
            },
            testend: {
                command: 'casperjs test test/e2e/*.espec.js',
                options: {
                    async: false
                }
            },
            correct: {
                command: 'grunt jshint:all',
                options: {
                    async: false
                }
            },
            options: {
                stdout: true,
                stderr: true,
                failOnError: true
            },
            reset: {
            	command: 'rm -R test/e2e/*.espec.js && rm -R test/unit/*.spec.js && rm -R test/unit-report/*/* && rm -R docs/*',
            	options: {
            		async: false
            	}
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.registerTask('correct', [
        'jshint:all'
    ]);
    grunt.registerTask('start', 'Starts the server for the application to run', function() {
        var done = this.async();
        const SERVER_PORT = 8700;
        const STATIC_DIR = __dirname + '/src/public';
        const STATIC_ENDPOINT = '/app';
        const EXIT_ENDPOINT = '/exit';
        const express = require('express');
        const serve = require('express-static');
        const cors = require("cors");
        var app = express();
        var server = app.listen(SERVER_PORT, function() {
            console.log("Static server running at: %s", server.address().port);
            console.log("Current PID: " + process.pid);
        });
        app.use(STATIC_ENDPOINT, serve(STATIC_DIR));
        app.use(cors());
        app.get("/", function(req, res, next) {
            res.redirect(201, '/app');
        });
        app.get(EXIT_ENDPOINT, function(req, res, next) {
            res.end("The application will be turned OFF");
            setTimeout(function() {
                server.close();
                done();
            }, 0);
        });
    });
    grunt.registerTask('open', 'Opens the application with a browser', function() {

    });
    grunt.registerTask('testunit', 'Unit tests of the application', [
        'shell:testunit'
    ]);
    grunt.registerTask('testend', 'End-to-end tests of the application', [
        'shell:testend'
    ]);
    grunt.registerTask('test', 'All the tests of the application', [
        'shell:testend',
        'shell:testunit'
    ]);
    grunt.registerTask('reset', 'Removes the tests (e2e, unit) and the documentation.', [
    	'shell:reset'
    ]);
    grunt.registerTask('generatedocs', 'Generates the documentation from the application', function() {
        const FILES_PATTERN = "src/public/js/**/*.js";
        var globule = require("globule");
        var fs = require("fs");
        var newFiles = globule.find(FILES_PATTERN);
        var docComments = [];
        var extractDocumentationObject = function(matchedComment) {
            const DOCS_SPLITTER_TOKEN = /\n(?=[\t ]+\*[\t ]+\@)|(?=\/\*\*)/g;
            var docSubtokens = matchedComment.split(DOCS_SPLITTER_TOKEN);
            var docObject = {
                description: ""
            };
            var docPointer = "description";
            for (var a = 0; a < docSubtokens.length; a++) {
                var subtoken = docSubtokens[a];
                if (subtoken.match(/^[\t ]+\*[\t ]+[^@]/g)) {
                    subtoken = subtoken.replace(/^[\t ]+\*[\t ]+/g, '');
                    docObject[docPointer] += subtoken
                        .replace(/\n[\t ]+\*[\t\n ]+/g, ' ')
                        .replace(/\*\/$/g, '')
                        .replace(/[\n\t ]+$/g, '')
                        .trim();
                } else if (subtoken.match(/^[\t ]+\*[\t ]+\@/g)) {
                    subtoken = subtoken.replace(/^[\t ]+\*[\t ]+\@/g, '');
                    docPointer = subtoken.match(/^[^\n\t\r ]+/g)[0];
                    subtoken = subtoken.replace(/^[^\n\t\r ]+[\n\t\r ]+/g, '');
                    var docData = subtoken
                        .replace(/\n[\t ]+\*[\t\n ]+/g, ' ')
                        .replace(/\*\/$/g, '')
                        .replace(/[\n\t ]+$/g, '');
                    if (!(docPointer in docObject) || docObject[docPointer].length === 0) {
                        docObject[docPointer] = "";
                    } else {
                        docObject[docPointer] += " ";
                    }
                    docObject[docPointer] += docData.trim();
                } else if (subtoken.match(/^\/\*\*/g)) {
                    subtoken = subtoken.replace(/^\/\*\*[\t ]*/g, '');
                    docObject.description += subtoken.split(/\n[\t ]+\*[\t ]+/g).join(' ').trim();
                }
            }
            return docObject;
        }
        var extractDocumentation = function(input) {
            const DOC_TOKEN = /\/\*\*[\t\ \n]+([\t ]+\*([\t ]+\@?[^\n\t ]*([\t ][^\n]*)?)?[\n])*[\t ]+\*\//g;
            var data = [];
            var matches = input.match(DOC_TOKEN);
            console.log("  +-- Found " + matches.length + " document objects");
            for (var a = 0; a < matches.length; a++) {
                var match = matches[a];
                var item = extractDocumentationObject(match);
                data.push(item);
            }
            return data;
        };
        for (var a = 0; a < newFiles.length; a++) {
            var file = newFiles[a];
            console.log("+--+ Searching documentation in file: " + file);
            var contents = fs.readFileSync(file, "utf8");
            docComments.push({
                file: file,
                docs: extractDocumentation(contents)
            });
        }
        var path = "docs/documentation.json";
        console.log("Exporting doc-comments data to: " + path);
        fs.writeFileSync(path, JSON.stringify(docComments, null, 4), "utf8");
        console.log("Exported. Thanks.");
    });
    grunt.registerTask('compile', 'This process:'
        + '(0) bootstraps the application (and server)\n'
        + '(1) passes the end-to-end tests\n'
        + '(2) passes the unit tests\n'
        + '(3) generates the documentation\n'
        + '(4) simulates a push to Git', [

    ]);
};