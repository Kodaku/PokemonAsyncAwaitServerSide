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
exports.delayedLowerScreenNotification = exports.delayedUpperScreenNotification = exports.notificationUpperToLower = exports.notificationUpperFainted = exports.notificationUpperSwitch = exports.notificationUpperAttack = exports.notificationUpperPokeBall = exports.notificationUpperStats = exports.notificationUpperCure = exports.notificationUpperHealth = exports.notificationLowerToUpper = void 0;
var completedLowerToUpper = [false, false];
var completedUpperToLower = [false, false];
var messageFromLower = ['', ''];
var messageFromUpper = ['', ''];
var information = [0, 0];
var fakeCount = 0;
exports.notificationLowerToUpper = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'L-NOTIFICATION';
    res.status(200).json({
        status: 'success',
        data: {
            message: messageFromLower[id],
        },
    });
};
exports.notificationUpperHealth = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'INCREASE-HEALTH';
    information[id] = parseInt(req.params.quantity) + "," + parseInt(req.params.pokemonindex);
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
        information: information[id],
    });
};
exports.notificationUpperCure = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'CURE';
    information[id] = req.params.type;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
    });
};
exports.notificationUpperStats = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'STATS';
    information[id] = req.params.type;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
    });
};
exports.notificationUpperPokeBall = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'POKEBALL';
    information[id] = req.params.type;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
    });
};
exports.notificationUpperAttack = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'ATTACK';
    information[id] = req.params.attackinfo;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
        information: information[id],
    });
};
exports.notificationUpperSwitch = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'SWITCH';
    information[id] = req.params.pokemoninfo;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
        information: information[id],
    });
};
exports.notificationUpperFainted = function (req, res) {
    var id = parseInt(req.params.id);
    messageFromLower[id] = 'SWITCH-FAINTED';
    information[id] = req.params.pokemoninfo;
    console.log(messageFromLower[id], information[id]);
    res.status(200).json({
        status: 'success',
        information: information[id],
    });
};
exports.notificationUpperToLower = function (req, res) {
    var id = parseInt(req.params.id);
    var pokemonState = req.params.pokemonstate;
    messageFromUpper[id] = pokemonState;
    res.status(200).json({
        status: 'success',
        data: {
            message: messageFromUpper[id],
        },
    });
};
exports.delayedUpperScreenNotification = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    console.log('Got /events from upper');
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!completedLowerToUpper[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    fakeCount++;
                    if (messageFromLower[id] !== '') {
                        completedLowerToUpper[id] = true;
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + messageFromLower[id] + "," + information[id] + " delayed\n\n");
                        res.write("data: " + messageFromLower[id] + "," + information[id] + "\n\n");
                    }
                    else if (fakeCount > 2) {
                        completedLowerToUpper[id] = true;
                        console.log("Sent fake notification: " + 'FAKE' + "," + 0);
                        res.write("data: " + 'FAKE' + "," + 0 + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    messageFromLower[id] = '';
                    completedLowerToUpper[id] = false;
                    fakeCount = 0;
                    return [2 /*return*/];
            }
        });
    });
};
exports.delayedLowerScreenNotification = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    console.log('Got /events from lower');
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!completedUpperToLower[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (messageFromUpper[id] !== '') {
                        completedUpperToLower[id] = true;
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + messageFromUpper[id] + " delayed\n\n");
                        res.write("data: " + messageFromUpper[id] + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    messageFromUpper[id] = '';
                    completedUpperToLower[id] = false;
                    return [2 /*return*/];
            }
        });
    });
};
function setEventResponse(res) {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
    });
    res.flushHeaders();
}
