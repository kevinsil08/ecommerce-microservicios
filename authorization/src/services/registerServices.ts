// src/registerServices.ts
import { serviceRegistry } from './serviceRegistry';

/**
 * Registra los microservicios disponibles.
 */
export function registerServices(): void {
  serviceRegistry.registerService('product', 'http://localhost:4000/api/v1/product');
  serviceRegistry.registerService('payment', 'http://localhost:4010/api/v1/payment');
  serviceRegistry.registerService('notification', 'http://localhost:4020/api/v1/notification');
  serviceRegistry.registerService('user', 'http://localhost:4030/api/v1/user');
}
