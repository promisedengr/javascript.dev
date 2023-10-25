define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/activate",
    "title": "activate",
    "description": "<p>Активация пользователя при помощи кода активации</p>",
    "name": "activate",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта , 5-50 символов</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Код активации, ^\\d{4}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK' или 'Account already activated'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/check",
    "title": "check",
    "description": "<p>Проверка токена</p>",
    "name": "check",
    "group": "auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "401": [
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'Not authorized'</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/forgotPassword",
    "title": "forgotPassword",
    "description": "<p>Сгенерировать для пользователя код восстановления пароля. Высылается на почту. Срок жизни кода 20 минут</p>",
    "name": "forgotPassword",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта , 5-50 символов</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "login",
    "description": "<p>Авторизация пользователя</p>",
    "name": "login",
    "group": "auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта, 5-50 символов</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "passw",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "p.pass",
            "description": "<p>Пароль, ^\\w{6,20}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "activated",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userRole",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "access_token",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token_type",
            "description": "<p>'Bearer'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "get",
    "url": "/api/auth/logout",
    "title": "logout",
    "description": "<p>Деавторизация пользователя</p>",
    "name": "logout",
    "group": "auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/passRecovery",
    "title": "passRecovery",
    "description": "<p>Изменение пароля пользователя с помощью кода для восстановления пароля. В случае успеха, пользователь будет деавторизован</p>",
    "name": "passRecovery",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>Айди пользователя, ^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Код сброса пароля, ^\\w{4}$</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "passw",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "p.pass",
            "description": "<p>Новый пароль, ^\\w{6,20}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/registration",
    "title": "registration",
    "description": "<p>Регистрация новых пользователей</p>",
    "name": "registration",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fn",
            "description": "<p>Имя, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , 2-50 символов</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ln",
            "description": "<p>Фамилия, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , 3-50 символов</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта, 5-50 символов</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "passw",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "p.pass",
            "description": "<p>Пароль, ^\\w{6,20}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'User has been created'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/auth/resendCode",
    "title": "resendCode",
    "description": "<p>Сгенерировать новый код активации пользователя. Высылается на почту</p>",
    "name": "resendCode",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Почта , 5-50 символов</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "403": [
          {
            "group": "403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'Account already activated'</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/authRouter.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/api/cart/addProduct",
    "title": "addProduct",
    "description": "<p>Добавление продукта в собственную тележку. Если продукт имеет обязательные поля colors или sizes, то они должны быть указаны в запросе. В тележку помещается максимум 15 позиций</p>",
    "name": "addProduct",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>Количество товара, ^\\d{1,2}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deliveryMethod",
            "description": "<p>Метод доставки, должен поодерживаться выбранным товаром, (ruPost|pickup)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Размер товара, ^[1-9]\\d{0,1}$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "color",
            "description": "<p>Цвет товара, ^[0-7]$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/cartRouter.js",
    "groupTitle": "cart"
  },
  {
    "type": "post",
    "url": "/api/cart/products/changeAmount",
    "title": "changeProductsAmount",
    "description": "<p>Изменить колличество товаров в тележке</p>",
    "name": "changeProductsAmount",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Объект, в котором ключами являются индексы-позиции конкретного товара, лежащего в тележке, а значениями новое количество указанного товара (целые числа). Например: {'0': 1, '2': 3}</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/cartRouter.js",
    "groupTitle": "cart"
  },
  {
    "type": "get",
    "url": "/api/cart/",
    "title": "get",
    "description": "<p>Получение пользователем собственной тележки</p>",
    "name": "get",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/cartRouter.js",
    "groupTitle": "cart"
  },
  {
    "type": "delete",
    "url": "/api/cart/products",
    "title": "removeAllProducts",
    "description": "<p>Очистить тележку от продуктов (совсем)</p>",
    "name": "removeAllProducts",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/cartRouter.js",
    "groupTitle": "cart"
  },
  {
    "type": "delete",
    "url": "/api/cart/products/:index",
    "title": "removeProduct",
    "description": "<p>Получение пользователем собственной тележки</p>",
    "name": "removeProduct",
    "group": "cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Позиция продукта в массиве продуктов тележки ^\\d[1-4]{0,1}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/cartRouter.js",
    "groupTitle": "cart"
  },
  {
    "type": "post",
    "url": "/api/categories/:categoryId/addSubcategory",
    "title": "addSubcategory",
    "description": "<p>Добавление новой подкатегории к уже существующей категории. Доступно только пользователям категории Admin</p>",
    "name": "addSubcategory",
    "group": "categories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":categoryId",
            "description": "<p>Айди категории, ^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subcategory",
            "description": "<p>Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/categoriesRouter.js",
    "groupTitle": "categories"
  },
  {
    "type": "post",
    "url": "/api/categories/create",
    "title": "create",
    "description": "<p>Создание новой категории. Доступно только пользователям категории Admin</p>",
    "name": "create",
    "group": "categories",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название категории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "subcategories",
            "description": "<p>Названия подкатегорий, массив уникальных строк, длинной от 1 до 10</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "requiredColors",
            "description": "<p>Можно ли товарам этой категории указывать цвета</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "requiredSizes",
            "description": "<p>Можно ли товарам этой категории указывать размеры</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/categoriesRouter.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/api/categories/:categoryId",
    "title": "getById",
    "description": "<p>Получение категории по айди</p>",
    "name": "getById",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":categoryId",
            "description": "<p>Айди категории, ^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/categoriesRouter.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/api/categories/list/:index",
    "title": "getList",
    "description": "<p>Получение списка категорий.</p>",
    "name": "getList",
    "group": "categories",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс, ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "categories",
            "description": "<p>Массив категорий в виде объектов. Пустой если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/categoriesRouter.js",
    "groupTitle": "categories"
  },
  {
    "type": "get",
    "url": "/api/chats/list/:index",
    "title": "getList",
    "description": "<p>Получение списка чатов</p>",
    "name": "getList",
    "group": "chats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/chatsRouter.js",
    "groupTitle": "chats"
  },
  {
    "type": "get",
    "url": "/api/:chatId/messages/:index",
    "title": "getMessagesList",
    "description": "<p>Получение списка сообщений конкретного чата. Вы должны быть участником чата</p>",
    "name": "getMessagesList",
    "group": "chats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":chatId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/chatsRouter.js",
    "groupTitle": "chats"
  },
  {
    "type": "get",
    "url": "/api/chats/login",
    "title": "login",
    "description": "<p>Получение одноразового ключа доступа для прослушиванию чатов</p>",
    "name": "login",
    "group": "chats",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/chatsRouter.js",
    "groupTitle": "chats"
  },
  {
    "type": "post",
    "url": "/api/chats/:chatId/message",
    "title": "sendMessage",
    "description": "<p>Отправить сообщение в чат, вы должны быть его участником</p>",
    "name": "sendMessage",
    "group": "chats",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":chatId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст сообщения, длина: 1-200</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/chatsRouter.js",
    "groupTitle": "chats"
  },
  {
    "type": "post",
    "url": "/api/orders/createFromCart",
    "title": "createFromCart",
    "description": "<p>Создание ордеров на основе тележки. Необходимо указать адрес доставки, возможно он потребуется. Запрос обрабатывается не в реальном времени! Новые ордеры появятся в списке заказов</p>",
    "name": "createFromCart",
    "group": "orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 3-60</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "houseNumber",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "squareNumberOrOffice",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailIndex",
            "description": "<p>^\\d+$ , длина: 6-10</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/ordersRouter.js",
    "groupTitle": "orders"
  },
  {
    "type": "get",
    "url": "/api/orders/:orderId",
    "title": "getById",
    "description": "<p>Получение полной информации об указанном заказе</p>",
    "name": "getById",
    "group": "orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":orderId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/ordersRouter.js",
    "groupTitle": "orders"
  },
  {
    "type": "post",
    "url": "/api/orders/:orderId/pay",
    "title": "pay",
    "description": "<p>Оплата ордера с помощью страйп токена</p>",
    "name": "pay",
    "group": "orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":orderId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Айди токена, ^tok[\\w]{24,30}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/ordersRouter.js",
    "groupTitle": "orders"
  },
  {
    "type": "post",
    "url": "/api/orders/:orderId/setStatus",
    "title": "setStatus",
    "description": "<p>Присвоение заказу нового статуса <tr></p> <table border=\"1\">  <tr>      <th>Новый статус</th>      <th>Необходимый статус</th>      <th>Кто может присвоить</th>      <th>Описание</th>      <tr><td>'waitPayment'</td><td>'waitConfirm'</td><td>seller</td><td>Продавец подтверждает то что может выполнить заказ</td></tr>      <tr><td>'waitShipment'</td><td>'waitPayment'</td><td>buyer</td><td>Покупатель подтверждает оплату (order должен быть оплачен)</td></tr>      <tr><td>'shipping'</td><td>'waitShipment'</td><td>seller</td><td>Продавец подтверждает высылку товара</td></tr>      <tr><td>'done'</td><td>'shipping'</td><td>buyer</td><td>Покупатель подтверждает что получил товар, заказ выполнен</td></tr>  </tr> </table>",
    "name": "setStatus",
    "group": "orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":orderId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newStatus",
            "description": "<p>^(waitPayment|waitShipment|shipping|done)$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/ordersRouter.js",
    "groupTitle": "orders"
  },
  {
    "type": "post",
    "url": "/api/products/:productId/colors/:index",
    "title": "addColor",
    "description": "<p>Добавление или изменение цвета продукта. Укажите существующий индекс цвета для того чтобы его изменить, для добавления нового укажите несуществующий индекс. Для редактирования товара пользователь должен являться его владельцем. Админ может редактировать любой товар.</p>",
    "name": "addColor",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[0-7]$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "colorName",
            "description": "<p>Опишите цвет маленькими буквами, длина: 3-20, ^([a-z, ]+|[а-я, ]+)$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mimeType",
            "description": "<p>'image/jpeg'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Base64</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/api/products/:productId/photos/:index",
    "title": "addPhoto",
    "description": "<p>Добавление или изменение фотографии продукта. Укажите существующий индекс фотографии для того чтобы её изменить, для добавления новой укажите несуществующий индекс. Для редактирования товара пользователь должен являться его владельцем. Админ может редактировать любой товар.</p>",
    "name": "addPhoto",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[0-7]$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mimeType",
            "description": "<p>'image/jpeg'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Base64</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/api/products/:productId/addReview",
    "title": "addReview",
    "description": "<p>Написать отзыв о товаре. Необходимо быть покупателем товара, отзыв можно оставить только один раз</p>",
    "name": "addReview",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "grade",
            "description": "<p>Оценка, ^[1-5]$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>От 3 до 400 символов</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId/approve",
    "title": "approve",
    "description": "<p>Подтверждение товара. Доступно только пользователям категории Admin</p>",
    "name": "approve",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/api/products/create",
    "title": "create",
    "description": "<p>Добавление нового товара продавцами. Для пользователей, имеющих привелегии продавца</p>",
    "name": "create",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Название товара, ^([\\d,a-z,A-Z, ]+|[\\d,а-я,А-Я, ]+)$ , длина: 3-50</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Айди категории, ^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subcategory",
            "description": "<p>Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , должна существовать в выбранной категории</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "pickupAddress",
            "description": "<p>Адрес для самовывоза, должен быть указан если есть deliveryMethods 'pickup'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.region",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.city",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.street",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 3-60</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.houseNumber",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.squareNumberOrOffice",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.mailIndex",
            "description": "<p>^\\d+$ , длина: 6-10</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "deliveryMethods",
            "description": "<p>Методы доставки</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "dM.ruPost",
            "description": "<p>Почта России</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "dM.pickup",
            "description": "<p>Самовывоз</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>длина: 5-500</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>^(rub|usd)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>^\\d{0,7}(.\\d{1,2}|\\d)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "sizes",
            "description": "<p>Размеры. Массив уникальных целых чисел от 1 до 99. Длина: 1-9 . Должны быть указаны если того требует выбранная категория</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "delete",
    "url": "/api/products/:productId",
    "title": "delete",
    "description": "<p>Удаление продукта его продавцом или админом</p>",
    "name": "delete",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "delete",
    "url": "/api/products/:productId/colors/:index",
    "title": "deleteColor",
    "description": "<p>Удаление цвета продукта, укажите существующий индекс цвета. Для редактирования товара пользователь должен являться его владельцем. Админ может редактировать любой товар</p>",
    "name": "deleteColor",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[0-7]$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "delete",
    "url": "/api/products/:productId/photos/:index",
    "title": "deletePhoto",
    "description": "<p>Удаление фотографии продукта, укажите существующий индекс фотографии. Для редактирования товара пользователь должен являться его владельцем. Админ может редактировать любой товар</p>",
    "name": "deletePhoto",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[0-7]$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/api/products/:productId/edit",
    "title": "edit",
    "description": "<p>Редактирование товара. Для пользователей, имеющих привелегии продавца. <br> Связанные поля: <br> category , subcategory <br> Если deliveryMethods.pickup true, то pickupAddress</p>",
    "name": "edit",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Название товара, ^([\\d,a-z,A-Z, ]+|[\\d,а-я,А-Я, ]+)$ , длина: 3-50</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Айди категории, ^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "subcategory",
            "description": "<p>Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , должна существовать в выбранной категории</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "pickupAddress",
            "description": "<p>Адрес для самовывоза, должен быть указан если есть deliveryMethods 'pickup'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.region",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.city",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.street",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 3-60</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.houseNumber",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.squareNumberOrOffice",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pA.mailIndex",
            "description": "<p>^\\d+$ , длина: 6-10</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "deliveryMethods",
            "description": "<p>Методы доставки</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "dM.ruPost",
            "description": "<p>Почта России</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "dM.pickup",
            "description": "<p>Самовывоз</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>длина: 5-500</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "currency",
            "description": "<p>^(rub|usd)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "price",
            "description": "<p>^\\d{0,7}(.\\d{1,2}|\\d)$</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "sizes",
            "description": "<p>Размеры. Массив уникальных целых чисел от 1 до 99. Длина: 1-9 . Должны быть указаны если того требует выбранная категория</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId",
    "title": "getById",
    "description": "<p>Получение полной информации о товаре по его айди</p>",
    "name": "getById",
    "group": "products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId/reviews/list/:index",
    "title": "getReviewsList",
    "description": "<p>Получить список отзывов о товаре</p>",
    "name": "getReviewsList",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>Список отзывов в виде объектов</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/unaviable/list/:index",
    "title": "getUnaviableList",
    "description": "<p>Получение списка неподтвержденных товаров. Доступно только пользователям категории Admin</p>",
    "name": "getUnaviableList",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "post",
    "url": "/api/products/search",
    "title": "search",
    "description": "<p>Получение списка товара по заданным параметрам поиска</p>",
    "name": "search",
    "group": "products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "index",
            "description": "<p>^\\d{1,3}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "nameRegex",
            "description": "<p>^([\\d,a-z, ]+|[\\d,а-я, ]+)$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Айди категории, ^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "subcategory",
            "description": "<p>Подкатегория, ^([a-z, ]+|[а-я, ]+)$ , длина: 3-50</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "priceSort",
            "description": "<p>Сортировка: 1 по возрастанию цены, -1 по снижению цены, 0 по дате создания (сначала новые)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId/subscribe",
    "title": "subscribe",
    "description": "<p>Подписка на товар</p>",
    "name": "subscribe",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId/unapprove",
    "title": "unapprove",
    "description": "<p>Перевод товара в некподтвержденное состояние. Доступно только пользователям категории Admin <br>ОБНОВЛЕНО: удаление товара (совсем)</p>",
    "name": "unapprove",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/products/:productId/unsubscribe",
    "title": "unsubscribe",
    "description": "<p>Отписаться от товара</p>",
    "name": "unsubscribe",
    "group": "products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":productId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/productsRouter.js",
    "groupTitle": "products"
  },
  {
    "type": "get",
    "url": "/api/profile/activateSellerPermision",
    "title": "activateSellerPermision",
    "description": "<p>Активация привелегий продавца. Для успеха профиль должен быть полностью заполнен</p>",
    "name": "activateSellerPermision",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "post",
    "url": "/api/profile/deliveryAddresses/:index",
    "title": "addOrChangeDeliveryAddress",
    "description": "<p>Добавление или редактирование адреса. Укажите индекс существующего адреса для его редактирования, укажите несуществующий индекс для добавления нового.</p>",
    "name": "addOrChangeDeliveryAddress",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс адреса, ^[0-4]$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "region",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "street",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 3-60</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "houseNumber",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "squareNumberOrOffice",
            "description": "<p>^[\\w,\\W, ]+$ , длина: 1-10</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mailIndex",
            "description": "<p>^\\d+$ , длина: 6-10</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "post",
    "url": "/api/profile/change",
    "title": "change",
    "description": "<p>Редактирование собственного профиля</p>",
    "name": "change",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "fn",
            "description": "<p>Имя, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , длина: 2-50</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "ln",
            "description": "<p>Фамилия, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , длина: 3-50</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone",
            "description": "<p>Номер мобильного телефона, ^+\\d+$ , длина: 12-15</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "bday",
            "description": "<p>Дата рождения, ^(-|\\d)\\d{0,10}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "delete",
    "url": "/api/profile/deliveryAddresses/:index",
    "title": "deleteOrChangeDeliveryAddress",
    "description": "<p>Удаление адреса. Укажите индекс существующего адреса.</p>",
    "name": "deleteOrChangeDeliveryAddress",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс адреса, ^[0-4]$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/deliveryAddresses",
    "title": "getDeliveryAddresses",
    "description": "<p>Получение списка собственных адресов</p>",
    "name": "getDeliveryAddresses",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "deliveryAddresses",
            "description": "<p>Массив адресов в виде объектов. Массив пуст если адресов нет</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/products/reviwed/:index",
    "title": "getReviwedProducts",
    "description": "<p>Получение списка ранее купленных продуктов, на которые был оставлен отзыв</p>",
    "name": "getReviwedProducts",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/orders/list/:index",
    "title": "getSelfOrders",
    "description": "<p>Получение списка заказов, в которых пользователь выступает покупателем или продавцом</p>",
    "name": "getSelfOrders",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "orders",
            "description": "<p>Массив заказов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/products/:index",
    "title": "getSelfProducts",
    "description": "<p>Получение списка собственных продуктов</p>",
    "name": "getSelfProducts",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/",
    "title": "getSelfProfile",
    "description": "<p>Получение собственного профиля</p>",
    "name": "getSelfProfile",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/reviews/list/:index",
    "title": "getSelfReviews",
    "description": "<p>Получение списка собственных отзывов</p>",
    "name": "getSelfReviews",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>Массив отзывов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/subcribeOnProducts/:index",
    "title": "getSelfSubcribeOnProducts",
    "description": "<p>Получение списка продуктов на которые вы подписаны</p>",
    "name": "getSelfSubcribeOnProducts",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/getSelfSubcribeOnUsers/:index",
    "title": "getSelfSubcribeOnUsers",
    "description": "<p>Получение списка пользователей на которые вы подписаны</p>",
    "name": "getSelfSubcribeOnUsers",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Массив пользователей в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/subscribers/:index",
    "title": "getSelfSubscribers",
    "description": "<p>Получение списка собственных подписчиков</p>",
    "name": "getSelfSubscribers",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>Массив подписчиков в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/profile/products/unreviwed/:index",
    "title": "getUnreviwedProducts",
    "description": "<p>Получение списка ранее купленных продуктовб на которые небыл оставлен отзыв</p>",
    "name": "getUnreviwedProducts",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>Индекс , ^\\d{1,3}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов. Массив пуст если ничего ненайдено</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "post",
    "url": "/api/profile/setPhoto",
    "title": "setPhoto",
    "description": "<p>Загрузка картинки профиля</p>",
    "name": "setPhoto",
    "group": "profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mimeType",
            "description": "<p>'image/jpeg'</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Base64</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>'OK'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/profileRouter.js",
    "groupTitle": "profile"
  },
  {
    "type": "get",
    "url": "/api/users/:userId",
    "title": "getById",
    "description": "<p>Получение информации о пользователе по его айди</p>",
    "name": "getById",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/:userId/reviews/:index",
    "title": "getReviewsOnUser",
    "description": "<p>Получение списка отзывов о пользователе</p>",
    "name": "getReviewsOnUser",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reviews",
            "description": "<p>Массив отзывов в виде объектов</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/:userId/products/:index",
    "title": "getUserProducts",
    "description": "<p>Получение списка доступных товаров указанного пользователя</p>",
    "name": "getUserProducts",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":index",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "products",
            "description": "<p>Массив продуктов в виде объектов</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/:userId/startChatting",
    "title": "startChatting",
    "description": "<p>Стартовать чат с указанным пользователем. В ответе вы получите уже существующий чат или новый</p>",
    "name": "startChatting",
    "group": "users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/:userId/subscribe",
    "title": "subscribe",
    "description": "<p>Подписаться на пользователя</p>",
    "name": "subscribe",
    "group": "users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/api/users/:userId/unsubscribe",
    "title": "unsubscribe",
    "description": "<p>Отписаться от пользователя</p>",
    "name": "unsubscribe",
    "group": "users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer &lt;access_token&gt;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": ":userId",
            "description": "<p>^[a-z0-9]{24}$</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routers/usersRouter.js",
    "groupTitle": "users"
  }
] });
