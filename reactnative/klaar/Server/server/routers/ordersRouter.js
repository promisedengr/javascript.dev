const { Router, json } = require('express')
const {body, param} = require('express-validator')
const orderController = require('../controllers/orderController')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')

const ordersRouter = new Router()
ordersRouter.use(
    '',
    json({ extended: true, limit: '5kb'}),
    auth
)
/**
 * @api {get} /api/orders/:orderId getById
 * @apiDescription Получение полной информации об указанном заказе
 * @apiName getById
 * @apiGroup orders
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :orderId ^[a-z0-9]{24}$
 */
ordersRouter.get(
    '/:orderId',
    [
        param('orderId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(orderController, 'getById')
)
/**
 * @api {post} /api/orders/createFromCart createFromCart
 * @apiDescription Создание ордеров на основе тележки. Необходимо указать адрес доставки, возможно он потребуется.
 * Запрос обрабатывается не в реальном времени! Новые ордеры появятся в списке заказов
 * @apiName createFromCart
 * @apiGroup orders
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} region ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} city ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$ , длина: 3-30
 * @apiParam {String} street ^[\w,\W, ]+$ , длина: 3-60
 * @apiParam {String} houseNumber ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} squareNumberOrOffice ^[\w,\W, ]+$ , длина: 1-10
 * @apiParam {String} mailIndex ^\d+$ , длина: 6-10
 */
ordersRouter.post(
    '/createFromCart',
    [
        body('region').exists().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('city').exists().isString().isLength({min: 3, max: 30}).matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('street').exists().isString().isLength({min: 3, max: 60}).matches(/^[\w,\W, ]+$/),
        body('houseNumber').exists().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('squareNumberOrOffice').exists().isString().isLength({min: 1, max: 10}).matches(/^[\w,\W, ]+$/),
        body('mailIndex').exists().isString().isLength({min: 6, max: 10}).matches(/^\d+$/)
    ],
    controllerHandle(orderController, 'createFromCart')
)
/**
 * @api {post} /api/orders/:orderId/setStatus setStatus
 * @apiDescription Присвоение заказу нового статуса.
 * @apiName setStatus
 * @apiGroup orders
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :orderId ^[a-z0-9]{24}$
 * @apiParam {String} newStatus ^(waitPayment|inProgress|done)$
 */
ordersRouter.post(
    '/:orderId/setStatus',
    [
        param('orderId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('newStatus').exists().isString().matches(/^(waitPayment|inProgress|done)$/)
    ],
    controllerHandle(orderController, 'setStatus')
)
/**
 * @api {post} /api/orders/:orderId/pay pay
 * @apiDescription Оплата ордера с помощью страйп токена
 * @apiName pay
 * @apiGroup orders
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :orderId ^[a-z0-9]{24}$
 * @apiParam {String} token Айди токена, ^tok[\w]{24,30}$
 */
ordersRouter.post(
    '/:orderId/pay',
    [
        param('orderId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('token').exists().isString().matches(/^tok[\w]{24,30}$/)
    ],
    controllerHandle(orderController, 'pay')
)
module.exports = ordersRouter