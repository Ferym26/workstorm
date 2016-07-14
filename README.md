# Workstorm template
### Сборщик проектов для верски основаный на Gulp+Sass+Pug

### Подготовка к запуску:
 - Установить [NodeJs](https://nodejs.org)
 - Установить [Git](https://git-scm.com/). [Гайд №1](https://www.youtube.com/playlist?list=PLY4rE9dstrJyTdVJpv7FibSaXB4BHPInb), [Гайд №2](https://www.youtube.com/playlist?list=PLoonZ8wII66iUm84o7nadL-oqINzBLk5g)
 - Устноваить и настроить [ConEmu](http://www.conemu.ru) (желательно), [гайд](https://www.youtube.com/watch?v=x0hw8llIZkY) по настройке. (удобный терминал для пользователей Windows)
 

### Для запуска выполните в корне проекта:
```sh
$ npm i
$ bower i
$ gulp
открыть в браузере http://localhost:3003/
```


### Состав основных библиотек
 - jquery
 - bootstrap
 - font-awesome
 - owl carousel 2
 

### Особенности работы сборщика
 - Установку библиотек производить через [Bower](https://bower.io/search/). После установки главные *.js файлы автоматически компилируются в файл **app/js/bower_components.js**. Иногда не работает, если библиотека не имеет явного указания на main файл в своём bower.json.
 - Для установки скриптов не входящих в репозиторий bower-a, или исключения описанного выше, просто поместите js файлы в папку **app/libs/**. 
 - Далее происходит конкатинация bower_components.js и всех файлов из  app/libs/ в **vendors.js**, который и подключается в index
 - Все графические файлы (png, jpg, svg) кладем во **frontend/img/**. Далее происходит автоматическое сжатие и перенос файлов в **app/img/**

### Сборка стилей frontend/sass/
 - **main.sass** - главный файл. точка входа всех остальных стилей
 - **pages/_%page-name%.sass** - стили страниц
 - **header.sass** - стили первого экрана, отображаемого при загрузке
 - **fonts.sass** - подключение шрифтов (eot, ttf, woff)
 - **_theme.sass** - определение стилей основных элементов
 - **_variables.sass** - переменные
 - **_mixins.sass** - миксины
 - **_media.sass** - главный файл стилей медиазапросов
 - **_animations.sass** - стили анимаций на странице
 - **comments-guide** - гайдлайн по комментариям для проекта
 - Стили библиотек подключаем в **main.sass** через @import "path"

### Сборка HTML frontend/pug/
 - includes/layuot.pug - основной каркас. скрипты, стили и тд подключаются в него
 - header.pug и footer.pug - хедер и футер, которые будут вставлены на все страницы
 - index.pug - основной контент страницы



### Version 1.2
 - Изменен процесс сборки bower_components
 - Брейкпоинт при медиазапросах 480 -> 544, 320 -> 360