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
var axios_1 = __importDefault(require("axios"));
var LoginUnicoService_1 = __importDefault(require("../src/services/LoginUnicoService"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
jest.mock('axios');
jest.mock('jsonwebtoken');
var axiosMocked = axios_1.default;
var jwtMocked = jsonwebtoken_1.default;
describe('Login Unico', function () {
    var getUserInfo = function () {
        return {
            sub: DataGenerator_1.default.getUnformattedCpf(),
            name: DataGenerator_1.default.getFirstName(),
            email: DataGenerator_1.default.getEmail(),
            email_verified: true,
            phone_number: DataGenerator_1.default.getUnformattedCpf(),
            code: DataGenerator_1.default.getFirstName(),
            redirectUri: DataGenerator_1.default.getUrl()
        };
    };
    it('should call sign up and return user data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, sub, name, email, email_verified, phone_number, code, redirectUri, jwtToPem, loginUnicoInstance, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getUserInfo(), sub = _a.sub, name = _a.name, email = _a.email, email_verified = _a.email_verified, phone_number = _a.phone_number, code = _a.code, redirectUri = _a.redirectUri;
                    axiosMocked.get.mockResolvedValue({
                        data: {
                            keys: {}
                        }
                    });
                    axiosMocked.post.mockResolvedValue({ data: { id_token: "randomToken" } });
                    jwtMocked.verify = jest.fn().mockReturnValue({
                        sub: sub,
                        name: name,
                        email: email,
                        email_verified: email_verified,
                        phone_number: phone_number,
                        profilePhoto: redirectUri
                    });
                    jwtToPem = jest.fn().mockReturnValue({});
                    loginUnicoInstance = new LoginUnicoService_1.default(axiosMocked, jwtMocked, jwtToPem);
                    return [4, loginUnicoInstance.signUp({ code: code, redirectUri: redirectUri })];
                case 1:
                    result = _b.sent();
                    expect(result).toBeDefined();
                    expect(result.cpf).toBe(sub);
                    expect(result.name).toBe(name);
                    expect(result.email).toBe(email);
                    expect(result.profilePhoto).toBe(redirectUri);
                    return [2];
            }
        });
    }); });
    it('should throw error when getting keys from LoginUnico', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, code, redirectUri, loginUnicoInstance, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getUserInfo(), code = _a.code, redirectUri = _a.redirectUri;
                    axiosMocked.get.mockRejectedValue(function () { Promise.reject(); });
                    loginUnicoInstance = new LoginUnicoService_1.default(axiosMocked, jwtMocked, function () { });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, loginUnicoInstance.signUp({ code: code, redirectUri: redirectUri })];
                case 2:
                    _b.sent();
                    return [3, 4];
                case 3:
                    err_1 = _b.sent();
                    expect(err_1.statusCode).toBe(500);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
    it('should throw error when posting to LoginUnico', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, code, redirectUri, loginUnicoInstance, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = getUserInfo(), code = _a.code, redirectUri = _a.redirectUri;
                    axiosMocked.get.mockResolvedValue({
                        data: {
                            keys: {}
                        }
                    });
                    axiosMocked.post.mockClear();
                    axiosMocked.post.mockImplementation(function () {
                        return Promise.reject({
                            response: {
                                data: {
                                    error_description: ['error']
                                }
                            }
                        });
                    });
                    loginUnicoInstance = new LoginUnicoService_1.default(axiosMocked, jwtMocked, function () { });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, loginUnicoInstance.signUp({ code: code, redirectUri: redirectUri })];
                case 2:
                    _b.sent();
                    return [3, 4];
                case 3:
                    err_2 = _b.sent();
                    expect(err_2.statusCode).toBe(500);
                    expect(err_2.message.error).toEqual('User could not be authenticated on Login Único.');
                    expect(err_2.message.description.length).toBeGreaterThan(0);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
});
