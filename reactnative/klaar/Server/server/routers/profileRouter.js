const { Router, json } = require('express')
const {body, param} = require('express-validator')
const profileController = require('../controllers/profile')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const reviewController = require('../controllers/reviewController')
const usersController = require('../controllers/users')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')

const profileRouter = Router()
profileRouter.use(
    '',
    json({ extended: true, limit: '2mb'}),
    auth
)
/**
 * @api {get} /api/profile/ getSelfProfile
 * @apiDescription Получение собственного профиля
 * @apiName getSelfProfile
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 */
profileRouter.get(
    '/',
    controllerHandle(profileController, 'getSelfProfile')
)
/**
 * @api {get} /api/profile/activateSellerPermision activateSellerPermision
 * @apiDescription Активация привелегий продавца. Для успеха профиль должен быть полностью заполнен
 * @apiName activateSellerPermision
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {String} message 'OK'
 */
profileRouter.get(
    '/activateSellerPermision',
    controllerHandle(profileController, 'activateSellerPermision')
)
/**
 * @api {post} /api/profile/change change
 * @apiDescription Редактирование собственного профиля
 * @apiName change
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} [fn] Имя, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , длина: 2-50
 * @apiParam {String} [ln] Фамилия, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , длина: 3-50
 * @apiParam {String} [phone] Номер мобильного телефона, ^\+\d+$ , длина: 12-15
 * @apiParam {Number} [bday] Дата рождения, ^(\-|\d)\d{0,10}$
 * @apiSuccess {String} message 'OK'
 */
profileRouter.post(
    '/change',
    [
        body('fn').optional().isString().isLength({min: 2, max: 50}).matches(/^([a-z,A-Z]+|[а-я,А-Я]+)$/),
        body('ln').optional().isString().isLength({min: 3, max: 50}).matches(/^([a-z,A-Z]+|[а-я,А-Я]+)$/),
        body('phone').optional().isString().isLength({min: 12, max: 15}).matches(/^\+\d+$/),
        body('bday').optional().isNumeric().matches(/^(\-|\d)\d{0,10}$/)
    ],
    controllerHandle(profileController, 'changeProfile')
)
/**
 * @api {post} /api/profile/setPhoto setPhoto
 * @apiDescription Загрузка картинки профиля
 * @apiName setPhoto
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} mimeType 'image/jpeg'
 * @apiParam {String} data Base64
 * @apiSuccess {String} message 'OK'
 */
profileRouter.post(
    '/setPhoto',
    [    
        body('mimeType').exists().isString().matches(/^image\/jpeg$/),
        body('data').exists().isBase64()
    ],
    controllerHandle(profileController, 'setPhoto')
)
/**
 * @api {get} /api/profile/deliveryAddresses getDeliveryAddresses
 * @apiDescription Получение списка собственных адресов
 * @apiName getDeliveryAddresses
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {Array} deliveryAddresses Массив адресов в виде объектов. Массив пуст если адресов нет
 */
profileRouter.get(
    '/deliveryAddresses',
    controllerHandle(profileController, 'getDeliveryAddresses')
)
/**
 * @api {post} /api/profile/deliveryAddresses/:index addOrChangeDeliveryAddress
 * @apiDescription Добавление или редактирование адреса. Укажите индекс существующего адреса для его редактирования,
 * укажите несуществующий индекс для добавления нового.
 * @apiName addOrChangeDeliveryAddress
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс адреса, ^[0-4]$
 * @apiParam {String} region ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} city ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} street ^[\w,\W, ]+$ , длина: 3-60
 * @apiParam {String} houseNumber ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} squareNumberOrOffice ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} mailIndex ^\d+$ , длина: 6-10
 * @apiSuccess {String} message 'OK'
 */
profileRouter.post(
    '/deliveryAddresses/:index',
    [
        param('index').exists().isString().matches(/^[0-4]$/),
        body('region').exists().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('city').exists().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('street').exists().isString().isLength({min: 3, max: 60}).matches(/^[\w,\W, ]+$/),
        body('houseNumber').exists().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('squareNumberOrOffice').exists().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('mailIndex').exists().isString().isLength({min: 6, max: 10}).matches(/^\d+$/)
    ],
    controllerHandle(profileController, 'changeAddress')
)
/**
 * @api {delete} /api/profile/deliveryAddresses/:index deleteOrChangeDeliveryAddress
 * @apiDescription Удаление адреса. Укажите индекс существующего адреса.
 * @apiName deleteOrChangeDeliveryAddress
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс адреса, ^[0-4]$
 * @apiSuccess {String} message 'OK'
 */
profileRouter.delete(
    '/deliveryAddresses/:index',
    [
        param('index').exists().isString().matches(/^[0-5]$/)
    ],
    controllerHandle(profileController, 'deleteAddress')
)
/**
 * @api {get} /api/profile/products/:index getSelfProducts
 * @apiDescription Получение списка собственных продуктов
 * @apiName getSelfProducts
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} products Массив продуктов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/products/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(productController, 'getListBySeller')
)
/**
 * @api {get} /api/profile/subscribers/:index getSelfSubscribers
 * @apiDescription Получение списка собственных подписчиков
 * @apiName getSelfSubscribers
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} reviews Массив подписчиков в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/subscribers/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(usersController, 'getUserSubscribers')
)
/**
 * @api {get} /api/profile/subcribeOnProducts/:index getSelfSubcribeOnProducts
 * @apiDescription Получение списка продуктов на которые вы подписаны
 * @apiName getSelfSubcribeOnProducts
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} products Массив продуктов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/subcribeOnProducts/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(usersController, 'getUserSubcribeOnProducts')
)
/**
 * @api {get} /api/profile/getSelfSubcribeOnUsers/:index getSelfSubcribeOnUsers
 * @apiDescription Получение списка пользователей на которые вы подписаны
 * @apiName getSelfSubcribeOnUsers
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} users Массив пользователей в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/subcribeOnUsers/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(usersController, 'getUserSubcribeOnUsers')
)
/**
 * @api {get} /api/profile/orders/list/:index getSelfOrders
 * @apiDescription Получение списка заказов, в которых пользователь выступает покупателем или продавцом
 * @apiName getSelfOrders
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} orders Массив заказов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/orders/list/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(orderController, 'getOrdersByUserId')
)
/**
 * @api {get} /api/profile/reviews/list/:index getSelfReviews
 * @apiDescription Получение списка собственных отзывов
 * @apiName getSelfReviews
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} reviews Массив отзывов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/reviews/list/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(reviewController, 'getSelfList')
)
/**
 * @api {get} /api/profile/products/reviwed/:index getReviwedProducts
 * @apiDescription Получение списка ранее купленных продуктов, на которые был оставлен отзыв
 * @apiName getReviwedProducts
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} products Массив продуктов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/products/reviwed/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(productController, 'getSelfReviwed')
)
/**
 * @api {get} /api/profile/products/unreviwed/:index getUnreviwedProducts
 * @apiDescription Получение списка ранее купленных продуктовб на которые небыл оставлен отзыв
 * @apiName getUnreviwedProducts
 * @apiGroup profile
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Индекс , ^\d{1,3}$
 * @apiSuccess {Array} products Массив продуктов в виде объектов. Массив пуст если ничего ненайдено
 */
profileRouter.get(
    '/products/unreviwed/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(productController, 'getSelfUnreviwed')
)
module.exports = profileRouter