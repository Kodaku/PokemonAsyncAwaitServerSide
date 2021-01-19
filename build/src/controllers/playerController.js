"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPlayerInfo = exports.getPlayerInfo = exports.waitPlayers = exports.createUser = exports.getTotalPlayers = void 0;
var constants_1 = require("../constants/constants");
var users = [];
var completed = false;
exports.getTotalPlayers = function (req, res) {
    res.status(200).json({
        total: users.length,
    });
};
exports.createUser = function (req, res) {
    var id = parseInt(req.params.id);
    var userName = req.params.name;
    var user = {
        userName: userName,
        userID: id,
        userCharacter: constants_1.spriteNames[id],
        x: constants_1.coords[id].x,
        y: constants_1.coords[id].y,
        anim: constants_1.anims[id],
        velocity: { vx: 0, vy: 0 },
    };
    users[id] = user;
    res.status(200).json({
        message: 'true',
        user: user,
    });
};
exports.waitPlayers = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Got /events');
                    res.set({
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'text/event-stream',
                        Connection: 'keep-alive',
                    });
                    res.flushHeaders();
                    // Tell the client to retry every 10 seconds if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!completed) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (users.length >= 2 && allUsersDefined()) {
                        completed = true;
                        // console.log('ok');
                        // Emit an SSE that contains the current 'count' as a string
                        res.write("data: " + users.length + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
};
function allUsersDefined() {
    for (var i = 0; i < users.length; i++) {
        if (!users[i]) {
            return false;
        }
        return true;
    }
}
exports.getPlayerInfo = function (req, res) {
    var id = parseInt(req.params.id);
    res.status(200).json(users[id]);
};
exports.postPlayerInfo = function (req, res) {
    var id = parseInt(req.params.id);
    var newUser = req.body;
    users[id] = {
        userName: newUser.userName,
        userID: newUser.userID,
        userCharacter: newUser.userCharacter,
        x: newUser.x,
        y: newUser.y,
        anim: newUser.anim,
        velocity: newUser.velocity,
    };
    res.status(200).json(users[id]);
};
