import BaseRoutes from "./base/BaseRouter";
import Gateway from "../controllers/Gateway";
import { authenticateToken } from '../config/authMiddleware';

class GatewayRoutes extends BaseRoutes {
  public routes(): void {

    // Rutas públicas
    this.router.all('/login/:service/*', Gateway.redirect);

    // Rutas con token de autenticación
    this.router.all('/:service/*', authenticateToken, Gateway.redirect);
  }
}

export default new GatewayRoutes().router