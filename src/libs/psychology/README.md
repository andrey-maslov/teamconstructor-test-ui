# Psychology

Библиотека, предоставляющая методы основных обсчетов, необходимых для создания:
- Психологического профиля пользователя 
- Психологического портрета пользователя 
- Эффективности взаимодействия пары двух партнеров (психологических профилей) 
- Эффективности взаимодействия команды (психологических профилей) 

template src: https://github.com/bitjson/typescript-starter


## Некоторые методы
Полная документация в папке build/docs/ (сгенерирована с помощью typedoc)
### getAndDecodeData()
```javascript
import { getAndDecodeData } from 'psychology'
```

Функция парсит URL или принимает строку, зашифрованную в base64 в качестве параметра, валидирует ее и возвращает объект со значениями, либо null, если валидация не прошла.
Принимает 2 необязательных параметра ``key: string`` & `encodedValue: string`.
Первый параметр имеет дефолтное значение `'encdata'`.
Второй параметр по умолчанию парсится из URL. Если нужно просто провалидировать или расшифровать значение, то первым параметром передаем `null`, а вторым - нужное зашифрованное значение.

Для парсинга URL параметр должен иметь такой вид:

`encdata=W1sxLDQsMV0sW1stMiwwLDEsLTIsMl0sWy0xLDEsMSwyLC01XSxbMiwzLDAsMywwXSxbMSw0LDAsLTIsMV0sWzIsLTMsLTIsLTMsMV1dXQ==`

В случае валидного значения на входе возвращает результат вида: 

#### Javascript
```javascript
{
   encoded: 'W1sxLDQsMV0sW1stMiwwLDEsLTIsMl0sWy0xLDEsMSwyLC01XSxbMiwzLDAsMywwXSxbMSw0LDAsLTIsMV0sWzIsLTMsLTIsLTMsMV1dXQ==',
   decoded: '[[1,4,1],[[-2,0,1,-2,2],[-1,1,1,2,-5],[2,3,0,3,0],[1,4,0,-2,1],[2,-3,-2,-3,1]]]',
   data: [
            [1,4,1],
                 [
                     [-2,0,1,-2,2],
                     [-1,1,1,2,-5],
                     [2,3,0,3,0],
                     [1,4,0,-2,1],
                     [2,-3,-2,-3,1]
                 ]
            ]
    }
```

В случае невалидного значения на входе возвращает результат вида: 

#### Javascript
```javascript
{
   encoded: null,
   decoded: null,
   data: null
}
```

#### Использование

##### Вносим в package.json как зависимость
```javascript
"dependencies": {
    "encoded-data-parser": "git+https://github.com/andrey-maslov/encoded-data-parser.git"
}
```
`
npm install
`

##### В коде компонента
```javascript
import { getAndDecodeData } from 'psychology';

// ... some code

// parse url query params if it has encoded data
const dataFromUrl: DecodedDataType | null = getAndDecodeData().data
```
