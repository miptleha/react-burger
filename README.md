Ура! Проект сдан!

# Космическая бургерная
![img](logo.svg)

Сайт опубликован: https://miptleha.github.io/react-burger/   
Яндекс облако (на бесплатный период): https://miptleha.nomoredomains.work/react-burger/


Учебный проект на курсе [react-разработчик](https://practicum.yandex.ru/react/) от yandex. Сделан по [макету](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-Проектные-задачи_external_link?node-id=0%3A1&t=L1Qw4Ncywvdufa0e-0).
```
git clone https://github.com/miptleha/react-burger.git
cd react-burger
npm ci
npm start
```

На протяжении 3-х месяцев для закрепления полученных сведений о возможностях React проект делался по спринтам (каждый по 2 недели).

## Спринт 6
Написание тестов для сайта и публикация.   
```
git checkout sprint-6/step-1
```

## Спринт 5
Перевод оставшихся js-файлов в ts-файлы.   
Верстка и загрузка через WebSocket списка заказов (лента и история), сделать окно с информацией о заказе.
```
git checkout sprint-5/step-1
```
[Замечания](https://github.com/miptleha/react-burger/pull/12) по спринту.

## Спринт 4
Перевод проекта на Typescript за исключением хранилища. Файлы jsx/js заменены на tsx/ts.
```
git checkout sprint-4/step-1
```
[Замечания](https://github.com/miptleha/react-burger/pull/10) по доработкам.

## Спринт 3
Сделать странички логина, регистрации, восстановления пароля, профиля.   
Авторизация пользователя (для некоторых операций и страниц требуется вход в систему).
```
git checkout sprint-3/step-1
```
[Замечания](https://github.com/miptleha/react-burger/pull/9) от ревьювера.

## Спринт 2
### Шаг 1
Данные перенесены в Context. Заказ отправляется на сервер.
```
git checkout sprint-2/step-1
```
[Замечания](https://github.com/miptleha/react-burger/pull/6) по изменениям в ветке
### Шаг 2
Данные перенесены в redux (redux-toolkit?). Перетаскивание, удаление и сортировка ингредиентов.
```
git checkout sprint-2/step-2
```

## Спринт 1
### Шаг 1
Создали папку [src/components](src/components/), поместили туда app.js и 3 компонента: AppHeader, BurgerContructor и BurgerIngredients.   
Данные с бургерами поместили в файл ~~[src/utils/data.js](src/utils/data.js)~~ (загрузка ведется с сервера яндекс).  
Делаем начальную верстку главной страницы приложения.
```
git checkout sprint-1/step-1
```
Обсуждение [замечаний](https://github.com/miptleha/react-burger/pull/1) от ревьювера.   
Замечания были исправлены, было предложено продолжить оставшуюся верстку в ветке sprint-1/step-2
### Шаг 2
Добавить 2 модальных окна: детали ингридиента и "Оформить заказ".   
Сделать в соответствии с чек-листом к спринту
```
git checkout sprint-1/step-2
```
Были [замечания](https://github.com/miptleha/react-burger/pull/4) по загрузке данных с сервера, успешно их исправил, работу приняли и я смержил все в main ветку.

## Начальный коммит
Стартовый коммит проекта с помощью [CRA](https://create-react-app.dev/docs/getting-started) с добавленными [UI компонентами](https://github.com/Yandex-Practicum/react-developer-burger-ui-components) от Яндекс.   
Кода пока никакого не написано, это начальный коммит.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fmiptleha%2Freact-burger&count_bg=%230C7DBD&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
