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
exports.resetAll = exports.getNewOpponentPokemon = exports.postNewOpponentPokemon = exports.getPokemonFainted = exports.postPokemonFainted = exports.getUserChoiceNotificationLower = exports.getUserChoiceNotificationUpper = exports.getUserIntroNotificationLower = exports.getUserIntroNotificationUpper = exports.getOpponentChoice = exports.postChoiceNotificationLower = exports.postChoiceNotificationUpper = exports.postUserIntroNotificationLower = exports.postUserIntroNotificationUpper = exports.getSerialNumber = exports.resetChoices = exports.resetIntro = void 0;
var usersIntroNotifications = [false, false];
var usersChoiceNotifications = [false, false];
var usersChoices = ['', ''];
var pokemonFainted = ['', ''];
var faintedNotifications = [false, false];
var usersIntroNotificationsLower = [false, false];
var usersChoiceNotificationsLower = [false, false];
var usersChoiceNotificationsLowerStatus = ['', ''];
var completed = false;
var serialNumber = 0;
var newOpponentPokemon = ['', ''];
var newOpponentPokemonNotification = [false, false];
exports.resetIntro = function (req, res) {
    serialNumber = 0;
    usersIntroNotifications = [false, false];
    completed = false;
    res.status(200).json({
        status: 'success',
        data: 'INTRO RESET',
    });
};
exports.resetChoices = function (req, res) {
    serialNumber = 0;
    usersChoiceNotifications = [false, false];
    usersChoices = ['', ''];
    completed = false;
    res.status(200).json({
        status: 'success',
        data: 'CHOICE RESET',
    });
};
exports.getSerialNumber = function (req, res) {
    res.status(200).json({
        status: 'success',
        serial: serialNumber++,
    });
};
exports.postUserIntroNotificationUpper = function (req, res) {
    var id = parseInt(req.params.id);
    usersIntroNotifications[id] = true;
    res.status(200).json({
        status: 'success',
        data: usersIntroNotifications,
    });
};
exports.postUserIntroNotificationLower = function (req, res) {
    var id = parseInt(req.params.id);
    usersIntroNotificationsLower[id] = true;
    res.status(200).json({
        status: 'succss',
        data: usersIntroNotificationsLower,
    });
};
exports.postChoiceNotificationUpper = function (req, res) {
    var id = parseInt(req.params.id);
    var data = req.params.data;
    usersChoices[id] = data;
    usersChoiceNotifications[id] = true;
    res.status(200).json({
        status: 'success',
        data: usersChoices[id],
    });
};
exports.postChoiceNotificationLower = function (req, res) {
    var id = parseInt(req.params.id);
    var data = req.params.data;
    usersChoiceNotificationsLower[id] = true;
    usersChoiceNotificationsLowerStatus[id] = data;
    res.status(200).json({
        status: 'success',
        data: usersChoiceNotificationsLower,
    });
};
exports.getOpponentChoice = function (req, res) {
    var opponentID = parseInt(req.params.opponentid);
    var data = usersChoices[opponentID];
    res.status(200).json({
        status: 'success',
        data: data,
    });
};
exports.getUserIntroNotificationUpper = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Got /events');
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!completed) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (allIntroNotifications()) {
                        completed = true;
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + 'OK' + " delayed\n\n");
                        res.write("data: " + serialNumber++ + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
};
function allIntroNotifications() {
    for (var i = 0; i < usersIntroNotifications.length; i++) {
        if (!usersIntroNotifications[i]) {
            return false;
        }
    }
    return true;
}
exports.getUserIntroNotificationLower = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    console.log('Got /events from intro lower', id);
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!usersIntroNotificationsLower[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (usersIntroNotificationsLower[id]) {
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + 'OK LOWER' + " delayed\n\n");
                        res.write("data: " + 'OK LOWER' + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    usersIntroNotificationsLower[id] = false;
                    return [2 /*return*/];
            }
        });
    });
};
exports.getUserChoiceNotificationUpper = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Got /events');
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!completed) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (allChoiceNotifications()) {
                        completed = true;
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + 'OK CHOICE' + "," + serialNumber + " delayed\n\n");
                        res.write("data: " + serialNumber + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getUserChoiceNotificationLower = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    console.log('Got /events from choice lower', id);
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!usersChoiceNotificationsLower[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (usersChoiceNotificationsLower[id]) {
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + usersChoiceNotificationsLowerStatus[id] + " deayed\n\n");
                        res.write("data: " + usersChoiceNotificationsLowerStatus[id] + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    usersChoiceNotificationsLower[id] = false;
                    usersChoiceNotificationsLowerStatus[id] = '';
                    return [2 /*return*/];
            }
        });
    });
};
exports.postPokemonFainted = function (req, res) {
    var id = parseInt(req.params.id);
    var fainted = req.params.fainted;
    pokemonFainted[id] = fainted;
    faintedNotifications[id] = true;
    res.status(200).json({
        status: 'success',
    });
};
exports.getPokemonFainted = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id);
                    console.log('Got /events from fainted', id);
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!faintedNotifications[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (faintedNotifications[id]) {
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + pokemonFainted[id] + " delayed\n\n");
                        res.write("data: " + pokemonFainted[id] + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    faintedNotifications[id] = false;
                    pokemonFainted[id] = '';
                    return [2 /*return*/];
            }
        });
    });
};
exports.postNewOpponentPokemon = function (req, res) {
    var id = parseInt(req.params.id);
    var data = req.params.data;
    newOpponentPokemon[id] = data;
    newOpponentPokemonNotification[id] = true;
    res.status(200).json({
        status: 'success',
        data: newOpponentPokemonNotification[id],
    });
};
exports.getNewOpponentPokemon = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Got /events');
                    id = parseInt(req.params.id);
                    setEventResponse(res);
                    // Tell the client to retry every 1 second if connectivity is lost
                    res.write('retry: 1000\n\n');
                    _a.label = 1;
                case 1:
                    if (!!newOpponentPokemonNotification[id]) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                case 2:
                    _a.sent();
                    if (newOpponentPokemonNotification[id]) {
                        // Emit an SSE that contains the current 'count' as a string
                        console.log("data: " + newOpponentPokemon[id] + "\n\n");
                        res.write("data: " + newOpponentPokemon[id] + "\n\n");
                    }
                    return [3 /*break*/, 1];
                case 3:
                    newOpponentPokemon[id] = '';
                    newOpponentPokemonNotification[id] = false;
                    return [2 /*return*/];
            }
        });
    });
};
exports.resetAll = function (req, res) {
    var id = parseInt(req.params.id);
    usersIntroNotifications = [false, false];
    usersChoiceNotifications = [false, false];
    usersChoices = ['', ''];
    pokemonFainted = ['', ''];
    faintedNotifications = [false, false];
    usersIntroNotificationsLower = [false, false];
    usersChoiceNotificationsLower = [false, false];
    usersChoiceNotificationsLowerStatus = ['', ''];
    completed = false;
    serialNumber = 0;
    newOpponentPokemon = ['', ''];
    newOpponentPokemonNotification = [false, false];
    res.status(200).json({
        status: 'Emergency reset done',
    });
};
function allChoiceNotifications() {
    for (var i = 0; i < usersChoiceNotifications.length; i++) {
        if (!usersChoiceNotifications[i]) {
            return false;
        }
    }
    return true;
}
function setEventResponse(res) {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
    });
    res.flushHeaders();
}
