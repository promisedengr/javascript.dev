const { Router, json } = require('express')
const {body, param} = require('express-validator')
const {isArrayOfUniqueIntNumbers} = require('../helpers/validationHelper')
const productController = require('../controllers/productController')
const reviewController = require('../controllers/reviewController')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')
const role = require('../middlware/role')

const productsRouter = Router()
productsRouter.use(
    '',
    json({ extended: true, limit: '2mb'}),
)
/**
 * @api {get} /api/products/:productId getById
 * @apiDescription Получение полной информации о товаре по его айди
 * @apiName getById
 * @apiGroup products
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 */
productsRouter.get(
    '/:productId',
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)        
    ],
    controllerHandle(productController, 'getById')
)
/**
 * @api {post} /api/products/create create
 * @apiDescription Добавление нового товара продавцами. Для пользователей, имеющих привелегии продавца
 * @apiName create
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} name Название товара, ^([\d,a-z,A-Z, ]+|[\d,а-я,А-Я, ]+)$ , длина: 3-50
 * @apiParam {String} category Айди категории, ^[a-z0-9]{24}$
 * @apiParam {String} subcategory Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , 
 * должна существовать в выбранной категории
 * @apiParam {Object} [pickupAddress] Адрес для самовывоза, должен быть указан если есть deliveryMethods 'pickup'
 * @apiParam {String} pA.region ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} pA.city ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} pA.street ^[\w,\W, ]+$ , длина: 3-60
 * @apiParam {String} pA.houseNumber ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} pA.squareNumberOrOffice ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} pA.mailIndex ^\d+$ , длина: 6-10
 * @apiParam {Object} deliveryMethods Методы доставки
 * @apiParam {Boolean} dM.ruPost Почта России
 * @apiParam {Boolean} dM.pickup Самовывоз
 * @apiParam {String} description длина: 5-500
 * @apiParam {String} currency ^(rub|usd)$
 * @apiParam {Number} price ^\d{0,7}(\.\d{1,2}|\d)$
 * @apiParam {Array} [sizes] Размеры. Массив уникальных целых чисел от 1 до 99. Длина: 1-9 . Должны быть указаны если 
 * того требует выбранная категория
 */
productsRouter.post(
    '/create',
    auth,
    role(['seller', 'admin']),
    [
        body('name').exists().isString().isLength({min: 3, max: 50}).matches(/^([\d,a-z,A-Z, ]+|[\d,а-я,А-Я, ]+)$/),
        body('category').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('subcategory').exists().isString().isLength({min: 3, max: 50}).matches(/^([a-z, ]+|[а-я, ]+)$/),
        body('pickupAddress.region').optional().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('pickupAddress.city').optional().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('pickupAddress.street').optional().isString().isLength({min: 3, max: 60}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.houseNumber').optional().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.squareNumberOrOffice').optional().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.mailIndex').optional().isString().isLength({min: 6, max: 10}).matches(/^\d+$/),
        body('deliveryMethods.ruPost').exists().isBoolean(),
        body('deliveryMethods.pickup').exists().isBoolean(),
        body('description').exists().isString().isLength({min: 5, max: 500}),
        body('currency').exists().isString().matches(/^(rub|usd)$/),
        body('price').exists().isNumeric().matches(/^\d{1,6}(?:\.\d{1,2})?$/), //float
        body('sizes').optional().isArray({min: 1, max: 9}).custom((value, req) => {
            return isArrayOfUniqueIntNumbers(value)
        })
    ],
    controllerHandle(productController, 'create')
)
/**
 * @api {post} /api/products/:productId/edit edit
 * @apiDescription Редактирование товара. Для пользователей, имеющих привелегии продавца.
 * <br> Связанные поля:
 * <br> category , subcategory
 * <br> Если deliveryMethods.pickup true, то pickupAddress
 * @apiName edit
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} [name] Название товара, ^([\d,a-z,A-Z, ]+|[\d,а-я,А-Я, ]+)$ , длина: 3-50
 * @apiParam {String} [category] Айди категории, ^[a-z0-9]{24}$
 * @apiParam {String} [subcategory] Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , 
 * должна существовать в выбранной категории
 * @apiParam {Object} [pickupAddress] Адрес для самовывоза, должен быть указан если есть deliveryMethods 'pickup'
 * @apiParam {String} pA.region ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} pA.city ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} pA.street ^[\w,\W, ]+$ , длина: 3-60
 * @apiParam {String} pA.houseNumber ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} pA.squareNumberOrOffice ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} pA.mailIndex ^\d+$ , длина: 6-10
 * @apiParam {Object} [deliveryMethods] Методы доставки
 * @apiParam {Boolean} dM.ruPost Почта России
 * @apiParam {Boolean} dM.pickup Самовывоз
 * @apiParam {String} [description] длина: 5-500
 * @apiParam {String} [currency] ^(rub|usd)$
 * @apiParam {Number} [price] ^\d{0,7}(\.\d{1,2}|\d)$
 * @apiParam {Array} [sizes] Размеры. Массив уникальных целых чисел от 1 до 99. Длина: 1-9 . Должны быть указаны если 
 * того требует выбранная категория
 */
