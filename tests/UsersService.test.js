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
var AppError_1 = __importDefault(require("../src/errors/AppError"));
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("../src/models/User"));
var TokenService_1 = __importDefault(require("../src/services/TokenService"));
var UsersService_1 = __importDefault(require("../src/services/UsersService"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
describe('Users Service', function () {
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
        var defaultUser = createUser(id, name, email, profilePhoto, cpf, refreshToken, credit);
        return {
            cpf: cpf,
            refreshToken: refreshToken,
            id: id,
            email: email,
            profilePhoto: profilePhoto,
            name: name,
            credit: credit,
            defaultUser: defaultUser
        };
    };
    beforeAll(function () {
        return typeorm_1.createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User_1.default],
            synchronize: true,
            logging: false,
        });
    });
    afterAll(function () {
        var connection = typeorm_1.getConnection();
        return connection.close();
    });
    it('should create an user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    expect(createdUser.name).toBe(name);
                    expect(createdUser.email).toBe(email);
                    expect(createdUser.cpf).toBe(cpf);
                    expect(createdUser.profilePhoto).toBe(profilePhoto);
                    expect(createdUser.refreshToken).toBe(refreshToken);
                    expect(createdUser.credit).toBe(0);
                    expect(createdUser.id).toBe(1);
                    return [2];
            }
        });
    }); });
    it('should find a user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, userFound;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    return [4, UsersService_1.default.findUserByCpfOrId({ id: createdUser.id })];
                case 2:
                    userFound = _b.sent();
                    expect(createdUser).toBeDefined();
                    expect(createdUser.name).toBe(userFound.name);
                    expect(createdUser.email).toBe(userFound.email);
                    expect(createdUser.cpf).toBe(userFound.cpf);
                    expect(createdUser.profilePhoto).toBe(userFound.profilePhoto);
                    expect(createdUser.refreshToken).toBe(userFound.refreshToken);
                    expect(createdUser.credit).toBe(userFound.credit);
                    expect(createdUser.id).toBe(userFound.id);
                    return [2];
            }
        });
    }); });
    it('should find a user by cpf', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, userFound;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    return [4, UsersService_1.default.findUserByCpfOrId({ cpf: createdUser.cpf })];
                case 2:
                    userFound = _b.sent();
                    expect(createdUser).toBeDefined();
                    expect(createdUser.name).toBe(userFound.name);
                    expect(createdUser.email).toBe(userFound.email);
                    expect(createdUser.cpf).toBe(userFound.cpf);
                    expect(createdUser.profilePhoto).toBe(userFound.profilePhoto);
                    expect(createdUser.refreshToken).toBe(userFound.refreshToken);
                    expect(createdUser.credit).toBe(userFound.credit);
                    expect(createdUser.id).toBe(userFound.id);
                    return [2];
            }
        });
    }); });
    it('should update a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, _b, name2, email2, profilePhoto2, refreshToken2, updatedUser;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    _b = getDefaultData(), name2 = _b.name, email2 = _b.email, profilePhoto2 = _b.profilePhoto, refreshToken2 = _b.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    _c.sent();
                    return [4, UsersService_1.default.updateUser({ cpf: cpf, name: name2, email: email2, profilePhoto: profilePhoto2, refreshToken: refreshToken2 })];
                case 2:
                    _c.sent();
                    return [4, UsersService_1.default.findUserByCpfOrId({ cpf: cpf })];
                case 3:
                    updatedUser = _c.sent();
                    expect(updatedUser).toBeDefined();
                    expect(updatedUser.name).toBe(name2);
                    expect(updatedUser.email).toBe(email2);
                    expect(updatedUser.cpf).toBe(cpf);
                    expect(updatedUser.profilePhoto).toBe(profilePhoto2);
                    expect(updatedUser.refreshToken).toBe(refreshToken2);
                    return [2];
            }
        });
    }); });
    it('should delete a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, beforeDelete, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    return [4, UsersService_1.default.findUserByCpfOrId({ id: createdUser.id })];
                case 2:
                    beforeDelete = _b.sent();
                    return [4, UsersService_1.default.deleteUser(createdUser.id)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4, UsersService_1.default.findUserByCpfOrId({ id: createdUser.id })];
                case 5:
                    _b.sent();
                    return [3, 7];
                case 6:
                    error_1 = _b.sent();
                    expect(beforeDelete).toBeDefined();
                    expect(error_1).toBeInstanceOf(AppError_1.default);
                    expect(error_1.statusCode).toBe(404);
                    return [3, 7];
                case 7: return [2];
            }
        });
    }); });
    it('should check if a user has enough credits.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    return [4, UsersService_1.default.checkInsufficientCreditsAndThrow(0, createdUser.id)];
                case 2:
                    result = _b.sent();
                    expect(result).toBe(0);
                    return [2];
            }
        });
    }); });
    it('should check if a user does not have enough credits.', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4, UsersService_1.default.checkInsufficientCreditsAndThrow(1, createdUser.id)];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    error_2 = _b.sent();
                    expect(error_2).toBeInstanceOf(AppError_1.default);
                    expect(error_2.statusCode).toBe(400);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); });
    it('should generate an error if it is an unsupported user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, UsersService_1.default.findUserByCpfOrId({})];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    error_3 = _a.sent();
                    expect(error_3).toBeInstanceOf(AppError_1.default);
                    expect(error_3.statusCode).toBe(500);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); });
    it('should add credit for a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, creditsToAdd, updatedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    creditsToAdd = 1234;
                    return [4, UsersService_1.default.changeCredit({ creditsToChange: creditsToAdd, user: createdUser })];
                case 2:
                    updatedUser = _b.sent();
                    expect(updatedUser.name).toBe(createdUser.name);
                    expect(updatedUser.email).toBe(createdUser.email);
                    expect(updatedUser.cpf).toBe(createdUser.cpf);
                    expect(updatedUser.profilePhoto).toBe(createdUser.profilePhoto);
                    expect(updatedUser.refreshToken).toBe(createdUser.refreshToken);
                    expect(updatedUser.credit).toBe(creditsToAdd);
                    return [2];
            }
        });
    }); });
    it('should remove credit from a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, creditsToAdd, creditsToRemove, finalCredit, updatedUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    creditsToAdd = 1234;
                    creditsToRemove = 234;
                    finalCredit = creditsToAdd - creditsToRemove;
                    return [4, UsersService_1.default.changeCredit({ creditsToChange: creditsToAdd, user: createdUser })];
                case 2:
                    _b.sent();
                    return [4, UsersService_1.default.removeCredit({ creditsToChange: creditsToRemove, user: createdUser })];
                case 3:
                    updatedUser = _b.sent();
                    expect(updatedUser.name).toBe(createdUser.name);
                    expect(updatedUser.email).toBe(createdUser.email);
                    expect(updatedUser.cpf).toBe(createdUser.cpf);
                    expect(updatedUser.profilePhoto).toBe(createdUser.profilePhoto);
                    expect(updatedUser.refreshToken).toBe(createdUser.refreshToken);
                    expect(updatedUser.credit).toBe(finalCredit);
                    return [2];
            }
        });
    }); });
    it('should throw an error when there are not enough credits', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, email, cpf, profilePhoto, refreshToken, createdUser, creditsToRemove, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getDefaultData(), name = _a.name, email = _a.email, cpf = _a.cpf, profilePhoto = _a.profilePhoto, refreshToken = _a.refreshToken;
                    return [4, UsersService_1.default.createUser({ name: name, email: email, cpf: cpf, profilePhoto: profilePhoto, refreshToken: refreshToken })];
                case 1:
                    createdUser = _b.sent();
                    creditsToRemove = 234;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4, UsersService_1.default.removeCredit({ creditsToChange: creditsToRemove, user: createdUser })];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    error_4 = _b.sent();
                    expect(error_4.statusCode).toBe(400);
                    expect(error_4).toBeInstanceOf(AppError_1.default);
                    return [3, 5];
                case 5: return [2];
            }
        });
    }); });
});
