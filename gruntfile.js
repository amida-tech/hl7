module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('default', ['jshint', 'jsbeautifier', 'run']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function () {
    grunt.log.subhead(Date());
  });

  grunt.initConfig({
    jshint: {
      files: ['./lib/*.js', './test/*.js', './test/**/*.js', 'gruntfile.js', 'package.json', 'index.js'],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        boss: true,
        eqnull: true,
        node: true,
        expr: true,
        globals: {
          'xit': true,
          'xdescribe': true,
          'it': true,
          'describe': true,
          'before': true,
          'after': true,
          'done': true
        }
      }
    },
    jsbeautifier: {
      files: ['Gruntfile.js', 'index.js', 'lib/*.js', 'test/**/*.js'],
      options: {
        config: '.jsbeautifyrc'
      }
    },
    watch: {
      all: {
        files: ['./lib/*.js', './test/*/*.js', 'index.js', 'gruntfile.js'],
        tasks: ['default']
      }
    },
    run: {
      jest: {
        exec: 'npx jest',
        args: ['test']
      }
    }
  });
};
