'use strict'

module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

  	htmlhint: {
  		templates: {
  			options: {
  				'title-require': true,
  				'attr-lower-case': true,
  				'attr-no-duplication': true,
  				'attr-value-double-quotes': true,
  				'tag-pair': true,
  				'tag-self-close': true,
  				'tagname-lowercase': true,
  				'id-class-value': true,
  				'id-class-unique': true,
  				'src-not-empty': true,
  				'img-alt-required': true,
  				'spec-char-escape': true
  			},
  			src: ['index.html']
  		}
  	},

  	sass: {
  		dist: {
  			files: {
  				'css/main.css' : 'css/scss/main.scss'
  			}
  		}
  	},

  	watch: {
  		css: {
  			files: '**/*.scss',
  			tasks: ['sass']
  		}
  	}

  });

  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};