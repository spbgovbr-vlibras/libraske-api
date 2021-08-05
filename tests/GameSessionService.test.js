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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameSession_1 = __importDefault(require("../src/models/GameSession"));
var Song_1 = __importDefault(require("../src/models/Song"));
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("../src/models/User"));
var GameSessionService_1 = __importDefault(require("../src/services/GameSessionService"));
var SongsService_1 = __importDefault(require("../src/services/SongsService"));
var TokenService_1 = __importDefault(require("../src/services/TokenService"));
var UsersService_1 = __importDefault(require("../src/services/UsersService"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
var Scores_1 = __importDefault(require("../src/models/Scores"));
var AppError_1 = __importDefault(require("../src/errors/AppError"));
describe('Game Session Service', function () {
    var createUser = function (id, name, email, profilePhoto, cpf, refreshToken, credit) {
        return {
            id: id,
            name: name,
            email: email,
            profilePhoto: profilePhoto,
            cpf: cpf,
            refreshToken: refreshToken,
            credit: credit,
            created_at: new Date(),
            updated_at: new Date(),
        };
    };
    var getDefaultData = function () {
        var cpf = DataGenerator_1.default.getUnformattedCpf();
        var refreshToken = TokenService_1.default.createRefreshToken({ cpf: cpf });
        var id = DataGenerator_1.default.getInteger();
        var email = DataGenerator_1.default.getEmail();
        var profilePhoto = DataGenerator_1.default.getUrl();
        var name = DataGenerator_1.default.getFirstName();
        var credit = DataGenerator_1.default.getInteger();
        var idSong = DataGenerator_1.default.getUUID();
        var songName = DataGenerator_1.default.getFirstName();
        var description = DataGenerator_1.default.getSongGenre();
        var singers = DataGenerator_1.default.getFirstName();
        var thumbnail = DataGenerator_1.default.getRandomFilePath();
        var subtitle = DataGenerator_1.default.getRandomFilePath();
        var price = DataGenerator_1.default.getInteger();
        var defaultUser = createUser(id, name, email, profilePhoto, cpf, refreshToken, credit);
        return {
            cpf: cpf,
            refreshToken: refreshToken,
            id: id,
            email: email,
            profilePhoto: profilePhoto,
            name: name,
            credit: credit,
            defaultUser: defaultUser,
            idSong: idSong,
            songName: songName,
            description: description,
            singers: singers,
            thumbnail: thumbnail,
            subtitle: subtitle,
            price: price
        };
    };
    beforeAll(function () {
        return typeorm_1.createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User_1.default, Song_1.default, GameSession_1.default, Scores_1.default],
            synchronize: true,
            logging: false,
        });
    });
    afterAll(function () {
        var connection = typeorm_1.getConnection();
        return connection.close();
    });
    it('should should create a new game session', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, email, profilePhoto, name, idSong, songName, description, singers, thumbnail, subtitle, price, user, song, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), cpf = _a.cpf, refreshToken = _a.refreshToken, email = _a.email, profilePhoto = _a.profilePhoto, name = _a.name, idSong = _a.idSong, songName = _a.songName, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, price = _a.price;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idUser: user.id, name: songName, price: price, description: description, idSong: idSong, singers: singers, subtitle: subtitle, thumbnail: thumbnail })];
                case 2:
                    song = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 3:
                    result = _b.sent();
                    expect(result).toBeDefined();
                    expect(result.song_id).toBe(song.id);
                    expect(result.user_id).toBe(user.id);
                    expect(result.isClosed).toBeFalsy();
                    return [2];
            }
        });
    }); });
    it('should find a game session', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, email, profilePhoto, name, idSong, songName, description, singers, thumbnail, subtitle, price, user, song, gameSession, foundGameSession;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), cpf = _a.cpf, refreshToken = _a.refreshToken, email = _a.email, profilePhoto = _a.profilePhoto, name = _a.name, idSong = _a.idSong, songName = _a.songName, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, price = _a.price;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idUser: user.id, name: songName, price: price, description: description, idSong: idSong, singers: singers, subtitle: subtitle, thumbnail: thumbnail })];
                case 2:
                    song = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 3:
                    gameSession = _b.sent();
                    return [4, GameSessionService_1.default.findGameSession(gameSession.id)];
                case 4:
                    foundGameSession = _b.sent();
                    expect(foundGameSession).toBeDefined();
                    expect(foundGameSession.song_id).toBe(song.id);
                    expect(foundGameSession.user_id).toBe(user.id);
                    return [2];
            }
        });
    }); });
    it('should throw an error when not finding a game session', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = getDefaultData().id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, GameSessionService_1.default.findGameSession(id)];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1).toBeInstanceOf(AppError_1.default);
                    expect(error_1.statusCode).toBe(404);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
    it('should count how many times a user played the song', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, email, profilePhoto, name, idSong, songName, description, singers, thumbnail, subtitle, price, user, song, firstResult, secondResult, thirdResult;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), cpf = _a.cpf, refreshToken = _a.refreshToken, email = _a.email, profilePhoto = _a.profilePhoto, name = _a.name, idSong = _a.idSong, songName = _a.songName, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, price = _a.price;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idUser: user.id, name: songName, price: price, description: description, idSong: idSong, singers: singers, subtitle: subtitle, thumbnail: thumbnail })];
                case 2:
                    song = _b.sent();
                    return [4, GameSessionService_1.default.countByUserIdAndSongId(user.id, song.id)];
                case 3:
                    firstResult = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 4:
                    _b.sent();
                    return [4, GameSessionService_1.default.countByUserIdAndSongId(user.id, song.id)];
                case 5:
                    secondResult = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 6:
                    _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 7:
                    _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 8:
                    _b.sent();
                    return [4, GameSessionService_1.default.countByUserIdAndSongId(user.id, song.id)];
                case 9:
                    thirdResult = _b.sent();
                    expect(firstResult).toBe(0);
                    expect(secondResult).toBe(1);
                    expect(thirdResult).toBe(4);
                    return [2];
            }
        });
    }); });
    it('should close a game session', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, email, profilePhoto, name, idSong, songName, description, singers, thumbnail, subtitle, price, user, song, gameSession, closedGameSession;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), cpf = _a.cpf, refreshToken = _a.refreshToken, email = _a.email, profilePhoto = _a.profilePhoto, name = _a.name, idSong = _a.idSong, songName = _a.songName, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, price = _a.price;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idUser: user.id, name: songName, price: price, description: description, idSong: idSong, singers: singers, subtitle: subtitle, thumbnail: thumbnail })];
                case 2:
                    song = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 3:
                    gameSession = _b.sent();
                    return [4, GameSessionService_1.default.closeGameSession({ id: gameSession.id })];
                case 4:
                    _b.sent();
                    return [4, GameSessionService_1.default.findGameSession(gameSession.id)];
                case 5:
                    closedGameSession = _b.sent();
                    expect(closedGameSession.id).toBe(gameSession.id);
                    expect(closedGameSession.song_id).toBe(gameSession.song_id);
                    expect(closedGameSession.user_id).toBe(gameSession.user_id);
                    expect(closedGameSession.isClosed).toBeTruthy();
                    return [2];
            }
        });
    }); });
    it('should throw an error when trying to close an already closed game session.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, email, profilePhoto, name, idSong, songName, description, singers, thumbnail, subtitle, price, user, song, gameSession, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), cpf = _a.cpf, refreshToken = _a.refreshToken, email = _a.email, profilePhoto = _a.profilePhoto, name = _a.name, idSong = _a.idSong, songName = _a.songName, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, price = _a.price;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idUser: user.id, name: songName, price: price, description: description, idSong: idSong, singers: singers, subtitle: subtitle, thumbnail: thumbnail })];
                case 2:
                    song = _b.sent();
                    return [4, GameSessionService_1.default.createGameSession({ idSong: song.id, idUser: user.id })];
                case 3:
                    gameSession = _b.sent();
                    return [4, GameSessionService_1.default.closeGameSession({ id: gameSession.id })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4, GameSessionService_1.default.closeGameSession({ id: gameSession.id })];
                case 6:
                    _b.sent();
                    return [3, 8];
                case 7:
                    error_2 = _b.sent();
                    expect(error_2).toBeInstanceOf(AppError_1.default);
                    expect(error_2.statusCode).toBe(400);
                    return [3, 8];
                case 8: return [2];
            }
        });
    }); });
});
