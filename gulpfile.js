const {
  src,
  dest,
  series,
  watch,
  parallel
} = require('gulp')

// add plugins
const less = require('gulp-less'),
  csso = require('gulp-csso'),
  include = require('gulp-file-include'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  sync = require('browser-sync').create(),
  webpack = require('webpack-stream'),
  uglify = require('gulp-uglify-es').default,
  htmlmin = require('gulp-htmlmin'),
  clean = require('gulp-clean'),
  gulpif = require('gulp-if'),
  sourcemaps = require('gulp-sourcemaps'),
  smartgrid = require('smart-grid')



let isDev = (process.argv.indexOf('--dev') !== -1),
  isProd = !isDev

// GULP tasks
function html() {
  return src('./src/**.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(dest('dist'))
    .pipe(sync.stream())
}

function styles() {
  return src('./src/index.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['> 0.1%'],
      grid: true
    }))
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(sync.stream())
}

function scripts() {
  delete require.cache[require.resolve('./webpack.config.js')];
  const webpackConfig = require('./webpack.config.js')

  return src('./src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulpif(isProd, uglify()))
    .pipe(dest('dist'))
    .pipe(sync.stream());
}

function assets() {
  return src('./src/assets/**/*', { base: 'src' })
    .pipe(dest('dist'))
    .pipe(sync.stream());
}

function clear() {
  return src('dist', { read: false })
    .pipe(clean());
}

function grid(done) {
  delete require.cache[require.resolve('./smartgrid-settings.js')];
  const settings = require('./smartgrid-settings.js');

  smartgrid('./src/less/lib', settings);
  done();
}

function serve() {
  sync.init({
    server: './dist'
  })
  
    watch('./src/index.html', html),
    watch('./src/index.less', styles),
    watch('./src/index.js', scripts),
    watch('./src/assets/**/*', assets),
    
    watch('./src/template/**.html', html),
    watch('./src/less/**.less', styles),
    watch('./src/js/**.js', scripts),
    
    watch('./webpack.config.js', scripts),
    watch('./smartgrid-settings.js', grid)
}

exports.grid = grid

exports.build = series(
  clear,
  parallel(
    assets,
    html,
    styles,
    scripts
  )
)

exports.serve = series(
  clear,
  parallel(
    assets,
    html,
    styles,
    scripts
  ),
  serve
)