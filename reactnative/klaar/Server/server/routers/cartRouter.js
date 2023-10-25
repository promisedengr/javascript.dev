const { Router, json } = require('express')
const {body, param} = require('express-validator')
const cartController = require('../controllers/cartController')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')

const cartRouter = Router()

cartRouter.use(
    '',
    json({ extended: true, limit: '5kb'}),
    auth
)
/**
 * @api {get} /api/cart/ get
 * @apiDescription Получение пользователем собственной тележки
 * @apiName get
 * @apiGroup cart
 * @apiHeader {String} Authorization Bearer <access_token>
 */
cartRouter.get(
    '/',
    controllerHandle(cartController, 'getByOwner')
)
/**
 * @api {post} /api/cart/addProduct addProduct
 * @apiDescription Добавление продукта в собственную тележку. Если продукт имеет обязательные поля colors 
 * или sizes, то они должны быть указаны в запросе. В тележку помещается максимум 15 позиций
 * @apiName addProduct
 * @apiGroup cart
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} productId ^[a-z0-9]{24}$
 * @apiParam {Number} amount Количество товара, ^\d{1,2}$
 * @apiParam {String} deliveryMethod Метод доставки, должен поодерживаться выбранным товаром, (ruPost|pickup)$
 * @apiParam {Number} size Размер товара, ^[1-9]\d{0,1}$
 * @apiParam {Number} color Цвет товара, ^[0-7]$
 * @apiSuccess {String} message 'OK'
 */
cartRouter.post(
    '/addProduct',
    [
        body('productId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('amount').exists().isNumeric().matches(/^\d{1,2}$/),
        body('deliveryMethod').exists().isString().matches(/^(ruPost|pickup)$/),
        body('size').optional().isNumeric().matches(/^[1-9]\d{0,1}$/),
        body('color').optional().isNumeric().matches(/^[0-7]$/)
    ],
    controllerHandle(cartController, 'addProduct')
)
/**
 * @api {delete} /api/cart/products/:index removeProduct
 * @apiDescription Получение пользователем собственной тележки
 * @apiName removeProduct
 * @apiGroup cart
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :index Позиция продукта в массиве продуктов тележки ^\d[1-4]{0,1}$
 * @apiSuccess {String} message 'OK'
 */
cartRouter.delete(
    '/products/:index',
    [
        param('index').exists().isString().matches(/^\d[1-4]{0,1}$/)
    ],
    controllerHandle(cartController, 'removeProduct')
)
/**
 * @api {delete} /api/cart/products removeAllProducts
 * @apiDescription Очистить тележку от продуктов (совсем)
 * @apiName removeAllProducts
 * @apiGroup cart
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {String} message 'OK'
 */
cartRouter.delete(
    '/products',
    controllerHandle(cartController, 'clear')
)
/**
 * @api {post} /api/cart/products/changeAmount changeProductsAmount
 * @apiDescription Изменить колличество товаров в тележке
 * @apiName changeProductsAmount
 * @apiGroup cart
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {Object} data Объект, в котором ключами являются индексы-позиции конкретного товара, 
 * лежащего в тележке, а значениями новое количество указанного товара (целые числа). 
 * Например: {'0': 1, '2': 3}
 * @apiSuccess {String} message 'OK'
 */
cartRouter.post(
    '/products/changeAmount',
    [
        body('data').exists()
    ],
    controllerHandle(cartController, 'changeProductsAmount')
)
module.exports = cartRouter