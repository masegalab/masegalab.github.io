module.exports = function(grunt) {

    // Initialize the grunt configuration
    grunt.initConfig({

        // Import the package configuration
        pkg: grunt.file.readJSON('package.json'),

        less : {
            masega: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'assets/css/masega.css': 'src/less/masega.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['less']
            }
        }

    });

    // Node Packages
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('build', ['less']);
    grunt.registerTask('default', ['build']);
};