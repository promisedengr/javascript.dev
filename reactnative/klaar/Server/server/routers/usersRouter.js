const { Router, json } = require('express')
const {body, param} = require('express-validator')
const usersController = require('../controllers/users')
const profileController = require('../controllers/profile')
const chatController = require('../controllers/chatController')
const productController = require('../controllers/productController')
const reviewController = require('../controllers/reviewController')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')
const usersRouter = Router()
usersRouter.use(
    '',
    json({extended: true, limit: '5kb'})
)
/**
 * @api {get} /api/users/:userId getById
 * @apiDescription Получение информации о пользователе по его айди
 * @apiName getById
 * @apiGroup users
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 */
usersRouter.get(
    '/:userId',
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(profileController, 'getProfileByUserId')
)
/**
 * @api {get} /api/users/:userId/subscribe subscribe
 * @apiDescription Подписаться на пользователя
 * @apiName subscribe
 * @apiGroup users
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 */
usersRouter.get(
    '/:userId/subscribe',
    auth,
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(usersController, 'subscribe')
)
/**
 * @api {get} /api/users/:userId/unsubscribe unsubscribe
 * @apiDescription Отписаться от пользователя
 * @apiName unsubscribe
 * @apiGroup users
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 */
usersRouter.get(
    '/:userId/unsubscribe',
    auth,
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(usersController, 'unsubscribe')
)
/**
 * @api {get} /api/users/:userId/startChatting startChatting
 * @apiDescription Стартовать чат с указанным пользователем. В ответе вы получите уже существующий чат или новый
 * @apiName startChatting
 * @apiGroup users
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 */
usersRouter.get(
    '/:userId/startChatting',
    auth,
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(chatController, 'startWithUser')
)
/**
 * @api {get} /api/users/:userId/products/:index getUserProducts
 * @apiDescription Получение списка доступных товаров указанного пользователя
 * @apiName getUserProducts
 * @apiGroup users
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[a-z0-9]{24}$
 * @apiSuccess {Array} products Массив продуктов в виде объектов
 */
usersRouter.get(
    '/:userId/products/:index',
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(productController, 'getAviableListBySeller')
)
/**
 * @api {get} /api/users/:userId/reviews/:index getReviewsOnUser
 * @apiDescription Получение списка отзывов о пользователе
 * @apiName getReviewsOnUser
 * @apiGroup users
 * @apiParam {String} :userId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^[a-z0-9]{24}$
 * @apiSuccess {Array} reviews Массив отзывов в виде объектов
 */
usersRouter.get(
    '/:userId/reviews/:index',
    [
        param('userId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(reviewController, 'getListByForUserId')
)
module.exports = usersRouter