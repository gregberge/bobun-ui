module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        options: {
          force: false
        },
        files: {
          src: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        }
      }
    },

    karma: {
      'default': {
        configFile: 'test/karma.conf.js'
      },
      single: {
        configFile: 'test/karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['karma:default']);
  grunt.registerTask('test:single', ['karma:single']);
};