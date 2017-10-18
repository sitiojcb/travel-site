var gulp  	 	 = require('gulp'),
	watch 	 	 = require('gulp-watch'),
	browserSync	 = require ('browser-sync').create();// solo quiero el metodo create

// recordar que si da error watch entonces corta.... y hay que volver a dar el comando gulp watch
gulp.task('watch', function(){

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function(){
		// para detenerlo ctrl c
		// gulp.start('html');
		browserSync.reload();
	});
// puedo hacer ver diferentes files...
	watch('./app/assets/styles/**/*.css', function() {
		// gulp.start('styles'); cambio y ahora cada cambio dispara la func cssInject
		gulp.start('cssInject');
	});
});

// otro task
// entre [son las dependencias]. esto signiffica que la funcion en este caso cssInject se ejecuta cuando
// styles se lleve a cabo
gulp.task('cssInject',['styles'] ,function() {
	return gulp.src('./app/temp/styles/styles.css').
	pipe(browserSync.stream());
});