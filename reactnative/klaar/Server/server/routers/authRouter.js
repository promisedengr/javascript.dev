const { Router, json } = require('express')
const {body, param} = require('express-validator')
const setDelay = require('../middlware/setDelay')
const authController = require('../controllers/auth')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')

const authRouter = Router()

authRouter.use(
    '',
    json({ extended: true, limit: '5kb'})
)
/**
 * @api {post} /api/auth/check check
 * @apiDescription Проверка токена
 * @apiName check
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess (401) {String} message 'Not authorized'
 * @apiSuccess {String} message 'OK'
 */
authRouter.get(
    '/check',
    auth,
    async(req,res,next) => {
        res.status(200).json({ message: 'OK' })
    }
)
/**
 * @api {post} /api/auth/registration registration
 * @apiDescription Регистрация новых пользователей
 * @apiName registration
 * @apiGroup auth
 * @apiParam {String} fn Имя, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , 2-50 символов
 * @apiParam {String} ln Фамилия, ^([a-z,A-Z]+|[а-я,А-Я]+)$ , 3-50 символов
 * @apiParam {String} email Почта, 5-50 символов
 * @apiParam {Object} passw
 * @apiParam {String} p.pass Пароль, ^\w{6,20}$
 * @apiSuccess (201) {String} message 'User has been created'
 */
authRouter.post(
    '/registration',
    setDelay(300),
    [
        body('fn').exists().isString().isLength({min: 2, max: 50}).matches(/^([a-z,A-Z]+|[а-я,А-Я]+)$/),
        body('ln').exists().isString().isLength({min: 3, max: 50}).matches(/^([a-z,A-Z]+|[а-я,А-Я]+)$/),
        body('email').exists().isString().isLength({min: 5, max: 50}).normalizeEmail().isEmail(),
        body('passw.pass').exists().isString()
        .matches(/^[\w\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~]{6,24}$/)
    ],   
    controllerHandle(authController, 'registration')
)
/**
 * @api {post} /api/auth/activate activate
 * @apiDescription Активация пользователя при помощи кода активации
 * @apiName activate
 * @apiGroup auth
 * @apiParam {String} email Почта , 5-50 символов
 * @apiParam {String} code Код активации, ^\d{4}$
 * @apiSuccess {String} message 'OK' или 'Account already activated'
 */
authRouter.post(
    '/activate',
    [
        body('email').exists().isString().isLength({min: 5, max: 50}).normalizeEmail().isEmail(),
        body('code').exists().isString().matches(/^\d{4}$/)
    ],
    controllerHandle(authController, 'activate')
)
/**
 * @api {post} /api/auth/login login
 * @apiDescription Авторизация пользователя
 * @apiName login
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiParam {String} email Почта, 5-50 символов
 * @apiParam {Object} passw
 * @apiParam {String} p.pass Пароль, ^\w{6,20}$
 * @apiSuccess {Boolean} activated
 * @apiSuccess {String} userRole
 * @apiSuccess {String} access_token
 * @apiSuccess {String} token_type 'Bearer'
 */
authRouter.post(
    '/login',
    setDelay(5),
    [
        body('email').exists().isString().isLength({min: 5, max: 50}).normalizeEmail().isEmail(),
        body('passw.pass').exists().isString()
        .matches(/^[\w,\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~]{6,24}$/)
    ],
    controllerHandle(authController, 'login')
)
/**
 * @api {get} /api/auth/logout logout
 * @apiDescription Деавторизация пользователя
 * @apiName logout
 * @apiGroup auth
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {String} message 'OK'
 */
authRouter.get(
    '/logout',
    auth,
    setDelay(5),
    controllerHandle(authController, 'logout')
)
/**
 * @api {post} /api/auth/resendCode resendCode
 * @apiDescription Сгенерировать новый код активации пользователя. Высылается на почту
 * @apiName resendCode
 * @apiGroup auth
 * @apiParam {String} email Почта , 5-50 символов
 * @apiSuccess {String} message 'OK'
 * @apiSuccess (403) {String} message 'Account already activated'
 */
authRouter.post(
    '/resendCode',
    setDelay(60),
    [
        body('email').exists().isString().isLength({min: 5, max: 50}).normalizeEmail().isEmail(),
    ],
    controllerHandle(authController, 'resendCode')
)
/**
 * @api {post} /api/auth/forgotPassword forgotPassword
 * @apiDescription Сгенерировать для пользователя код восстановления пароля. Высылается на почту.
 * Срок жизни кода 20 минут
 * @apiName forgotPassword
 * @apiGroup auth
 * @apiParam {String} email Почта , 5-50 символов
 * @apiSuccess {String} userId
 */
authRouter.post(
    '/forgotPassword',
    setDelay(60),
    [
        body('email').exists().isString().isLength({min: 5, max: 50}).normalizeEmail().isEmail(),
    ],   
    controllerHandle(authController, 'forgotPassword')  
)
/**
 * @api {post} /api/auth/passRecovery passRecovery
 * @apiDescription Изменение пароля пользователя с помощью кода для восстановления пароля. 
 * В случае успеха, пользователь будет деавторизован
 * @apiName passRecovery
 * @apiGroup auth
 * @apiParam {String} userId Айди пользователя, ^[a-z0-9]{24}$
 * @apiParam {String} code Код сброса пароля, ^\w{4}$
 * @apiParam {Object} passw
 * @apiParam {String} p.pass Новый пароль, ^\w{6,20}$
 * @apiSuccess {String} message 'OK'
 */
authRouter.post(
    '/passRecovery',
    [
        body('userId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('code').exists().isString().matches(/^\w{4}$/),
        body('passw.pass').exists().isString()
        .matches(/^[\w,\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~]{6,24}$/)
    ],
    controllerHandle(authController, 'passRecovery')
)
module.exports = authRouter