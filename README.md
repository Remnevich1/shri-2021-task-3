# Описание/исправление ошибок


| Какие ошибки? | Как вы нашли? / Почему они возникли? | Какие способы их исправления существуют? |
| --- | --- | --- |
| Ошибка<br>Cannot GET / на главной странице<br> | Уведомление в терминале<br>WARNING in configuration<br>The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.        <br>You can also set it to 'none' to disable any default behavior. <br>Learn more: https://webpack.js.org/configuration/mode/<br> | webpack.config.js<br>добавить строчку<br>mode: 'development'<br> |
| Ошибка в файле<br>src\application\data.ts(46,14)<br> | Уведомление в терминале<br>Type '"update"' is not comparable to type '"next" "prev" "restart" "message" "theme" "timer"'.<br> | добавить тип Action<br>ReturnType<typeof actionUpdate><br>в файле src\application\actions.ts<br> |
| При переключении на тёмную тему исчезала кнопки переключения на светлую тему<br> | Некорректно была написана функция setElementTheme (прежний css-класс темы не удалялся)<br> |Исправить функцию с учетом добавления условий для смены темы<br> |
| При клике на кнопку вправо не срабатывала функция “next”<br> | Поиск по коду<br> | src\index.ts<br>Замена диспатча функции dispatch(actionPrev())); на dispatch(actionNext()));<br><br>src\application\selectors.ts<br>В функции createCurrentIndexSelector удалена строчка mergeMapTo(EMPTY)<br> |
| Отсутствие progress bars сверху слайдов<br> | Допущена ошибка в стилях<br> | index.css <br>.slide-progress-value {<br>    height: 4<br>}<br>(добавлены px)<br> |
| После 6-ого слайда автоматическая прокрутка не выполнялась<br> | Поиск коду<br> | src\application\effects.ts<br>В timerEffect$.pipe() удалена строка take(5)<br> |
| Не добавлялись статические файлы в коммит<br> | Проверка .gitignore<br> | Удалена строка public из .gitignore<br> |
| Не срабатывали кнопки переключения внутри слайдов<br> | При нажатии на svg элемент не срабатывало событие <br>Не изменялся цвет на активной кнопке <br> | Добавлен абсолютно позиционированный div над svg элементом<br>Изменена функция update в файле src\application\data.ts, таким образом, чтобы при отправке определенных параметров происходило одновременное изменение данных плеера и слайда.<br>Потребовалось отключить настройку в tsconfig.js - "noImplicitAny": true<br><br>Альтернативный способ: можно было создать дополнительный div вокруг элемента и перенести в него data-action<br> |


# Задание 3. Найдите ошибки

В этом репозитории находятся материалы тестового задания «Найдите ошибки» для [17-й Школы разработки интерфейсов](https://yandex.ru/promo/academy/shri) (лето-2021, Москва).

Для работы приложения нужен [Node.JS](https://nodejs.org/en/) v12 или выше.

## Задание

В этом задании мы хотим проверить вашу способность разобраться в незнакомом коде и API, а также ваш навык отладки.

**Вам дан исходный код приложения. В нём есть ошибки: некоторые — стилистические, а другие даже не позволят запустить приложение. Вам нужно найти все ошибки и исправить их.**

В качестве решения укажите ссылку на форк этого репозитория с исправленными ошибками. Обратите внимание: репозиторий должен быть приватным, чтобы другие кандидаты не могли скопировать ваш код.

## Предметная область

Тестовое приложение — это плейер для отображения stories. На вход плейер получает список слайдов с их параметрами. Плейер рендерит слайды и показывает их по очереди.

- Плейер занимает весь экран:
  - есть кнопки для перехода к предыдущему и следующему слайдам;
  - есть кнопка перехода в начало.
- Если пользователь нажимает интерактивные элементы внутри слайдов, то происходит нужное действие.
- При переходе между слайдами есть анимация.
- Плейер может отображать слайды в тёмной и светлой темах:
  - по умолчанию используется тёмная тема;
  - темы переключаются при нажатии специальной кнопки.
- Плейер автоматически переходит на следующий слайд через семь секунд:
  - сверху отображается прогресс-бар, который показывает текущий слайд и оставшееся время до перехода к следующему;
  - после проигрывания последнего слайда отсчет времени останавливается.

Файл с описанием слайдов должен находиться в папке с файлами плейера и называться `data.ts`. Его формат соответствует формату, описанному в первом задании.

Содержимое слайдов формируется при помощи функции `renderTemplate(alias, data)`, которая получает на вход название шаблона слайда и его параметры, а возвращает строку с HTML-разметкой слайда. Интерактивные элементы должны быть размечены data-атрибутами.

Атрибут `data-action` задает действие, которое должно произойти при нажатии на элемент:

- `'go-prev'` — переход к предыдущему слайду;
- `'go-next'` — переход к следующему слайду;
- `'restart'` — переход в начало;
- `'update'` — изменение данных текущего слайда.

Если для слайда указано действие `'update'`, то необходимо дополнительно указать атрибут `data-params`, содержащий новые данные для слайда в формате JSON. Посмотрите [пример разметки](./public/stories.js) интерактивных элементов.

В качестве дополнительного задания подключите к плейеру стили и функцию шаблонизации из первого задания.

## Как запустить

1. Клонировать репозиторий

    ```sh
    git clone git@github.com:yndx-shri/shri-2021-task-3.git
    cd shri-2021-task-3
    ```

2. Установить зависимости

    ```sh
    npm ci
    ```

3. Запустить dev-сервер

    ```sh
    npm start
    ```

Должен открыться плейер в браузере.

## Выполнение задания

Пожалуйста, опишите в коде или файле README ход ваших мыслей: какие ошибки и как вы нашли, почему они возникли, какие способы их исправления существуют.

Мы не ограничиваем вас в использовании сторонних инструментов и библиотек, но будем ждать от вас комментария — что и зачем вы использовали.

Мы будем благодарны, если вы логически сгруппируете сделанные изменения по коммитам.
