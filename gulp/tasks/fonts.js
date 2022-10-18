import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTft = () => {
    // Searching font files - .otf
    return app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS_OTF',
                message: `Error: <%= error.message %>`,
            })
        ))
        // Convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // Output to source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/assets/fonts/`))
}

export const ttfToWoff = () => {
    // Searching font files - .ttf
    return app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS_TTF',
                message: `Error: <%= error.message %>`,
            })
        ))
        // Convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Output to destination folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Searching font files - .ttf 
        .pipe(app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`))
        // Convert to .woff2
        .pipe(ttf2woff2())
        // Output to destination folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
    //Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/sass/fonts.sass`;
    //Проверяем, существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            //Проверяем, существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                //Если файла нет, создаём его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;

                for (var i = 0; i < fontsFiles.length; i++) {
                    //Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];

                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        fs.appendFile(fontsFile, `@font-face\n\tfont-family: ${fontName}\n\tfont-display: swap\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff")\n\tfont-weight: ${fontWeight}\n\tfont-style: normal\n\r\n`, cb);

                        newFileOnly = fontFileName;
                    }
                }
            } else {
                //Если файл есть, выводим сообщение
                console.log("Файл sass/fonts.sass уже существует. Для обновления файла нужно его удалить!");
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);

    function cb() { }
}