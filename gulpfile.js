const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const imagecomp = require('compress-images')
const clean = require('gulp-clean')

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true,
  })
}

function scripts() {
  return src(['node_modules/swiper/swiper-bundle.min.js', 'app/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function startwatch() {
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts)
  watch('app/**/*.html').on('change', browserSync.reload)
  watch('app/images/src/**/*', images)
}

async function images() {
  imagecomp(
    'app/images/src/**/*',
    'app/images/dest/',
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
    { png: { engine: 'pngquant', command: ['--quality=75-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    {
      gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] },
    },
    function (err, completed) {
      if (completed === true) {
        browserSync.reload()
      }
    }
  )
}

function cleanimg() {
  return src('app/images/dest/', { allowEmpty: true }).pipe(clean())
}

function buildcopy() {
  return src(['app/js/**/*.min.js', 'app/images/dest/**/*', 'app/**/*.html'], {
    base: 'app',
  }).pipe(dest('build'))
}

function cleandist() {
  return src('build', { allowEmpty: true }).pipe(clean())
}

exports.browsersync = browsersync
exports.scripts = scripts
exports.default = parallel(scripts, browsersync, startwatch)
exports.images = images
exports.cleanimg = cleanimg
exports.build = series(cleandist, scripts, images, buildcopy)
