import { Injectable } from '@nestjs/common';

interface Proxy {
  id: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  type: 'http' | 'https' | 'socks5';
  isActive: boolean;
}

@Injectable()
export class ProxyService {
  private proxies: Map<string, Proxy> = new Map();

  async addProxy(proxy: Omit<Proxy, 'id'>): Promise<Proxy> {
    const id = this.generateId();
    const newProxy = { ...proxy, id };
    this.proxies.set(id, newProxy);
    return newProxy;
  }

  async getProxy(id: string): Promise<Proxy | undefined> {
    return this.proxies.get(id);
  }

  async getAllProxies(): Promise<Proxy[]> {
    return Array.from(this.proxies.values());
  }

  async getRandomProxy(): Promise<Proxy | undefined> {
    const activeProxies = Array.from(this.proxies.values()).filter((p) => p.isActive);
    if (activeProxies.length === 0) return undefined;
    return activeProxies[Math.floor(Math.random() * activeProxies.length)];
  }

  async removeProxy(id: string): Promise<void> {
    this.proxies.delete(id);
  }

  async testProxy(id: string): Promise<boolean> {
    // Implement proxy testing logic
    return true;
  }

  getProxyUrl(proxy: Proxy): string {
    const auth = proxy.username && proxy.password ? `${proxy.username}:${proxy.password}@` : '';
    return `${proxy.type}://${auth}${proxy.host}:${proxy.port}`;
  }

  private generateId(): string {
    return `proxy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
