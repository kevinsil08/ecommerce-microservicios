// src/serviceRegistry.ts
type Services = {
    [key: string]: string;
  };
  
  class ServiceRegistry {
    private services: Services = {};
  
    /**
     * Registra un servicio.
     * @param serviceName Nombre del servicio
     * @param url URL del servicio
     */
    public registerService(serviceName: string, url: string): void {
      this.services[serviceName] = url;
    }
  
    /**
     * Obtiene la URL de un servicio.
     * @param serviceName Nombre del servicio
     * @returns URL del servicio o null si no existe
     */
    public getServiceUrl(serviceName: string): string | null {
      return this.services[serviceName] || null;
    }
  
    /**
     * Lista todos los servicios registrados.
     * @returns Objeto con todos los servicios
     */
    public listServices(): Services {
      return this.services;
    }
  }
  
  export const serviceRegistry = new ServiceRegistry();
  