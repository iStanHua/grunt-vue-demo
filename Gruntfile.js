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
                    port: 1688,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, 'dev')];
                    }
                }
            },
            dest: {
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
                    cwd: '<%= pkg.config.src %>',
                    livereload: LIVERELOAD_PORT
                },
                files: ['**/*.html', 'less/**/*.less', 'js/**/*.js', 'images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: [
                    'clean:dev',
                    'less',
                    'copy:lib',
                    'copy:tmp',
                    'copy:dev',
                    'useminPrepare',
                    'concat',
                    'filerev',
                    'usemin',
                    'clean:tmp'
                ]
            },
            dest: {
                options: {
                    cwd: '<%= pkg.config.src %>',
                    livereload: LIVERELOAD_PORT
                },
                files: ['**/*.html', 'less/**/*.less', 'js/**/*.js', 'images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: [
                    'clean:dest',
                    'less',
                    'copy:lib',
                    'uglify',
                    'copy:dev',
                    'useminPrepare',
                    'concat',
                    'filerev',
                    'usemin',
                    'clean:tmp',
                    'copy:dest',
                    'cssmin',
                    'imagemin',
                    'htmlmin',
                    'clean:dev2'
                ]
            }
        },
        clean: {
            tmp: ['.tmp'],
            dev: ['.tmp', '<%= pkg.config.dest %>', '<%= pkg.config.dev %>'],
            dest: ['.tmp', '<%= pkg.config.dev %>', '<%= pkg.config.dest %>/'],
            dev2: ['<%= pkg.config.dev %>']
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.src %>/less',
                    src: ['{,*/}*.less', '!{,*/}global.less', '!{,*/}mod-**.less'],
                    dest: '<%= pkg.config.tmp %>/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            lib: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src %>/js',
                    src: ['lib/*.js'],
                    dest: '<%= pkg.config.tmp %>/js',
                    filter: 'isFile'
                }]
            },
            tmp: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src %>/js',
                    src: ['*.js'],
                    dest: '<%= pkg.config.tmp %>/js',
                    filter: 'isFile'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src %>',
                    src: ['**/*', '!less/**/*.less', '!js/**/*.js'],
                    dest: '<%= pkg.config.dev %>',
                    filter: 'isFile'
                }]
            },
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.dev %>',
                    src: ['**/*', '!css/**/*.css', '!images/**/*.{png,jpg,jpeg,gif,webp}'],
                    dest: '<%= pkg.config.dest %>',
                    filter: 'isFile'
                }]
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= pkg.config.src %>/js',
                    dest: '<%= pkg.config.tmp %>/js',
                    src: ['{,*/}*.js', '!lib/{,*/}*.js'],
                    filter: 'isFile'
                }]
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.config.dev %>/css',
                    src: ['**/*.css'],
                    dest: '<%= pkg.config.dest %>/css'
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
                src: '<%= pkg.config.dev %>/css/**/*.css'
            },
            js: {
                src: ['<%= pkg.config.dev %>/js/**/*.js', '!<%= pkg.config.dev %>/js/lib/*.js']
            }
        },
        useminPrepare: {
            options: {
                root: '<%= pkg.config.tmp %>',
                dest: '<%= pkg.config.dev %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['concat']
                        },
                        post: {}
                    }
                }
            },
            html: ['<%= pkg.config.dev %>/**/*.html']
        },
        usemin: {
            options: {
                assetsDirs: [
                    '<%= pkg.config.dev %>/',
                    '<%= pkg.config.dev %>/css/',
                    '<%= pkg.config.dev %>/js/'
                ]
            },
            css: ['<%= pkg.config.dev %>/css/**/*.css'],
            html: ['<%= pkg.config.dev %>/**/*.html']
        },
        htmlmin: {
            dest: {
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
                    { expand: true, cwd: '<%= pkg.config.src %>', src: ['**'], dest: '<%= pkg.name%>/<%= pkg.config.src %>/' },
                    { src: ['Gruntfile.js', 'package.json', 'README.md', 'LICENSE'], dest: '<%= pkg.name%>/' }
                ]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'server');

    return grunt.registerTask('server', function(target) {
        if (target !== 'dest') {
            console.log('Development Server Mode...');
            return grunt.task.run([
                'clean:dev',
                'less',
                'copy:lib',
                'copy:tmp',
                'copy:dev',
                'useminPrepare',
                'concat',
                'filerev',
                'usemin',
                'clean:tmp',
                'connect:dev',
                'watch:dev'
            ]);
        } else {
            console.log('Destroduction Server Mode...');
            return grunt.task.run([
                'clean:dest',
                'less',
                'copy:lib',
                'uglify',
                'copy:dev',
                'useminPrepare',
                'concat',
                'filerev',
                'usemin',
                'clean:tmp',
                'copy:dest',
                'cssmin',
                'imagemin',
                'htmlmin',
                'clean:dev2',
                'connect:dest',
                'watch:dest'
            ]);
        }
    });
};