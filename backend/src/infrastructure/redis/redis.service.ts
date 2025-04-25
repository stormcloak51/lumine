import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, ttl?: number) { // TTL in seconds
    await this.cacheManager.set(key, value, ttl ? ttl * 1000 : undefined);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.cacheManager.get<T>(key);
    return data || null;
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
  }

  async deletePattern(pattern: string) {
    try {
      // Get the Redis client from the store if needed for advanced operations
      const store = this.cacheManager.stores;
      if (store['getClient']) {
        const client = store['getClient']();
        const keys = await client.keys(pattern);
        
        // Delete each key that matches the pattern
        for (const key of keys) {
          await this.cacheManager.del(key);
        }
        return keys.length;
      }
      return 0;
    } catch (error) {
      console.error('Error deleting by pattern:', error);
      return 0;
    }
  }

	async testConnection(): Promise<boolean> {
		try {
			const testKey = 'connection-test';
			await this.set(testKey, 'test-value', 10);
			const value = await this.get<string>(testKey);
			return value === 'test-value';
		} catch (error) {
			console.error('Redis connection test failed:', error);
			return false;
		}
	}
}