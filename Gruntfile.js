// http://integralist.co.uk/Grunt-Boilerplate.html

var basePaths = require('./grunt_paths.json');
var files = require('./thirdparty/angularjs/angularFiles.js').files;

var angularSrcFiles = new Array();
for(var i = 0; i < files.angularSrc.length; i++) {
  angularSrcFiles.push(basePaths.src.angular + '/' + files.angularSrc[i]);
}

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    plPaths: grunt.file.readJSON('grunt_paths.json'),

    clean: {
      // https://npmjs.org/package/grunt-contrib-clean
      default: [
        '<%= plPaths.dst.less %>/pipelines.min.css',
        '<%= plPaths.dst.js %>/angular.min.js'
      ]
    },
    
    uglify: {
      // https://github.com/gruntjs/grunt-contrib-uglify
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      default: {
        files: {
          '<%= plPaths.dst.js %>/pipelines.min.js': ['<%= plPaths.src.js %>/pipelines.js'],
          '<%= plPaths.dst.js %>/angular.min.js': [angularSrcFiles],
        }
      }
    },
    
    copy: {
      // https://github.com/gruntjs/grunt-contrib-copy
      default: {
        files: [
          { flatten: true, src: ['<%= plPaths.misc.bootstrapDist %>/css/bootstrap.min.css'], dest: '<%= plPaths.dst.css %>/bootstrap.min.css' },
          { flatten: true, src: ['<%= plPaths.misc.bootstrapDist %>/css/bootstrap-theme.min.css'], dest: '<%= plPaths.dst.css %>/bootstrap-theme.min.css' },
          { flatten: true, src: ['<%= plPaths.misc.bootstrapDist %>/js/bootstrap.min.js'], dest: '<%= plPaths.dst.js %>/bootstrap.min.js' }   
                   
                   
        ]
      }
    },
    
    less: {
      // https://npmjs.org/package/grunt-contrib-less
      options: {
        paths: ['<%= plPaths.src.less %>'],
        compress: true,
        yuicompress: true
      },
      default: {
        files: {
          '<%= plPaths.dst.less %>/pipelines.min.css': '<%= plPaths.src.less %>/pipelines.less'
        }
      }
    },

    watch: {
      default: {
        files: [
          '<%= plPaths.src.less %>/*.less',
          '<%= plPaths.src.js %>/*.js'
        ],
        tasks: 'default'
      }
    }
                   
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //grunt.registerTask('release', ['clean', 'less', 'uglify', 'assemble', 'copy']);
  grunt.registerTask('default', ['clean', 'uglify', 'less', 'copy']);
};

// http://chrisawren.com/posts/Advanced-Grunt-tooling