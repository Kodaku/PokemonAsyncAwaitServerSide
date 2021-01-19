"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var playersRouter_1 = require("./routers/playersRouter");
var loginRouter_1 = require("./routers/loginRouter");
var coupleRouter_1 = require("./routers/coupleRouter");
var pokemonRouter_1 = require("./routers/pokemonRouter");
var increasingTypeItemRouter_1 = require("./routers/increasingTypeItemRouter");
var cureItemRouter_1 = require("./routers/cureItemRouter");
var pokeBallRouter_1 = require("./routers/pokeBallRouter");
var increasingStatsItemsRouter_1 = require("./routers/increasingStatsItemsRouter");
dotenv_1.default.config({ path: './config.env' });
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
if (process.env.DATABASE_PASSWORD && process.env.DATABASE) {
    var DB = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
    mongoose_1.default
        .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
        .then(function () {
        console.log('DB connection successful!');
    });
}
launchApp();
function launchApp() {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
        next();
    });
    app.use(loginRouter_1.loginRouter);
    app.use(playersRouter_1.playersRouter);
    app.use(coupleRouter_1.coupleRouter);
    app.use(pokemonRouter_1.pokemonRouter);
    app.use(increasingTypeItemRouter_1.increasingItemRouter);
    app.use(cureItemRouter_1.cureRouter);
    app.use(pokeBallRouter_1.pokeBallRouter);
    app.use(increasingStatsItemsRouter_1.increasingStatsRouter);
    app.listen(3000, function () {
        console.log('Server listening on port 3000');
    });
}
