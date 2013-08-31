// http://integralist.co.uk/Grunt-Boilerplate.html

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    plPaths: grunt.file.readJSON('grunt_paths.json'),

    clean: {
      // https://npmjs.org/package/grunt-contrib-clean
      default: [
        '<%= plPaths.dst.less %>/pipelines.min.css'
      ]
    },
    
    uglify: {
      // https://github.com/gruntjs/grunt-contrib-uglify
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      default: {
        files: {
          '<%= plPaths.dst.js %>/pipelines.min.js': ['<%= plPaths.src.js %>/pipelines.js']
        }
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
  grunt.registerTask('default', ['clean', 'uglify', 'less']);
};

// http://chrisawren.com/posts/Advanced-Grunt-tooling