productsRouter.post(
    '/:productId/edit',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('name').optional().isString().isLength({min: 3, max: 50}).matches(/^([\d,a-z,A-Z, ]+|[\d,а-я,А-Я, ]+)$/),
        body('category').optional().isString().matches(/^[a-z0-9]{24}$/),
        body('subcategory').optional().isString().isLength({min: 3, max: 50}).matches(/^([a-z, ]+|[а-я, ]+)$/),
        body('pickupAddress.region').optional().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('pickupAddress.city').optional().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('pickupAddress.street').optional().isString().isLength({min: 3, max: 60}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.houseNumber').optional().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.squareNumberOrOffice').optional().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('pickupAddress.mailIndex').optional().isString().isLength({min: 6, max: 10}).matches(/^\d+$/),
        body('deliveryMethods.ruPost').optional().isBoolean(),
        body('deliveryMethods.pickup').optional().isBoolean(),
        body('description').optional().isString().isLength({min: 5, max: 500}),
        body('currency').optional().isString().matches(/^(rub|usd)$/),
        body('price').optional().isNumeric().matches(/^\d{1,6}(?:\.\d{1,2})?$/), //float
        body('sizes').optional().isArray({min: 1, max: 9}).custom((value, req) => {
            return isArrayOfUniqueIntNumbers(value)
        })
    ],
    controllerHandle(productController, 'edit')
)
/**
 * @api {post} /api/products/:productId/photos/:index addPhoto
 * @apiDescription Добавление или изменение фотографии продукта. Укажите существующий индекс фотографии для
 * того чтобы её изменить, для добавления новой укажите несуществующий индекс. Для редактирования товара 
 * пользователь должен являться его владельцем. Админ может редактировать любой товар.
 * @apiName addPhoto
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[0-7]$
 * @apiParam {String} mimeType 'image/jpeg'
 * @apiParam {String} data Base64
 * @apiSuccess {String} message 'OK'
 */
productsRouter.post(
    '/:productId/photos/:index',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^[0-7]$/),
        body('mimeType').exists().isString().matches(/^image\/jpeg$/),
        body('data').exists().isBase64()
    ],
    controllerHandle(productController, 'setPhoto')
)
/**
 * @api {delete} /api/products/:productId/photos/:index deletePhoto
 * @apiDescription Удаление фотографии продукта, укажите существующий индекс фотографии. Для редактирования товара 
 * пользователь должен являться его владельцем. Админ может редактировать любой товар
 * @apiName deletePhoto
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[0-7]$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.delete(
    '/:productId/photos/:index',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^[0-7]$/)
    ],
    controllerHandle(productController, 'deletePhoto')
)
/**
 * @api {post} /api/products/:productId/colors/:index addColor
 * @apiDescription Добавление или изменение цвета продукта. Укажите существующий индекс цвета для
 * того чтобы его изменить, для добавления нового укажите несуществующий индекс. Для редактирования товара 
 * пользователь должен являться его владельцем. Админ может редактировать любой товар.
 * @apiName addColor
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[0-7]$
 * @apiParam {String} colorName Опишите цвет маленькими буквами, длина: 3-20, ^([a-z, ]+|[а-я, ]+)$
 * @apiParam {String} mimeType 'image/jpeg'
 * @apiParam {String} data Base64
 * @apiSuccess {String} message 'OK'
 */
