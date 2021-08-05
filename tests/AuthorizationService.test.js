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
var LoginUnicoService_1 = __importDefault(require("../src/services/LoginUnicoService"));
var DataGenerator_1 = __importDefault(require("../src/utils/DataGenerator"));
var AuthorizationService_1 = __importDefault(require("../src/services/AuthorizationService"));
jest.mock('../src/services/LoginUnicoService');
var LoginUnicoMock = LoginUnicoService_1.default;
var MockedLoginUnico = new LoginUnicoMock();
var setupFactory = function () {
    return {
        cpf: DataGenerator_1.default.getUnformattedCpf(),
        email: DataGenerator_1.default.getEmail(),
        name: DataGenerator_1.default.getFirstName(),
        phoneNumber: DataGenerator_1.default.getUnformattedCpf(),
        profilePhoto: DataGenerator_1.default.getUrl(),
        code: DataGenerator_1.default.getRandomWord(),
        redirectUri: DataGenerator_1.default.getUrl()
    };
};
describe('Authorization Service', function () {
    it('should call LoginUnico.call and return correct values', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, cpf, email, name, phoneNumber, profilePhoto, code, redirectUri, Authorization, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), cpf = _a.cpf, email = _a.email, name = _a.name, phoneNumber = _a.phoneNumber, profilePhoto = _a.profilePhoto, code = _a.code, redirectUri = _a.redirectUri;
                    MockedLoginUnico.signUp.mockClear();
                    MockedLoginUnico.signUp.mockResolvedValue({ cpf: cpf, email: email, name: name, phoneNumber: phoneNumber, profilePhoto: profilePhoto });
                    Authorization = new AuthorizationService_1.default(MockedLoginUnico);
                    return [4, Authorization.authenticateOnLoginUnico({ code: code, redirectUri: redirectUri })];
                case 1:
                    result = _b.sent();
                    expect(MockedLoginUnico.signUp).toBeCalledTimes(1);
                    expect(MockedLoginUnico.signUp).toBeCalledWith({ code: code, redirectUri: redirectUri });
                    expect(result).toBeDefined();
                    expect(result.cpf).toBe(cpf);
                    expect(result.email).toBe(email);
                    expect(result.name).toBe(name);
                    expect(result.profilePhoto).toBe(profilePhoto);
                    return [2];
            }
        });
    }); });
    it('should fail when calling LoginUnico.signUp', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, code, redirectUri, Authorization, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = setupFactory(), code = _a.code, redirectUri = _a.redirectUri;
                    MockedLoginUnico.signUp.mockClear();
                    MockedLoginUnico.signUp.mockRejectedValueOnce(function () { return Promise.reject(); });
                    Authorization = new AuthorizationService_1.default(MockedLoginUnico);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, Authorization.authenticateOnLoginUnico({ code: code, redirectUri: redirectUri })];
                case 2:
                    _b.sent();
                    return [3, 4];
                case 3:
                    error_1 = _b.sent();
                    expect(error_1.statusCode).toBe(500);
                    expect(MockedLoginUnico.signUp).toBeCalledTimes(1);
                    expect(MockedLoginUnico.signUp).toBeCalledWith({ code: code, redirectUri: redirectUri });
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
});
