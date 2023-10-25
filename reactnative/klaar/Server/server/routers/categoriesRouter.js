const { Router, json } = require('express')
const {body, param} = require('express-validator')
const categoryController = require('../controllers/categoryController')
const controllerHandle = require('../helpers/controllerHandle')
const {isArrayOfUniqueStrings} = require('../helpers/validationHelper')
const auth = require('../middlware/auth')
const role = require('../middlware/role')

const categoryRouter = Router()
categoryRouter.use(
    '',
    json({ extended: true, limit: '5kb'})
)
/**
 * @api {get} /api/categories/:categoryId getById
 * @apiDescription Получение категории по айди
 * @apiName getById
 * @apiGroup categories
 * @apiParam {String} :categoryId Айди категории, ^[a-z0-9]{24}$
 */
categoryRouter.get(
    '/:categoryId',
    [
        param('categoryId').exists().isString().matches(/^[a-z0-9]{24}$/)
    ],
    controllerHandle(categoryController, 'getById')
)
/**
 * @api {get} /api/categories/list/:index getList
 * @apiDescription Получение списка категорий.
 * @apiName getList
 * @apiGroup categories
 * @apiParam {String} :index Индекс, ^\d{1,3}$
 * @apiSuccess {Array} categories Массив категорий в виде объектов. Пустой если ничего ненайдено
 */
categoryRouter.get(
    '/list/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(categoryController, 'getList')
)
/**
 * @api {post} /api/categories/create create
 * @apiDescription Создание новой категории. Доступно только пользователям категории Admin
 * @apiName create
 * @apiGroup categories
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} name Название категории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$
 * @apiParam {Array} subcategories Названия подкатегорий, массив уникальных строк, длинной от 1 до 10
 * @apiParam {Boolean} [requiredColors] Можно ли товарам этой категории указывать цвета
 * @apiParam {Boolean} [requiredSizes] Можно ли товарам этой категории указывать размеры
 * @apiSuccess {String} message 'OK'
 */
categoryRouter.post(
    '/create',
    auth,
    role('admin'),
    [
        body('name').exists().isString().matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/),
        body('subcategories').exists().isArray({min: 1, max: 10}).custom((value, req) => {
            return isArrayOfUniqueStrings(value)
        }),
        body('requiredColors').optional().isBoolean(),
        body('requiredSizes').optional().isBoolean()
    ],
    controllerHandle(categoryController, 'create')
)
/**
 * @api {post} /api/categories/:categoryId/addSubcategory addSubcategory
 * @apiDescription Добавление новой подкатегории к уже существующей категории. 
 * Доступно только пользователям категории Admin
 * @apiName addSubcategory
 * @apiGroup categories
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} :categoryId Айди категории, ^[a-z0-9]{24}$
 * @apiParam {String} subcategory Названия подкатегории, ^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$
 * @apiSuccess {String} message 'OK'
 */
categoryRouter.post(
    '/:categoryId/addSubcategory',
    auth,
    role('admin'),
    [
        param('categoryId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('subcategory').exists().isString().matches(/^([a-z,A-Z, ]+|[а-я,А-Я, ]+)$/)
    ],
    controllerHandle(categoryController, 'addSubcategory')
)
module.exports = categoryRouter