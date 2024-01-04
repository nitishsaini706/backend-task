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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisService = void 0;
const redis_1 = __importDefault(require("redis"));
const createRedisClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = redis_1.default.createClient({ url: "" });
    yield client.connect();
    return client;
});
const redisService = (input) => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        client = yield createRedisClient();
        if (input.type === "get") {
            const getAsync = yield client.get.bind(client);
            const data = yield getAsync(input.key);
            return data ? JSON.parse(data) : false;
        }
        else if (input.type === "set" && input.value !== undefined) {
            const setAsync = yield client.set.bind(client);
            yield setAsync(input.key, input.value);
        }
    }
    catch (e) {
        console.error("Error in Redis service", e);
        throw e;
    }
    finally {
        if (client) {
            yield client.quit();
        }
    }
});
exports.redisService = redisService;
