"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var environment_1 = __importStar(require("../src/environment/environment"));
var User_1 = __importDefault(require("../src/models/User"));
var UsersRepository_1 = __importDefault(require("../src/repository/UsersRepository"));
var TokenService_1 = __importDefault(require("../src/services/TokenService"));
var UsersService_1 = __importDefault(require("../src/services/UsersService"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
jest.mock('../src/services/UsersService');
var mockedUsersService = UsersService_1.default;
describe('Token Service', function () {
    var setupFactory = function () {
        var cpf = DataGenerator_1.default.getUnformattedCpf();
        return {
            cpf: cpf,
            refreshToken: TokenService_1.default.createRefreshToken({ cpf: cpf }),
            id: DataGenerator_1.default.getUUID(),
            email: DataGenerator_1.default.getEmail(),
            profilePhoto: DataGenerator_1.default.getUrl(),
            name: DataGenerator_1.default.getFirstName(),
            credit: 0
        };
    };
    beforeAll(function () {
        return typeorm_1.createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [User_1.default],
            synchronize: true,
            logging: false
        });
    });
    afterAll(function () {
        var defaultVariable = environment_1.loadEnvironments('test');
        environment_1.default['REFRESH_TOKEN_EXPIRATION'] = defaultVariable['REFRESH_TOKEN_EXPIRATION'];
        var connection = typeorm_1.getConnection();
        return connection.close();
    });
    it('should create a token once and return correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cpf, result, decodedCpf;
        return __generator(this, function (_a) {
            cpf = setupFactory().cpf;
            result = TokenService_1.default.createToken({ cpf: cpf });
            decodedCpf = jsonwebtoken_1.default.decode(result).cpf;
            expect(decodedCpf).not.toBeNull();
            expect(decodedCpf).toBeDefined();
            expect(cpf).toBe(decodedCpf);
            return [2];
        });
    }); });
    it('should create a refresh token once and return correct value', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cpf, result, decodedCpf;
        return __generator(this, function (_a) {
            cpf = setupFactory().cpf;
            result = TokenService_1.default.createRefreshToken({ cpf: cpf });
            decodedCpf = jsonwebtoken_1.default.decode(result).cpf;
            expect(decodedCpf).not.toBeNull();
            expect(decodedCpf).toBeDefined();
            expect(cpf).toBe(decodedCpf);
            return [2];
        });
    }); });
    it('should update an access token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, refreshToken, profilePhoto, name, email, newAccessToken, decodedCpf;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), cpf = _a.cpf, refreshToken = _a.refreshToken, profilePhoto = _a.profilePhoto, name = _a.name, email = _a.email;
                    return [4, UsersRepository_1.default.getInstance().insert({
                            name: name,
                            email: email,
                            profilePhoto: profilePhoto,
                            cpf: cpf,
                            refreshToken: refreshToken,
                            credit: 0
                        })];
                case 1:
                    _b.sent();
                    return [4, TokenService_1.default.updateToken(refreshToken)];
                case 2:
                    newAccessToken = _b.sent();
                    decodedCpf = jsonwebtoken_1.default.decode(newAccessToken).cpf;
                    expect(decodedCpf).not.toBeNull();
                    expect(decodedCpf).toBeDefined();
                    expect(cpf).toBe(decodedCpf);
                    return [2];
            }
        });
    }); });
    it('should remove a refresh token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cpf, _a, refreshToken, profilePhoto, name, email, credit;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    cpf = DataGenerator_1.default.getUnformattedCpf();
                    _a = setupFactory(), refreshToken = _a.refreshToken, profilePhoto = _a.profilePhoto, name = _a.name, email = _a.email, credit = _a.credit;
                    mockedUsersService.findUserByCpfOrId.mockClear();
                    mockedUsersService.findUserByCpfOrId.mockResolvedValueOnce({ name: name, cpf: cpf, refreshToken: refreshToken, email: email, credit: credit, profilePhoto: profilePhoto });
                    TokenService_1.default.UserService = mockedUsersService;
                    return [4, UsersRepository_1.default.getInstance().insert({
                            name: name,
                            email: email,
                            profilePhoto: profilePhoto,
                            cpf: cpf,
                            refreshToken: refreshToken,
                            credit: 0
                        })];
                case 1:
                    _b.sent();
                    return [4, TokenService_1.default.deleteToken(refreshToken)];
                case 2:
                    _b.sent();
                    expect(mockedUsersService.findUserByCpfOrId).toBeCalledTimes(1);
                    expect(mockedUsersService.updateUser).toBeCalledTimes(1);
                    expect(mockedUsersService.updateUser).toHaveBeenCalledWith({ name: name, cpf: cpf, email: email, credit: credit, profilePhoto: profilePhoto, refreshToken: null });
                    return [2];
            }
        });
    }); });
    it('should fail when token expires', function () { return __awaiter(void 0, void 0, void 0, function () {
        var cpf, refreshToken;
        return __generator(this, function (_a) {
            environment_1.default['REFRESH_TOKEN_EXPIRATION'] = '0s';
            cpf = DataGenerator_1.default.getUnformattedCpf();
            refreshToken = TokenService_1.default.createRefreshToken({ cpf: cpf });
            try {
                TokenService_1.default.verifyRefreshToken(refreshToken);
            }
            catch (error) {
                expect(error.statusCode).toBe(401);
                expect(error.message.toLowerCase()).toContain("expirou");
            }
            return [2];
        });
    }); });
    it('should fail when a valid token is not passed', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                TokenService_1.default.verifyRefreshToken(DataGenerator_1.default.getFirstName());
            }
            catch (error) {
                expect(error.statusCode).toBe(403);
                expect(error.message.toLowerCase()).toContain("inválido");
            }
            return [2];
        });
    }); });
});
