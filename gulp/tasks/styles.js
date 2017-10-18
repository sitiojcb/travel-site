// necesito las variables
var gulp  	 	 = require('gulp'),
	postscss 	 = require ('gulp-postcss'),
	autoprefixer = require ('autoprefixer'),
	cssvars 	 = require ('postcss-simple-vars'),
	nested		 = require ('postcss-nested'),
	cssImport	 = require ('postcss-import'),
	mixins	 	 = require ('postcss-mixins');

gulp.task('styles', function(){
	// console.log('Imagine sass and postCss...');
	// agregar cssImport al comienzo !
return gulp.src('./app/assets/styles/styles.css')
		.pipe(postscss([cssImport, mixins, cssvars, nested, autoprefixer]))
		.on('error', function(errorInfo) {
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'))
		;
	
});