
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var cssInlineImages = require('gulp-css-inline-images');
var concat = require("gulp-concat");

let dejaAttache = false;
let fnBuildSass = (done) => {
    gulp.src('css/x.scss')
        .pipe(sass())
        .pipe(cssInlineImages({
            webRoot: './'
        }))
        .pipe(gulp.dest('jsBin', { "mode": "0777" }));
    done();

}

gulp.task('buildSass', fnBuildSass);

//var releaseFiles = [
//    "preModulexElements.js",
//    "jsBin/xTemp.js",
//    "endModulexElements.js"
//];

//let fnEncapsulate = (done) => {
  

//        gulp.src(releaseFiles, { base: "." })
//            //        .pipe(convertEncoding({ to: 'utf8' }))
//            .pipe(concat("jsBin/x.js"))
//            //  .pipe(uglify())
//            .pipe(gulp.dest("."));
//        done();
   
//}

//let renameDefinition = (done) => {
   
//        gulp.src('jsBin/xTemp.d.ts', { base: "." })
//            .pipe(concat("jsBin/x.d.ts"))
//            .pipe(gulp.dest('.'));
//        done();
 

//}


//gulp.task('encapsulatexElements',fnEncapsulate)
//gulp.task('renameDefinitionxElements', renameDefinition)

gulp.task('attacherxElements', (done) => {
    if (!dejaAttache) {
        gulp.watch('./css/x.scss', fnBuildSass);
        gulp.watch('./css/SASS/*.scss', fnBuildSass);
        //gulp.watch('jsBin/xTemp.js', fnEncapsulate);
        //gulp.watch('jsBin/xTemp.d.ts', renameDefinition);
        dejaAttache = true;
        done();
    }
    else {
        done('déja attaché');
    }
});




var inputFiles = [
        "include/d3.js",
        "include/d3pie.min.js",
        "include/jquery-2.1.4.js",
        "include/alertify.js",
        "include/FileSaver.js",
        "include/jquery-ui-1.11.4.js",
        "include/jquery.ui.datepicker-fr.js",
        "include/dropzone.js",
        "include/jquery.colorpicker.js",
        "include/xlsx.full.min.js",
        "include/jsCookie.js"    
];


gulp.task("jsLib", function (done) {
    gulp.src(inputFiles, { base: "." })
        //        .pipe(convertEncoding({ to: 'utf8' }))
        .pipe(concat("jsBin/libxElements.js"))
        //  .pipe(uglify())
        .pipe(gulp.dest("."));
    done();

});