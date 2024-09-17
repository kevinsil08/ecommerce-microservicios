import { Request, Response } from "express";
import axios, { Method, AxiosRequestConfig } from 'axios';

import { registerServices } from '../services/registerServices';
import { serviceRegistry } from '../services/serviceRegistry';

class GatewayController {
  async redirect(req: Request, res: Response) {

    try {
      const serviceName: string = req.params.service;
      const serviceUrl = serviceRegistry.getServiceUrl(serviceName);

      console.log('serviceUrl:', serviceUrl);
      console.log('serviceName:', serviceName);
  
      if (!serviceUrl) {
        res.status(503).json({ error: 'Servicio no disponible' });
        return;
      }
  
      // Construir la URL completa
      const path = req.params[0] || '';
      const url = `${serviceUrl}/${path}`;
  
      // Configurar la solicitud para el microservicio

      const newBody = JSON.stringify(req.body);

      const response = await fetch(
          url, 
          {
            headers: {
              origin: '192.168.18.4', // Opcional: ajustar el host
              'Content-Type': 'application/json'
            },
            method: req.method as Method,
            body: req.method == 'GET'? null :newBody
          }
        );
      res.status(response.status).json(await response.json());
      
    } catch (error) {

      console.error('Error al comunicarse con el servicio:', error);
        res.status(500).json({ error: 'Error al comunicarse con el servicio' });
      
    }


    /*
    this.app.all('/:service/*', authenticateToken, async (req: Request, res: Response) => {
      const serviceName: string = req.params.service;
      const serviceUrl = serviceRegistry.getServiceUrl(serviceName);

      if (!serviceUrl) {
        res.status(503).json({ error: 'Servicio no disponible' });
        return;
      }

      // Construir la URL completa
      const path = req.params[0] || '';
      const url = `${serviceUrl}/${path}`;

      // Configurar la solicitud para el microservicio
      const axiosConfig: AxiosRequestConfig = {
        method: req.method as Method,
        url: url,
        headers: {
          ...req.headers,
          host: new URL(serviceUrl).host, // Opcional: ajustar el host
        },
        data: req.body,
        params: req.query,
        validateStatus: () => true, // Permitir manejar manualmente los estados
      };

      try {
        const response = await axios(axiosConfig);
        res.status(response.status).json(response.data);
      } catch (error) {
        console.error('Error al comunicarse con el servicio:', error);
        res.status(500).json({ error: 'Error al comunicarse con el servicio' });
      }
    });
    */
    
  }

  
}

export default new GatewayController()