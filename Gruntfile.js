'use strict';

var LIVERELOAD_PORT, folderMount, lrSnippet;

LIVERELOAD_PORT = 35729;

lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});

folderMount = function(connect, base) {
    return connect['static'](require('path').resolve(base));
};

module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                open: true,
                hostname: 'localhost'
            },
            dev: {
                options: {
                    port: 9000,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, 'src')];
                    }
                }
            },
            dist: {
                options: {
                    port: 8000,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, 'dist')];
                    }
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            dev: {
                options: {
                    cwd: '<%= pkg.config.dev %>',
                    livereload: LIVERELOAD_PORT
                },
                files: ['**/*.html', 'less/**/*.less', 'js/**/*.js', 'images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: ['clean:dev', 'less']
            },
            dist: {
                options: {
                    cwd: '<%= pkg.config.dev %>',
                    livereload: LIVERELOAD_PORT
                },
                files: ['**/*.html', 'less/**/*.less', 'js/**/*.js', 'images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: ['clean:dest', 'less', 'copy', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']
            }
        },
        clean: {
            dev: ['.tmp', '<%= pkg.config.dev %>/css'],
            dest: ['.tmp', '<%= pkg.config.dest %>']
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dev %>/less',
                    src: ['{,*/}*.less', '!{,*/}global.less', '!{,*/}mod-**.less'],
                    dest: '<%= pkg.config.dev %>/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.dev %>',
                    dest: '<%= pkg.config.dest %>',
                    src: ['**/*', '!less/**/*', '!css/**/*', '!js/**/*', '!images/**/*.{png,jpg,jpeg,gif,webp}'],
                    filter: 'isFile'
                }]
            }
        },
        imagemin: {
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dev %>/images',
                    src: ['**/*.{png,jpg,jpeg,gif,webp}'],
                    dest: '<%= pkg.config.dest %>/images'
                }]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            css: {
                src: '<%= pkg.config.dest %>/css/**/*.css'
            },
            js: {
                src: ['<%= pkg.config.dest %>/js/**/*.js', '!<%= pkg.config.dest %>/js/lib/*.js']
            }
        },
        useminPrepare: {
            options: {
                root: '<%= pkg.config.dev %>',
                dest: '<%= pkg.config.dest %>'
            },
            html: ['<%= pkg.config.dest %>/**/*.html']
        },
        usemin: {
            options: {
                assetsDirs: [
                    '<%= pkg.config.dest %>/',
                    '<%= pkg.config.dest %>/css/',
                    '<%= pkg.config.dest %>/js/'
                ]
            },
            css: ['<%= pkg.config.dest %>/css/**/*.css'],
            html: ['<%= pkg.config.dest %>/**/*.html']
        },
        htmlmin: {
            dist: {
                options: {
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dest %>',
                    src: ['**/*.html'],
                    dest: '<%= pkg.config.dest %>'
                }]
            }
        },
        compress: {
            pub: {
                options: {
                    archive: '<%= pkg.name%>-publish.zip'
                },
                files: [
                    { expand: true, cwd: '<%= pkg.config.dest %>', src: ['**'], dest: '<%= pkg.name%>' }
                ]
            },
            mas: {
                options: {
                    archive: '<%= pkg.name%>-master.zip'
                },
                files: [
                    { expand: true, cwd: '<%= pkg.config.dev %>', src: ['**'], dest: '<%= pkg.name%>/<%= pkg.config.dev %>/' },
                    { src: ['build.json'], dest: '<%= pkg.name%>/' },
                    { src: ['Gruntfile.js', 'package.json', 'README.md', 'LICENSE'], dest: '<%= pkg.name%>/' }
                ]
            }
        }
    });

    //modules load
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'server');

    return grunt.registerTask('server', function(target) {
        if (target !== 'dist') {
            console.log('Development Server Mode...');
            return grunt.task.run([
                'clean:dev',
                'less',
                'connect:dev',
                'watch:dev'
            ]);
        } else {
            console.log('Destroduction Server Mode...');
            return grunt.task.run([
                'clean:dest',
                'less',
                'copy',
                'imagemin',
                'useminPrepare',
                'concat',
                'uglify',
                'cssmin',
                'filerev',
                'usemin',
                'htmlmin',
                'connect:dist',
                'watch:dist'
            ]);
        }
    });
};