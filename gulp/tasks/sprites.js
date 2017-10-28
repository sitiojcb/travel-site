var gulp  	 	 = require('gulp'),
	svgSprite	 = require('gulp-svg-sprite'),
	rename		 = require('gulp-rename'),
	del			 = require('del');

// esta variable es un objeto por eso los {}
var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprites.css'
				}
			}
		}
	}
}
	// instalo sobre createSprite, en icons lo ejecuto primero
	gulp.task('beginClean', function() {
		return del(['./app/temp/sprite', './app/assets/images/sprites']);
	});
	// agrego beginClean como dependencia
	gulp.task('createSprite', ['beginClean'], function() {

		return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));


	});

   gulp.task('copySpriteGraphic', ['createSprite'], function() {
   	return gulp.src('./app/temp/sprite/css/**/*.svg')
   	.pipe(gulp.dest('./app/assets/images/sprites'));

   });
// entre corchetes es la dependencia, es decir corre primero createSprite
	gulp.task('copySpriteCss', ['createSprite'], function () {

		return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));

	});

	// es para que borre el archivo en temp
	gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCss'] , function() {
		return del(['./app/temp/sprite']);
	});

// en lugar de ejecutar tareas en forma individual como por ejemplo
// gulp createSprite... lo hago  de esta manera...
	gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCss', 'endClean']);