const { Router, json } = require('express')
const {body, param} = require('express-validator')
const setDelay = require('../middlware/setDelay')
const chatController = require('../controllers/chatController')
const controllerHandle = require('../helpers/controllerHandle')
const auth = require('../middlware/auth')

const chatRouter = Router()
chatRouter.use(
    '',
    json({ extended: true, limit: '5kb'}),
    auth
)
/**
 * @api {get} /api/chats/login login
 * @apiDescription Получение одноразового ключа доступа для прослушиванию чатов
 * @apiName login
 * @apiGroup chats
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {String} userId
 * @apiSuccess {String} key
 */
chatRouter.get(
    '/login',
    setDelay(5),
    controllerHandle(chatController, 'login')
)
/**
 * @api {get} /api/chats/list/:index getList
 * @apiDescription Получение списка чатов
 * @apiName getList
 * @apiGroup chats
 * @apiParam {String} :index ^\d{1,3}$
 * @apiHeader {String} Authorization Bearer <access_token>
 */
chatRouter.get(
    '/list/:index',
    [
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(chatController, 'getList')
)
/**
 * @api {get} /api/:chatId/messages/:index getMessagesList
 * @apiDescription Получение списка сообщений конкретного чата. Вы должны быть участником чата
 * @apiName getMessagesList
 * @apiGroup chats
 * @apiParam {String} :chatId ^[a-z0-9]{24}$
 * @apiParam {String} :index ^\d{1,3}$
 * @apiHeader {String} Authorization Bearer <access_token>
 */
chatRouter.get(
    '/:chatId/messages/:index',
    [
        param('chatId').exists().isString().matches(/^[a-z0-9]{24}$/),
        param('index').exists().isString().matches(/^\d{1,3}$/)
    ],
    controllerHandle(chatController, 'getMessagesList')
)
/**
 * @api {post} /api/chats/:chatId/message sendMessage
 * @apiDescription Отправить сообщение в чат, вы должны быть его участником
 * @apiName sendMessage
 * @apiGroup chats
 * @apiParam {String} :chatId ^[a-z0-9]{24}$
 * @apiParam {String} text Текст сообщения, длина: 1-200
 * @apiHeader {String} Authorization Bearer <access_token>
 * @apiSuccess {String} message 'OK'
 */
chatRouter.post(
    '/:chatId/message',
    [
        param('chatId').exists().isString().matches(/^[a-z0-9]{24}$/),
        body('text').exists().isString().isLength({ min: 1, max: 200})
    ],
    controllerHandle(chatController, 'sendMessage')
)
module.exports = chatRouter