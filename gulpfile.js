const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
	return src('src/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist'))
}

function scss() {
	return src(['src/scss/normalize.scss', 'src/scss/jquery-ui.scss', 'src/scss/index.scss', 'src/scss/media.scss'])
		.pipe(sass()).on('error', sass.logError)
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions']
		}))
		.pipe(concat('index.css'))
		.pipe(dest('dist'))
}

function js() {
	return src('src/scripts/**.js')
		.pipe(concat('main.js'))
		.pipe(dest('dist/scripts'))
}

function assets() {
	return src('src/assets/**/**.**')
		.pipe(dest('dist/assets'))
}

function clear() {
	return del('dist')
}

function serve() {
	sync.init({
		server: {
			baseDir: './dist'
		}
	})

	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
	watch('src/scripts/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(clear, scss, html, assets, js)
exports.serve = series(clear, scss, html, assets, js, serve)
exports.clear = clear