productsRouter.post(
    '/:productId/colors/:index',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^[0-7]$/),
        body('colorName').exists().isString().isLength({min: 3, max: 20}).matches(/^([a-z, ]+|[а-я, ]+)$/),
        body('mimeType').exists().isString().matches(/^image\/jpeg$/),
        body('data').exists().isBase64()
    ],
    controllerHandle(productController, 'setColor')
)
/**
 * @api {delete} /api/products/:productId/colors/:index deleteColor
 * @apiDescription Удаление цвета продукта, укажите существующий индекс цвета. Для редактирования товара 
 * пользователь должен являться его владельцем. Админ может редактировать любой товар
 * @apiName deleteColor
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[0-7]$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.delete(
    '/:productId/colors/:index',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^[0-7]$/)
    ],
    controllerHandle(productController, 'deleteColor')
)
/**
 * @api {post} /api/products/search search
 * @apiDescription Получение списка товара по заданным параметрам поиска
 * @apiName search
 * @apiGroup products
 * @apiParam {Number} index ^\d{1,3}$
 * @apiParam {String} [nameRegex] ^([\d,a-z, ]+|[\d,а-я, ]+)$
 * @apiParam {String} [category] Айди категории, ^[a-z0-9]{24}$
 * @apiParam {String} [subcategory] Подкатегория, ^([a-z, ]+|[а-я, ]+)$ , длина: 3-50
 * @apiParam {Number} [priceSort] Сортировка: 1 по возрастанию цены, -1 по снижению цены, 0 по дате создания (сначала новые)
 * @apiSuccess {Array} products Массив продуктов в виде объектов. Массив пуст если ничего ненайдено
 */
productsRouter.post(
    '/search',
    [
        body('index').exists().isNumeric().matches(/^\d{1,3}$/),
        body('nameRegex').optional().isString().isString().matches(/^([\d,a-z, ]+|[\d,а-я, ]+)$/),
        body('category').optional().isString().isString().matches(/^[a-z0-9]{24}$/),
        body('subcategory').optional().isString().isLength({min: 3, max: 50}).matches(/^([a-z, ]+|[а-я, ]+)$/),
        body('priceSort').optional().isNumeric().isNumeric().matches(/^(\-1|0|1)$/)
    ],
    controllerHandle(productController, 'search')
)
/**
 * @api {get} /api/products/:productId/subscribe subscribe
 * @apiDescription Подписка на товар
 * @apiName subscribe
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.get(
    '/:productId/subscribe',
    auth,
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(productController, 'subscribe')
)
/**
 * @api {get} /api/products/:productId/unsubscribe unsubscribe
 * @apiDescription Отписаться от товара
 * @apiName unsubscribe
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.get(
    '/:productId/unsubscribe',
    auth,
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(productController, 'unsubscribe')
)
/**
 * @api {get} /api/products/unaviable/list/:index getUnaviableList
 * @apiDescription Получение списка неподтвержденных товаров. Доступно только пользователям категории Admin
 * @apiName getUnaviableList
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index ^\d{1,3}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.get(
    '/unaviable/list/:index',
    auth,
    role('admin'),
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(productController, 'getUnaviableList')
)
/**
 * @api {get} /api/products/:productId/approve approve
 * @apiDescription Подтверждение товара. Доступно только пользователям категории Admin
 * @apiName approve
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.get(
    '/:productId/approve',
    auth,
    role('admin'),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(productController, 'approve')
)
/**
 * @api {get} /api/products/:productId/unapprove unapprove
 * @apiDescription Перевод товара в некподтвержденное состояние. Доступно только пользователям категории Admin
 * <br>ОБНОВЛЕНО: удаление товара (совсем)
 * @apiName unapprove
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.get(
    '/:productId/unapprove',
    auth,
    role('admin'),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(productController, 'unapprove')
)
/**
 * @api {get} /api/products/:productId/reviews/list/:index getReviewsList
 * @apiDescription Получить список отзывов о товаре
 * @apiName getReviewsList
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^\d{1,3}$
 * @apiSuccess {Array} reviews Список отзывов в виде объектов
 */
productsRouter.get(
    '/:productId/reviews/list/:index',
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(reviewController, 'getListByForProductId')
)
/**
 * @api {post} /api/products/:productId/addReview addReview
 * @apiDescription Написать отзыв о товаре. Необходимо быть покупателем товара, отзыв можно оставить только один раз
 * @apiName addReview
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiParam {Number} grade Оценка, ^[1-5]$
 * @apiParam {String} text От 3 до 400 символов
 * @apiSuccess {String} message 'OK'
 */
productsRouter.post(
    '/:productId/addReview',
    auth,
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('grade').exists().isNumeric().matches(/^[1-5]$/),
        body('text').exists().isString().isLength({ min: 3, max: 400})
    ],
    controllerHandle(productController, 'addReview')
)
/**
 * @api {delete} /api/products/:productId delete
 * @apiDescription Удаление продукта его продавцом или админом
 * @apiName delete
 * @apiGroup products
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :productId ^[a-z0-9]{24}$
 * @apiSuccess {String} message 'OK'
 */
productsRouter.delete(
    '/:productId',
    auth,
    role(['seller', 'admin']),
    [
        param('productId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(productController, 'delete')
)
module.exports = productsRouter