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
    },

    clean: ['dist'],

    concat: {
      'default': {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - https://github.com/neoziro/bobun-ui */\n'
        },
        files: {
          'dist/bobun-ui.js': 'src/**/*.js'
        }
      }
    },

    uglify: {
      'default': {
        options: {
          sourceMap: 'dist/bobun-ui.min.map',
          sourceMappingURL: 'bobun-ui.min.map'
        },
        files: {
          'dist/bobun-ui.min.js': 'dist/bobun-ui.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'karma:single', 'clean', 'concat', 'uglify']);
  grunt.registerTask('test', ['karma:default']);
  grunt.registerTask('test:single', ['karma:single']);
};