/*jshint undef:false */

// base path, that will be used to resolve files and exclude
basePath = '../';

// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/chai/chai.js',
  'node_modules/sinon/pkg/sinon.js',
  'bower_components/jquery/jquery.js',
  'node_modules/chai-jquery/chai-jquery.js',

  'bower_components/underscore/underscore.js',
  'bower_components/backbone/backbone.js',
  'bower_components/bootstrap/docs/assets/js/bootstrap.js',
  'bower_components/backbone.babysitter/src/childviewcontainer.js',
  'bower_components/bobun/bobun.js',

  'src/modal.js',
  'src/button.js',
  'src/input.js',
  'src/icon-button.js',
  'src/dropdown.js',
  'src/label.js',
  'src/select.js',

  {pattern: 'test/fixtures/**/*', included: false, watched: true, served: true},
  'test/unit/**/*'
];

// list of files to exclude
exclude = [];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;