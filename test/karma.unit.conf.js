module.exports = function(config) {
    // console.log("config", config);
    config.set({
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        files: [
            "../src/public/js/**/*.js",
            "../src/js/**/*.js",
            "./unit/**/*.spec.js"
        ],
        reporters: [
            'coverage',
            'mocha',
            'verbose-summary'
        ],
        preprocessors: {
            'src/public/js/App.js': [
                'coverage'
            ]
        },
        coverageReporter: {
            type: 'html',
            dir: 'unit-report/coverage/'
        },
        exclude: [],
        client: {
            mocha: {
                reporter: "html"
            }
        },
        port: 8800,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: [
            'Chrome',
            //'Firefox',
            //'PhantomJS'
        ],
        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            "karma-coverage",
            "karma-verbose-reporter",
            "karma-verbose-summary-reporter",
            "karma-chrome-launcher",
            "karma-sinon-chai"
        ],
        chai: {
            includeStack: true
        },
        browserDisconnectTimeout: 2000 * 10,
        browserNoActivityTimeout: 2000 * 10,
        processKillTimeout: 2000*10,
        singleRun: true
    });
};