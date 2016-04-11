## another-dry-animate
> one more scss version of Animate.css 

### Usage
```
// import main file
@import 'scss/another-dry-animate';

// use mixins
p {
	@include bounce($duration: 1s, $delay: 2s, $iterations: 3); // arguments are optional
}
```
### Install
```
bower install --save another-dry-animate
```
```
or download manually
```
### info
* It does not copy all Animate.css styles to your css file. No idle styles in css.
* Mixin name == Animation name
* Mixin's arguments are optional. Find default setting in _another-dry-animate.scss file.
* If you prefere libsass please use v3.2.0 or higher cause it supports @at-root.
* Beware namespace problem between your mixins and animation mixins.


## another-dry-animate
> еще одна scss версия Animate.css 

### Использование
```
// подключите основной файл
@import 'scss/another-dry-animate';

// добавьте mixin
p {
	@include bounce($duration: 1s, $delay: 2s, $iterations: 3); // аргументы опциональны
}
```
### Установка
```
bower install --save another-dry-animate
```
```
или скачайте вручную
```
### Инфо
* Не копирует все стили из Animate.css в конечный css файл.
* Название миксина == Название анимации
* Аргументы миксинов опциональны. Настройки по-умолчанию в файле _another-dry-animate.scss.
* Если вы используете libsass, используйте версию libsass v3.2.0 или выше, так как там есть поддержка @at-root 
* Следите за тем, чтобы название ваших миксинов не совпадало с названиями миксинов анимаций.
