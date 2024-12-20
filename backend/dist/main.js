"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const ms_util_1 = require("./lib/utils/ms.util");
const parseBoolean_util_1 = require("./lib/utils/parseBoolean.util");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const connect_redis_1 = require("connect-redis");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const ioredis_1 = require("ioredis");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const redis = new ioredis_1.default(config.getOrThrow('REDIS_URI'));
    app.use(cookieParser(config.getOrThrow('COOKIES_SECRET')));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.use(session({
        secret: config.getOrThrow('SESSION_SECRET'),
        name: config.getOrThrow('SESSION_NAME'),
        resave: true,
        saveUninitialized: false,
        cookie: {
            domain: config.getOrThrow('SESSION_DOMAIN'),
            maxAge: (0, ms_util_1.ms)(config.getOrThrow('SESSION_MAX_AGE')),
            httpOnly: (0, parseBoolean_util_1.parseBoolean)(config.getOrThrow('SESSION_HTTP_ONLY')),
            secure: (0, parseBoolean_util_1.parseBoolean)(config.getOrThrow('SESSION_SECURE')),
            sameSite: 'lax',
        },
        store: new connect_redis_1.RedisStore({
            client: redis,
            prefix: config.getOrThrow('SESSION_FOLDER'),
        })
    }));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: config.getOrThrow('ORIGIN'),
        credentials: true,
        exposedHeaders: ['set-cookie'],
    });
    await app.listen(config.getOrThrow('APPLICATION_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map