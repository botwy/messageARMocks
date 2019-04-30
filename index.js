import express           from 'express';
import cookieParser      from 'cookie-parser';
import bodyParser        from 'body-parser';
import cors              from 'cors'
import morgan            from 'morgan';

import mainRouter from './src/mainRouter';

const app = express();

// CORS
const ENABLE_CORS = true
if (ENABLE_CORS) {

    console.info('CORS включен вообще для всех Origins (любые хосты могут запрашивать бэк)')

    const corsOptions = {
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Authorization',
            'UCS_SESSION_ID',
            'PD-S-SESSION-ID',
            'PD-ID'
        ],
        exposedHeaders: [
            'Content-Type',
            'Set-Cookie',
            'sudir_error_code',
            'sudir_error_message',
            'UCS_SESSION_ID',
            'PD-S-SESSION-ID',
            'PD-ID',
            'resultpagenum',
            'resultlastpage',
            'resultpagesize'
        ],
        credentials: true
    }

    app.options('*', cors(corsOptions))
    app.use(cors(corsOptions))
}

// отключаем кэширование 304
app.use(function(req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});

app.use(cookieParser());
app.use(morgan('tiny')); // Серверный консольный логгер HTTP запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = {login: 'test', password: 'test'} // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message

    // -----------------------------------------------------------------------

})

//app.use('/editor', express.static('./swagger'))
app.use(mainRouter);
app.use(express.static('static'));

const LISTEN_PORT = 5656;
app.listen(LISTEN_PORT, () => console.info('\nListening on %s\n=================\n', LISTEN_PORT));
