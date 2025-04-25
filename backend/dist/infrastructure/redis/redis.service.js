"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
let RedisService = class RedisService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async set(key, value, ttl) {
        await this.cacheManager.set(key, value, ttl ? ttl * 1000 : undefined);
    }
    async get(key) {
        const data = await this.cacheManager.get(key);
        return data || null;
    }
    async delete(key) {
        return await this.cacheManager.del(key);
    }
    async deletePattern(pattern) {
        try {
            const store = this.cacheManager.stores;
            if (store['getClient']) {
                const client = store['getClient']();
                const keys = await client.keys(pattern);
                for (const key of keys) {
                    await this.cacheManager.del(key);
                }
                return keys.length;
            }
            return 0;
        }
        catch (error) {
            console.error('Error deleting by pattern:', error);
            return 0;
        }
    }
    async testConnection() {
        try {
            const testKey = 'connection-test';
            await this.set(testKey, 'test-value', 10);
            const value = await this.get(testKey);
            return value === 'test-value';
        }
        catch (error) {
            console.error('Redis connection test failed:', error);
            return false;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map