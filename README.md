# Космическая бургерная

Учебный проект на курсе [react-разработчик](https://practicum.yandex.ru/react/) от yandex.

```
git clone https://github.com/miptleha/react-burger.git
cd react-burger
npm update
npm start
```

На протяжении 3-х месяцев для закрепления полученных сведений о возможностях React проект делался по спринтам (каждый по 2 недели).

## Начальный коммит
Стартовый коммит проекта с помощью [CRA](https://create-react-app.dev/docs/getting-started) с добавленными UI компонентами от [Яндекс](https://github.com/Yandex-Practicum/react-developer-burger-ui-components).   
Кода пока никакого не написано, это начальный коммит.

## Спринт 1
### Шаг 1
Создали папку [src/components](src/components/), поместили туда app.js и 3 компонента: AppHeader, BurgerContructor и BurgerIngredients.   
Данные с бургерами поместили в файл [src/utils/data.js](src/utils/data.js).  
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

## Спринт 3
Сделать странички логина, регистрации, восстановления пароля, профиля.   
Авторизация пользователя (для некоторых операций и страниц требуется вход в систему).
```
git checkout sprint-3/step-1
```
[Замечания](https://github.com/miptleha/react-burger/pull/9) от ревьювера.