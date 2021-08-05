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
var SongsService_1 = __importDefault(require("../src/services/SongsService"));
var UsersService_1 = __importDefault(require("../src/services/UsersService"));
var fs_1 = __importDefault(require("fs"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
var typeorm_1 = require("typeorm");
var AppError_1 = __importDefault(require("../src/errors/AppError"));
var Song_1 = __importDefault(require("../src/models/Song"));
var User_1 = __importDefault(require("../src/models/User"));
describe('Song Service', function () {
    var setupFactory = function () {
        var cpf = DataGenerator_1.default.getUnformattedCpf();
        return {
            cpf: cpf,
            idSong: DataGenerator_1.default.getUUID(),
            email: DataGenerator_1.default.getEmail(),
            profilePhoto: DataGenerator_1.default.getUrl(),
            name: DataGenerator_1.default.getFirstName(),
            songName: DataGenerator_1.default.getFirstName(),
            description: DataGenerator_1.default.getSongGenre(),
            singers: DataGenerator_1.default.getFirstName(),
            thumbnail: DataGenerator_1.default.getRandomFilePath(),
            subtitle: DataGenerator_1.default.getRandomFilePath(),
            price: DataGenerator_1.default.getInteger(),
        };
    };
    beforeAll(function () {
        return typeorm_1.createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [Song_1.default, User_1.default],
            synchronize: true,
            logging: false
        });
    });
    afterAll(function () {
        var connection = typeorm_1.getConnection();
        return connection.close();
    });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var userRepository, songRepository;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = typeorm_1.getRepository(User_1.default);
                    songRepository = typeorm_1.getRepository(Song_1.default);
                    return [4, songRepository.delete({})];
                case 1:
                    _a.sent();
                    return [4, userRepository.delete({})];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    it('should create a song', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, email, songName, profilePhoto, idSong, description, singers, thumbnail, subtitle, name, price, user, createdSong;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, songName = _a.songName, profilePhoto = _a.profilePhoto, idSong = _a.idSong, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, name = _a.name, price = _a.price;
                    return [4, UsersService_1.default.createUser({
                            cpf: cpf,
                            email: email,
                            profilePhoto: profilePhoto,
                            name: name,
                            refreshToken: null
                        })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: idSong, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 2:
                    createdSong = _b.sent();
                    expect(createdSong.id).toBe(idSong);
                    expect(createdSong.user_id).toBe(user.id);
                    expect(createdSong.description).toBe(description);
                    expect(createdSong.singers).toBe(singers);
                    expect(createdSong.thumbnail).toBe(thumbnail);
                    expect(createdSong.subtitle).toBe(subtitle);
                    expect(createdSong.name).toBe(songName);
                    expect(createdSong.price).toBe(price);
                    return [2];
            }
        });
    }); });
    it('should return a list of songs', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name, price, firstIdSong, secondIdSong, user, listOfSongs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, songName = _a.songName, profilePhoto = _a.profilePhoto, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, name = _a.name, price = _a.price;
                    firstIdSong = DataGenerator_1.default.getUUID(), secondIdSong = DataGenerator_1.default.getUUID();
                    return [4, UsersService_1.default.createUser({ cpf: cpf, email: email, profilePhoto: profilePhoto, name: name, refreshToken: null })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: firstIdSong, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 2:
                    _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: secondIdSong, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 3:
                    _b.sent();
                    return [4, SongsService_1.default.listSongs()];
                case 4:
                    listOfSongs = _b.sent();
                    expect(listOfSongs).toBeDefined();
                    expect(listOfSongs).not.toBeNull();
                    expect(listOfSongs.length).toBe(2);
                    expect(listOfSongs[0].id).toBe(firstIdSong);
                    expect(listOfSongs[1].id).toBe(secondIdSong);
                    return [2];
            }
        });
    }); });
    it('should find a song by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name, price, user, song;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = DataGenerator_1.default.getUUID();
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, songName = _a.songName, profilePhoto = _a.profilePhoto, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, name = _a.name, price = _a.price;
                    return [4, UsersService_1.default.createUser({ cpf: cpf, email: email, profilePhoto: profilePhoto, name: name, refreshToken: null })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: id, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 2:
                    _b.sent();
                    return [4, SongsService_1.default.findById({ id: id })];
                case 3:
                    song = _b.sent();
                    expect(song).not.toBeNull();
                    expect(song).toBeDefined();
                    expect(song).toBeInstanceOf(Song_1.default);
                    expect(song.id).toBe(id);
                    expect(song.description).toBe(description);
                    expect(song.singers).toBe(singers);
                    expect(song.name).toBe(songName);
                    return [2];
            }
        });
    }); });
    it('should fail if a song does not exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = DataGenerator_1.default.getUUID();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, SongsService_1.default.findById({ id: id })];
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
    it('should delete a song', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name, price, id, user, beforeTestSongs, afterTestSongs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, songName = _a.songName, profilePhoto = _a.profilePhoto, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, name = _a.name, price = _a.price;
                    id = DataGenerator_1.default.getUUID();
                    return [4, UsersService_1.default.createUser({ cpf: cpf, email: email, profilePhoto: profilePhoto, name: name, refreshToken: null })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: id, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 2:
                    _b.sent();
                    return [4, SongsService_1.default.listSongs()];
                case 3:
                    beforeTestSongs = _b.sent();
                    return [4, SongsService_1.default.deleteSongAndClearFolder({ id: id })];
                case 4:
                    _b.sent();
                    return [4, SongsService_1.default.listSongs()];
                case 5:
                    afterTestSongs = _b.sent();
                    expect(beforeTestSongs.length).toBe(1);
                    expect(afterTestSongs.length).toBe(0);
                    return [2];
            }
        });
    }); });
    it("should fail when trying to delete a song that doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = DataGenerator_1.default.getUUID();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, SongsService_1.default.deleteSongAndClearFolder({ id: id })];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    error_2 = _a.sent();
                    expect(error_2).toBeInstanceOf(AppError_1.default);
                    expect(error_2.statusCode).toBe(404);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
    it('should delete a fold when deleting a song', function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, _a, cpf, email, songName, profilePhoto, description, singers, thumbnail, subtitle, name, price, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = DataGenerator_1.default.getUUID();
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, songName = _a.songName, profilePhoto = _a.profilePhoto, description = _a.description, singers = _a.singers, thumbnail = _a.thumbnail, subtitle = _a.subtitle, name = _a.name, price = _a.price;
                    return [4, UsersService_1.default.createUser({ cpf: cpf, email: email, profilePhoto: profilePhoto, name: name, refreshToken: null })];
                case 1:
                    user = _b.sent();
                    return [4, SongsService_1.default.createSong({ idSong: id, idUser: user.id, description: description, singers: singers, thumbnail: thumbnail, subtitle: subtitle, name: songName, price: price })];
                case 2:
                    _b.sent();
                    fs_1.default.existsSync = jest.fn().mockReturnValue(true);
                    fs_1.default.rmdirSync = jest.fn();
                    return [4, SongsService_1.default.deleteSongAndClearFolder({ id: id })];
                case 3:
                    _b.sent();
                    expect(fs_1.default.existsSync).toBeCalledTimes(1);
                    expect(fs_1.default.existsSync).toHaveReturnedWith(true);
                    expect(fs_1.default.rmdirSync).toBeCalledTimes(1);
                    return [2];
            }
        });
    }); });
});
